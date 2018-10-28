
$( document ).ready(function() {


var title = new Image();
var doordeco = new Image();
var touch_tip = new Image();


doordeco.onload = function(){
    
    $("#size_control").css({
        "width":`${setsize(572,929,$(window).width() *0.8,$(window).height()*0.8)[0]}px`,
        "height":`${setsize(572,929,$(window).width() *0.8,$(window).height()*0.8)[1]}px`});
        
    $("#start_title").fadeIn();
    // $("#start_title").addClass("fadeIn slow");
    $("#start_deco").fadeIn();
    // $("#start_deco").addClass("zoomIn");


};


title.src = "img/start_title.png";
doordeco.src = "img/door_deco.png";
touch_tip.src = "img/touch_tip.png";

$("#start_up").click(function(){
	$(this).animate({opacity:0},{duration:1000,complete:function(){
		$(this).css("display","none");
		
	}});
	setTimeout(function(){embedpano({swf:"tour.swf", xml:"tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,consolelog : true,					// trace krpano messages also to the browser console
		  onready : krpano_onready_callback,bgcolor:"#ececec"});},1000)
	
		 
		  
});


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
    var autoplay = 1;//开头自动播放音乐设置在这里
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


//简介模块

var infoslide = new Sly($(".show_area"),{

        
    touchDragging: true,
    scrollBy:200,
    swingSpeed:0.1,
    speed:500,
    releaseSwing:true,
    elasticBounds: 1,
    scrollTrap: true,
    easing: "easeOutExpo",
    scrollBar:$(".scroll_bar_v"),
    dynamicHandle: true
    
});
var sta;

var intro_html = {
    temple:`<div style="width:100%;font-size:0px"><img src="img/088_01.png" style="width:100%;height:auto;"/></div>
    <div style="width:100%;font-size:0px"><img src="img/088_02.png" style="width:100%;height:auto;"/></div>
    <div style="width:100%;font-size:0px"><img src="img/088_03.png" style="width:100%;height:auto;"/></div>
    <div style="width:100%;font-size:0px"><img src="img/088_04.png" style="width:100%;height:auto;"/></div>
    <div style="width:100%;font-size:0px"><img src="img/088_05.png" style="width:100%;height:auto;"/></div>
    <div style="width:100%;font-size:0px"><img src="img/088_06.png" style="width:100%;height:auto;"/></div>`,
    monk:`<div style="width:100%;font-size:0px"><img src="img/099_01.png" style="width:100%;height:auto;"/></div>
    <div style="width:100%;font-size:0px"><img src="img/099_02.png" style="width:100%;height:auto;"/></div>`,
    wechat:`<div style="width:100%;font-size:0px"><img src="img/0010.png" style="width:100%;height:auto;"/></div>`
}

function end (){
    $(".intro_overlay").fadeOut();
    $(".img_caption_wrapper").fadeOut();
    if(sta){
        clearInterval(sta);
    }
}

function info_init (){
    
    
    $(".intro_overlay").fadeIn();
    $(".img_caption_wrapper").fadeIn();
    $(".intro_overlay").click(function(){
        end();
        
    });
    $(".img_caption_wrapper").click(
        function(e){
            if( $(e.target).attr("id") === "intro_content" || $(e.target).attr("id") === "cp_wrapper" ){
                end();
            }
        }
    );
    $(".close_button").click(function(){
        end();
    });
    $(".intro_label").click(function(e){
        var id = $(e.target).attr("id");
        if($(e.target).attr("activelabel")){}
        else {
            $(".active_label").removeAttr("activelabel");
            $(".active_label").removeClass("active_label");
            $(this).addClass("active_label");
            $(".active_label").attr("activelabel",1);
             $(".info_slidee").animate({ opacity:0 },{complete:function(){
                 $(".info_slidee").html(intro_html[id]);
                 infoslide.slideTo(0);
                 
             }});
             $(".info_slidee").animate({opacity:1.0});

            
        }
    });
    var backgroundIMG = new Image();
    backgroundIMG.onload = function(){
        setintro_size();
    };
    backgroundIMG.src = "img/background.jpg";
    
    
    
    
}

function setsize(tw,th,mw,mh){
    var bg_width = 1024;
    var bg_height = 1300;
    var maxwidth =  $(window).width() - 16;
    var maxheight =  $(window).height() - 120;
    var output_width,output_height;

    if( tw && th && mw && mh){
        bg_width = tw;
        bg_height = th;
        maxwidth = mw;
        maxheight = mh;
    };

    var bg_ratio = bg_width/bg_height;
    
    if( bg_width > maxwidth && bg_height > maxheight ){
    if( maxwidth/maxheight > bg_ratio  ){
        output_height = maxheight;
        output_width = output_height*bg_ratio;
        output_width = output_width.toFixed(0);
        
    }else{
        output_width = maxwidth;
        output_height = output_width/bg_ratio;
        output_height = output_height.toFixed(0);

        
    }
    }else if (bg_width<=maxwidth){
        if(bg_height<=maxheight){
            output_width = bg_width;
            output_height=bg_height;


        } else if(bg_height>maxheight){
            output_height=maxheight;
            output_width = output_height*bg_ratio;
            output_width = output_width.toFixed(0);

        }

    }else if (bg_height<=maxheight){
        if(bg_width>maxwidth){
            output_width = maxwidth;
            output_height = output_width/bg_ratio;
            output_height = output_height.toFixed(0);

        }
    };


    return [output_width,output_height]
    
    

    

    
}

function setintro_size(){
    $(".bg_container").css("background-image",`url(img/background.jpg)`);
    infoslide.init();
    infoslide.on("move",function(){ infoslide.reload(); }); 
    $(".caption_intro").css("width",setsize()[0]);
    $(".bg_container").animate({
        width:setsize()[0],
        height:setsize()[1]
    },{complete: function(){ 
        $(".area_slidebar_wrapper").animate({opacity:1.0},{duration:1000});
        $(".caption_intro").animate({opacity:1.0},{duration:1000});
        sta = setInterval(function(){infoslide.reload();},300);
    }});
}

document.addEventListener("setskin",function(){
    $("#pano_skin").css("display","block");
    $("#pano_skin").animate({opacity:1.0},{duration:1500});
    $(".info_slidee").html(intro_html.temple);
    thumbprocess.thumbsinit();
    controlicons.init();
    //track_mouse();//屏幕中心点的ath，ahv显示模块
    poly_spot.init();
    

});

$("#namotext").click(
    function(){
        info_init();
    }
)

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