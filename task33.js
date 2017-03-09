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
	turnBack() {
		this.turnRight();
		setTimeout(() => this.turnRight(), 500);
	},
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
