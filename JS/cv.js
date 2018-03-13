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
var level2 = {};
var level3 = {};
var cv = {};

/**
 * Creating list of objects whith srting atributes for level2
 */
level2.placeList = [
  { place: "Dawson College, Montreal, Canada ", time: "(sep 2017 - present)"},
  { place: "École Évrika, Montreal, Canada", time: "(aug 2016 - present) "},
  { place: "Impression Paragraph Inc, Montreal, Canada", time: "(may 2017  - aug 2017)"},
  { place: "IT department,Moldova Steel Works, Ribnita, Moldova", time: "(2012 - 2016)"},
  { place: "Department of high voltage electrical equipment, Moldova Steel Works, Ribnita, Moldova",
    time: "(2010 - 2012)"},
  { place: "Montreal, Canada. Programm - Computer Science Technology", time: "(2016 - present)"},
  { place: "Chisinau, Moldova. Specialty - Information Technologies.", time: "(2015 - 2016)"},
  { place: "Chisinau, Moldova. Specialty - Information Technologies.", time: "(2006 - 2010)"},
  { place: "University of Michigan. Graduation grade: 98.4% ", time: "(2015)"},
  { place: "University of Michigan. Graduation grade:  99.2% ", time: "(2015)"},
  { place: "ShawAcademy. Graduation with Distinction", time: "2016" }
];

/**
 * Creating list of objects whith srting atributes for level3
 */
level3.placeList = [
  { first: "Help Tutee identify their strengths and weaknesses in a programming field",
    second: "Provide academic assistance by personalizing instruction and" +
    "reviewing course material",
    third:"Help tutees develop effective learning strategies"},
  { first:"Planning, preparing and teaching classes",
    second:"Organising and promoting courses",
    third:"Preparing teaching materials"},
  { first:"Preparing and operate machines for printing and cutting ",
    second:"Searching for and correct programming and hardware issues",
    third:"Performing preventive maintenance"},
  { first:"Install, modify repair and test computer hardware  ",
    second:"Repair, maintain and test electronic equipment for information networks",
    third:"Configure firewall, network and anti-virus"},
  { first:"Repair high voltage equipment",
    second:"Detect defects and repair low voltage electrical equipment",
    third:"Repair interior and exterior lighting systemse"},
];

/**
 * Creating list for inserting in div  id = level2
 * @returns {HTMLCollection} list of element preparing for insertini in DOM(in div  id = level2)
 */
function createlevel2List() {
  var list = [];
  level2.placeList.forEach(function (o) {
    var item = document.createElement("p");
    U.setText(item, o.place + ": " + o.time);
    list.push(item);
  });
  return list;
}

/**
 * Creating list for inserting in div  id = level3
 * @returns {HTMLCollection} list of element preparing for insertini in DOM(in div  id = level3)
 */
function createlevel3List() {
  var list = [];
  level3.placeList.forEach(function (o) {
    var div = document.createElement("div");
    var h = document.createElement("h4");
    U.setText (h, "Main responsibilities:");
    div.appendChild(h);
    var ul = document.createElement("ul");
    var li1 = document.createElement("li");
    U.setText (li1, o.first);
    ul.appendChild(li1);
    var li2 = document.createElement("li");
    U.setText (li2, o.second);
    ul.appendChild(li2);
    var li3 = document.createElement("li");
    U.setText (li3, o.third);
    ul.appendChild(li3);
    div.appendChild(ul);
    list.push(div);
  });
  return list;
}

/**
 * Ceating Slider
 */
function createSlider() {
  cv.slider = document.createElement("input");
  cv.slider.setAttribute("type", "range");
  cv.slider.setAttribute("min", "1");
  cv.slider.setAttribute("max", "3");
  cv.slider.setAttribute("step", "1");
  cv.slider.setAttribute("value", "1");
  cv.slider.setAttribute("list", "tickmarks");
  document.getElementById("slidecontainer").appendChild(cv.slider);

  U.addHandler(cv.slider, "change", function(){
    if (cv.slider.value === "1"){

      cv.changeLevelTo1();
    }
    if (cv.slider.value === "2"){
      cv.changeLevelTo2();
    }
    if (cv.slider.value === "3"){
      cv.changeLevelTo3();
    }
  }, false);
}

/**
 * Change resume to level 1
 */
cv.changeLevelTo1 = function (){
  if (cv.level2Container[0].firstChild) {
    for(var i = 0; i < cv.level2Container.length; i++) {
      cv.level2Container[i].removeChild(cv.level2Container[i].firstChild)
    }
  }

  if (cv.level3Container[0].firstChild) {
    for(var j = 0; j < cv.level3Container.length; j++) {
      cv.level3Container[j].removeChild(cv.level3Container[j].firstChild)
    }
  }

}

/**
 * Change resume to level 2
 */
cv.changeLevelTo2 =  function(){
  if (cv.level3Container[0].firstChild) {
    for(var i = 0; i < cv.level3Container.length; i++) {
      cv.level3Container[i].removeChild(cv.level3Container[i].firstChild)
    }
  }
  if (!cv.level2Container[0].firstChild){
    cv.level2Container[0].appendChild(cv.level2list[0]);
    cv.level2Container[1].appendChild(cv.level2list[1]);
    cv.level2Container[2].appendChild(cv.level2list[2]);
    cv.level2Container[3].appendChild(cv.level2list[3]);
    cv.level2Container[4].appendChild(cv.level2list[4]);
    cv.level2Container[5].appendChild(cv.level2list[5]);
    cv.level2Container[6].appendChild(cv.level2list[6]);
    cv.level2Container[7].appendChild(cv.level2list[7]);
    cv.level2Container[8].appendChild(cv.level2list[8]);
    cv.level2Container[9].appendChild(cv.level2list[9]);
    cv.level2Container[10].appendChild(cv.level2list[10]);
  }
}

/**
 * Change resume to level 3
 */
cv.changeLevelTo3 =  function(){
  if (!cv.level2Container[0].firstChild){
    cv.level2Container[0].appendChild(cv.level2list[0]);
    cv.level2Container[1].appendChild(cv.level2list[1]);
    cv.level2Container[2].appendChild(cv.level2list[2]);
    cv.level2Container[3].appendChild(cv.level2list[3]);
    cv.level2Container[4].appendChild(cv.level2list[4]);
    cv.level2Container[5].appendChild(cv.level2list[5]);
    cv.level2Container[6].appendChild(cv.level2list[6]);
    cv.level2Container[7].appendChild(cv.level2list[7]);
    cv.level2Container[8].appendChild(cv.level2list[8]);
    cv.level2Container[9].appendChild(cv.level2list[9]);
    cv.level2Container[10].appendChild(cv.level2list[10]);
  }

  cv.level3Container[0].appendChild(cv.level3list[0]);
  cv.level3Container[1].appendChild(cv.level3list[1]);
  cv.level3Container[2].appendChild(cv.level3list[2]);
  cv.level3Container[3].appendChild(cv.level3list[3]);
  cv.level3Container[4].appendChild(cv.level3list[4]);
}

/**
 * Running ofter DOM was loaded
 */
U.ready(function() {
  cv.level2Container =  document.getElementsByClassName("level2");
  cv.level3Container =  document.getElementsByClassName("level3");

  cv.level2list = createlevel2List();
  cv.level3list = createlevel3List();

  if (U.supportsInput("range")){
    createSlider();
  }

});
