var bgImage;

var balloon;
var balloonImage;

var database; 

var position;

function preload()
{

  bgImage = loadImage("pro-C35 images/Hot Air Ballon-01.png");
  
  balloonImage = loadAnimation("pro-C35 images/Hot Air Ballon-02.png", "pro-C35 images/Hot Air Ballon-03.png", "pro-C35 images/Hot Air Ballon-04.png");
  b2 = loadAnimation("pro-C35 images/Hot Air Ballon-02.png")
}

function setup() 
{
  
  createCanvas(500,500);

  database = firebase.database();
  
  balloon = createSprite(50, 400, 50, 50);
  balloon.addAnimation("running", b2);
  balloon.scale = 0.25;

  var balloonPosition = database.ref('Balloon/Position');
  balloonPosition.on("value", readPosition, showError);

}

function draw() 
{
  
  background(bgImage); 
  
  textSize(20);
  fill("blue");
  stroke("black");
  text("Use arrow keys to move Hot Air Ballon!", 50, 50);

  if(keyDown("up"))
  {

    balloon.y = balloon.y - 20;

    balloon.addAnimation("running", balloonImage);
    balloon.scale = balloon.scale - 0.01;

    changePosition(0, -20);

  }
  if(keyDown("down"))
  {

    balloon.y = balloon.y + 20;

    changePosition(0, 20);

    balloon.addAnimation("running", balloonImage);
    balloon.scale = balloon.scale + 0.01;

  }
  if(keyDown("left"))
  {

    balloon.x = balloon.x - 20;

    balloon.addAnimation("running", balloonImage);
    changePosition(-20, 0);

  }
  if(keyDown("right"))
  {

    balloon.x = balloon.x + 20;

    balloon.addAnimation("running", balloonImage);
    changePosition(20, 0);

  }

  drawSprites();

}

function changePosition(x,y)
{
    
    database.ref('Balloon/Position').set(
        {

            'x': position.x + x,
            'y': position.y + y

        }
    );

}

function readPosition(data)
{

  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function showError()
{

  console.error("This is an error")

}