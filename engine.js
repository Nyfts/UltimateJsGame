/* CLASSES begin */

class Entity {
  constructor(objectId) {
    this.name = "";
    this.object = document.getElementById(objectId);
    this.posX = 0; //0..400
    this.posY = 0; //0..200
    this.isMoving = false;
    this.isFalling = false;
    this.isJumping = false;
    this.direction = "right";
    
    "use strict";
    let _this = this;
    let i = 1;
    this.update = setInterval(function() {
      //console.log("a");
      UpdateMovement(_this.object, _this.posX, _this.posY);

      // Gravity
      if (_this.gravity === true) {
        // Gravity uses the gravityAcceleration, that begins at zero and are constantly incremented every frame,
        // making the acceleration effect.

        if (_this.posY < 184 || _this.isJumping) {
          // Gravity will act only when the player jump or is falling
          this.isFalling = true;
          _this.posY += _this.gravityAcceleration;
          _this.gravityAcceleration += _this.gravityForce / 100;
        }
        if (_this.posY > 184) {
          _this.gravityAcceleration = 0;
          _this.isFalling = false;
          _this.isJumping = false;
        }
      }

      // Player Movement
      if (_this.isMoving === true) {
        if (_this.direction === "right") {
          if (_this.posX < 384) {
            _this.posX += _this.acceleration;
          }
        } else {
          if (_this.posX > 0) {
            _this.posX -= _this.acceleration;
          }
        }
        if (_this.acceleration < _this.speed) {
          _this.acceleration += _this.speed / 100;
        }
      }
    }, 1);

    // Gravity
    this.gravity = false;
    this.gravityForce = 1.5;
    this.gravityAcceleration = 0;

    // Movement
    this.acceleration = 0;
    this.speed = 1.5;
  }
}
/* CLASSES end */

/* GLOBAL FUNCTIONS begin */

function UpdateMovement(object, x, y) {
  // Function to set an object position in the canvas
  if (typeof object === "object" && object != null) {
    object.style.top = y * 1.75 + "px";
    object.style.left = x * 1.75 + "px";
  }
}

function CreateEntity(object, x, y) {
  let div = document.createElement("div");
  div.setAttribute("id", object);
  div.setAttribute("class", "entity");

  canvas.appendChild(div);

  let i = entity.length;
  entity[i] = new Entity();
  entity[i].name = object;
  entity[i].object = document.getElementById(object);
  entity[i].object.style.opacity = 0;
  entity[i].object.style.transition = "opacity 2s";
  entity[i].posX = x;
  entity[i].posY = y;
  return i;
}

/* GLOBAL FUNCTIONS end */

/* VARIABLES begin */

var entity = []; // Contains every entity in the game
var canvas = document.getElementById("canvas");