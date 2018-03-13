/** Teaches IE < 9 to recognize HTML5 elements. */
"use strict"
if (!document.footer) {
  createDummyElements();
}

/**
 * Creating list HTML5 element for IE<9
 */
function createDummyElements() {
  var semanticElements = [
    "article", "aside", "details", "figcaption", "figure",
    "footer", "header", "hgroup", "menu", "nav", "section"
  ];
  for (var i = 0; i < semanticElements.length; i++) {
    document.createElement(semanticElements[i]);
  }
}

var gallery = {};
gallery.imageList = [
  "cat.jpg",
  "doge.jpg",
  "dolphin.jpg",
  "fennec.jpg",
  "glassSpider.jpg",
  "leopard.jpg",
  "mouse.jpg",
  "owl.jpg",
  "panda.jpg",
  "parrot.jpg",
  "polarbear.jpg",
  "tortoise.jpg"
];

function getTarget(e) {
  var evn = e || window.event;
  return evn.srcElement || e.target;
}


gallery.imgElements = gallery.imageList.map(preloadImage);
gallery.maxZIndex = gallery.imageList.length + 1;

/**
 * Preloadimg imaging
 * @param {String} image name in Images/demo/ folder
 * @returns {HTML img element } eimg lement with particular preloaded image
 */
function preloadImage(src){
  var element = document.createElement("img");
  element.alt = src.split(".")[0];
  element.src = "Images/demo/" + src;
  return element;
}

/**
 * Grab image function
 * @param {Event} event name
 * @returns {HTML img element } eimg lement with particular preloaded image
 */
function grab(evt) {
  evt.newtarget = getTarget(evt);
  if (evt.newtarget.getAttribute("id") === "demoContainer"){
    return false;
  }
  evt.newtarget.parentNode.style.zIndex =  gallery.maxZIndex;
  gallery.maxZIndex++;
  evt.newtarget.parentNode.style.border =  "7px solid #ffe6cc";
  if (gallery.priviousImage && gallery.priviousImage !== evt.newtarget){
    gallery.priviousImage.parentNode.style.border = "none";
  }
  gallery.priviousImage = evt.newtarget;
  // difference between top-left corner coordinates and pointer coordinates
  gallery.diffx = evt.newtarget.parentNode.offsetLeft - evt.clientX;
  gallery.diffy = evt.newtarget.parentNode.offsetTop - evt.clientY;
  U.addHandler(evt.newtarget, "mousemove", move);
  // Note: attaching handler to window doesn't work in IE < 9
  U.addHandler(evt.newtarget, "mouseup", drop);
  U.addHandler(gallery.container, "dragstart", function (evt) {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    } else {
      return false;
    }
  });
}

/**
 * Drop image function
 * @param {Event} event
 */
function drop(evt) {
  evt.newtarget = getTarget(evt);
  U.removeHandler(evt.newtarget, "mousemove", move);
  // what's the difference between using document.body and g.panel here?
  U.removeHandler(evt.newtarget, "mouseup", drop);

}

//Random function
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Move image function
 * @param {Event} event
 */
function move(evt) {
  evt.newtarget = getTarget(evt);
  // In IE < 9, window.event is null inside a function scheduled by setTimeout
  // because by the time the function is called, the event is stale/old. So we "save" the
  // coordinates from the event here so we can use them in our scheduled function
  var coords = {
    x: evt.clientX,
    y: evt.clientY
  };
  // change coordinates of top-left corner relative to pointer coordinates
  // it's important to always keep the pointer over the panel, otherwise mousemove
  // won't be triggered
  setTimeout(function () {
    evt.newtarget.parentNode.style.left = gallery.diffx + coords.x + "px";
    evt.newtarget.parentNode.style.top = gallery.diffy + coords.y + "px";
  }, 20);

}

/**
 * Flip image function
 * @param {Event} event
 */
function flip(evt) {
  evt.newtarget = getTarget(evt);
  if (evt.newtarget.getAttribute("id") === "demoContainer"){
    return false;
  }
  if (evt.newtarget.style.webkitFilter === "brightness(100%)"){
    evt.newtarget.style.webkitFilter = "brightness(0%)"
  } else {
    evt.newtarget.style.webkitFilter = "brightness(100%)";
  }
}

/**
 * Running ofter DOM was loaded
 */
U.ready(function() {
  gallery.container = U.$("demoContainer");

  //creating img Elements
  for (var i = 0; i < gallery.imageList.length; i++) {
    gallery.div = document.createElement("div");
    gallery.div.style.display =  "inline-block";
    gallery.div.style.position = "absolute";
    gallery.div.style.top = getRandomArbitrary(0, 500) + "px";
    gallery.div.style.left = getRandomArbitrary(0, 200) + "px";
    gallery.div.style.zIndex =  String(i);
    gallery.container.appendChild(gallery.div);
    gallery.div.appendChild(gallery.imgElements[i]);
    gallery.imgElements[i].style.webkitFilter = "brightness(100%)";
  }

  U.addHandler(gallery.container, "mousedown", grab);
  U.addHandler(gallery.container, "dblclick", flip);
});
