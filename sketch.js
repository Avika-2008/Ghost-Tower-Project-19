var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
 
 towerImg= loadImage("tower.png"); 
 ghostImg= loadImage("ghost-standing.png");  
climberImg= loadImage("climber.png"); 
 doorImg= loadImage("door.png");  
  
  
}

function setup(){
  createCanvas(600,600);
 tower= createSprite(300,300)
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup =new Group();
  invisibleblockGroup = new Group();
}

function draw(){
  background(0);
 
  if(gameState==="play"){
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x -3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x +3;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
    
   ghost.velocityY=ghost.velocityY+0.5; 
    
    spawnDoors();
if(tower.y>400){
  tower.y=300;
}
 
  
 if(climbersGroup.isTouching(ghost)) {
   ghost.velocityY=0;
 }
  if(invisibleblockGroup.isTouching(ghost)|| ghost.y>600){
    gameState="end";
    ghost.destroy();
  }
    drawSprites();
  }
  
  if(gameState==="end"){
    stroke("blue");
    strokeWeight(2);
    fill("yellow");
    textSize(32);
    text("Game Over",210,250);
  }


}

function spawnDoors() {

  if (frameCount % 200 === 0) {
    
  door = createSprite(200,-50);
  door.x=random(120,400); 
  door.addImg(doorImg);
  door.velocityY=1;
  door.lifetime=800;
  doorsGroup.add(door) ;
    
  climber = createSprite(200,10);
 climber.x=door.x; 
  climber.addImg(climberImg);
  climber.velocityY=1;
  climber.lifetime=800;
  climberGroup.add(climber) ;
    
  invisibleBlock = createSprite(200,15);
  invisibleBlock.x=door.x; 
  invisibleBlock.width=climber.width;
   invisibleBlock.height=2; 
  invisibleBlock.velocityY=1;
  invisibleBlock.lifetime=800;
  invisibleBlockGroup.add(invisibleBlock) ;
   
  ghost.depth=door.depth
    ghost.depth += 1;
  }
  
}

