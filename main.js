/* THE CANVAS HAS 400x200(x,y) PIXELS... EACH PIXEL EQUALS TO 1.75px*/

/* DECLARATIONS */


var minutes = 0;
var seconds = 0;
var wave = 0;
var start = false;


/* GAME EVENTS begin */

window.onload = function(){ 
    // Called once at beggining
    
	/*;
    
    CreateEntity("enemy2", 100, 185);
    randomizeColor(enemy2,256,20,20);*/
    
}

var TickEvent = setInterval(function(){ 
    // Called every frame
	
    //collision();
},1);

function startGame(){
    
    playerIndex = CreateEntity("player", 192, 92);
    entity[playerIndex].object.style.backgroundColor = "blue";
    entity[playerIndex].object.style.zIndex = 1000;
    updateTime();
}


/* GAME EVENTS begin */

/* KEYBOARD PRESS begin */

window.addEventListener("keydown", function (e) {
    if (e.keyCode === 65){
        // Press "A" then move to the left
        leftDown();
    } else if(e.keyCode === 68 ){
        // Press "D" then move to the right
        rightDown();
    } else if(e.keyCode === 87){
        // Press "W" then jump
        upDown();
    }
});

function leftDown(){
    entity[playerIndex].isMoving = true;
    entity[playerIndex].direction = "left";
}
function leftUp(){
    if (entity[playerIndex].direction == "left"){
        entity[playerIndex].isMoving = false;
    }
    entity[playerIndex].acceleration = 0;
}
function rightDown(){
    entity[playerIndex].isMoving = true;
    entity[playerIndex].direction = "right";
}
function rightUp(){
    if (entity[playerIndex].direction == "right"){
            entity[playerIndex].isMoving = false;
        }
        entity[playerIndex].acceleration = 0;
}
function upDown(){
    if(entity[playerIndex].isJumping === false){
            // When player jump, send an negative gravityAcceleration making the gravity goes to the
            // oposite direction, when the acceleration return to > 0, the player falls.
            // The smallest is the gravityAcceleration, higher is the jump
            entity[playerIndex].isJumping = true;
            entity[playerIndex].gravityAcceleration = -1.3;
    }
}


window.addEventListener("keyup", function (e) {
    if (e.keyCode === 65){
        // Release "A" then stop move left
        leftUp();
        
   } else if(e.keyCode === 68){
        // Release "D" then stop move right
        rightUp();
   }
});

/* KEYBOARD PRESS end */

/* GAME FUNCTIONS begin */

function randomizeColor(entity, red, green, blue){
    let r,g,b;
    r = Math.floor(Math.random() * red);
    g = Math.floor(Math.random() * green);
    b = Math.floor(Math.random() * blue);
    
    entity.object.style.backgroundColor = "rgb("+r+","+g+","+b+")";
}

function collision(){
    for(i = 0; i < entitys.length; i ++){
        if (entitys[i].name != "player"){
            if ((entitys[i].posX-15 < entity[playerIndex].posX && entity[playerIndex].posX < entitys[i].posX+15) && (entitys[i].posY-15 < entity[playerIndex].posY && entity[playerIndex].posY < entitys[i].posY+15)){
                gameOver();
            }
        }
    }
}

function gameOver(){
    alert("Game over");
    
    for(i = 0; i < entitys.length; i ++){
        window[entitys[i].name] = null;
    }
}

function updateTimerLabel(){
	var timer = "";
	if((minutes < 10) && (seconds < 10)){
		timer = "0" + minutes + ":" + "0" + seconds;
	} 
	else if((minutes < 10) && (seconds >= 10)){
		timer = "0" + minutes + ":" + seconds;
	}
	else if((minutes >= 10) && (seconds < 10)){
		timer = minutes + ":" + "0" + seconds;
	}
    
    document.getElementById("timer").innerHTML = timer;
}

function clearTimer(){
	clearInterval(timerSec);
	minutes = 0;
	seconds = 0;
}

function updateTime(){
	var timerSec = setInterval(function(){
        updateWave();
		seconds++;
		if(seconds === 60){
			seconds = 0;
			minutes++;
		}
		updateTimerLabel();
	},1000);
}

function updateWave(){
	if(seconds % 10 === 0){
        wave++;
        if(wave<10){
            document.getElementById("wave").innerHTML = "0" + wave;
        }
        else{
            document.getElementById("wave").innerHTML = wave;
        }
        let x,y;
        
        x =  Math.floor(Math.random() * 400);
        y =  Math.floor(Math.random() * 200);
        
        //let name = "enemy" + entitys.length;
        //CreateEntity(name, x, y);
	}
}

