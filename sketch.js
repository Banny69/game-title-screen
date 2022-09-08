//Game States
var PLAY=1;
var END=0;
var gameState=1;
var lives
var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;
var ScoreImage
var Heart
var bigMonster
var Gold
var lives
function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadImage("alien1.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  backgroundImg = loadImage("background.jpeg")

  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  CoinSound = loadSound("Coin.mp3")
  BoomSound = loadSound("Boom.mp3")
  HeartImg = loadImage("heart.png")
  MonsterImg = loadImage("BigMonster.png")
  GoldImg = loadImage("Gold.png")
  
}

  




function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.3
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  lives=4
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  heartGroup=createGroup();
  bigMonsterGroup=createGroup();
  goldGroup=createGroup();
  
  
  
     


}


function draw() {

  background(backgroundImg);



  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    Heart();
    BigMonster();
    Gold();
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
       monsterGroup.destroyEach();

        BoomSound.play();
        lives=lives-1
      }
      if(goldGroup.isTouching(knife)){
        goldGroup.destroyEach();

        knifeSwooshSound.play();
        score=score+50
      }
      if(heartGroup.isTouching(knife)){
        heartGroup.destroyEach();

        CoinSound.play();
        lives=lives+1
      }
      if(bigMonsterGroup.isTouching(knife)){
        bigMonsterGroup.destroyEach();

        BoomSound.play();
        lives=lives-2
      }
  
    }
    if (lives <= 0){
      gameState=END;
    
      gameOverSound.play()
      //goldGroup.destroyEach();
      //bigMonsterGroup.destroyEach();
      //heartGroup.destroyEach();
      // monsterGroup.destroyEach();
      //fruitGroup.destroyEach();

      fruitGroup.destroyEach();
      monsterGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      monsterGroup.setVelocityXEach(0);
      
      knife.addImage(gameOverImage);
      knife.scale=3;
      knife.x=725;
      knife.y=400;
    }
   
    console.log(lives)
  
  }

  drawSprites();
  //Display score
  textSize(40);
  button = createImg('Livess.png');
  button.position(975,25);
  button.size(75,75);

  button = createImg('Score.png');
  button.position(475,25);
  button.size(150,75);
  text(": "+ score,625,75);

  textSize(40);
  text(": "+ lives,1050,75);
  textSize(40)
  

}





function Monster(){
  if(World.frameCount%140===0){
    monster=createSprite(width,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(12+(score/10));
    monster.setLifetime=50;
    monster.scale=0.3
    monsterGroup.add(monster);
  }
}
function Gold(){
  if(World.frameCount%10000===0){
    gold=createSprite(width,200,20,20);
    gold.addImage(GoldImg);
    gold.y=Math.round(random(100,550));
    gold.velocityX=-(4+(score/10));
    gold.setLifetime=20;
    gold.scale=0.6
    goldGroup.add(gold);
  }
}
function BigMonster(){
  if(World.frameCount%500===0){
    bigMonster=createSprite(width,200,20,20);
    bigMonster.addImage(MonsterImg);
    bigMonster.y=Math.round(random(100,550));
    bigMonster.velocityX=-(8+(score/10));
    bigMonster.setLifetime=50;
    bigMonster.scale=0.35
    bigMonsterGroup.add(bigMonster);
  }
}
function Heart(){
  if(World.frameCount%320===0){
    heart=createSprite(400,200,20,20);
    heart.addImage(HeartImg);
    heart.y=Math.round(random(100,550));
    heart.velocityX=-(4+(score/10));
    heart.setLifetime=50;
    heart.scale=0.30
    heartGroup.add(heart);
  }
}
function fruits(){
  if(World.frameCount%50===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    //console.log(position)
    if(position==1)
    {
    fruit.x=width;
    fruit.velocityX=-(4+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (4+(score/4));
      }
 }
    
    fruit.scale=0.64;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}