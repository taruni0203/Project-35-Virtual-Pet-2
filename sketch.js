//Create variables here
var fedTime, lastFed, feedButton, fillButton, foodObj, foodS;

function preload(){

  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(700, 500);
  
  dog = createSprite(450,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  ground = createSprite(width/2,490,width,20);
  ground.visible = false;

  foodObj = new Food();

  feedButton = createButton("Feed dog");
  feedButton.position(800,100);
  
  fillButton = createButton("Refill food");
  fillButton.position(900,100);

  feedButton.mousePressed(feedDog);
  fillButton.mousePressed(addFood);
  

}


function draw() {  
  background(46,139,87);

  foodObj.display();
  foodObj.getFoodStock();
  fedTime = database.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  textSize(20);
  fill(255);
  if(lastFed > 12){
    text("Last Fed: " + lastFed%12 + " PM", 90,70);
  }else if (lastFed === 0){
    text("Last Fed: 12 AM", 90,70);
  }else{
    text("Last Fed: " + lastFed + " PM", 90,70);
  }
  

  
  dog.velocityY = dog.velocityY + 8;
  dog.collide(ground);



  drawSprites();
}

function addFood(){
  dog.addImage(dogImg);
  foodObj.updateFoodStock();
  
}

function feedDog(){
  dog.addImage(happyDogImg);
  dog.velocityY = -15;
  foodObj.deductFood();

  database.ref('/').update({
    feedTime:hour()
  })

}

