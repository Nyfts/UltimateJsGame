/* THE CANVAS HAS 400x200(x,y) PIXELS... EACH PIXEL EQUALS TO 1.75px*/
var i = 0;
function invert(){
    document.getElementById("body").style.filter = "invert(100%)";
    document.getElementById("body").style.backgroundColor = "black";
}

var mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

/* DECLARATIONS */
var player;
var start = false;

/* GAME EVENTS begin */

window.onload = function() {
  // Called once at beggining
  if (!mobileAndTabletcheck()){
    document.getElementById("keyboard").style.opacity = 0;
  }
};

var TickEvent = setInterval(function() {
  // Called every frame
  collision();
}, 10);

function startGame() {
  player = entity[CreateEntity("player", 192, 92)];
  player.gravity = true;
  player.object.style.backgroundColor = "blue";
  player.object.style.zIndex = 1000;
  player.object.style.opacity = "1";
  startScore();
}

/* GAME EVENTS begin */

/* KEYBOARD PRESS begin */

window.addEventListener("keydown", function(e) {
  if (e.keyCode === 65) {
    // Press "A" then move to the left
    leftDown();
  } else if (e.keyCode === 68) {
    // Press "D" then move to the right
    rightDown();
  } else if (e.keyCode === 87) {
    // Press "W" then jump
    upDown();
  }
});

window.addEventListener("keyup", function(e) {
  if (e.keyCode === 65) {
    // Release "A" then stop move left
    leftUp();
  } else if (e.keyCode === 68) {
    // Release "D" then stop move right
    rightUp();
  }
});

function leftDown() {
  player.isMoving = true;
  player.direction = "left";
}
function leftUp() {
  if (player.direction == "left") {
    player.isMoving = false;
  }
  player.acceleration = 0;
}
function rightDown() {
  player.isMoving = true;
  player.direction = "right";
}
function rightUp() {
  if (player.direction == "right") {
    player.isMoving = false;
  }
  player.acceleration = 0;
}
function upDown() {
  if (player.isJumping === false) {
    // When player jump, send an negative gravityAcceleration making the gravity goes to the
    // oposite direction, when the acceleration return to > 0, the player falls.
    // The smallest is the gravityAcceleration, higher is the jump
    player.isJumping = true;
    player.gravityAcceleration = player.gravityForce * (-1);
  }
}

/* KEYBOARD PRESS end */

/* GAME FUNCTIONS begin */

function randomizeColor(entity, red, green, blue) {
  let r, g, b;
  r = Math.floor(Math.random() * red);
  g = Math.floor(Math.random() * green);
  b = Math.floor(Math.random() * blue);

  entity.object.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function collision() {
  for (i = 0; i < entity.length; i++) {
    if (entity[i] != null){
      if (entity[i].name != "player") {
        if (
          entity[i].posX - 15 < player.posX && player.posX < entity[i].posX + 15 &&
          entity[i].posY - 15 < player.posY && player.posY < entity[i].posY + 15
        ) {
          if (entity[i].collision){
            if(entity[i].name.substring(0, 5) == "enemy"){
              gameOver();
            } else{
              powerUp(i);
            }
          }
        }
      }
    }
  }
}

var bgcolor = "lightgrey"

function powerUp(i){
  if (typeof entity[i].object === "object" && entity[j] !== null){
    canvas.removeChild(entity[i].object);
    entity[i] = null;
  }

  let lucky = Math.floor(Math.random() * 3);
  // let lucky = 1;

  if (lucky === 0){ // kill one enemy
    var j = 0;
    let deleted = true;
    for (j = 0; j < entity.length; j++){
      if (typeof entity[j] === "object" && entity[j] !== null){
        if (entity[j].name.substring(0, 5) == "enemy"){
          canvas.removeChild(entity[j].object);
          entity[j] = null;
          console.log("quebro");
          break;
        }
      }
    }
    canvas.style.backgroundColor = "darkred";
    setTimeout(() => {
      canvas.style.backgroundColor = bgcolor;
    },100)
  } else if (lucky === 1){ // slow every thing
    console.log("devagarou");
    for (j = 0; j < entity.length; j++){
      if (typeof entity[j] === "object" && entity[j] !== null){
        entity[j].increX = entity[j].increX / 2
        entity[j].increY = entity[j].increY / 2
        entity[j].affected = true;
      }
    }
    canvas.style.backgroundColor = "lightblue";
    bgcolor = "lightblue"
    setTimeout(() => {
      for (j = 0; j < entity.length; j++){
        if (typeof entity[j] === "object" && entity[j] !== null && entity[j].affected && entity[i].name.substring(0, 5) === "enemy"){
          entity[j].increX = entity[j].increX * 2
          entity[j].increY = entity[j].increY * 2
        }
        canvas.style.backgroundColor = "lightgrey";
        bgcolor = "lightgrey"
      }
    },10000)
  } else if (lucky === 2) { // increase player speed
    player.speed = 3;
    player.gravityForce = 3;
    console.log("rapidou");
    canvas.style.backgroundColor = "lightyellow";
    bgcolor = "lightyellow"
    setTimeout(() => {
      player.speed = 1.5;
      player.gravityForce = 1.5;
      canvas.style.backgroundColor = "lightgrey";
      bgcolor = "lightgrey";
    },5000);
  }
}

function gameOver() {

  for (i = 0; i < entity.length; i++) {
    if (typeof entity[i] === "object" && entity[i] !== null){
      canvas.removeChild(entity[i].object);
    }
  }

  entity = [];
  canvas.innerHTML = '<button onClick="startGame(); document.getElementById(\'start-btn\').remove();" id="start-btn">Start</button>';
  clearInterval(timerSec);
}

var score = 0;
function startScore() {
  score = 0;
  document.getElementById("score").innerHTML = "00";
  window.timerSec = setInterval(function() {
    score++;

    if (score < 10) {
      document.getElementById("score").innerHTML = "0" + score;
    } else{
      document.getElementById("score").innerHTML = score;
    }
    
    if (score === 1 || score % 10 === 0){
      let lucky = Math.floor(Math.random() * 10) + 1;
      if (lucky <= 7){
        spawnEnemy("enemy");
      } else{
        spawnEnemy("powerUp");
      }
      
    }
  }, 1000);
}


function spawnEnemy(type){
  let x, y;

  x = Math.floor(Math.random() * 385);
  y = Math.floor(Math.random() * 185);

  let name = type + entity.length;
  let obj = entity[CreateEntity(name, x, y)];
  
   let _this = obj;
  _this.increX = Math.random() * 3;
  _this.increY = Math.random() * 3;

  if (type === "enemy"){
    randomizeColor(obj,256,20,20);
  } else{
    obj.object.style.backgroundColor = "lightgreen";
    _this.increX = Math.random() + 0.001;
    _this.increY = Math.random() * 2;
  }
  

 

  _this.update = setInterval(() => {
    
    _this.posX += _this.increX;
    _this.posY += _this.increY;
    UpdateMovement(_this.object, _this.posX, _this.posY);

    if (_this.posY >= 185){
      _this.increY = _this.increY * (-1);
    }
    if (_this.posY <= 0){
      _this.increY = _this.increY * (-1);
    }
    if (_this.posX >= 385){
      _this.increX = _this.increX * (-1);
    }
    if (_this.posX <= 0){
      _this.increX = _this.increX * (-1);
    }
  },10);

  setTimeout(function(){
    _this.object.style.opacity = "1";
  }, 100);
  setTimeout(function(){
    _this.collision = true;
  }, 2000);
  
}

