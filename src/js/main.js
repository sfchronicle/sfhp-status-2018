require("./lib/social"); //Do not delete
var debounce = require("./lib/debounce");
require("image-slider");

let lastID = 0;

var fadeTime = 500;
// var timeoutTime = 1000;
var scrollImg = $("#scrolly-image");

window.onscroll = debounce(function() {activate()},0);

if (screen.width <= 480){
  scrollImg.attr("src","./assets/graphics/"+statusData[0].MobileImage);
  var scrollOffset = 600;
  var bottomOffset = 200;
} else {
  var scrollOffset = 0;
  var bottomOffset = 450;
}

let urls = [];
statusData.forEach(function(s,sIDX){
  if (s.Class === "graphic"){
    if (screen.width <= 480){
      urls.push("./assets/graphics/"+s.MobileImage);
    } else {
      urls.push("./assets/graphics/"+s.Image);
    }
  } else {
    if (screen.width <= 480){
      urls.push("https://s.hdnux.com/photos/74/14/25/"+s.Image+"/5/600x0.jpg");
    } else {
      urls.push("https://s.hdnux.com/photos/74/14/25/"+s.Image+"/5/1000x0.jpg");
    }
  }
});

// swap image
function swap(url) {
  scrollImg.fadeOut(fadeTime, function() {
    //update the src
    scrollImg.attr("src", url);
    //fade in once it's loaded
    scrollImg.one("load", function() {
      scrollImg.fadeIn(fadeTime);
    });
  })
};

function activate(){
  let scrollPos = window.scrollY;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let stickme = document.getElementById("stick-me");
  let stickmeTop = document.getElementById("stick-here").getBoundingClientRect().top+scrollTop-37;
  let stickmeBottom = document.getElementById("stop-stick").getBoundingClientRect().top+scrollTop-bottomOffset;

  // when should the sidebar image be fixed
  if (scrollPos > stickmeTop && scrollPos <= stickmeBottom) {
    stickme.classList.add("sticky");
  } else {
    stickme.classList.remove("sticky");
  }

  // which sidebar image should be shown
  for (let idx=0; idx<statusData.length; idx++){
    let boxTop = document.getElementById("text"+idx).getBoundingClientRect().top+scrollTop-scrollOffset;
    let boxBottom = document.getElementById("text"+idx).getBoundingClientRect().bottom+scrollTop-scrollOffset;
    if (scrollPos > boxTop && scrollPos <= boxBottom && lastID != idx){
      lastID = idx;
      console.log(lastID);
      swap(urls[lastID]);
    }
  }

}
