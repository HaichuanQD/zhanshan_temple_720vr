
$( document ).ready(function() {

    var krpano = null;
		embedpano({
        swf:"https://cdn.huixinhuiyi.com/vrcase/tour.swf",
		id : "krpanoSWFObject",
 		xml:"tour.xml", 
 		target:"pano", 
 		html5:"auto", 
 		mobilescale:1.0, 
 		passQueryParameters:true,
 		consolelog : true,					// trace krpano messages also to the browser console
 		onready : krpano_onready_callback
 });

		function krpano_onready_callback(krpano_interface)
			{
				krpano = krpano_interface;
            }
            
            var commetpos;
            commetpos = { 
                 'scene_1':[]
                ,'scene_2':[]
                ,'scene_3':[]
                ,'scene_4':[]
                ,'scene_5':[]
                ,'scene_6':[]
                ,'scene_7':[]
                ,'scene_8':[]
                ,'scene_9':[]
                ,'scene_10':[]
            };

            function getIndexByProperty(data, key, value) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][key] == value) {
                        return i;
                        
                    }
                }
                return -1;

                

            }

                
            
		
// BUDGET CONTROLLER
// var budgetController = (function() {
    
//     var Expense = function(id, description, value) {
//         this.id = id;
//         this.description = description;
//         this.value = value;
//         this.percentage = -1;
//     };
    
    
//     Expense.prototype.calcPercentage = function(totalIncome) {
//         if (totalIncome > 0) {
//             this.percentage = Math.round((this.value / totalIncome) * 100);
//         } else {
//             this.percentage = -1;
//         }
//     };
    
    
//     Expense.prototype.getPercentage = function() {
//         return this.percentage;
//     };
    
    
//     var Income = function(id, description, value) {
//         this.id = id;
//         this.description = description;
//         this.value = value;
//     };
    
    
//     var calculateTotal = function(type) {
//         var sum = 0;
//         data.allItems[type].forEach(function(cur) {
//             sum += cur.value;
//         });
//         data.totals[type] = sum;
//     };
    
    
//     var data = {
//         allItems: {
//             exp: [],
//             inc: []
//         },
//         totals: {
//             exp: 0,
//             inc: 0
//         },
//         budget: 0,
//         percentage: -1
//     };
    
    
//     return {
//         addItem: function(type, des, val) {
//             var newItem, ID;
            
//             //[1 2 3 4 5], next ID = 6
//             //[1 2 4 6 8], next ID = 9
//             // ID = last ID + 1
            
//             // Create new ID
//             if (data.allItems[type].length > 0) {
//                 ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
//             } else {
//                 ID = 0;
//             }
            
//             // Create new item based on "inc" or "exp" type
//             if (type === "exp") {
//                 newItem = new Expense(ID, des, val);
//             } else if (type === "inc") {
//                 newItem = new Income(ID, des, val);
//             }
            
//             // Push it into our data structure
//             data.allItems[type].push(newItem);
            
//             // Return the new element
//             return newItem;
//         },
        
        
//         deleteItem: function(type, id) {
//             var ids, index;
            
//             // id = 6
//             //data.allItems[type][id];
//             // ids = [1 2 4  8]
//             //index = 3
            
//             ids = data.allItems[type].map(function(current) {
//                 return current.id;
//             });

//             index = ids.indexOf(id);

//             if (index !== -1) {
//                 data.allItems[type].splice(index, 1);
//             }
            
//         },
        
        
//         calculateBudget: function() {
            
//             // calculate total income and expenses
//             calculateTotal("exp");
//             calculateTotal("inc");
            
//             // Calculate the budget: income - expenses
//             data.budget = data.totals.inc - data.totals.exp;
            
//             // calculate the percentage of income that we spent
//             if (data.totals.inc > 0) {
//                 data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
//             } else {
//                 data.percentage = -1;
//             }            
            
//             // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
//         },
        
//         calculatePercentages: function() {
            
//             /*
//             a=20
//             b=10
//             c=40
//             income = 100
//             a=20/100=20%
//             b=10/100=10%
//             c=40/100=40%
//             */
            
//             data.allItems.exp.forEach(function(cur) {
//                cur.calcPercentage(data.totals.inc);
//             });
//         },
        
        
//         getPercentages: function() {
//             var allPerc = data.allItems.exp.map(function(cur) {
//                 return cur.getPercentage();
//             });
//             return allPerc;
//         },
        
        
//         getBudget: function() {
//             return {
//                 budget: data.budget,
//                 totalInc: data.totals.inc,
//                 totalExp: data.totals.exp,
//                 percentage: data.percentage
//             };
//         },
        
//         testing: function() {
//             console.log(data);
//         }
//     };
    
// })();




// // UI CONTROLLER
// var UIController = (function() {
    
//     var DOMstrings = {
//         inputType: ".add__type",
//         inputDescription: ".add__description",
//         inputValue: ".add__value",
//         inputBtn: ".add__btn",
//         incomeContainer: ".income__list",
//         expensesContainer: ".expenses__list",
//         budgetLabel: ".budget__value",
//         incomeLabel: ".budget__income--value",
//         expensesLabel: ".budget__expenses--value",
//         percentageLabel: ".budget__expenses--percentage",
//         container: ".container",
//         expensesPercLabel: ".item__percentage",
//         dateLabel: ".budget__title--month"
//     };
    
    
//     var formatNumber = function(num, type) {
//         var numSplit, int, dec, type;
//         /*
//             + or - before number
//             exactly 2 decimal points
//             comma separating the thousands

//             2310.4567 -> + 2,310.46
//             2000 -> + 2,000.00
//             */

//         num = Math.abs(num);
//         num = num.toFixed(2);

//         numSplit = num.split(".");

//         int = numSplit[0];
//         if (int.length > 3) {
//             int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); //input 23510, output 23,510
//         }

//         dec = numSplit[1];

//         return (type === "exp" ? "-" : "+") + " " + int + "." + dec;

//     };
    
    
//     var nodeListForEach = function(list, callback) {
//         for (var i = 0; i < list.length; i++) {
//             callback(list[i], i);
//         }
//     };
    
    
//     return {
//         getInput: function() {
//             return {
//                 type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
//                 description: document.querySelector(DOMstrings.inputDescription).value,
//                 value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
//             };
//         },
        
        
//         addListItem: function(obj, type) {
//             var html, newHtml, element;
//             // Create HTML string with placeholder text
            
//             if (type === "inc") {
//                 element = DOMstrings.incomeContainer;
                
//                 html = "<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>";
//             } else if (type === "exp") {
//                 element = DOMstrings.expensesContainer;
                
//                 html = "<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>";
//             }
            
//             // Replace the placeholder text with some actual data
//             newHtml = html.replace("%id%", obj.id);
//             newHtml = newHtml.replace("%description%", obj.description);
//             newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
            
//             // Insert the HTML into the DOM
//             document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
//         },
        
        
//         deleteListItem: function(selectorID) {
            
//             var el = document.getElementById(selectorID);
//             el.parentNode.removeChild(el);
            
//         },
        
        
//         clearFields: function() {
//             var fields, fieldsArr;
            
//             fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            
//             fieldsArr = Array.prototype.slice.call(fields);
            
//             fieldsArr.forEach(function(current, index, array) {
//                 current.value = "";
//             });
            
//             fieldsArr[0].focus();
//         },
        
        
//         displayBudget: function(obj) {
//             var type;
//             obj.budget > 0 ? type = "inc" : type = "exp";
            
//             document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
//             document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
//             document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");
            
//             if (obj.percentage > 0) {
//                 document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
//             } else {
//                 document.querySelector(DOMstrings.percentageLabel).textContent = "---";
//             }
            
//         },
        
        
//         displayPercentages: function(percentages) {
            
//             var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
//             nodeListForEach(fields, function(current, index) {
                
//                 if (percentages[index] > 0) {
//                     current.textContent = percentages[index] + "%";
//                 } else {
//                     current.textContent = "---";
//                 }
//             });
            
//         },
        
        
//         displayMonth: function() {
//             var now, months, month, year;
            
//             now = new Date();
//             //var christmas = new Date(2016, 11, 25);
            
//             months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//             month = now.getMonth();
            
//             year = now.getFullYear();
//             document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;
//         },
        
        
//         changedType: function() {
            
//             var fields = document.querySelectorAll(
//                 DOMstrings.inputType + "," +
//                 DOMstrings.inputDescription + "," +
//                 DOMstrings.inputValue);
            
//             nodeListForEach(fields, function(cur) {
//                cur.classList.toggle("red-focus"); 
//             });
            
//             document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
            
//         },
        
        
//         getDOMstrings: function() {
//             return DOMstrings;
//         }
//     };
    
// })();




// // GLOBAL APP CONTROLLER
// var controller = (function(budgetCtrl, UICtrl) {
    
//     var setupEventListeners = function() {
//         var DOM = UICtrl.getDOMstrings();
        
//         document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

//         document.addEventListener("keypress", function(event) {
//             if (event.keyCode === 13 || event.which === 13) {
//                 ctrlAddItem();
//             }
//         });
        
//         document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
        
//         document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changedType);        
//     };
    
    
//     var updateBudget = function() {
        
//         // 1. Calculate the budget
//         budgetCtrl.calculateBudget();
        
//         // 2. Return the budget
//         var budget = budgetCtrl.getBudget();
        
//         // 3. Display the budget on the UI
//         UICtrl.displayBudget(budget);
//     };
    
    
//     var updatePercentages = function() {
        
//         // 1. Calculate percentages
//         budgetCtrl.calculatePercentages();
        
//         // 2. Read percentages from the budget controller
//         var percentages = budgetCtrl.getPercentages();
        
//         // 3. Update the UI with the new percentages
//         UICtrl.displayPercentages(percentages);
//     };
    
    
//     var ctrlAddItem = function() {
//         var input, newItem;
        
//         // 1. Get the field input data
//         input = UICtrl.getInput();        
        
//         if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
//             // 2. Add the item to the budget controller
//             newItem = budgetCtrl.addItem(input.type, input.description, input.value);

//             // 3. Add the item to the UI
//             UICtrl.addListItem(newItem, input.type);

//             // 4. Clear the fields
//             UICtrl.clearFields();

//             // 5. Calculate and update budget
//             updateBudget();
            
//             // 6. Calculate and update percentages
//             updatePercentages();
//         }
//     };
    
    
//     var ctrlDeleteItem = function(event) {
//         var itemID, splitID, type, ID;
        
//         itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
//         if (itemID) {
            
//             //inc-1
//             splitID = itemID.split("-");
//             type = splitID[0];
//             ID = parseInt(splitID[1]);
            
//             // 1. delete the item from the data structure
//             budgetCtrl.deleteItem(type, ID);
            
//             // 2. Delete the item from the UI
//             UICtrl.deleteListItem(itemID);
            
//             // 3. Update and show the new budget
//             updateBudget();
            
//             // 4. Calculate and update percentages
//             updatePercentages();
//         }
//     };
    
    
//     return {
//         init: function() {
//             console.log("Application has started.");
//             UICtrl.displayMonth();
//             UICtrl.displayBudget({
//                 budget: 0,
//                 totalInc: 0,
//                 totalExp: 0,
//                 percentage: -1
//             });
//             setupEventListeners();
//         }
//     };
    
// })(budgetController, UIController);


// controller.init();

// document.querySelector(".pointer").addEventListener("click",function (){document.querySelector(".thumbs").classList.toggle("closed");});



/*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/

/*---------PANO-----------*//*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/
/*---------PANO-----------*/

/*---------PANO-----------*//*---------PANO-----------*/
/*---------PANO-----------*/

var optionspano = {
    thumbheight:200,//导览缩略图高度
    thumbwidth:200
};

var panodata = (function (){
    /*场景的CONSTRUCTOR*/
    var Panos = function (id,thumburl,linkedscence){
        this.id = id;
        this.thumburl = thumburl;
        this.linkedscence = linkedscence;
    }

    var panoitems = [];
    //var thumblength;

    Panos.prototype.calcmiddlepos = function(opt){
        this.middlepos = (this.id - 1) * opt.thumbheight + (0.5 * opt.thumbheight) ;/*计算每个缩略图终点距离第一张缩略图上边沿顶部的距离*/
        
    };

    return{
        additem: function(id,thumbsurl,linkedscence,opt){
           var newitem = new Panos (id,thumbsurl,linkedscence);
           newitem.calcmiddlepos(opt);
           panoitems.push(newitem);
           thumblength = (panoitems.length)*opt.thumbheight;/* 计算缩略图导览总长并存储 */
           
           
           return newitem;
        },
        
        slyscroll:function(id){
            // var viewh, topdis;
            // viewh = window.innerHeight;/*当前视口高度*/
            // topdis = panoitems[id-1].middlepos;/*每个缩略图终点距离第一张缩略图上边沿顶部的距离*/
            

            // /* 计算点击后滚动到视口中央中的滑动距离 */
            // if (thumblength - viewh <= 0 ) {
            //     return 0;
            // } else if (thumblength - topdis <= 0.5*viewh ){
            //     return thumblength - viewh;
            // } else if (topdis - 0.5*viewh <= 0){
            //     return 0;
            // } else {
            //     return topdis - 0.5*viewh;
            // }

        },

        test: function(){
             console.log(panoitems);
        }
    }

})();


var panoUI = (function(){
    
    var DOMdata = {
        guidebar : ".thumbs",
        slidee:".slidee",
        thumbsheight:".thumb_wrapper",
        pointer:".pointer"
   };
    var  getRandomColor = function() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

    return {
        
        addthumbs: function(obj,opt){
          $(DOMdata.slidee).append('<div class= "thumb_wrapper" style="height:'+opt.thumbheight+'px;">'+
          '<div class="thumb_container"><div class= "thumb_'+obj.id+' thumbimg_wrapper"><img src="'+obj.thumburl+'"></div></div>'+
          '</div>');
        },
        getDOMstring: function() {
            return DOMdata;
        },
        scrollthumb: function(id){

        },
        getoptions: function(){
            return options;
        }


        
    }
})();


var controlarea = (function (panodata,panoUI,options){

    var optionsdefault = {
        guidebannerwidth : 100,
        guidebannerpostion : "left",
        thumbheight: 100

    }
    var options_final = Object.assign(optionsdefault,options)
    

    var DOM = panoUI.getDOMstring();  
    var create = function( id,thumburl,linkedscence ){
        var item = panodata.additem(id,thumburl,linkedscence,options_final);
        panoUI.addthumbs( item,options_final );
    };
    
    var scrollthumb = function(id){
        // var scrolltonow;
        //scrolltonow = panodata.slyscroll(id);
         //panoUI.scrollthumb(id);
         var classname = '.thumb_'+id;
         slythumbs.toCenter($(classname),false);

    }

    var slythumbs = new Sly($(DOM.guidebar),{
        mouseDragging: true,
        touchDragging: true,
        scrollBy:100,
        scrollTrap: true,
        speed:300,
        releaseSwing:true,
        elasticBounds: 1,
        easing: "easeOutExpo",
    });

    var thumbclick = function(event){
        /*获取所点击缩略图对应的唯一ID号*/
        var curscene = krpano.get("xml.scene");
        var curid = curscene.split("_")[1];
        var clickclass,clickid;
        clickclass = $(event.target).parent().attr("class"); 
        clickid = clickclass.split("_")[1].split(" ")[0];

        if (curid != clickid )
        
        {
        /* 滚动缩略图到中央 */
        scrollthumb(clickid);

        /* 读取全景图像 */
        krpano.call('loadscene(scene_'+clickid+',null,MERGE, BLEND(0.5)');
    
        };
        console.log('krpano.aabc');
    
    };
    
    
    var Hotspot  = function(id,ath,atv){
        this.id = id,
        this.ath = ath,
        this.atv = atv
    };
    
    var addhotspot = function(id,ath,atv){
        /* 添加热点直接动作 热点的选项在此设置  */
        krpano.call("addhotspot(" + id + ")");
        krpano.set("hotspot["+id+"].url", "comment.png");
        krpano.set("hotspot["+id+"].ath", ath);
        krpano.set("hotspot["+id+"].atv", atv);
        krpano.set("hotspot["+id+"].distorted", false);
        krpano.call("hotspot["+id+"].loadstyle(dragablehotspot)");
        krpano.set("hotspot["+id+"].onDragEnd", 'copy(data[curhspos].idp,hotspot[' + id + '].name);copy(data[curhspos].athp,hotspot[' + id + '].ath);copy(data[curhspos].atvp,hotspot[' + id + '].atv);jscall(var event = document.createEvent("Event");event.initEvent("hsdrgcomp", true, true);krpano.dispatchEvent(event););');
    };

    var adddatahotspot = function(id,ath,atv){
        /* 添加热点直接动作 热点的选项在此设置  */
        krpano.call("addhotspot(" + id + ")");
        krpano.set("hotspot["+id+"].url", "comment.png");
        krpano.set("hotspot["+id+"].ath", ath);
        krpano.set("hotspot["+id+"].atv", atv);
        krpano.set("hotspot["+id+"].distorted", false);
        
        
    };

    var  clickaddhotspots = function(){
        
	
		if (krpano)
		{

            
			var h = krpano.get("view.hlookat");
			var v = krpano.get("view.vlookat");
            var hs_name = "hs" + ((Date.now() + Math.random()*10000) | 0);
            var scene = krpano.get("xml.scene");	// create unique/randome name
			// krpano.call("addhotspot(" + hs_name + ")");
			// krpano.set("hotspot["+hs_name+"].url", "comment.png");
			// krpano.set("hotspot["+hs_name+"].ath", h);
			// krpano.set("hotspot["+hs_name+"].atv", v);
            // krpano.set("hotspot["+hs_name+"].distorted", false);
            
            
            // krpano.call("hotspot["+hs_name+"].loadstyle(dragablehotspot)");
            addhotspot(hs_name,h,v);
            obj = new Hotspot(hs_name,h,v);
            commetpos[scene].push(obj);
           
  
            /* copy(data[curhspos].idp,hotspot[' + hs_name + '].name);copy(data[curhspos].athp,hotspot[' + hs_name + '].ath);copy(data[curhspos].atvp,hotspot[' + hs_name + '].atv); */           
            
           
			
		}
    };
    
    var loadhotpots = function(arr){

         arr.forEach(function(element){
             addhotspot('hs'+element.id,element.ath,element.atv);

         });

    };

    var loaddatahotpots = function(arr){

        arr.forEach(function(element){
            adddatahotspot('hs'+element.id,element.ath,element.atv);

        });

   }; 


    
    
var pointerclick = function(opt){
    if ($(DOM.guidebar).css("margin-left") == "0px") {
        $(DOM.guidebar).animate({"margin-left":'-'+opt.thumbwidth+'px'},300) ;
        } else {
            $(DOM.guidebar).animate({"margin-left":'0px'},300);
            }

   
    
};
    return{
        init: function(opt){

            /* 创建场景信息*/
            create(1,"test.jpg",1);
            create(2,"test.jpg",1);
            create(3,"test.jpg",1);
            create(4,"test.jpg",1);
            create(5,"test.jpg",1);
            create(6,"test.jpg",1);
            create(7,"test.jpg",1);
            create(8,"test.jpg",1);
            create(9,"test.jpg",1);
            create(10,"test.jpg",1);
            /* 设置缩略图宽度*/
            $(DOM.guidebar).css({"width": opt.thumbwidth});


            /*应用sly*/

            slythumbs.init();
            // $(DOM.guidebar).sly({
            //     mouseDragging: true,
            //     touchDragging: true,
            //     scrollBy:100,
            //     scrollTrap: true,
            //     speed:300,
            //     releaseSwing:true,
            //     elasticBounds: 1,
            //     easing: "easeOutExpo",
            // });
            

          /* 设置事件*/
            $(".thumb_container  img").click( thumbclick );
            
            $(".thumb_container").hover(
                function(){ $(this).css("border","2px solid rgba(255, 94, 0, 1)") },
                function(){ $(this).css("border","2px solid rgba(255, 94, 0, 0)") });

            $(DOM.pointer).click( function(){ pointerclick(opt);   } );

            $(window).resize(function(e) {
                $(".thumbs").sly("reload")});

            $('.button').click( clickaddhotspots );
            $('#comment').focus( clickaddhotspots );
                


        /*krpano事件使得缩略图白边跟场景同步*/ 
            krpano.addEventListener("build", function () {
                var a = krpano.get("xml.scene");
                var id = a.split("_")[1];
                var thumbname = '.thumb_'+id;
                var arr;
                $(".activethumbs").addClass("readed");
                $(".activethumbs").removeClass("activethumbs");
                $(thumbname).parent().addClass("activethumbs");
                scrollthumb(id);

                $.ajax({
                    url:'data.php',
                    method:'POST',
                    data:{scene: a },
                    dataType:'JSON',
                    success:function(data){
                        arr = data;
                        loaddatahotpots(arr);
                    },
                    error:function(){
                        console.log('wrong')
                    }
                })
                loadhotpots(commetpos[a]);
                
                
             }, false);

             krpano.addEventListener('hsdrgcomp',function(){


                 var id = krpano.get('data[curhspos].idp');
                 krpano.set('data[curhspos].idp','');
                 var ha = krpano.get('data[curhspos].athp');
                 krpano.set('data[curhspos].athp','');
                 var va = krpano.get('data[curhspos].atvp');       
                 krpano.set('data[curhspos].atvp','');
                 



                 if(id && ha && va){
                 var sce = krpano.get("xml.scene");
                 var curitem = getIndexByProperty(commetpos[sce], 'id', id);
                 if (curitem != -1 ) {
                     
                    commetpos[sce][curitem].id = id;
                    commetpos[sce][curitem].ath = ha;
                    commetpos[sce][curitem].atv = va;
                    console.log(commetpos);

                 } else if (curitem == -1 ) {
                     commetpos[sce].push({
                         
                        'id':id,
                        'ath':ha,
                        'atv':va,
                     });
                     console.log('heool');
                 }
                } else {
                    console.log('error#009');
                }

                

                 

             });

        /*显示缩略图*/
        $(".left_sidebar").css({"opacity":1.0});
        

        },
        scroll_thumb: function(id){
            scrollthumb(id);
        }
    }
})(panodata,panoUI,optionspano);

    


krpano.addEventListener("setskin",function(){controlarea.init(optionspano);},false)

// $(".thumb_5").parent().addClass("activethumbs");


// function scrollthumb(distance){
//     var scorllpos = document.querySelector(".thumbs").scrollTop;
//     if ( document.querySelector(".thumbs").scrollTop != distance ) {
//     var plus;
//     plus = (distance - scorllpos) /100;
//     document.querySelector(".thumbs").scrollTop += plus;} 
//     }

/*用jQuery的animate啊哈哈哈哈啊哈哈*/



});

