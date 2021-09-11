var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieIMG, bulletIMG;
var oneHeart, twoHearts, threeHearts;
var one , two, three;
var zombieGroup;
var bulletGroup;
var gameOver;
var gameOverIMG;
var score;




function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieIMG = loadImage("assets/zombie.png");

  bulletIMG =  loadImage("assets/download.jpg");

  oneHeart = loadImage("assets/heart_1.png");

  twoHearts = loadImage("assets/heart_2.png");
  
  threeHearts = loadImage("assets/heart_3.png");

  gameOverIMG = loadImage("assets/gameover.jpg");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,500,500)

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",oneHeart)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",twoHearts)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.visible = true;
    heart3.addImage("heart3",threeHearts)
    heart3.scale = 0.4

    zombieGroup = new Group();
    
    bulletGroup = new Group();



    gameOver = createSprite(displayWidth/2, displayHeight/2,20,20);

    gameOver.addImage(gameOverIMG);
    gameOver.visible = false;

    score = 0

    

    

}

function draw() {
  background(0);  
  text("Score: " + score,100,40);



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting);
  spawnBullets();

 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


if(zombieGroup.isTouching(player)&& heart3.visible === true){
  heart3.visible = false;
  heart2.visible = true;
  zombieGroup.destroyEach();

}




if(zombieGroup.isTouching(player)&& heart2.visible === true){
  heart2.visible = false;
  heart1.visible = true;
  zombieGroup.destroyEach();


}



if(zombieGroup.isTouching(player)&& heart1.visible === true){
  heart1.visible = false;
  zombieGroup.destroyEach();
  bg.visible = false;
  background("black");
  player.visible = false;
  gameOver.visible = true;
  zombieGroup.setVelocityXEach(0);  //<----------------------------------//

}
  for(var i=0;i<zombieGroup.length;i++){     
      
    if(zombieGroup[i].isTouching(bulletGroup)){
         zombieGroup[i].destroy()
         score = score +1
         } 
   }

  spawnzombies();

  
  drawSprites();

}

function spawnzombies(){
  if(frameCount % 120 === 0){
    var rand=Math.round(random(0,windowHeight));
    var zombie = createSprite(windowHeight+450,rand,20,20);
    zombie.addImage(zombieIMG);
    zombie.scale = 0.16;
    zombie.velocityX = -(score/1.5 + 3.5);
    zombie.lifetime = 300;
    zombie.setCollider("rectangle",0,0,400,400);
    zombieGroup.add(zombie);



    
  }


}

function spawnBullets(){
  var bullet =  createSprite(player.x+53,player.y-22,5,5);
  bullet.addImage(bulletIMG);
  bullet.scale = 0.05;
  bullet.velocityX = 4;
  bullet.lifetime = 280;

  bulletGroup.add(bullet);

}