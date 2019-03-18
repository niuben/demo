var G = 9.81;
var MAX_HEIGHT = 500;
var PLATFORM_HEIGHT_IN_METERS = 10;
var PixelsPerMeter = (MAX_HEIGHT - document.getElementById("dog").getBoundingClientRect().top) / PLATFORM_HEIGHT_IN_METERS;
