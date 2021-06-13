var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed


function preload(){
sadDog = loadImage("Dog.png");
happyDog = loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed the dog");
  feed.position(680,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = hour();
  //write code to display text lastFed time here
  if(lastFed >= 12) { 
    //show time in PM format when lastFed is greater than 12 
    fill("black");
    text("Last Fed: " +lastFed+"PM", 400, 70);

  } else if(lastFed == 0) { 
    fill("black");
    text("Last Feed : 12 AM", 400, 70);

  } else if(lastFed <= 12) { 
    //show time in AM format when lastFed is less than 12 
    fill("black");
    text("Last Fed: " +lastFed+"AM", 400, 70);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  if(foodS>= 1) {
    foodS-=1;
    database.ref('/').update({
      Food:foodS
    })
  }
}

//function to add food in stock
function addFoods() {
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
