var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
//vẽ nền bắt đầu
context.beginPath();
let img = document.createElement("img");
img.src = "background.png";
context.drawImage(img, 0, 0, 1000, 500);
context.closePath();

var bong = {
    x: 20,
    y: 470,
    dx: 4,
    dy: 3,
    radius: 7
};
//thanh chắn bóng
var rect1 = {
    width: 170,
    height: 15,
    x: 0,
    y: canvas.height - 15,
    speed: 5,
    isMoveleft: false,
    isMoveright: false
};

var gach = {
    offsetx: 50,
    offsety: 40,
    MarginWidth: 4,
    MarginHeight: 7,
    width: 70,
    height: 15,
    totalrow: 7,
    totalcol: 12,
};

var Dsgach = [];
for (let i = 0; i < gach.totalrow; i++) {
    for (let j = 0; j < gach.totalcol; j++) {
        Dsgach.push({
            x: gach.offsetx + j * (gach.width + gach.MarginWidth),
            y: gach.offsety + i * (gach.height + gach.MarginHeight),
            ttgach: false,
        });
    }
}

//check game và tính điểm
var gameover = false;
var gamewin= false;
var score=0;
var maxscore = gach.totalrow*gach.totalcol;
//vẽ bóng
function drawball() {
    context.beginPath();
    let img = document.createElement("img");
    img.src ="bong.png";
    context.drawImage(img,bong.x, bong.y, bong.radius*2, bong.radius*2);
    context.closePath();
}
//bắt sự kiện điều khiển thanh chắn
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
        rect1.isMoveleft = false;
    }
    if (event.keyCode == 39) {
        rect1.isMoveright = false;
    }
});
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
        rect1.isMoveleft = true;
    }
    if (event.keyCode == 39) {
        rect1.isMoveright = true;
    }

});
//vẽ nền game
function drawbackground() {
    context.beginPath();
    let img = document.createElement("img");
    img.src = "background.png";
    context.drawImage(img, 0, 0, 1000, 500);
    context.closePath();
}
//vẽ thanh chắn
function drawrect1() {
    context.beginPath();
    let img = document.createElement("img");
    img.src ="thanh chan.png";
    context.drawImage(img,rect1.x, rect1.y, rect1.width, rect1.height);
    context.closePath();
}
//vẽ gạch
function drawrect2() {
    Dsgach.forEach(function (b) {
        if (!b.ttgach) {
            context.beginPath();
            let img = document.createElement("img");
            img.src = "Untitled-1.png";
            context.drawImage(img, b.x, b.y, gach.width, gach.height,);
            context.closePath();
        }
    });
}
//logic bóng va chạm thành
function vacham() {
    if (bong.x < bong.radius*2 || bong.x > canvas.width - bong.radius*2) {
        bong.dx = -bong.dx;
    }
    if (bong.y < bong.radius*2) {
        bong.dy = -bong.dy;
    }
}
//bóng va chạm thanh chắn
function vacham2() {
    if (bong.x + bong.radius*2 >= rect1.x && bong.x + bong.radius*2 <= rect1.x + rect1.width &&
        bong.y + bong.radius*2 >= canvas.height - rect1.height) {
        bong.dy = -bong.dy;
    }
}
//bóng va chạm gạch
function vachamgach() {
    Dsgach.forEach(function (b) {
        if (!b.ttgach) {
            if (bong.x >= b.x && bong.x <= b.x + gach.width &&
                bong.y + bong.radius*2 >= b.y && bong.y - bong.radius*2 <= b.y + gach.height) {
                bong.dy = -bong.dy;
                b.ttgach = true;
                score += 1;
                if (score>=maxscore){
                gamewin=true;
                gameover=true;
                }
            }

        }
    });
}


//di chuyển của thanh chắn
function dichuyenrect1() {
    if (rect1.isMoveleft) {
        rect1.x -= rect1.speed;

    } else if (rect1.isMoveright) {
        rect1.x += rect1.speed;
    }
    if (rect1.x < 0) {
        rect1.x = 0;
    } else if (rect1.x > canvas.width - rect1.width) {
        rect1.x = canvas.width - rect1.width;
    }
}
//di chuyển quả bóng
function dichuyen() {
    bong.x += bong.dx;
    bong.y += bong.dy;
}
//kiểm tra trạng thái game
function checkgameover() {
    if (bong.y > canvas.height - bong.radius) {
        gameover = true;
    }
}
//kiểm tra và vẽ màn hình game win hoặc lose
function handleGameOver() {
    if (gamewin){
        context.beginPath();
        let img = document.createElement("img");
        img.src = "background2.png";
        context.drawImage(img, 0, 0, 1000, 500);
        context.closePath();
    } else if (gameover){
        context.beginPath();
        let img = document.createElement("img");
        img.src = "gameover.png";
        context.drawImage(img, 0, 0, 1000, 500);
        context.closePath();
    }
}
//tải lại trang web
function reset() {
    window.location.reload();
}

function draw() {
    context.clearRect(0, 0, 1000, 500);
    if (!gameover && !gamewin) {
        drawbackground();
        drawball();
        vacham();
        vacham2();
        dichuyen();
        drawrect1();
        dichuyenrect1();
        drawrect2();
        vachamgach();
        document.getElementById("Score").innerHTML= "Điểm :" + score;
        checkgameover();

    } else {
        document.getElementById("btnStart").style.display='none';
        document.getElementById("btnAgain").style.display='block';
        handleGameOver();
    }

    requestAnimationFrame(draw);
}

document.getElementById("btnAgain").style.display='none';

