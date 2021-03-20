var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back,backgroundImage,restart,restartImage;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score,highScore;


function preload(){
  backgroundImage=loadImage("gameOver.png")
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(1200, 200);
  back=createSprite(300,100)
  back.addImage("over",backgroundImage)
  back.visible=false;
  back.scale=1
  trex = createSprite(100,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -20;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  score = 0;
  highScore=0;
  restart=createSprite(300,140)
  restart.addImage("restart",restartImage)
  restart.scale=0.5
  restart.visible=false;
}

function draw() {
 background(225)
  textSize(15);
  text("Score: "+Math.round( score), 500,50);
  text("High Score: "+Math.round(highScore),300,50)
  trex.collide(invisibleGround);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -10;
   score = score+0.5;
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    if(keyDown("space")&&trex.isTouching(ground)) {
      if(trex.y>100){
    trex.velocityY = -10;
      }
    }
      trex.velocityY = trex.velocityY + 0.8
  spawnClouds();
  if(trex.isTouching(obstaclesGroup)){
   
    trex.velocityX=0;
    trex.veloctiyY=0;
     
    back.visible=false;
    restart.visible=false;
    gameState=END
  }
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided)
     obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0)
    trex.velocityX=0;
    trex.velocityY=0;
    if(score>highScore){
      highScore=score
    }
    back.visible=true
    restart.visible=true
     
    if(keyDown("space")||mousePressedOver(restart)){
      gameState=PLAY
      score=0
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      trex.changeAnimation("running",trex_running)
      back.visible=false
      restart.visible=false
    }
  }
  

  spawnObstacles();

  
  
  
  
   


  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % Math.round(random(60,100)) === 0){
   var obstacle = createSprite(1250,165,10,40);
   if(gameState===PLAY){
   obstacle.velocityX = -10;
   }
   
   
   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle 
     if(gameState===END){
     
    obstacle.lifetime = 300
     }
   obstacle.scale = 0.5;
  
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
     cloud = createSprite(1200,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -10;
    
     //assign lifetime to the variable
    if(gameState===END){
    cloud.lifetime = 134;
    }
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}