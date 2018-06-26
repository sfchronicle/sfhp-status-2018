require("./lib/social"); //Do not delete
var debounce = require("./lib/debounce");
require("image-slider");

console.log(statusData);
let lastID = 0;

var fadeTime = 500;
// var timeoutTime = 1000;
var scrollImg = $("#scrolly-image");

window.onscroll = debounce(function() {activate()},0);

let urls = [];
statusData.forEach(function(s,sIDX){
  if (s.Class === "graphic"){
    // THIS IS A HACK WHILE I WAIT FOR GRAPHICS
    urls.push("./assets/06.jpg");
    // urls.push(s.Image);
  } else {
    urls.push("https://s.hdnux.com/photos/74/14/25/"+s.Image+"/5/1000x0.jpg");
  }
});

console.log(urls);

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
  let stickmeBottom = document.getElementById("stop-stick").getBoundingClientRect().top+scrollTop-450;

  // when should the sidebar image be fixed
  if (scrollPos > stickmeTop && scrollPos <= stickmeBottom) {
    stickme.classList.add("sticky");
  } else {
    stickme.classList.remove("sticky");
  }

  // which sidebar image should be shown
  for (let idx=0; idx<statusData.length; idx++){
    let boxTop = document.getElementById("text"+idx).getBoundingClientRect().top+scrollTop;
    let boxBottom = document.getElementById("text"+idx).getBoundingClientRect().bottom+scrollTop;
    if (scrollPos > boxTop && scrollPos <= boxBottom && lastID != idx){
      lastID = idx;
      console.log(lastID);
      swap(urls[lastID]);
    }
  }

}
