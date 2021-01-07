//Creating variables here
var dog,happyDog,database,foodS,foodStock,database,nameTag ;

function preload()
{
  happyDogImg = loadAnimation("images/dogImg1.png","images/dogImg2.png");
  dogImg = loadImage("images/dogImg.png");
  nameTag = loadImage("images/nameTag.png");
}

function setup() {
  createCanvas(800, 700);
  database= firebase.database();

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);
  
  dog = createSprite(400,270,50,50);
  dog.addImage("dog" ,dogImg);
  dog.addAnimation("happy dog",happyDogImg);
  dog.scale = 0.4;
  
}


function draw() {  

  background(46,139,87);
  image(nameTag,200,450,600,400) ;

  if(keyWentDown("space")&& foodS != 0){

    writeStock(foodS);
    dog.changeAnimation("happy dog",happyDogImg); 
    
    window.setTimeout(dogImage,900);
  }

  if(keyWentDown("r")){

    foodS = 20 ;
  }
  
  drawSprites();

  fill("black");
  textSize(20);
  text("INSTRUCTION: 1. Press space to feed milk ",200,20); 
  text("2.Press r to restart",350,40); 

  fill(rgb(100,20,20));
  textSize(25);
  text("Food Remaining:  " +foodS,230,100); 
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
     x=0 ;
  }
  else{
   x-=1 ;
  }

  database.ref('/').update({
    Food:x  
  })
}

function dogImage(){

  dog.changeImage("dog" ,dogImg);
}




