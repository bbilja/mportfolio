/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function() {
if(jQuery(window).width() > 760){
var body = document.body;
var main = document.querySelector("main");
var letter = document.querySelector(".bckletters");

// We define variables we will need later.
// 2 variables to store the scroll position and 2 variables to store the
// container position.
sx = 0;
sy = 0;

dx = sx;
dy = sy;

// The trick is to set a heigh to the body to keep the browser scroll bar.
body.style.height = main.clientHeight + "px";

// Then we fix our container so it won't move when the user scrolls.
// We will move it ourself with the Linear Interpolation and translations.
main.style.position = "fixed";
main.style.top = 0;
main.style.left = 0;

// We bind a scroll event to the window to watch scroll position.
window.addEventListener("scroll", scroll);

function scroll() {
  // We only update the scroll position variables
  sx = window.pageXOffset;
  sy = window.pageYOffset;  
}

// Then we start a `requestAnimationFrame` loop.
// For more informations about `requestAnimationFrame` check the episode #6 of
// "Gist for Javascript Beginners".
window.requestAnimationFrame(render);

function render() {
  // We calculate our container position by using our Linear Interpolation method.
  // For more informations about Linear Interpolation check the episode #11 of
  // "Gist for Javascript Beginners".
  dx = lerp(dx, sx, 0.07);
  dy = lerp(dy, sy, 0.07);

  // I choose to round the interpolated positions to 2 decimals for clarity.
  // You could remove these to lines and the smooth scroll would still work.
  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;

  // Finally we translate our container to its new positions.
  // Don't forget to add a minus sign because the container need to move in
  // the opposite direction of the window scroll.
  
  var trdx = '-'+dx+'px';
  var trdy = '-'+dy+'px';
  console.log(window.innerHeight);
  main.style.transform = 'translate('+trdx+', '+trdy+')';
  letter.style.transform = 'translate(-'+dx+'px, '+(window.innerHeight*0.4-dy/3)+'px)';
  // And we loop again.
  window.requestAnimationFrame(render);
}

// This is our Linear Interpolation method.
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
}
}