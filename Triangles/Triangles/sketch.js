/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//The Axion
const axiom = "F+F+F";
//Character1 to match
const match1 = "F";
//Rule to apply if Character1 matches
const rule1 = "F-F+F";
//Character2 to match
const match2 = ""
//Rule to apply if Character2 matches
const rule2 = "";
//The characters that should cause a line to be drawn
const drawChar1 = "F";
const drawChar2 = "";
//Angle
const theta = 120;
//The L-System Array
let lindenSysArr = axiom.split("");

//Parameters of the segments
const initSegmLength = 200;
const minSegmLength = 3;
const segmLengthMod = 0.5;
let segmLength = initSegmLength;

function setup() {
  createCanvas(650, 600, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(2);
  angleMode(DEGREES);
}

//Calculates and draws one iteration of the L-System every interval
let createLSystem = setInterval(() => {
  if (segmLength > minSegmLength) {
    background(0);
    calculateLindenSysArr();
    drawLindenSysArr(segmLength);
  }
  else {
    segmLength = initSegmLength;
    lindenSysArr = axiom.split("");
  }
}, 2000);

//Calculates the iterations and puts the result in an array
function calculateLindenSysArr() {

  //Temporary array to do all the calculations in
  let lindenSysArrTemp = [];

  //Applies the rule-set for each element of the array
  lindenSysArr.forEach((element) => {

    //If it matches match1....
    if (element === match1) {
      //...create a temporary array, filled with the elements
      //returned by the string.split method
      let tempRuleArray = rule1.split("");
      tempRuleArray.forEach((element1) => {
        //Append the contents of tempRuleArray to lindenSysArrTemp
        lindenSysArrTemp.push(element1);
      });
    }
    //If it matches match2....
    if (element === match2) {
      //...create a temporary array, filled with the elements
      //returned by the string.split method
      let tempRuleArray = rule2.split("");
      tempRuleArray.forEach((element1) => {
        //Append the contents of tempRuleArray to lindenSysArrTemp
        lindenSysArrTemp.push(element1);
      });
    }
    //If current element is "+" or "-", append it
    else if (element === "+" || element === "-") lindenSysArrTemp.push(element);
    //If current element is "[" or "]" also append it
    else if (element === "[" || element === "]") lindenSysArrTemp.push(element);
    //Replace all content of lindenSysArr with the content of lindenSysArrTemp
    lindenSysArr = lindenSysArrTemp.slice(0);
    console.log(lindenSysArr);
  });
}

//Displays the L-System Array "lindenSysArr"
function drawLindenSysArr(length) {

  translate(220, height - 250);

  if (length > minSegmLength) {

    push();

    //Draws the actual shape
    for (let i = 0; i < lindenSysArr.length; i++) {
      const element = lindenSysArr[i];

      //"F" draw a line
      if (element === drawChar1 || element === drawChar2) {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      //"+" turn positive theta, "-" turn negative theta
      else if (element === "+") rotate(theta);
      else if (element === "-") rotate(-theta);
      //"[" push() to the Matrix, "]" pop() the Matrix
      else if (element === "[") push();
      else if (element === "]") pop();
    }
    pop();
  }
  segmLength *= segmLengthMod;
}

function draw() {
}