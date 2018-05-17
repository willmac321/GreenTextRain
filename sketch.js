//https://www.youtube.com/watch?v=S1TQCi9axzg
var streams = [];
var symbolSize = 25;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++){
    stream = new Stream();
    stream.generateSymbols(x, random(0,height));
    streams.push(stream);
    x += symbolSize;

  }

  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream){
    stream.render();
  });
}

function Symbol(x, y, speed, first){
  this.x=x;
  this.y=y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first=first;

  this.setToRandomSymbol=function(){
      if(frameCount % this.switchInterval == 0){
        if(round(random(0, 1))){
          this.value=String.fromCharCode(
            0x30A0 + round(random(0, 96))
          );
        }
        else if(round(random(0, 1))){
          this.value=String.fromCharCode(
            32
          );
        }
        else{
          this.value=String.fromCharCode(
            round(random(0, 1075))
          );
        }

      }
  }

  this.rain=function(){
    this.y=(this.y + this.speed) % height;
  }
}

function Stream(){
  this.symbols = [];
  this.totalSymbols = round(random(5, (height) / symbolSize));
  this.speed = random(3, 25);

  this.generateSymbols = function(x, y) {
    var first = round(random(0, 1)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++){
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function(){
    this.symbols.forEach(function(symbol){
        if(symbol.first){
          fill(200, 255, 200);
        }
        else{
          fill(0, 255, 120);
        }
        text(symbol.value, symbol.x, symbol.y);
        symbol.rain();
        symbol.setToRandomSymbol();
    });
  }
}
