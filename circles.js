var animateButton = document.getElementById('animateButton');
var Fill = document.getElementById('Fill');
var range = document.getElementById('range');
var restart = document.getElementById('restart');

var canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

filled = false;
paused = false;

var x = 50;
var index = 0;

shapes = [];
var v1 = 1;
var v2 = 1;

//where things happen
function animate(time) { 
	if (!paused) {
		context.clearRect(0,0,canvas.width, canvas.height);

		for(var i=0;i<shapes.length;i++){
			shapes[i].create();
		}

		context.beginPath();
		context.arc(x+=parseFloat(v1),200,1,0,2*Math.PI,false);
		context.stroke();
		context.closePath();

		index++;
		if(index%20 == 0){
			var object = new construct(x);
			shapes.push(object);
		}

		window.requestNextAnimationFrame(animate);
	}
	function construct(x){
		this.x = x;
		this.radius = 1;
		this.create = circle;
	}
	function circle(){
		context.beginPath();
		context.arc(this.x,200, this.radius+=v2, 0 , 2*Math.PI, false);
		context.closePath();
		context.stroke();
		if(filled){
			fill();
		}
	}
	function fill(){
		var r = Math.floor(256*Math.random());
		var g = Math.floor(256*Math.random());
		var b = Math.floor(256*Math.random());
		context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
		context.fill();
	}
}

animateButton.onclick = function(e){
	if(paused){
		paused = false;
		animateButton.value = "Pause";
		window.requestNextAnimationFrame(animate);
	}
	else{
		paused = true;
		animateButton.value = "Animate";
	}
};

Fill.onclick = function(e){
	if(filled){
		filled = false;
		Fill.value = "Too Much!";
	}
	else{
		filled = true;
		Fill.value = "Back?";
	}
}

range.onchange = function(){
	v1 = range.value;
}

restart.onclick = function(e){
	filled = false;
	paused = true;

	x = 50;
	index = 0;

	shapes = [];
	v1 = 1;
	v2 = 1;
	context.clearRect(0,0,canvas.width, canvas.height);
	animateButton.value = "animate";
	Fill.value = "Too Much!";
	window.requestNextAnimationFrame(animate);
}
//For Animation
window.requestNextAnimationFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame  || window.msRequestAnimationFrame ||
	function (callback, element) { 
		// Assume element is visible 
		var self = this,                
		start,                
		finish;
		window.setTimeout( function () {               
			start =+new Date(); callback(start);               
			finish =+new Date();
    		self.timeout = 1000 / 60 -(finish - start);
		}, self.timeout);
	};
}
)
();

window.requestNextAnimationFrame(animate);