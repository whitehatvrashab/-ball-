var ball,ballImage;
var wall,wallImage;
var stone,stoneImage,stoneGroup;
var bg,bgImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,gameoverImage;
var restart,restartImage;
var Score;

function preload(){
ballImage=loadImage("ball.png");
bgImage=loadImage("background.jpg");
stoneImage=loadImage("stone1.png");
gameoverImage=loadImage("gamover.png");
restartImage=loadImage("Restart.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);
bg=createSprite(260,0,20,20);
bg.addImage(bgImage);
bg.scale=6
bg.x = bg.width /2;
bg.velocityX = -6;

ball=createSprite(35,220,20,20);
ball.addImage(ballImage);
ball.scale=0.2;
ball.setCollider("rectangle",0,0,50,ball.height);
//ball.debug=true;
  
wall=createSprite(300,240,1200,20);

stoneGroup= new Group();

gameover=createSprite(200,100,20,20);
gameover.addImage(gameoverImage);
restart=createSprite(250,150,20,20);
restart.addImage(restartImage);
restart.scale=0.5
  
Score=0;
}

function draw() {
background(220) ;
 

  
if(gameState===PLAY){
if(keyDown("space")&& ball.y>=185){
ball.velocityY=-14;
  }

   
if (bg.x < 0){
bg.x = bg.width/2;
} 
  
bg.velocityX=-6;
  
spawnStone();
ball.velocityY = ball.velocityY + 0.5
ball.collide(wall)
 
gameover.visible=false;
restart.visible=false;
wall.visible=false; 
  
Score = Score + Math.round(getFrameRate()/60);
ball.depth=wall.depth;
ball.depth=ball.depth+9
  
if(ball.isTouching(stoneGroup)){
gameState=END;
  }
  }
  
if(gameState===END){
stoneGroup.setLifetimeEach(-1);

 bg.velocityX=0
stoneGroup.setVelocityXEach(0); 
ball.collide(wall)

gameover.visible=true;
restart.visible=true;
wall.visible=false;
ball.velocityX=0  
 
 if (gameState === END) {
     if(mousePressedOver(restart)) {
      reset();
    }    
  }

}
spawnStone();
drawSprites();
textSize(20);
fill("black")
text("Score="+Score,500,40); 
  
}

function reset(){
gameState=PLAY;
restart.visible=false;
gameover.visible=false;
stoneGroup.destroyEach();
score=0
}

function spawnStone() {
if (frameCount % 200 === 0) {
stone=createSprite(500,196,20,20);
stone.addImage(stoneImage);
stone.velocityX=-3;
stone.scale=0.2
stoneGroup.add(stone);
stone.lifetime=170;
}
}
