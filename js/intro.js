"use strict"

var stage;
var queue;
var level = 1;
var scoreToNextLevel = 20;
var gameStarted = false;
var lives = 3;
var score = 0;
var stones = [];
var enemies = [];
var superTimer=0;
var bullets=[];
var bulletDistance =55;
var radianConstant = Math.PI/180;
var hero;
var keys = {
    rkd: false,
    lkd: false,
    ukd: false,
    dkd: false


};
var scoreText;
var levelText;
var livesText;
var weaponText;


//ranking


function dataSaved(e){
    //var copy = nodeToBeCloned.clone.Node(true);
    console.log(e,"dat is prop saved");
    
}
function getStarted() {
	
//	 var form=document.querySelector("#scoreForm");
//		var nameElement=document.querySelector('input[name=name]');
//		    form.addEventListener('submit', function(e){
//		    e.preventDefault();
//		    Ajax.post("saveScore.php",
//		              {name: nameElement.value, score: score},
//		             dataSaved
//		             );
//		})
//		// Get the last <li> element ("Milk") of <ul> with id="myList2"
//var itm = document.getElementById("myList2").lastChild;
//
//// Copy the <li> element and its child nodes
//var cln = itm.cloneNode(true);
//
//// Append the cloned <li> element to <ul> with id="myList1"
//document.getElementById("myList1").appendChild(cln);
	
    stage = new createjs.Stage(flower);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tock);
    window.addEventListener('keydown', fingerDown);
    window.addEventListener('keyup', fingerUp);
    window.onkeyup=fingerUp;
    window.onkeydown=fingerDown;

    var hero1 = {

        images: ["img/hero.png"],
        frames: [
            // x, y, width, height, imageIndex*, regX*, regY*
            [0, 0, 86, 89],
            [106, 0, 86, 89],
        ],
        animations: {
            moving: 1,
            notMoving:0
        }
    }
    var ss = new createjs.SpriteSheet(hero1,  true);
    hero = new createjs.Sprite(ss,'notMoving');
    hero.width = 86;
    hero.height = 89;
    hero.speed = 5;

    hero.x = stage.canvas.width / 2;
    hero.y = stage.canvas.height - hero.height;
    stage.addChild(hero);

    addEnemies();

    //display score
    scoreText = new createjs.Text("Score: " + score, "20px Courier", "#FFF");
    stage.addChild(scoreText);

    // display level
    levelText = new createjs.Text("Level: " + level, "20px Courier", "#FFF");
    stage.addChild(levelText);
    levelText.x = 120;

    // display lives
    livesText = new createjs.Text("Lives: " + lives, "20px Courier", "#FFF");
    stage.addChild(livesText);
    livesText.x = 230;

    //display weapon
    weaponText = new createjs.Text("Weapon "+ superTimer, "20px Courier", "#FFF");
    stage.addChild(weaponText);
    weaponText.x=340;

    //start game
    var splash = new createjs.Bitmap("img/bg1.png");
    splash.addEventListener('click', function (e) {
            console.log(e);
            stage.removeChild(e.target);
            gameStarted = true;
        }
    );
    stage.addChild(splash);
}

function moveHero() {
    if (keys.rkd) {
        hero.x += hero.speed;
    }
    if (keys.lkd) {
        hero.x -= hero.speed;
    }
    if (keys.ukd) {
        hero.y -= hero.speed;
    }
    if (keys.dkd) {
        hero.y += hero.speed;
    }

    if (hero.x > stage.canvas.width - hero.width) {
        hero.x = stage.canvas.width - hero.width;
    }
    if (hero.x < 0) {
        hero.x = 0;
    }
    if (hero.y > stage.canvas.height - hero.height) {
        hero.y = stage.canvas.height - hero.height;
    }
    if (hero.y < 0) {
        hero.y = 0;
    }
}
function fingerUp(e) {

    if (e.keyCode === 32) {
        fire();
    }
    if (e.keyCode === 37) {
        keys.lkd = false;
    }
    if (e.keyCode === 38) {
        keys.ukd = false;
    }
    if (e.keyCode === 39) {
        keys.rkd = false;
    }
    if (e.keyCode === 40) {
        keys.dkd = false;
    }
    if (!(keys.dkd || keys.lkd || keys.ukd || keys.rkd)){
        hero.gotoAndStop("notMoving");
    }
}
function fingerDown(e) {
    hero.gotoAndStop("moving");
    if (e.keyCode === 37) {
        keys.lkd = true;
    }
    if (e.keyCode === 38) {
        keys.ukd = true;
    }
    if (e.keyCode === 39) {
        keys.rkd = true;
    }
    if (e.keyCode === 40) {
        keys.dkd = true;
    }
}


function addEnemies() {
    var rand = Math.floor(Math.random() * 100);
    var chance = level * scoreToNextLevel;
    if (rand < 2) {
        var gar = ['gar_1.png', 'gar_2.png', 'gar_3.png', 'gar_4.png', 'gar_5.png', 'gar_6.png', 'gar_7.png'];
        var p = new createjs.Bitmap('img/' + gar[Math.floor(Math.random() * gar.length)]);
        p.width = 50;
        p.height = 50;
        p.y = -100;
        p.x = Math.floor(Math.random() * stage.canvas.width);

        stage.addChild(p);
        // p.addEventListener(hitTest, removeEnemies);
        enemies.push(p);
        var goAgain = true;
        while (goAgain) {
            goAgain = false;
            for (var i = 0; i < stones.length; i++) {
                if (stones[i].y < 0 && hitTest(p, stones[i])) {
                    p.x = Math.floor(Math.random() * stage.canvas.width);
                    goAgain = true;
                    console.log("trying new position");
                    break;
                }
            }
        }
    }
    if (level > 1 && rand < 1) {
        var st = ["stone_1.png", 'stone_2.png', 'stone_3.png'];
        var p = new createjs.Bitmap('img/' + st[Math.floor(Math.random() * st.length)]);
        p.width = 50;
        p.height = 50;
        p.y = -100;
        p.x = Math.floor(Math.random() * stage.canvas.width);

        stage.addChild(p);
        stones.push(p);
        //different places
        var goAgain = true;
        while (goAgain) {
            goAgain = false;
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].y < 0 && hitTest(p, enemies[i])) {
                    p.x = Math.floor(Math.random() * stage.canvas.width);
                    goAgain = true;
                    console.log("trying new position");
                    break;
                }
            }
        }


    }
}

function hitEnemies() {
    var e;
    var b;
    for(e=0;e<enemies.length;e++){
        for(b=0;b<bullets.length;b++){
            if(Math.abs(enemies[e].x+25 - bullets[b].x) < 10 && Math.abs(enemies[e].y+25 - bullets[b].y) < 20){

                //Delete bullet
                stage.removeChild(bullets[b]);
                bullets.splice(b,1);

                //Delete enemy
                stage.removeChild(enemies[e]);
                enemies.splice(e,1);

                //Add  score
                score += 1;
                scoreText.text = "Score: " + score;
            }
        }
    }


}
//weapon
function fire() {
if(superTimer < 1){
    console.log("Super was fired!");
    superTimer = 1800;//miliseconds


    //Create a bunch of bullets at random locations
    var n=0;
    for(n=0;n<100;n++){
        var b = bullets.length;

        bullets[b] = new createjs.Shape();
        bullets[b].graphics.beginFill("red");
        bullets[b].graphics.drawRect(0,0,5,5);

        //Position the bullet
        var tempAngle;
        tempAngle = (Math.floor(Math.random()*360))*radianConstant;

        bullets[b].x = hero.x+40 + bulletDistance * Math.cos(tempAngle);
        bullets[b].y = hero.y+40 + bulletDistance * Math.sin(tempAngle);
        bullets[b].origin_x=hero.x+40;
        bullets[b].origin_y=hero.y+40;
        bullets[b].bulletAngle = tempAngle;
        bullets[b].bulletDistance = bulletDistance;
        stage.addChild(bullets[b]);
    }
    //sound
}
}
//bullets
function moveBullets()
{
    var i = 0;
    for (i = 0; i < bullets.length; i++) {
        bullets[i].bulletDistance += 2;
        bullets[i].x = bullets[i].origin_x + bullets[i].bulletDistance * Math.cos(bullets[i].bulletAngle);
        bullets[i].y = bullets[i].origin_y + bullets[i].bulletDistance * Math.sin(bullets[i].bulletAngle);
        //bullets[i].y = -bullets[i].y;

        //Slower, works "squarely"
        if (bullets[i].x > 970 || bullets[i].x < 15 || bullets[i].y > 550 || bullets[i].y < 15) {
            stage.removeChild(bullets[i]);
            bullets.splice(i, 1);
        }
    }

}

function removeEnemies(e) {
    scoreUp();
    stage.removeChild(e.target);
    var index = enemies.indexOf(e.target);
    enemies.splice(index, 1);

}


function hitTest(rect1, rect2) {
    return !(rect1.x >= rect2.x + rect2.width
    || rect1.x + rect1.width <= rect2.x
    || rect1.y >= rect2.y + rect2.height
    || rect1.y + rect1.height <= rect2.y);
}

function levelDown() {
    lives--;
    console.log("You just lost a life and have " + lives);
    if (lives === 0) {
        showScoreBoard();
        console.log("You are dead");
    }
    livesText.text = "Lives: " + lives;
}

function showScoreBoard() {
	var deadScreen = new createjs.Bitmap("img/bg1.png");
    stage.addChild(deadScreen);
	 var form=document.querySelector("#scoreForm");
		var nameElement=document.querySelector('input[name=name]');
		    form.addEventListener('submit', function(e){
		    e.preventDefault();
		    Ajax.post("saveScore.php",
		              {name: nameElement.value, score: score},
		             dataSaved
		             );
		})
		// Get the last <li> element ("Milk") of <ul> with id="myList2"
		var itm = document.getElementById("scoreForm").lastChild;
		
		//Copy the <li> element and its child nodes
		var cln = itm.cloneNode(true);
		
		//Append the cloned <li> element to <ul> with id="myList1"
		document.getElementById("myList1").appendChild(cln);
}
function checkCollisions() {
    var e;
    var eLength = enemies.length - 1;
    for (e = eLength; e >= 0; e--) {
        if (hitTest(enemies[e], hero)) {
            stage.removeChild(enemies[e]);
            enemies.splice(e, 1);
            scoreUp();
            if (enemies.length === 0) {
                level++;
                addEnemies();
            }
            break;
        }
    }
    eLength = stones.length - 1;
    for (e = eLength; e >= 0; e--) {
        if (hitTest(stones[e], hero)) {
            stage.removeChild(stones[e]);
            stones.splice(e, 1);
            levelDown();
            if (stones.length === 0) {
                addEnemies();
            }
            break;
        }
    }
}
function moveEnemies() {
    var i;
    var numEnemies = enemies.length;
    for (i = numEnemies - 1; i >= 0; i--) {
        enemies[i].y++;
        if (enemies[i].y > stage.canvas.height + 30) {
            levelDown();
            stage.removeChild(enemies[i]);
            enemies.splice(i, 1);
        }
    }
    numEnemies = stones.length;
    for (i = numEnemies - 1; i >= 0; i--) {
        stones[i].y++;
        if (stones[i].y > stage.canvas.height + 30) {
            stage.removeChild(stones[i]);
            stones.splice(i, 1);
        }
    }
}


function scoreUp() {
    score++;
    console.log("Score: " + score);
    if (score >= level * scoreToNextLevel) {
        level++;
        console.log("Level: " + level)
    }
    scoreText.text = "Score: " + score;
    levelText.text = "Level: " + level;


}

function tock(e) {
    if (gameStarted && lives > 0) {
        addEnemies();
        moveEnemies();
        moveHero();
        checkCollisions();
        moveBullets();
        hitEnemies();
        superTimer--;
        weaponText.text="Waepon Timer: " + Math.round(superTimer/60);
        if(superTimer<0){superTimer=0}
    }
    ;
   
    stage.update(e);
   
}
