var helicopterIMG, helicopterSprite;
var packageSprite, packageIMG;

var packageBody, ground;

//the objects stored in their constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	//loads the images
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
}

function setup() {
	createCanvas(1500, 700);
	rectMode(CENTER);//makes the rectangle with respect to its center and not its top left corner

	//creates the ground sprite
	groundSprite = createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor = color(255);

	//creates the package sprite
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	//creates the helicopter sprite
	helicopterSprite = createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;

	engine = Engine.create();//creates the engine and stores it in engine variable
	world = engine.world;//stores the world created into the world variable

	//makes the package object and adds it to the physics engine via physics engine's world
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	
	//makes the ground object and adds it to the physics engine via physics engine's world
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	Engine.run(engine);//updates the physics engine continuously
}


function draw() {
  	background(0, 0, 0);//clears the background

	rectMode(CENTER);
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;

	if(keyDown(DOWN_ARROW)) {
		//makes the packet fall when down arrow is pressed
		Body.setStatic(packageBody, false);
	}

	if(packageSprite.isTouching(groundSprite)) {
		//displays the following text after the mission has been completed
		displayText("Congratulations! Mission complete.", "green", 600, height/2);
	} 
	else {
		//displays this message initially
		displayText("PRESS DOWN_ARROW TO DROP THE PACKAGE.", "green", 500, height/2);
	}

	drawSprites();//draws the sprites
}