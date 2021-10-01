rightWristX = "";
rightWristY = "";
control1 = "rwrist";
function preload() {
	world_start = loadSound("world_start.wav");
	mario_jump = loadSound("jump.wav");
	mario_coin = loadSound("coin.wav");
	gameover = loadSound("gameover.wav");
	mario_die = loadSound("mariodie.wav");
	mario_kick = loadSound("kick.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240, 336);
	canvas.parent('canvas');
	instializeInSetup(mario);

	video = createCapture(VIDEO);
	video.size(800, 400);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

}
function modelLoaded(){
	console.log("Model Loaded!1!!11");
}

function draw() {
	game()
	push();
  	translate(width,0);
  	scale(-1, 1);
  	image(video, 0, 0, 200, 150);
  	pop();
}
function gotPoses(results){
	if(results.length > 0){
		console.log(results);
		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("Right Wrist X = " + rightWristX + ", Right Wrist Y = " + rightWristY);
	}
}
function controlSwitch(){
	if(control1 == "rwrist"){
		control1 = "arrow";
		document.getElementById("control").innerHTML = "Control by: Arrow Keys";
		console.log(control1);
	} else if(control1 == "arrow") {
		control1 = "rwrist";
		document.getElementById("control").innerHTML = "Control by: Right Wrist";
		console.log(control1);
	}
}