let board;
let boardWidth=360;
let boardHeight=640;
let context;

let birdWidth=34;
let birdHeight=24;
let birdX=boardWidth/8;
let birdY=boardHeight/2;
let birdImg;

let bird={
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
}

let pipeArray=[];
let pipeWidth=64;
let pipeHeight=512;
let pipeX=boardWidth;
let pipeY=0;

let topPipeImg;
let bottomPipeImg;

let velocityX=-2;
let velocityY=0;
let gravity=0.4;

let gameOver=false;
let gameStarted=false;
let score=0;
let highScore=localStorage.getItem("highScore") || 0;

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    birdImg=new Image();
    birdImg.src="./assets/flappybird.png";
    birdImg.onload=function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg=new Image();
    topPipeImg.src="./assets/toppipe.png"

    bottomPipeImg=new Image();
    bottomPipeImg.src="./assets/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 1500)
    document.addEventListener("keydown", moveBird);
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    if(!gameStarted){
        context.fillStyle="white";
        context.font="30px Arial";
        context.fillText("Press SPACE to Start", 40, 300);
        return;
    }
    
    velocityY+=gravity;
    bird.y=Math.max(bird.y+velocityY, 0);
    context.save();
    context.translate(
        bird.x+bird.width/2,
        bird.y+bird.height/2
    );
    let angle=velocityY*0.05;
    context.rotate(angle);
    context.drawImage(
        birdImg,
        -bird.width/2,
        -bird.height/2,
        bird.width,
        bird.height
    );
    context.restore();

    if(bird.y>board.height){
        gameOver=true;
    }

    for(let i=0; i<pipeArray.length; i++){
        let pipe=pipeArray[i];
        pipe.x+=velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x>pipe.x+pipe.width){
            score+=0.5;
            if(score > highScore){
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }
            pipe.passed=true;
        }

        if(detectCollision(bird, pipe)){
            gameOver=true;
        }
    }

    while(pipeArray.length>0 && pipeArray[0].x<-pipeWidth){
        pipeArray.shift();
    }

    context.fillStyle="white";
    context.font="20px Arial";
    context.fillText("Score: "+score, 10, 25);
    context.fillText("Best: "+highScore, 140, 25); 

    if(gameOver){
        context.font="28px Arial";
        context.textAlign="center";

        context.fillText("GAME OVER", board.width/2, board.height/2);
        context.fillText("Press SPACE to restart", board.width/2, board.height/2+40);

        context.textAlign="left";;
    }
}

function placePipes(){
    if(gameOver){
        return;
    }

    let randomPipeY=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2);
    let openingSpace=board.height/6;

    let topPipe={
        img:topPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArray.push(topPipe);

    let bottomPipe={
        img:bottomPipeImg,
        x:pipeX,
        y:randomPipeY+pipeHeight+openingSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e){
    gameStarted=true;
    if(e.code=="Space" || e.code=="ArrowUp"){
        velocityY=-6;

        if(gameOver){
            bird.x=birdX;
            bird.y=birdY;
            velocityY=0;
            pipeArray.length=0;
            score=0;
            gameOver=false;
        }
    }
}

function detectCollision(a, b){
    return a.x<b.x+b.width && a.x+a.width>b.x &&
           a.y<b.y+b.height && a.y+a.height>b.y ;
}