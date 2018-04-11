var CW = 400, CH = 320;
var SQURE_SIZE = 40, LINE_SIZE = 10, NUMB = 11;
var diffculty = 1, currentRgb = new Array(0,0,0);
var isEnd = false;
var c;
var ctx;
var result;


window.onload = function () {
  init();
}

function init() {
  c = document.getElementById("cuzzle");
  CW = document.body.offsetWidth;
  c.width = CW;
  c.height = CW;
  ctx = c.getContext("2d");

  c.addEventListener("click", clickHandler, false);
  //run(ctx);
  initOnce(calculatePosition());
}

function clickHandler(e) {
  var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var x = e.pageX || e.clientX + scrollX;
  var y = e.pageY || e.clientY + scrollY;

  var touchPoint = {x, y};
  //console.log("点击位置：" + "[" + x + ", " + y + "]");

  isEnd = isUnsuccess(touchPoint);

  if(diffculty > 30) {
    isEnd = true;
    alert("you win");
  }

  if(!isEnd) {
    var position = calculatePosition();
    diffculty++;
    initOnce(position);
  }

}

function isUnsuccess (touchPoint) {
  var isUnsuccess = true;
  console.log("结果" + "[" + touchPoint.x + ", " + touchPoint.y + "]");
  console.log("答案" + "[" + result.x + "," + result.y + "]");

  if((touchPoint.x >= result.x) && (touchPoint.x <= result.x + SQURE_SIZE)){
    if((touchPoint.y >= result.y) && (touchPoint.y <= result.y + SQURE_SIZE)){
      isUnsuccess = false;
    }
  }
  console.log("未成功：" + isUnsuccess);
  return isUnsuccess;
}

function initOnce(position) {
  console.log("第" + diffculty + "次");

  var rgb = new Array(3);

  rgb[0] = getRandom(0, 256);
  rgb[1] = getRandom(0, 256);
  rgb[2] = getRandom(0, 256);
  //console.log("当前颜色：[" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + "]");

  var changePoint = getRandom(0, 121);
  draw(position, rgb, changePoint);
}

function draw(position, rgb, changePoint){
  //console.log("绘制一次");
  var hexColor = rgbToHex(rgb);
  //console.log("改变位置：" + changePoint);

  for(var i = 0; i < position.length; i++) {
    var Point = position[i];

    ctx.fillStyle = hexColor;
    ctx.fillRect(Point.x,Point.y,SQURE_SIZE,SQURE_SIZE);
  }

  var change = position[changePoint];
  result = change;
  //console.log("查看答案坐标：" + change.x + "," + change.y);

  ctx.fillStyle = changeColor(rgb);
  ctx.fillRect(change.x,change.y,SQURE_SIZE,SQURE_SIZE);
}

function calculatePosition() {
  var paintSize = NUMB * SQURE_SIZE + (NUMB - 1) * LINE_SIZE;

  CW = document.body.offsetWidth;
  CH = CW;
  var StartPoint = {
    x: (CW - paintSize) / 2,
    y: (CH - paintSize) / 2
  };

  var re = [];
  for(var row = 0; row < NUMB; row ++) {
    for(var col = 0; col < NUMB; col ++) {
      var Point = {
        x: StartPoint.x + col * (SQURE_SIZE + LINE_SIZE),
        y: StartPoint.y + row * (SQURE_SIZE + LINE_SIZE)
      };
      re.push(Point);
    }
  }

  return re;
}

function changeColor(rgb) {
  var difference = calculateDifference();

  var newRgb = new Array(3);

  newRgb[0] = makeChangeToColor(rgb[0], difference[0] * 5);
  newRgb[1] = makeChangeToColor(rgb[1], difference[1] * 5);
  newRgb[2] = makeChangeToColor(rgb[2], difference[2] * 5);

  return rgbToHex(newRgb);
}

function calculateDifference() {
  var difference = new Array(3);

  var differencePoint = 10;
  if (diffculty > 15) {
    differencePoint = diffculty + 24;
  } else {
    differencePoint = Math.floor(0.8 * diffculty + 27);
  }
  //console.log("偏差总值："+differencePoint);

  difference[0] = getRandom(0, differencePoint + 1);
  differencePoint -= difference[0];
  difference[1] = getRandom(0, differencePoint + 1);
  differencePoint -= difference[1];
  difference[2] = differencePoint;
  //console.log("随机值：[" + difference[0]*5 + ", " + difference[1]*5 + ", " + difference[2]*5 + "]");

  return difference;
}

function makeChangeToColor(target, change) {
  var isPlus = getRandom(0,2);
  var result
  if (isPlus == 0) {
    if(target + change > 255){
      result = target - change;
    } else {
      result = target + change;
    }
  } else {
    if(target - change < 0){
      result = target + change;
    } else {
      result = target - change;
    }
  }
  return result;
}

function getRandom(start, end) {
  var scale = end - start;
  var random = Math.random();
  var result = Math.floor(random * scale) + start;
  return result;
}

function rgbToHex (rgb) {
  var hax = "#";
  hax += deToHex(rgb[0]);
  hax += deToHex(rgb[1]);
  hax += deToHex(rgb[2]);
  //console.log(hax);
  return hax;
}

function deToHex (numb) {
  var first = Math.floor(numb / 16);
  var second = numb - first*16;

  return "" + changeToHex(first) + changeToHex(second);
}

function changeToHex (numb) {
  var result = "";
  if (numb == 10) {
    result = "A";
  } else if (numb == 11) {
    result = "B";
  } else if (numb == 12) {
    result = "C";
  } else if (numb == 13) {
    result = "D";
  } else if (numb == 14) {
    result = "E";
  } else if (numb == 15) {
    result = "F";
  } else {
    result = "" + numb;
  }
  return result;
}
