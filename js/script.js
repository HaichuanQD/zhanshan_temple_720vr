
$( document ).ready(function() {

//thumbprocess模块是全景缩略图模块，实现了自动读取全景场景的缩略图，自动排列，自动列标题，宽度可调，可拖动
//模块中DOM变量指向sly的一些HTML元素，横向的SLY非LIST模式，slidee的宽度必须人工指定
//
var thumbprocess = (function(){

    var DOM = {
        thumbarea : '.thumbs',
        slidee: '.slidee',
    }

    var options = {
        thumbswidth : 90
    }

    var thumbdata = [];//缩略图信息存储变量
    var slythumbs = new Sly($(DOM.thumbarea),{
        horizontal:true,
        mouseDragging: true,
        touchDragging: true,
        scrollBy:100,
        scrollTrap: true,
        speed:300,
        swingSpeed:0.1,
        releaseSwing:true,
        elasticBounds: 1,
        easing: "easeOutExpo",
    });//用SLY插件创建可拖动的区域

    //从场景中读取缩略图及相关场景数据，存储到thumbdata变量中
        var getthumbs = function(){
            
            var sn ;
            sn = krpano.get("scene.count");
            
            for(i = 0; i < sn ; i++){
                var obj = {};
                obj.name = krpano.get(`scene[${i}].name`);
                obj.title = krpano.get(`scene[${i}].title`);
                obj.thumburl = krpano.get(`scene[${i}].thumburl`);
                thumbdata.push(obj);
            }
        

        };

        // var getdata = function(){
        //     return thumbdata;
        // };
//向场景中增加缩略图
        var addthumbs = function(){
            if( thumbdata ){
            var slideewidth = options.thumbswidth * (thumbdata.length);
            $(DOM.slidee).css("width",slideewidth+"px");
            for(i = 0; i<thumbdata.length; i++){
                $(DOM.slidee).append(`<div class="thumb_wrapper" style="padding:4px;height:72px;width: ${options.thumbswidth}px;float: left;">
                <div class="thumb_${thumbdata[i].name}" noreaded="1" linkedscene="${thumbdata[i].name}" style="cursor: pointer;position:relative;border: 2px solid #FFFFFF;height:100%;width:100%;background-size: cover;background-position: center,center;background-image:url(${thumbdata[i].thumburl});opacity:1;">
                    <div class="thumbs_01_text" style="pointer-events: none;width: 100%;position: absolute;bottom:0;text-align: center;background: rgba(0, 0, 0, 0.7);font-size: 12px;">${thumbdata[i].title}</div>
                </div>		
        </div>`);
              }
            }
        };
        //拖动区域初始化
        var slyinit = function(){
            slythumbs.init();
        };

        //如果SLY已经被初始化了，就刷新，这个函数用于窗口尺寸缩放
        var slyreload  = function(){
            if(slythumbs.initialized){
                slythumbs.reload();
            }
        };

        //激活元素滚动到中心
        var makemiddle = function(){
            if($(DOM.thumbarea).width()>$(".slidee").width()){
                $(DOM.slidee).css('margin-left',( $(DOM.thumbarea).width()-$(DOM.slidee).width() ) / 2 +'px' )
            } else {$(DOM.slidee).css('margin-left',"0px");}
            ;
        };

        //缩略图点击函数
        var thumbsclick = function(event){

            var curscene = krpano.get("xml.scene");
            
            var clickname = $(event.target).attr("linkedscene");
            
            
           if (curscene != clickname){
            
            krpano.call('loadscene('+clickname+', null, get(skin_settings.loadscene_flags), get(skin_settings.loadscene_blend))');

           };

        };

        var eventlisten = function(){
            $(".thumb_wrapper div").click(thumbsclick);

            krpano.addEventListener("build", function () {
                var a = krpano.get("xml.scene");
                // console.log(a);
                
                var thumbname = '.thumb_'+a;
                
                if(parseInt($(".activethumb").attr("noreaded"))){
                $(".activethumb").append(`<div style="pointer-events:none;position:absolute;top:2px;right:2px;height:16px;width:16px;background-image:url(img/readed.png);background-size: cover;background-position: center,center;"></div>`);
                console.log("rini");
                $(".activethumb").attr("noreaded",0);
            };
                $(".activethumb").removeClass("activethumb");
                $(thumbname).addClass("activethumb");
                scrollthumb(thumbname);
                

             });
         };

        var scrollthumb = function(cn){
            // var scrolltonow;
            //scrolltonow = panodata.slyscroll(id);
             //panoUI.scrollthumb(id);
             
             slythumbs.toCenter($(cn),false);
    
        }

        return {
            thumbsinit : function(){
                getthumbs();     
                addthumbs();
                makemiddle();
                eventlisten();
                slyinit();
                $(DOM.thumbarea).css("opacity",1);
                
            },

            thumbsonresize : function(){
                slyreload();
                makemiddle();
            }
        }
        
        
    


})();

var controlicons =(function(){

    var DOM = {
        iconcontainer:"#uprighticons",
        fullscreen: ".fullscreen",
        music: ".music",
        VR: ".vrenter",
        gyro: ".gyro",
        thumbs_toggle: ".thumbs_toggle",
        thumbs_container:"#thumb_container"
        
    };

    var judge = function(){

        // if(krpano.get("plugin[WebVR].isavailable")){
        //     $(DOM.iconcontainer).prepend(`<div class="uprighticon vrenter">

        //     </div>`);
        // };
        krpano.addEventListener('vrava',function(){
            
         if(krpano.get("webvr.isavailable")){
            $(DOM.VR).css("height","30px");
            $(DOM.VR).click( function(){
                krpano.call("webvr.enterVR();")
            });
            
         };
        });

        krpano.addEventListener('gyro',function(){
            if(krpano.get("plugin[skin_gyro].isavailable")){
               $(DOM.gyro).css("height","30px");
               $(DOM.gyro).click( function(){
                   krpano.call("switch(plugin[skin_gyro].enabled); if(plugin[skin_gyro].enabled, skin_showmap(false));")
               });
            };
           });

        if (krpano.get("device.fullscreensupport")){
            $(DOM.fullscreen).css("height","30px");
            
        };
        
    };
    var autoplay = 0;//开头自动播放音乐设置在这里
    var playing = false;

    var loadmusic = function(){
        var bgm = new Pizzicato.Sound({
            source:'file',
            options:{
                path:'music/merged_sutra.mp3',
                loop:true
            }
        }, function(error){
            if(!error){
                
                $(DOM.music).css("height","30px");
                if(autoplay){
                    bgm.play();
                }
                if(DOM.music){
                    $(DOM.music).click(function(){
                        
                        if(!playing){
                        bgm.play();
                        } else if (playing){
                        bgm.pause();
                        }
                    });
                };

                console.log('Music loaded sucessfully!');
            }else{
                console.log(error);
            }
        });
        bgm.on('play',function(){ playing = true; $(DOM.music).addClass('mute'); });
        bgm.on('pause',function(){ playing = false; $(DOM.music).removeClass('mute'); });

    };

    var eventlisten = function(){

        if($(DOM.fullscreen)){
            $(DOM.fullscreen).click( function(){
                toggleFullScreen(document.body);
            });

        

        if(DOM.thumbs_toggle){
            $(DOM.thumbs_toggle).click(function(){
            $(DOM.thumbs_container).toggleClass("thumbs_closed");
            $("#flower_contianer").toggleClass("flower_onthumbclosed");
            $("#flower").toggleClass("flower_onthumbclosed");
            $("#namotext").toggleClass("namotext_onthumbclosed");
            });
        };


        
       
        }
        
    }

    return {
        init : function(){
            judge();
            loadmusic();
            eventlisten();

        },
    }


})();


function track_mouse_interval_callback()
	{
		var mx = $(window).width()*0.5;
		var my = $(window).height()*0.5;
		
        var pnt = krpano.screentosphere(mx,my);
        
         var h = pnt.x;
         var v = pnt.y;
        
		 document.querySelector(".mouse").innerHTML = 'x="' + mx + '"<br> y="' + my + '" ath="' + h.toFixed(4) + '" atv="' + v.toFixed(4) + '"';
	}
	
	function track_mouse()
	{
		if (krpano)
		{
			
				// enable - call 60 times per second
				track_mouse_interval_id = setInterval(track_mouse_interval_callback, 1000.0 / 60.0);
				
				track_mouse_enabled = true;
			
				
			}
        }
        
//这个模块是一个很牛逼的添加多边形热点找点的工具，写于2018年10月26日凌晨，使用方法：把鼠标移动到想要勾勒的边界线上按M键开始勾选，按B后悔，勾勒完毕后按N在CONSOLE.LOG中拷贝点信息添加到XML中即可

	var poly_spot = (function(){
        
        var pointset = [];
        var i =0;
       
        return {
            poly: function(){
        var mx = krpano.get("mouse.x");
        var my = krpano.get("mouse.y");
        var pnt = krpano.screentosphere(mx,my);
        var h = pnt.x;
        var v = pnt.y;
        if( krpano.get("hotspot[poly_test]") ){
            krpano.set(`hotspot[poly_test].point[${i}].ath`,`${h.toFixed(4)}`);
            krpano.set(`hotspot[poly_test].point[${i}].atv`,`${v.toFixed(4)}`);
            krpano.call(`hotspot[poly_test].updatepos()`);
            var syn = `<point ath="${h.toFixed(4)}" atv="${v.toFixed(4)}"/>`;
            pointset.push(syn);

            i++;
            
            
        }else{
            krpano.call("addhotspot(poly_test)");
            krpano.set(`hotspot[poly_test].point[${i}].ath`,`${h.toFixed(4)}`);
            krpano.set(`hotspot[poly_test].point[${i}].atv`,`${v.toFixed(4)}`);
            var syn = `<point ath="${h.toFixed(4)}" atv="${v.toFixed(4)}"/>`;
            krpano.call(`hotspot[poly_test].updatepos()`);
            pointset.push(syn);
            i++;

        }
    },
    output_points: function(){
        var output = "";
        for(a=0;a<pointset.length;a++){
            output = output.concat(pointset[a]);
        };
        console.log(output);
    },
    delete_lastpoint: function(){    
        if( krpano.get("hotspot[poly_test]") && i > 0 ){
        i = i-1;
        krpano.call(`delete(hotspot[poly_test].point[${i}])`);
        krpano.call(`hotspot[poly_test].updatepos()`);
        var sp = pointset.length -1;
        pointset.splice(sp,1);
        
    }
    },
    init: function() {
        //添加多边形获取点的事件，动鼠标按M勾边
        $(document).keydown(function(e){
            if(e.which == 77){
                poly_spot.poly();
                
            }
        });
        //添加多边形获取点的事件，按N输出点信息
        $(document).keydown(function(e){
            if(e.which == 78){
                poly_spot.output_points();
                
            }
        });
        //按B删除最后添加的一个点
        $(document).keydown(function(e){
            if(e.which == 66){
                poly_spot.delete_lastpoint();
                
            }
        });
    }


}
    })();


$(window).resize(function() {
    
thumbprocess.thumbsonresize();

    
});

krpano.addEventListener("setskin",function(){

    thumbprocess.thumbsinit();
    controlicons.init();
    track_mouse();//屏幕中心点的ath，ahv显示模块
    poly_spot.init();

});



    // 下面的函数是全屏切换函数
function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}






});