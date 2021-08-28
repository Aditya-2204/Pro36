var dog, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var feed, addFood
var foodObj

function preload()
{
  dog = loadImage('dogImg.png');
  happyDog = laodImage('dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dogSprite = createSprite(250, 250);
  dogSprite.addAnimation(dog)

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed =createButton("feed Dog");
  feed.poition(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  var food1 = new Food();
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function draw() {

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255, 255, 254);

  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 +"PM",350,30);
  }else if(lastFed==0){
      text("Last Feed : 12 AM", 350,30);
    }else{
      text("Last Feed : "+ lastFed + "AM",350,30);
    }

  background(46, 139, 87);

  text("Note Press Up arrow key to feed the dog milk", 250, 90);
  textSize(16);
  fill("green");
  stroke(3);

  drawSprites();
  //add styles here
  food1.display();
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').upate({
    Food:foodObj.getFoodstock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}