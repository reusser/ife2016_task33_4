/**
 * [carController description]
 * @type {Object}
 */
let carController = {
  car: document.getElementById('car'),
  directionBox: ['up', 'right', 'down', 'left'],
  directionPointer: 0,
  directionNow: 'up',
  location: [5, 5],
  walls: {},
  deg: 0,
  init() {
    this.setCarSize();
  },
  //设置定位 x为行数最小为1 y为列数最小为1
  setCarSize() {
    let ele = document.getElementsByTagName('ul')[1].getElementsByTagName('li')[1];
    this.car.style.height = window.getComputedStyle(ele, null).getPropertyValue('height');        
    this.car.style.width  = window.getComputedStyle(ele, null).getPropertyValue('width');
  },
  setCarLocation([x, y]) {
    if (x <= 0 || x >= 11 || y <= 0 || y >= 11) return alert('超出了活动范围！');
    if (this.walls[`${x}_${y}`]) return false;
    this.car.style.transform = `translateX(${100 * y}%) translateY(${100 * x}%) rotateZ(${this.deg}deg)`;
    this.location = [x, y];
  },
  //向左转
  turnLeft() {
    if (this.directionPointer === 0) this.directionPointer = 3;
    else this.directionPointer -= 1;
    this.directionNow = this.directionBox[this.directionPointer];
    this.deg = this.deg - 90;
    this.rotateCar();
  },
  //向右转
  turnRight() {
    if (this.directionPointer === 3) this.directionPointer = 0;
    else this.directionPointer += 1;
    this.directionNow = this.directionBox[this.directionPointer];
    this.deg = this.deg + 90;
    this.rotateCar();
  },
  //向后转
  turnBack() {
    this.turnRight();
    setTimeout(() => this.turnRight(), 250);
  },
  //前进
  go(moveNum) {
    let i = 1;
    if (this.directionNow === 'up') {
      let timer = setInterval( () => {
        let flag = this.setCarLocation([this.location[0] - 1, this.location[1]]);
        if (flag === false || i == moveNum) {
          clearInterval(timer);
          return;
        }
        i++
      }, 50)

    } else if (this.directionNow === 'right') {

      let timer = setInterval( () => {
        let flag = this.setCarLocation([this.location[0], this.location[1] + 1]);
        if (flag === false || i == moveNum) {
          clearInterval(timer);
          return;
        }
        i++
      }, 50)

    } else if (this.directionNow === 'down') {

      let timer = setInterval( () => {
        let flag = this.setCarLocation([this.location[0] + 1, this.location[1]]);
        if (flag === false || i == moveNum) {
          clearInterval(timer);
          return;
        }
        i++
      }, 50)

    } else {

      let timer = setInterval( () => {
        let flag = this.setCarLocation([this.location[0], this.location[1] - 1]);
        if (flag === false || i == moveNum) {
          clearInterval(timer);
          return;
        }
        i++
      }, 50)

    }
  },
  //向左移动一格，方向不变
  traLeft(moveNum) {
    this.setCarLocation([this.location[0], this.location[1] - moveNum]);
  },
  //向右移动一格，方向不变
  traRight(moveNum) {
    this.setCarLocation([this.location[0], this.location[1] + moveNum]);
  },
  //向上移动一格，方向不变
  traTop(moveNum) {
    this.setCarLocation([this.location[0] - moveNum, this.location[1]]);
  },
  //向下移动一格，方向不变
  traBottom(moveNum) {
    this.setCarLocation([this.location[0] + moveNum, this.location[1]]);
  },
  //方向转向屏幕上面，向屏幕的上面移动一格
  movTop(moveNum) {
    this.directionPointer >= 2 ? this.deg += 90 * this.directionPointer : this.deg -= 90 * this.directionPointer;
    this.directionPointer = 0;
    this.directionNow = this.directionBox[this.directionPointer];
    this.rotateCar();
    setTimeout( () => this.go(moveNum), 500);
  },
  //方向转向屏幕右侧，向屏幕的右侧移动一格
  movRight(moveNum) {
    (this.directionPointer === 0 || this.directionPointer === 3) ? this.deg += 90 * Math.abs(this.directionPointer - 1) : this.deg -= 90 * (this.directionPointer - 1);
    this.directionPointer = 1;
    this.directionNow = this.directionBox[this.directionPointer]; 
    this.rotateCar();
    setTimeout( () => this.go(moveNum), 500);
  },
  movBottom(moveNum) {
    this.directionPointer <= 1 ? this.deg += 90 * Math.abs(this.directionPointer - 2) : this.deg -= 90 * (this.directionPointer - 2);
    this.directionPointer = 2;
    this.directionNow = this.directionBox[this.directionPointer];
    this.rotateCar();
    setTimeout( () => this.go(moveNum), 500);
  },
  movLeft(moveNum) {
    this.directionPointer === 0 ? this.deg -= 90 : this.deg += 90 * Math.abs(this.directionPointer - 3);
    this.directionPointer = 3;
    this.directionNow = this.directionBox[this.directionPointer];
    this.rotateCar();
    setTimeout( () => this.go(moveNum), 500);
  },
  build() {
    if (this.directionNow === 'up') {

      this.setWall([this.location[0] - 1, this.location[1]]);

    } else if (this.directionNow === 'right') {

      this.setWall([this.location[0], this.location[1] + 1]);

    } else if (this.directionNow === 'down') {

      this.setWall([this.location[0] + 1, this.location[1]]);

    } else {

      this.setWall([this.location[0], this.location[1] - 1]);
      
    }
  },
  setWall([x, y]) {
    if (x <= 0 || x >= 11 || y <= 0 || y >= 11) return console.log('超出了范围！');
    if (this.walls[`${x}_${y}`]) return console.log('此位置已经有墙');
    if (x == this.location[0] && y == this.location[1]) return console.log('不能在小滑块处修墙');
    
    let wall = document.getElementsByTagName('ul')[x].getElementsByTagName('li')[y];
    wall.style.backgroundColor = '#99a9bf';
    this.walls[`${x}_${y}`] = true;
  },
  randomBuild() {
    let x = Math.floor(Math.random() * 10 + 1);
    let y = Math.floor(Math.random() * 10 + 1);
    this.setWall([x, y]);
  },
  paintWall(color) {
    if (!/^#/.test(color) || color.length != 7) return console.log('颜色格式不正确');
    if (this.directionNow === 'up') {

      let [x, y] = this.location;
      if (this.walls[`${x - 1}_${y}`]) document.getElementsByTagName('ul')[x - 1].getElementsByTagName('li')[y].style.backgroundColor = color;
      else return console.log('没有墙可以粉刷');

    } else if (this.directionNow === 'right') {

        let [x, y] = this.location;
        if (this.walls[`${x}_${y + 1}`]) document.getElementsByTagName('ul')[x].getElementsByTagName('li')[y + 1].style.backgroundColor = color;
        else return console.log('没有墙可以粉刷');

    } else if (this.directionNow === 'down') {

        let [x, y] = this.location;
        if (this.walls[`${x + 1}_${y}`]) document.getElementsByTagName('ul')[x + 1].getElementsByTagName('li')[y].style.backgroundColor = color;
        else return console.log('没有墙可以粉刷');

    } else {

        let [x, y] = this.location;
        if (this.walls[`${x}_${y - 1}`]) document.getElementsByTagName('ul')[x].getElementsByTagName('li')[y - 1].style.backgroundColor = color;
        else return console.log('没有墙可以粉刷'); 

    }
  },
  resetWall() {
    Object.keys(this.walls).forEach( (item) => {
      let [x, y] = item.split('_');
      document.getElementsByTagName('ul')[x].getElementsByTagName('li')[y].style.backgroundColor = '#fff';
    });
    this.walls = {};
  },
  //自动寻路算法
  moveTo([x, y]) {
    x = parseInt(x);
    y = parseInt(y);
    if (x <= 0 || x >= 11 || y <= 0 || y >= 11) return alert('超出了活动范围！');
    if (this.walls[`${x}_${y}`]) return false;
    let open   = {};
    let closed = {};
    let path   = [];
    let [i, j] = this.location;
    let g      = 1;
    closed[`${this.location[0]}_${this.location[1]}`] = true;
    Object.keys(this.walls).forEach( (item) => {
      closed[item] = true;
    } );

    if (closed[`${i + 1}_${j}`] && closed[`${i - 1}_${j}`] && closed[`${i}_${j + 1}`] && closed[`${i}_${j - 1}`]) return console.log('无路可走了')

    for (; i != x || j != y; ) {

      if (!closed[`${i + 1}_${j}`] && !open[`${i + 1}_${j}`]) {
        open[`${i + 1}_${j}`] = {};
        open[`${i + 1}_${j}`].g = g;
        open[`${i + 1}_${j}`].h = Math.abs(x - i - 1) + Math.abs(y - j);
        open[`${i + 1}_${j}`].f = open[`${i + 1}_${j}`].g + open[`${i + 1}_${j}`].h;
        open[`${i + 1}_${j}`].n = Math.abs((x + y) - (i + 1 + j));
      }

      if (!closed[`${i - 1}_${j}`] && !open[`${i - 1}_${j}`]) {
        open[`${i - 1}_${j}`] = {};
        open[`${i - 1}_${j}`].g = g;
        open[`${i - 1}_${j}`].h = Math.abs(x - i + 1) + Math.abs(y - j)
        open[`${i - 1}_${j}`].f = open[`${i - 1}_${j}`].g + open[`${i - 1}_${j}`].h;
        open[`${i - 1}_${j}`].n = Math.abs((x + y) - (i - 1 + j));
      }

      if (!closed[`${i}_${j + 1}`] && !open[`${i}_${j + 1}`]) {
        open[`${i}_${j + 1}`] = {};
        open[`${i}_${j + 1}`].g = g;
        open[`${i}_${j + 1}`].h = Math.abs(x - i) + Math.abs(y - j - 1);
        open[`${i}_${j + 1}`].f = open[`${i}_${j + 1}`].g + open[`${i}_${j + 1}`].h;
        open[`${i}_${j + 1}`].n = Math.abs((x + y) - (i + 1 + j));
      }

      if (!closed[`${i}_${j - 1}`] && !open[`${i}_${j - 1}`]) {
        open[`${i}_${j - 1}`] = {};
        open[`${i}_${j - 1}`].g = g;
        open[`${i}_${j - 1}`].h = Math.abs(x - i) + Math.abs(y - j + 1);
        open[`${i}_${j - 1}`].f = open[`${i}_${j - 1}`].g + open[`${i}_${j - 1}`].h;
        open[`${i}_${j - 1}`].n = Math.abs((x + y) - (i - 1 + j));        
      }
      let min = [open[`${ i + 1}_${j}`], open[`${ i - 1}_${j}`], open[`${i}_${j + 1}`], open[`${i}_${j - 1}`]].sort( (a, b) => {
        if (a.f != b.f) return a.f - b.f;
        if (a.f == b.f ) {
          return a.n - b.n;
        }
      })[0];
      Object.keys(open).every( (item) => {
        if (open[item].f == min.f && open[item].g == min.g && open[item].h == min.h && open[item].n == min.n) {
          [i, j] = item.split('_');
          i = parseInt(i);
          j = parseInt(j);
          path.push([i, j]);
          closed[`${i}_${j}`] = true;
          delete open[`${i}_${j}`];
          return false;
        }
        return true;
      });
      g++;
    }
    this.goPath(path);
  },
  goPath(path) {
    let i = 0;
    let timer = setInterval( () => {
      if (i == path.length) {
        clearInterval(timer);
        return;
      }

      let [x, y] = path[i]

      if (this.directionNow === 'up') {

        if (x < this.location[0]) {
          this.setCarLocation([x, y]);
        } else if (x > this.location[0]) {
          this.turnBack();
          this.setCarLocation([x, y]);
        } else if (y < this.location[1]) {
          this.turnLeft();
          this.setCarLocation([x, y]);
        } else {
          this.turnRight();
          this.setCarLocation([x, y]);
        }

      } else if (this.directionNow === 'right') {

        if (x < this.location[0]) {
          this.turnLeft();
          this.setCarLocation([x, y]);
        } else if (x > this.location[0]) {
          this.turnRight();
          this.setCarLocation([x, y]);
        } else if (y < this.location[1]) {
          this.turnBack();
          this.setCarLocation([x, y]);
        } else {
          this.setCarLocation([x, y]);
        }

      } else if (this.directionNow === 'down') {

        if (x < this.location[0]) {
          this.turnBack();
          this.setCarLocation([x, y]);
        } else if (x > this.location[0]) {
          this.setCarLocation([x, y]);
        } else if (y < this.location[1]) {
          this.turnRight();
          this.setCarLocation([x, y]);
        } else {
          this.turnLeft();
          this.setCarLocation([x, y]);
        }

      } else {

        if (x < this.location[0]) {
          this.turnRight();
          this.setCarLocation([x, y]);
        } else if (x > this.location[0]) {
          this.turnLeft();
          this.setCarLocation([x, y]);
        } else if (y < this.location[1]) {
          this.setCarLocation([x, y]);
        } else {
          this.turnBack();
          this.setCarLocation([x, y]);
        } 

      }
      i++;
    }, 500)
  },
  rotateCar() {
    let [x, y] = this.location;
    this.car.style.transform = `translateX(${100 * y}%) translateY(${100 * x}%) rotateZ(${this.deg}deg)`;
  }
};

/************************************** 命令部分 **********************************/
let cmdHandler = (text, index) => {
  text         = text.toLowerCase();
  text         = text.replace(/\s/g, '');
  let moveNum  = 1;
  let numIndex = text.search(/\d+/);
  let [x, y] = [0, 0]
  if (numIndex >= 2) {
    moveNum = parseInt(text.substring(numIndex));
    [x, y] = text.substring(numIndex).split(',');
  }
  text = text.replace(/\d,*/g, '');
  if (text === 'go') carController.go(moveNum);
  else if (text === 'tunlef') carController.turnLeft();
  else if (text === 'tunrig') carController.turnRight();
  else if (text === 'tunbac') carController.turnBack();
  else if (text === 'tralef') carController.traLeft(moveNum);
  else if (text === 'trarig') carController.traRight(moveNum);
  else if (text === 'trabot') carController.traBottom(moveNum);
  else if (text === 'tratop') carController.traTop(moveNum);
  else if (text === 'movtop') carController.movTop(moveNum);
  else if (text === 'movrig') carController.movRight(moveNum);
  else if (text === 'movbot') carController.movBottom(moveNum);
  else if (text === 'movlef') carController.movLeft(moveNum);
  else if (text === 'build')  carController.build();
  else if (text === 'bru#')   carController.paintWall('#' + moveNum);
  else if (text === 'movto')  carController.moveTo([x, y]);
  else errorInfo(index);
}

let cmdBtn       = document.getElementById('cmd-btn');
let reBtn        = document.getElementById('re-btn');
let buildBtn     = document.getElementById('build-btn');
var cmdArea      = document.getElementById('cmdArea');
let topRow       = document.getElementById('top');
let rowOl        = document.getElementById('row-ol');
let rowNum       = [1];
let rowNowLength = rowNum.length;


//错误提示
const errorInfo = (index) => {
  let target = index > 0 ? rowOl.getElementsByTagName('div')[index - 1] : topRow;
  target.style.backgroundColor = '#d93a49';
}

cmdBtn.onclick = () => {
  resetRow();
  let textArray = cmdArea.value.split(/\n/);
  let i = 0;
  let animate   = setInterval( () => {
    if (i >= textArray.length) {
      clearInterval(animate);
      return;
    }
    
    let text = textArray[i];
    text = text.trim();
    text === '' ? errorInfo(i) : cmdHandler(text, i); 
    i++;  
  }, 500);
};

const resetRow = () => {
  topRow.style.backgroundColor = '#ccc';
  Array.from(rowOl.getElementsByTagName('div')).forEach( (item) => {
    item.style.backgroundColor = '#ccc';
  } )
};

buildBtn.onclick = () => {
  carController.randomBuild();
};

reBtn.onclick = () => {
  rowNum = [1];
  renderRowNum();
  topRow.style.backgroundColor = '#ccc';
  cmdArea.value = '';
  carController.resetWall();
  carController.setCarLocation([5, 5]);
  carController.directionPointer = 0;
  carController.directionNow = 'up';
  carController.deg = 0;
  carController.rotateCar();
};
/************************************** 文本部分 **********************************/
cmdArea.onkeydown = (event) => {
  if (event.keyCode == 13) {

    rowNum.push(rowNum.length + 1);
    rowNowLength = rowNum.length;
    renderRowNum();
    topRow.style.backgroundColor = '#ccc';

  } else if (event.keyCode == 8) {
    setTimeout( () => {

      rowNum.length = cmdArea.value.match(/\n/g) ? cmdArea.value.match(/\n/g).length + 1 : 1;
      if (rowNum.length !== rowNowLength) {
        rowNowLength = rowNum.length;
        renderRowNum();
      } 
      topRow.style.backgroundColor = '#ccc';

    }, 0);
  }
};

const renderRowNum = () => {
  let rows = '';
  for (let i = 1; i < rowNum.length; i++) {
    rows += `<div>${rowNum[i]}</div>`;
  }
  rowOl.innerHTML = rows;
}

cmdArea.onscroll = () => {
  topRow.style.marginTop = `-${cmdArea.scrollTop}px`;
}



carController.init();
console.log("%c 18届小萌新求前端实习 熟悉html css js 自学vue中","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #4096EE), color-stop(0.15, #FF1A00), color-stop(0.3, #4096EE), color-stop(0.45, #FF1A00),color-stop(0.6, #4096EE), color-stop(0.75, #FF1A00),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:14px;");
