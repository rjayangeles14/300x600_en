//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;
var creative = {};


/* This is for auto, set to true.
You can set firstexpand to false in user initiated unit*/
//var firstexpand=false;
// - - - - - - //


var ctaWidth = parseInt(window.getComputedStyle(document.getElementById('cta')).width.replace(/px/,""));
var ctaHeight = parseInt(window.getComputedStyle(document.getElementById('cta')).height.replace(/px/,""));
var ctaTop = parseInt(window.getComputedStyle(document.getElementById('cta')).top.replace(/px/,""));
var ctaLeft = parseInt(window.getComputedStyle(document.getElementById('cta')).left.replace(/px/,""));

var image1;
var image2;
var image3;
var image4;
var image5;
var headline
var exit_url;
var cta_exit_url;


//INITIALIZE
function mainInit(){
    IDsToVars();
    console.log("initializing");
    //var image1 = dynamicContent.dicks_test_feed_Sheet1[0].image1;
    //document.getElementById('image1').src = dynamicContent.dicks_test_feed_Sheet1[0].image1.Url
    image1 = document.getElementById("image1");
    image1.src = dynamicContent.dsgfeed1_Sheet1[0].image1.Url

    image2 = document.getElementById("image2");
    image2.src = dynamicContent.dsgfeed1_Sheet1[0].image2.Url

    image3 = document.getElementById("image3");
    image3.src = dynamicContent.dsgfeed1_Sheet1[0].image3.Url

    image4 = document.getElementById("image4");
    image4.src = dynamicContent.dsgfeed1_Sheet1[0].image4.Url

    image5 = document.getElementById("image5");
    image5.src = dynamicContent.dsgfeed1_Sheet1[0].image5.Url
    
    headline = document.getElementById("headline");
    headline.innerHTML = dynamicContent.dsgfeed1_Sheet1[0].headline

    exit_url = document.getElementById("exit_url")
    cta_exit_url = dynamicContent.dsgfeed1_Sheet1[0].exit_url.Url; 
    console.log(dynamicContent.dsgfeed1_Sheet1[0].exit_url.Url)
    
    //cta_exit.addEventListener('click', exitClickHandler, false);


    // var exitURL = dynamicContent.Feed_1[0].ExitURL.Url;
    // function exitClickHandler() {
    //   Enabler.exitOverride("exit name goes here", exitURL);
    // }
    // exitButton.addEventListener('click', exitClickHandler, false);


      container.style.width = dimensions.width + 'px';
      container.style.height = dimensions.height + 'px';
      collapsedContent.style.width = dimensions.width + 'px';
      collapsedContent.style.height = dimensions.height + 'px';
      curtain.style.width = dimensions.width + 'px';
      curtain.style.height = dimensions.height + 'px';
      border.style.width = dimensions.width + 'px';
      border.style.height = dimensions.height + 'px';
      bg.style.width = dimensions.width + 'px';
      bg.style.height = dimensions.height + 'px';
      // shineContainer.style.width = ctaWidth - shineContainerPadding + 'px';
      // shineContainer.style.height = ctaHeight - shineContainerPadding + 'px';
      // shineContainer.style.top = ctaTop - shineContainerPadding + 'px';
      // shineContainer.style.left = ctaLeft - shineContainerPadding + 'px';
      // logo_white_holder.style.width = dimensions.width + 'px';
      // logo_white_holder.style.height = dimensions.height + 'px';
      //bg_slide.style.width = dimensions.width + 'px';
      //bg_slide.style.height = dimensions.height + 'px';

    show();
    //set timeline
    tl = new TimelineLite();
    //extl = new TimelineLite();

    addListeners();
    
    animate();


    //For Auto Expand Only//
    //onExpandHandler();
}

function addListeners(){
 
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);
  //expandButton.addEventListener('click', onExpandHandler, false);
  collapseButton.addEventListener('click', onCollapseClickHandler, false);
  expandedExit.addEventListener('click', exitClickHandler);
  collapsedExit.addEventListener('click', collapsedExitClickHandler);
  exit_url.addEventListener('click', exitClickHandler);
  /*Must be on for User otherwise expandable animation wont work */ //expandButton.addEventListener('click',expandAnim);
  cta.onmouseover=function(){ctaOver()};
  cta.onmouseout=function(){ctaOut()};
  cta.addEventListener('click', collapsedExitClickHandler);
  // cta_x.onmouseover=function(){cta_xOver()};
  // cta_x.onmouseout=function(){cta_xOut()};
  // cta_x.addEventListener('click', exitClickHandler);



}
function show() {
  expandedContent.style.display = 'none';
  expandedExit.style.display = 'none';
  collapseButton.style.display = 'none';

  collapsedContent.style.display = 'block';
  collapsedExit.style.display = 'block';
  //expandButton.style.display = 'block';

}

// function shineAnim(){
//     TweenLite.fromTo(shine,1.5,{x:-shineWidth,ease:Quad.easeIn},{x:ctaWidth + 1})
// }

// function shineAnim_x(){
//     TweenLite.fromTo(shine_x,1.5,{x:-shine_xWidth,ease:Quad.easeIn},{x:cta_xWidth + 1})
// }

//ANIMATE
function animate(){
    console.log("animating timeline");
    stopWatch=new Date().getTime(); 


    //timeline animation here
    tl
    .to(curtain,.3,{alpha:0})

    .call(returnTimer)
}


function ctaOver(){
  //console.log("rollover");
      TweenLite.to(cta_Arrow,.2,{x:ctaHeight/13}); /* arrow should move ctaHeight/13 (in this case 2 pixels), 
                                                      animation lenght in this case also .2 to match pixel movement.
                                                      If for example ctaHeight is 39 then arrow animation moves 3 pixels and animation lenght should be set to .3 to match.
                                                      The bigger the CTA height the bigger CTA hence arrow animation needs to move more pixels and faster speed to match smaller cta rollver animation.
                                                   */
      //TweenLite.set(cta_shimmer,{x:"-300"});
     // TweenLite.to(cta_shimmer,.5,{x:100});


}
function ctaOut(){
       TweenLite.to(cta_Arrow,.2,{x:0});

}


// function cta_xOver(){
//   //console.log("rollover");
//       TweenLite.to(cta_Arrow_x,.2,{x:ctaHeight/13});  arrow should move ctaHeight/13 (in this case 2 pixels), 
//                                                       animation lenght in this case also .2 to match pixel movement.
//                                                       If for example ctaHeight is 39 then arrow animation moves 3 pixels and animation lenght should be set to .3 to match.
//                                                       The bigger the CTA height the bigger CTA hence arrow animation needs to move more pixels and faster speed to match smaller cta rollver animation.
                                                   
//       //TweenLite.set(cta_shimmer,{x:"-300"});
//      // TweenLite.to(cta_shimmer,.5,{x:100});


// }
// function cta_xOut(){
//        TweenLite.to(cta_Arrow_x,.2,{x:0});

// }


//expanding animation
// function expandAnim(){     

//     extl
//     .call(returnTimer)
// }

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}



//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};


/*---------------- Enable and Youtube code -------------------- */
function preInit() {
  
  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
} 
/**
 * Ad initialisation.
 */



function init() {
  /* for auto expand set to true, user set to false */ //Enabler.setStartExpanded(false);
  //console.log("auto expand false");
// Dynamic Content variables and sample values
    Enabler.setProfileId(1108848);
    var devDynamicContent = {};

    devDynamicContent.Profile= [{}];
    devDynamicContent.Profile[0]._id = 0;
    devDynamicContent.Profile[0].image1 = {};
    devDynamicContent.Profile[0].image1.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873103131_image1.png";
    devDynamicContent.Profile[0].image2 = {};
    devDynamicContent.Profile[0].image2.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873122636_image2.png";
    devDynamicContent.Profile[0].image3 = {};
    devDynamicContent.Profile[0].image3.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873136707_image3.png";
    devDynamicContent.Profile[0].image4 = {};
    devDynamicContent.Profile[0].image4.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873151737_image4.png";
    devDynamicContent.Profile[0].image5 = {};
    devDynamicContent.Profile[0].image5.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873162820_image5.png";
    devDynamicContent.Profile[0].headline = "LOREM IPSUM IS SIMPLY A DUMMY TEXT FOR DESIGN.";
    devDynamicContent.dsgfeed1_Sheet1= [{}];
    devDynamicContent.dsgfeed1_Sheet1[0]._id = 0;
    devDynamicContent.dsgfeed1_Sheet1[0].uniqueId = 1;
    devDynamicContent.dsgfeed1_Sheet1[0].reporting_label = "dsg-feed1";
    devDynamicContent.dsgfeed1_Sheet1[0].headline = "LOREM IPSUM IS SIMPLY A DUMMY TEXT FOR DESIGN.";
    devDynamicContent.dsgfeed1_Sheet1[0].image1 = {};
    devDynamicContent.dsgfeed1_Sheet1[0].image1.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873103131_image1.png";
    devDynamicContent.dsgfeed1_Sheet1[0].image2 = {};
    devDynamicContent.dsgfeed1_Sheet1[0].image2.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873122636_image2.png";
    devDynamicContent.dsgfeed1_Sheet1[0].image3 = {};
    devDynamicContent.dsgfeed1_Sheet1[0].image3.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873136707_image3.png";
    devDynamicContent.dsgfeed1_Sheet1[0].image4 = {};
    devDynamicContent.dsgfeed1_Sheet1[0].image4.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873151737_image4.png";
    devDynamicContent.dsgfeed1_Sheet1[0].image5 = {};
    devDynamicContent.dsgfeed1_Sheet1[0].image5.Url = "http://s0.2mdn.net/dynamic/1/1080889/1487873162820_image5.png";
    devDynamicContent.dsgfeed1_Sheet1[0].exit_url = {};
    devDynamicContent.dsgfeed1_Sheet1[0].exit_url.Url = "http://www.google.com/";
    devDynamicContent.dsgfeed1_Sheet1[0].isDefault = true;
    devDynamicContent.dsgfeed1_Sheet1[0].active = true;
    Enabler.setDevDynamicContent(devDynamicContent);

    // Polite loading
    if (Enabler.isPageLoaded()) {
      mainInit();
    }
    else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainInit);
    }
}



function expandStartHandler() {
  // Show expanded content.
  expandedContent.style.display = 'block';
  expandedExit.style.display = 'block';
  collapseButton.style.display = 'block';
  collapsedContent.style.display = 'none';
  collapsedExit.style.display = 'none';
  //expandButton.style.display = 'none';

  Enabler.finishExpand();
}

function expandFinishHandler() {
  //showYTPlayer1('feature-expanded');
  /* for auto expand 8 seconds otherwise 30 seconds */ 
  // expandAnim is so expandable timeline animates!!
  // if(firstexpand){
  //   expandAnim(); // so not to get endframe to disapprear 
  //   firstexpand=false;
  //   TweenLite.delayedCall(8,onCollapseClickHandler);
  // }
  // else{
  //   extl.restart(); // this helps animation repeat on expand.

  //   TweenLite.delayedCall(30,onCollapseClickHandler);

  // }
  /* - - - for auto expand end- - -  */
  //creative.isExpanded = true;
}

function collapseStartHandler() {
  // Perform collapse animation.
  TweenLite.killTweensOf(onCollapseClickHandler); // kills auto expand & user initiated auto collapse timer, resets 8 & 30 second timer.
  expandedContent.style.display = 'none';
  expandedExit.style.display = 'none';
  collapseButton.style.display = 'none';
  collapsedContent.style.display = 'block';
  collapsedExit.style.display = 'block';
  //expandButton.style.display = 'block';
  //hideYTPlayer1('feature-expanded');

  // When animation finished must call
  Enabler.finishCollapse();
}

function collapseFinishHandler() {
  creative.isExpanded = false;
}

function onCollapseClickHandler(){
  Enabler.requestCollapse();
  Enabler.stopTimer('Panel Expansion');
}

function onExpandHandler(){
  Enabler.requestExpand();
  Enabler.startTimer('Panel Expansion');
}

// function exitClickHandler() {

//   Enabler.exit('BackgroundExit');
// }

function exitClickHandler() {
  Enabler.exitOverride("BackgroundExit", cta_exit_url);
}

function collapsedExitClickHandler() {

  Enabler.exit('CollapsedExit');
}


