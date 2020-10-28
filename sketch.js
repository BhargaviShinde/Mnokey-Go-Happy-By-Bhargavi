var gamestate = 1;
var Play = 1;
var End = 0;

var monkey , monkey_running, ground;

var bananas ,bananaImage, stone, stoneImage;

var FoodGr, obstacleGr;

var survivalTime = 0;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(300,510);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.16;
  
  ground = createSprite(300,570,1500,30);
  ground.velocityX = -6;
  
  FoodGr = createGroup();
  stoneGr = createGroup();
  
  survivalTime = 0;
  score = 0;

}


function draw() {
  background("white");
  
  monkey.collide(ground);
  
  if(gamestate === Play){
    
    survivalTime = Math.ceil(frameCount/frameRate());
     
    if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.velocityY = monkey.velocityY + 0.9;
    
    if(FoodGr.isTouching(monkey)){
      FoodGr.destroyEach();
      score = score + 1;
  }
  }
  
    if(stoneGr.isTouching(monkey)){
    gamestate = End;
    FoodGr.destroyEach();
    stoneGr.destroyEach();
    monkey.destroy();          
  }
  
  if(gamestate === End){
    FoodGr.destroyEach();
    stoneGr.destroyEach(); 
    
    ground.velocityX = 0;
    
  }
  
  
  drawSprites(); 
  Banana();
  Stone();
  
  textSize(19);
  fill("black");
  text("Survival Time: " + survivalTime,420,50);
  
  text("Score: " + score, 420,80);
}

function Banana(){
  if(frameCount % 90 === 0){
     bananas = createSprite(600,300);
     bananas.addImage(bananaImage);
     bananas.scale = 0.11;
     bananas.velocityX = -4;
     bananas.y = Math.round(random(300,450));
     bananas.lifetime = 300;
     
    
     FoodGr.add(bananas);
}
}

function Stone(){
  if(frameCount % 160 === 0){
      stone = createSprite(620,530);
      stone.addImage(stoneImage);
      stone.scale = 0.2;
  
      stone.velocityX = -5;
      stone.lifetime = 300;
    
      stoneGr.add(stone);
}
}
