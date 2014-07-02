jQuery(document).ready(function(){
    var scripts = document.getElementsByTagName("script");
    var jsFolder = "";
    for (var i= 0; i< scripts.length; i++)
    {
        if( scripts[i].src && scripts[i].src.match(/initcarousel-1\.js/i))
            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
    }
    if ( typeof html5Lightbox === "undefined" )
    {
        html5Lightbox = jQuery(".html5lightbox").html5lightbox({
            skinsfoldername:"",
            jsfolder:jsFolder,
            barheight:48
        });
    }
    jQuery("#amazingcarousel-1").amazingcarousel({
        jsfolder:jsFolder,
        width:240,
        height:178,
        skinsfoldername:"",
        watermarkimage:"",
        itembottomshadowimagetop:100,
        watermarktextcss:"font:12px Arial,Tahoma,Helvetica,sans-serif;color:#666;padding:2px 4px;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;background-color:#fff;opacity:0.9;filter:alpha(opacity=90);",
        navheight:16,
        random:false,
        showbottomshadow:false,
        arrowheight:32,
        itembackgroundimagewidth:100,
        skin:"Classic",
        responsive:true,
        bottomshadowimage:"bottomshadow-110-95-0.png",
        enabletouchswipe:true,
        navstyle:"bullets",
        backgroundimagetop:-40,
        arrowstyle:"always",
        bottomshadowimagetop:95,
        hoveroverlayimage:"hoveroverlay-64-64-0.png",
        itembottomshadowimage:"itembottomshadow-100-100-5.png",
        watermarklinkcss:"text-decoration:none;font:12px Arial,Tahoma,Helvetica,sans-serif;color:#333;",
        watermarktext:"amazingcarousel.com",
        showitembackgroundimage:false,
        watermarklink:"http://amazingcarousel.com?source=watermark",
        playvideoimagepos:"center",
        circular:true,
        arrowimage:"arrows-32-32-2.png",
        direction:"horizontal",
        watermarkstyle:"text",
        transitioneasing:"easeOutExpo",
        itembackgroundimagetop:0,
        navdirection:"horizontal",
        showbackgroundimage:false,
        lightboxbarheight:48,
        showplayvideo:true,
        spacing:18,
        scrollitems:1,
        showhoveroverlay:true,
        scrollmode:"page",
        showwatermark:false,
        navimage:"bullet-16-16-1.png",
        backgroundimage:"",
        watermarktarget:"_blank",
        arrowwidth:32,
        backgroundimagewidth:110,
        pauseonmouseover:true,
        itembackgroundimage:"",
        watermarkpositioncss:"display:block;position:absolute;bottom:8px;right:8px;",
        arrowhideonmouseleave:1000,
        interval:3000,
        showitembottomshadow:false,
        navmode:"page",
        navspacing:8,
        itembottomshadowimagewidth:100,
        playvideoimage:"playvideo-64-64-0.png",
        autoplay:false,
        visibleitems:3,
        navswitchonmouseover:false,
        bottomshadowimagewidth:110,
        screenquery:{
	mobile: {
		screenwidth: 600,
		visibleitems: 1
	}
},
        navwidth:16,
        loop:0,
        transitionduration:1000
    });
});