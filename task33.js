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
	go() {
		if (this.directionNow === 'up') {

			this.setCarLocation([this.location[0] - 1, this.location[1]]);

		} else if (this.directionNow === 'right') {

			this.setCarLocation([this.location[0], this.location[1] + 1]);

		} else if (this.directionNow === 'down') {

			this.setCarLocation([this.location[0] + 1, this.location[1]]);

		} else {

			this.setCarLocation([this.location[0], this.location[1] - 1]);
			
		}
	},
	//向左移动一格，方向不变
	traLeft() {
		this.setCarLocation([this.location[0], this.location[1] - 1]);
	},
	//向右移动一格，方向不变
	traRight() {
		this.setCarLocation([this.location[0], this.location[1] + 1]);
	},
	//向上移动一格，方向不变
	traTop() {
		this.setCarLocation([this.location[0] - 1, this.location[1]]);
	},
	//向下移动一格，方向不变
	traBottom() {
    this.setCarLocation([this.location[0] + 1, this.location[1]]);
	},
	//方向转向屏幕上面，向屏幕的上面移动一格
	movTop() {
    this.directionPointer >= 2 ? this.deg += 90 * this.directionPointer : this.deg -= 90 * this.directionPointer;
    this.directionPointer = 0;
    this.directionNow = this.directionBox[this.directionPointer];
    this.rotateCar();
    setTimeout( () => this.go(), 500);
	},
	//方向转向屏幕右侧，向屏幕的右侧移动一格
	movRight() {
    (this.directionPointer === 0 || this.directionPointer === 3) ? this.deg += 90 * Math.abs(this.directionPointer - 1) : this.deg -= 90 * (this.directionPointer - 1);
    this.directionPointer = 1;
    this.directionNow = this.directionBox[this.directionPointer]; 
    this.rotateCar();
    setTimeout( () => this.go(), 500);
	},
	movBottom() {
		this.directionPointer <= 1 ? this.deg += 90 * Math.abs(this.directionPointer - 2) : this.deg -= 90 * (this.directionPointer - 2);
		this.directionPointer = 2;
		this.directionNow = this.directionBox[this.directionPointer];
		this.rotateCar();
		setTimeout( () => this.go(), 500);
	},
	movLeft() {
		this.directionPointer === 0 ? this.deg -= 90 : this.deg += 90 * Math.abs(this.directionPointer - 3);
		this.directionPointer = 3;
		this.directionNow = this.directionBox[this.directionPointer];
		this.rotateCar();
		setTimeout( () => this.go(), 500);
	},
	rotateCar() {
    let [x, y] = this.location;
    this.car.style.transform = `translateX(${100 * y}%) translateY(${100 * x}%) rotateZ(${this.deg}deg)`;
	}
};

let cmdHandler = (text) => {
	text = text.toLowerCase();
	text = text.replace(/\s/g, '');
	if (text === 'go') carController.go();
	else if (text === 'tunlef') carController.turnLeft();
	else if (text === 'tunrig') carController.turnRight();
	else if (text === 'tunbac') carController.turnBack();
	else if (text === 'tralef') carController.traLeft();
	else if (text === 'trarig') carController.traRight();
	else if (text === 'trabot') carController.traBottom();
	else if (text === 'tratop') carController.traTop();
	else if (text === 'movtop') carController.movTop();
	else if (text === 'movrig') carController.movRight();
	else if (text === 'movbot') carController.movBottom();
	else if (text === 'movlef') carController.movLeft()
	else alert('不存在此命令');
}

let cmdBtn = document.getElementById('cmd-btn');

cmdBtn.onclick = () => {
	let text = document.getElementById('cmd-input').value;
	text = text.trim();
	if (text === '') return alert('请输入命令');
	cmdHandler(text);
}

carController.init();
console.log("%c 18届小萌新求前端实习 熟悉html css js 自学vue中","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #4096EE), color-stop(0.15, #FF1A00), color-stop(0.3, #4096EE), color-stop(0.45, #FF1A00),color-stop(0.6, #4096EE), color-stop(0.75, #FF1A00),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:14px;");
