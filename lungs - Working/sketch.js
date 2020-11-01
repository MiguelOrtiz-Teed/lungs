let playing = false;
let video;
let song;
let button;
let size = [];
let coordinateX = [];
let coordinateY = [];
let slider;
let tempX = 24;
let tempY = 12;



let vScale = 9;

function preload(){
  video = createVideo(['lungs.mp4']);
  song = loadSound('tvStatic.mp3')
}

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  slider = createSlider(.75, 5.5, 0,0);
  button = createButton('play');
  button.mousePressed(toggleVidSound);
  video.hide();
  noStroke();
  fill(0);
  //scaling the actual video down
  video.size(width / vScale, height / vScale);
}
function toggleVidSound() {
  if (playing) {
    video.pause();
    song.pause();
    button.html('play');
  } else {
    video.loop();
    song.loop();
    button.html('pause');
  }
  playing = !playing;
}

function draw() {
  background('black');
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    size[y] = [];
    coordinateX[y] = [];
    coordinateY[y] = [];
    for (var x = 0; x < video.width; x++) {
      var index = (video.width + x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      size[y][x] = w;
      coordinateX[y][x] = (x * vScale)+10;
      coordinateY[y][x] = (y * vScale)+10;
      noStroke();
      fill('white');
      rectMode(CENTER);
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
  //finding the pixel location on the screen for
  var tempX = 24;
  var tempY = 12;
   // fill('red');
  // rect(coordinateX[tempX][tempY], coordinateY[tempX][tempY], size[tempX][tempY], size[tempX][tempY]);
  if (mouseIsPressed) {
    fill('red');
    rect(mouseX, mouseY, (size[tempX][tempY])*2,(size[tempX][tempY])*2 )
    let valueOfMouse = (size[tempX][tempY]);
    slider.value(valueOfMouse);
    let sizeLoud = map(valueOfMouse, .75, 5.5, 0, 2);
    song.setVolume(sizeLoud);
    console.log(song.setVolume());
  }
}
