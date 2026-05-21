//	setGradientFill(createVector(x - mySize,y),createVector(x + mySize,y));

function setGradientFill(pos1,pos2)
{
	gradient = drawingContext.createLinearGradient(pos1.x,pos1.y,pos2.x,pos2.y);
	gradient.addColorStop(0,generateColor(1));
	gradient.addColorStop(1,generateColor(1));
	drawingContext.fillStyle = gradient;
}

function generateColor(scale) {
	//let myi=floor(random(0, colors.length));
	
	let mycolor=colors[floor(random(0, colors.length))];
	while(mycolor==mybgcolor)
		mycolor=colors[floor(random(0, colors.length))];
	
	
	//print("mycolor="+mycolor);
	let temp = color(mycolor);
		//let temp = color(colors[floor(random(0, colors.length))]);

	myColor = color(hue(temp) + randomGaussian() * scale,
		saturation(temp),
		brightness(temp) + randomGaussian() * scale,
		random(100,100));
	return myColor;
}

function bgsG(pos1,pos2) ///background color 로 채움
{
	gradient = drawingContext.createLinearGradient(pos1.x,pos1.y,pos2.x,pos2.y);
//	gradient.addColorStop(0,gC(1));
	//gradient.addColorStop(1,gC(1));
	drawingContext.fillStyle = mybgcolor;
}

