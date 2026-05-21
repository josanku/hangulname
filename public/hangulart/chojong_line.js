/*
복자음 닿소리 크기를 1:1, 1:2, 2:1로 변화 주도록 => 현재  ㄱㄱ , ㄷㄷ ㅅㅅ ㅈㅈ 구현했음 ,  구현하고  ㅈㅈ ㄹㅁ...등등 구현해야함 
*/


function chojong_line(myc, ystart, mymode)
{

	
	let jongbg=255;
	//let ystart;
	let xstart=0;
	let xsz;
	let ysz;
	//stroke(0);
 	//초성
	let diffcolor=0;   //ㅎㅊㅈ

		

	if(ystart==0) //초성
	{
		ystart=0;
		xsz=chojung;
		ysz=choy;

	}
	else //종성
	{
			 //ystart=choy;
				xsz=xw; //chojung
				ysz=yw-ystart;
		/*
				if(mymode='ㅣ')
					ysz=cellsz-choy;
				else
					ysz=cellsz-jongy;
					*/
	}
	if(mymode=="onlydat")
	{
		xstart=0;
		ystart=0;
		xsz=xw;
		ysz=yw;
	}
	
					let linemode=1;
if(juldat==1)
{
				strokeCap(PROJECT) 
				//let sw=min(xsz,ysz)/10;
					let stsz=min(xw,yw)/30;

				strokeWeight(stsz);
				stroke(random(colors));
	
}
 
	//향후에 조정해야할 사항  초성 ㄲ ㄸ ㅃ ㅆ ㅉ, 종성 ㄲㅆ ㄳ~ㅄ
	let doabstract=0;
	if(doabstract==1)
	{
		if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'    ||myc== 'ㄳ'||myc== 'ㄵ'||myc=='ㄶ'||myc=='ㄺ'||myc== 'ㄻ'||myc== 'ㄼ'||myc== 'ㄽ'||myc== 'ㄾ'||myc=='ㄿ'||myc== 'ㅀ'||myc==  'ㅄ')
		{
				myc='ㅁ채움'; 
		}
		else if(myc=='ㅆ'||myc=='ㅉ')
				myc='ㅅ'; 
	}

		
	if(myc=="ㄲ") myc="ㄱㄱ";
	else if(myc=="ㄸ") myc="ㄷㄷ";
	else if(myc=="ㅆ") myc="ㅅㅅ";
		else if(myc=="ㅉ") myc="ㅈㅈ";
			else if(myc=="ㅃ") myc="ㅂㅂ";



//myc='ㅌ';
	//stroke(0);
	if(myc=='ㅁ채움')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
 	}
		else if(myc=='ㅁ')
	{
			let hy=ysz/3;
			let hx=xsz/3;
			 
		if(linemode==1)
		{
			fill('red');
			noFill()
			rect(xstart+stsz/2,ystart+stsz/2, xsz-stsz, ysz-stsz)
		}
		else
		{

		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
			//fill(jongbg);
		if(random() <0.5)
 			bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+hx, ystart+hy));
		else
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));

			rect(xstart+hx,ystart+hy, hx, hy)
		}
		
	}
		else if(myc=='ㄱ')
	{
				if(linemode==1)
		{
			line(xstart+stsz/2,ystart+stsz/2, xstart+xsz-stsz/2, ystart+stsz/2)		
			line(xstart+xsz-stsz/2,ystart+stsz/2, xstart+xsz-stsz/2, ystart+ysz-stsz/2)
		}
		else
		{
			
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
		//rect(0,0, chojung, choy)
 
		
		  //let hy=choy/2;
			//let hx=chox/2;
			let hy=ysz/2;
			let hx=xsz/2;
		
			//fill(0); ///???????????????????????????????
			bgsG(createVector(xstart,ystart+ysz/2),createVector(xstart+hx,ystart+ysz/2+ysz/2));
		///fill("blue")
		//fill("red");
			rect(xstart, ystart+ysz/2, hx, ysz/2);
		}
 	}
		else if(myc=='ㅋ')
	{
		if(linemode==1)
		{
			line(xstart+stsz/2,ystart+stsz/2, xstart+xsz-stsz/2, ystart+stsz/2)		
			line(xstart+xsz-stsz/2,ystart+stsz/2, xstart+xsz-stsz/2, ystart+ysz-stsz/2)
			line(xstart+stsz/2,ystart+ysz/2, xstart+xsz-stsz/2, ystart+ysz/2)		

		}
		else
		{
			
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
		
		  let hy=ysz/4;
			let hx=xsz/2;
		
			//fill(jongbg);
			bgsG(createVector(xstart, ystart+hy),createVector(xstart+hx, ystart+hy+hy));

			rect(xstart, ystart+hy, hx, hy)
					bgsG(createVector(xstart, ystart+hy*3+hy),createVector(xstart+hx, ystart+hy*3+hy));

			rect(xstart, ystart+hy*3, hx, hy)
		}

	}
	
	
	else if(myc=='ㄴ')
	{
		if(linemode==1)
		{
			line(xstart+stsz/2,ystart+stsz/2, xstart+stsz/2, ystart+ysz-stsz)
			line(xstart+stsz/2, ystart+ysz-stsz/2, xstart+xsz, ystart+ysz-stsz/2);
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let hy=int(random(ysz/4, ysz/2));
			let hx=int(random(xsz/4, xsz/2));
		
			fill(jongbg);
							bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));

			rect(xstart+hx, ystart, xsz-hx, hy)
		}
	}

	else if(myc=='ㄷ')
	{
		if(linemode==1)
		{
			line(xstart+stsz/2,ystart+stsz/2, xstart+xsz, ystart+stsz/2)
			line(xstart+stsz/2,ystart+stsz/2, xstart+stsz/2, ystart+ysz-stsz)
			line(xstart+stsz/2, ystart+ysz-stsz/2, xstart+xsz, ystart+ysz-stsz/2);
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let ty=ysz/3;
			let tx=xsz/2;
		
			fill(jongbg);
									bgsG(createVector(xstart+tx*2, ystart+ty),createVector(xstart+tx*2+tx, ystart+ty+ty));

			rect(xstart+tx, ystart+ty, tx, ty)
		}
		
	}
	
	
		else if(myc=='ㅌ')
	{
				
		  let fy=ysz/5;
			let hx=xsz/2;
		
				if(linemode==1)
		{
			line(xstart+stsz/2,ystart+stsz/2, xstart+xsz, ystart+stsz/2)
			line(xstart+stsz/2,ystart+stsz/2, xstart+stsz/2, ystart+ysz-stsz)
			line(xstart+stsz/2, ystart+ysz-stsz/2, xstart+xsz, ystart+ysz-stsz/2);
			
			line(xstart+stsz/2,ystart+ysz/2, xstart+xsz, ystart+ysz/2)

		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);

		
			fill(jongbg);
											bgsG(createVector(xstart+hx, ystart+fy),createVector(xstart+hx+hx, ystart+fy+fy));

			rect(xstart+hx, ystart+fy, hx, fy)
													bgsG(createVector(xstart+hx, ystart+fy*3),createVector(xstart+hx+hx, ystart+fy*3+fy));

			rect(xstart+hx, ystart+fy*3, hx, fy)
		}

	}
	
	 
		else if(myc=='ㄹ') //ㄱㄴ 모델
	{
			let qy=ysz/5;
			let tx;
		if(linemode==1)
		{
					
			line(xstart+stsz/2,ystart+stsz/2, xstart+xsz-stsz/2, ystart+stsz/2)		 //-

			line(xstart+xsz-stsz/2, ystart+stsz/2, xstart+xsz-stsz/2, ystart+ysz/2-stsz/2); //|

			line(xstart+stsz/2,ystart+ysz/2, xstart+xsz-stsz/2, ystart+ysz/2)		 //-
			line(xstart+stsz/2, ystart+ysz/2+stsz/2, xstart+stsz/2, ystart+ysz-stsz/2); //|
			line(xstart+stsz/2,ystart+ysz-stsz/2, xstart+xsz-stsz/2, ystart+ysz-stsz/2)		 //_
 		}
		else
		{
			
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		

		
			fill(jongbg);
		let rr=random();
		if(rr<0.4)
		{
			tx=xsz/3; //깊게 팜 ...일반 ㄹ
		}
		else if(rr <0.7) 
		{
			tx=xsz/4; // 반까지만
		}
		else
		{			
			tx=xsz/32; // 반까지만
			//qy=ysz/10;
		}
		 
			bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));
			rect(xstart, ystart+qy, tx*2, qy)
		
			bgsG(createVector(xsz-tx*2, ystart+qy*3),createVector(xsz, ystart+qy*3+qy));
			rect(xsz-tx*2, ystart+qy*3, tx*2, qy)
		}
		
	}
	 	
	
			else if(myc=='ㅂ')
	{
				
		  let qy=ysz/4;
			let tx=xsz/3;		
		if(linemode==1)
		{
			//ㄴ
			line(xstart+stsz/2,ystart+stsz/2, xstart+stsz/2, ystart+ysz-stsz)
			line(xstart+stsz/2, ystart+ysz-stsz/2, xstart+xsz, ystart+ysz-stsz/2);
			
			line(xstart+xsz,ystart+stsz/2, xstart+xsz, ystart+ysz-stsz/2) //오른 |
			line(xstart+stsz/2, ystart+ysz/2, xstart+xsz, ystart+ysz/2);
 		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);

			fill(jongbg);
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
			rect(xstart+tx, ystart, tx, qy)
			bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
			rect(xstart+tx, ystart+qy*2, tx, qy)
		}
	}
	
		else if(myc=='ㅍ')
	{
		 	let ty=ysz/3;
			let fx=xsz/5;
		
					if(linemode==1)
		{
			line(xstart+stsz/2,ystart+stsz/2, xstart+xsz-stsz/2, ystart+stsz/2)		 //-

			line(xstart+fx-stsz/2, ystart+stsz/2, xstart+fx-stsz/2, ystart+ysz-stsz/2);
			line(xstart+fx*4-stsz/2, ystart+stsz/2, xstart+fx*4-stsz/2, ystart+ysz-stsz/2);

			line(xstart+stsz/2,ystart+ysz-stsz/2, xstart+xsz-stsz/2, ystart+ysz-stsz/2)		 //_

			
 		}
		else
		{
			setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		

		
			fill(jongbg);
			bgsG(createVector(xstart, ystart+ty),createVector(xstart+fx, ystart+ty+ty));
			rect(xstart, ystart+ty, fx, ty)
			bgsG(createVector(xstart+fx*2, ystart+ty),createVector(xstart+fx*2+fx, ystart+ty+ty));
			rect(xstart+fx*2, ystart+ty, fx, ty)
			bgsG(createVector(xstart+fx*4, ystart+ty),createVector(xstart+fx*4+fx, ystart+ty+ty));
			rect(xstart+fx*4, ystart+ty, fx, ty)
		}
	}
	
	
	else if(myc=='ㅇ')
	{
		if(linemode==1)
		{

		mysz=min(ysz, xsz); 
		noFill();
						//fill('blue');

 		circle(xsz/2, ystart+ysz/2, mysz-stsz*2); //ㅇ

		}
		else
		{
		mysz=min(ysz, xsz); 
		
		setGradientFill(createVector(xsz/2, ystart+ysz/2-mysz/2),createVector(xsz/2, ystart+ysz/2+mysz/2));
 		circle(xsz/2, ystart+ysz/2, mysz); //ㅇ
		}
	}
	else if(myc=='ㅎ')
	{
		let hy=ysz/2; //1/2
		let qy=hy/2; //1/4
//p5.js에서는 strokeCap() 함수를 사용하여 선의 끝  ROUND, SQUARE, 그리고 PROJECT.
		if(linemode==1)
		{
				line(xstart+xsz/2, ystart, xstart+xsz/2, ystart+qy)
				line(xstart,ystart+qy, xstart+xsz, ystart+qy)
				noFill();
				//fill('blue');
				mysz=min(ysz*2/3, xsz);  //
				//circle(xsz/2, ystart+ysz*2/3, mysz-sw); //ㅇ
				ellipse(xstart+xsz/2, ystart+ysz*2/3, mysz-stsz,mysz-stsz); //ㅇ


		}
		else
		{
			if(diffcolor==1)
			{
			setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
			rect(xsz/2-qy/4, ystart, qy/2, qy);  //ㅗ 

			//line(xsz/2, 0, xsz/2, qy)

			setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, ystart+qy+qy));

			rect(0, ystart+qy, xsz, qy);  //ㅡ
			//line(0,qy, xsz, qy)
			mysz=min(ysz/2, xsz);  //
			setGradientFill(createVector(xstart+xsz/2, qy*3),createVector(xstart+xsz/2+mysz, qy*3+mysz));
			circle(xsz/2, ystart+qy*3, mysz); //ㅇ
			}
			else
			{
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
		//	rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

			//rect( xsz/2-xsz/16,  ystart, xsz/8, qy);  //ㅗ  /NEW => ㅎ
			let headxsz=min(qy, xsz/2);
			if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
				rect( xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
			else //기하학적 미를 위해서 x를 넓게
				rect( xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ


			rect(0, ystart+qy, xsz, qy);  //ㅡ
			mysz=min(ysz/2, xsz);  //
			circle(0+xsz/2, ystart+qy*3, mysz); //ㅇ
			}
		}
	}
	else if(myc=='ㅅ')
	{
		let hh=xsz/2;
		if(linemode==1)
		{
				noFill();
				triangle(xstart+hh, ystart+stsz/2,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
			triangle(xstart+hh, ystart,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
	}
	
			else if(myc=='ㅈ')
	{
	
		let ty=ysz/4;
		let hh=xsz/2;
		if(linemode==1)
		{
				line(xstart+stsz/2,ystart+stsz/2, xstart+xsz-stsz/2,ystart+stsz/2);
							//strokeCap(ROUND) 
			//fill('green');
			noFill();
				triangle(xstart+hh, ystart+stsz*1.5,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
			fill(bgcolor)
			noStroke();
			let bsz=min(stsz*2, ymargin);
			rect(xstart, ystart-bsz, xsz, bsz); //꽃지점 생기는 현상 방지
		}
		else
		{
			setGradientFill(createVector(xstart,ystart),createVector(xstart,ystart+ysz));
			rect(xstart,ystart, xsz, ty)
			//setGradientFill(createVector(hh,ty),createVector(hh, choy));
			triangle(xstart+hh, ystart+ty,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
		
		}
		
	
		else if(myc=='ㅈ2') //위를 낮게
	{
		if(diffcolor==1)
		{
		let ty=ysz/3;
				setGradientFill(createVector(xstart,ystart),createVector(xsz, ty));

		rect(xstart,ystart, xsz, ty)
		
		let hh=xsz/2;
		
		setGradientFill(createVector(hh,ty),createVector(hh, choy));
		triangle(xstart+hh, ystart+ty,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
		
		else
		{
		let ty=ysz/7;
				setGradientFill(createVector(xstart,ystart),createVector(xstart,ystart+ysz));

		rect(xstart,ystart, xsz, ty)
		
		let hh=xsz/2;
		
		//setGradientFill(createVector(hh,ty),createVector(hh, choy));
		triangle(xstart+hh, ystart+ty,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
		
	}
	
		else if(myc=='ㅊ')
	{
		let hy=ysz/2; //1/2
		let qy=hy/2; //1/4
		
		if(linemode==1)
		{
				line(xsz/2, ystart+0, xsz/2,  ystart+qy) //|
				line(0, ystart+qy, xsz,  ystart+qy)		//ㅡ
				//noFill();
				mysz=min(ysz*2/3, xsz); 
							//mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+qy+stsz*2,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);

			
		}
		else 
		{

				if(diffcolor==1)
				{
				setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
				//rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

							let headxsz=min(qy, xsz/2);
				if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
					rect( xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
				else //기하학적 미를 위해서 x를 넓게
					rect( xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ


				setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, qy));
				rect(xstart, ystart+qy, xstart+xsz, qy);  //ㅡ	


				mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+hy,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
				}
				else
				{

				setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
				//rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 
					//rect(xstart+xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => 

								let headxsz=min(qy, xsz/2);
				if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
					rect( xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
				else //기하학적 미를 위해서 x를 넓게
					rect( xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ

				//setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, qy));
				rect(xstart, ystart+qy, xstart+xsz, qy);  //ㅡ	


				mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+hy,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);

				}
		}
	}
	//초성 종성
	else if(myc=='ㄲ')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
			let hy=ysz/2;
			let qx=xsz/4;
			bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qx, ystart+ysz/2+ysz/2));
			rect(xstart, ystart+ysz/2, qx, ysz/2);
		
			bgsG(createVector(xstart+qx*2, ystart+ysz/2),createVector(xstart+qx*2+qx, ystart+ysz/2+ysz/2));
			rect(xstart+qx*2, ystart+ysz/2, qx, ysz/2);

 	}
	else if(myc=='ㄱㄱ') //ㄱ ㄱ의 크기 달리함 1:1, 1:2, 2:1, y축은 그대로 유지됨
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
			let hy=ysz/2; //y 축을 둘로 나눔
			let qx=xsz/4; //ㄱㄱ x축을 4으로 나눔
			let hhx=qx*random([1,2,3]); //최대 1:3, 3:1로 랜덤하게 크기를 나눔 
		
		//첫 ㄱ의 여백을 빼냄
			bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qx, ystart+ysz/2+ysz/2));
			//rect(xstart, ystart+ysz/2, qx, ysz/2);
		rect(xstart, ystart+ysz/2, hhx/2, ysz/2);

		// 두번째 ㄱ
			bgsG(createVector(xstart+qx*2, ystart+ysz/2),createVector(xstart+qx*2+qx, ystart+ysz/2+ysz/2));
		//	rect(xstart+qx*2, ystart+ysz/2, qx, ysz/2);
					rect(xstart+hhx, ystart+ysz/2, (xsz-hhx)/2, ysz/2);
 	}
	
		else if(myc=='ㄸ')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let ty=ysz/3;
			let tx=xsz/6;
		
			fill(jongbg);
			bgsG(createVector(xstart+tx*2, ystart+ty),createVector(xstart+tx*2+tx, ystart+ty+ty));
			rect(xstart+tx*2, ystart+ty, tx, ty)
			bgsG(createVector(xstart+tx*4, ystart+ty),createVector(xstart+tx*4+tx, ystart+ty+ty));
			rect(xstart+tx*5, ystart+ty, tx, ty)
	}
		
		else if(myc=='ㄷㄷ')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let ty=ysz/3;
			let tx=xsz/6;
			let hhx=random([xsz/3, xsz/2,  xsz*2/3]);  //최대 1:2, 1:1,  2:1로 랜덤하게 크기를 나눔 
			let tx1=hhx/3; //첫번째 ㄷ을 위해 3으로 나눔
			let tx2=(xsz-hhx)/3; //두번째 ㄷ을 위해 3으로 나눔

			fill(jongbg);
			bgsG(createVector(xstart+tx*2, ystart+ty),createVector(xstart+tx*2+tx, ystart+ty+ty));
		
			rect(xstart+tx1*2, ystart+ty, tx1, ty)
			bgsG(createVector(xstart+tx*4, ystart+ty),createVector(xstart+tx*4+tx, ystart+ty+ty));
			rect(xstart+hhx+tx2*2, ystart+ty, tx2, ty)
	}
	
	else if(myc=='ㅃ')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/4;
			let tx=xsz/6;
		
			fill(jongbg);
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
			rect(xstart+tx, ystart, tx, qy)
			bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
			rect(xstart+tx, ystart+qy*2, tx, qy)
		
			bgsG(createVector(xstart+tx*4, ystart),createVector(xstart+tx*4+tx, ystart+qy));
			rect(xstart+tx*4, ystart, tx, qy)
			bgsG(createVector(xstart+tx*4, ystart+qy*2),createVector(xstart+tx*4+tx, ystart+qy*2+qy));
			rect(xstart+tx*4, ystart+qy*2, tx, qy)

	}
		else if(myc=='ㅂㅂ')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/4;
			let tx=xsz/6;
			let hhx=random([xsz/3, xsz/2, xsz*2/3]); //1:2, 1:1, 2:1 첫 삼각형의 x 넓이
			let tx1=hhx/3;  //첫번째 ㅂ
			let tx2=(xsz-hhx)/3 ; //두번째 ㅂ
		
			fill(jongbg);
		//첫번째 ㅂ
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
			rect(xstart+tx1, ystart, tx1, qy)
			bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
			rect(xstart+tx1, ystart+qy*2, tx1, qy)
		//두번쨰 ㅂ
			bgsG(createVector(xstart+tx*4, ystart),createVector(xstart+tx*4+tx, ystart+qy));
			rect(xstart+hhx+tx2, ystart, tx2, qy)
			bgsG(createVector(xstart+tx*4, ystart+qy*2),createVector(xstart+tx*4+tx, ystart+qy*2+qy));
			rect(xstart+hhx+tx2, ystart+qy*2, tx2, qy)

	}
	
	
		else if(myc=='ㅆ')
	{
		let hh=xsz/4;
		setGradientFill(createVector(xstart+hh*2, ystart),createVector(xstart+hh*2, ystart+ysz));
		triangle(xstart+hh, ystart,    0, ystart+ysz,  xstart+hh*2, ystart+ysz);
		
		triangle(xstart+hh*3, ystart,    hh*2, ystart+ysz,  xstart+hh*4, ystart+ysz);
		
	}
			else if(myc=='ㅅㅅ')
	{
		let hh=xsz/4;
		let hhx=random([xsz/3, xsz/2, xsz*2/3]); //1:2, 1:1, 2:1 첫 삼각형의 x 넓이
		
		setGradientFill(createVector(xstart+hh*2, ystart),createVector(xstart+hh*2, ystart+ysz));
		triangle(xstart+hhx/2, ystart,     0, ystart+ysz,  xstart+hhx, ystart+ysz);
		triangle(xstart+hhx+(xsz-hhx)/2, ystart,     hhx, ystart+ysz,  xsz, ystart+ysz);
		
	}
	else if(myc=='ㅉ')
	{
	let ty=ysz/7;
				setGradientFill(createVector(xstart,ystart),createVector(xstart,ystart+ysz));
		rect(xstart,ystart, xsz, ty)
		
		let hh=xsz/4;
		//setGradientFill(createVector(hh,ty),createVector(hh, choy));
		triangle(xstart+hh, ystart+ty,    xstart, ystart+ysz,  xstart+hh*2, ystart+ysz);
		triangle(xstart+hh*3, ystart+ty,    xstart+hh*2, ystart+ysz,  xstart+hh*4, ystart+ysz);
	}
	
		else if(myc=='ㅈㅈ')
	{
	let ty=ysz/7;
		
				setGradientFill(createVector(xstart,ystart),createVector(xstart,ystart+ysz));
		rect(xstart,ystart, xsz, ty)
		
		let hh=xsz/4;
		let hhx=random([xsz/3, xsz/2, xsz*2/3]); //1:2, 1:1, 2:1 첫 삼각형의 x 넓이

		//setGradientFill(createVector(hh,ty),createVector(hh, choy));
		triangle(xstart+hhx/2, ystart+ty,    					 xstart, ystart+ysz, 	 xstart+hhx, ystart+ysz);
		triangle(xstart+hhx+(xsz-hhx)/2, ystart+ty,    hhx, ystart+ysz,  xsz, ystart+ysz);
	
	}
	
	
	else if(myc=='ㄶ') //	종성
	{
		//ㄴ
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz/2, ysz);
		
		  let hy=ysz/2;
			let hx=xsz/4;
		
			fill(jongbg);
							bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+hx, ystart+hy));
			rect(xstart+hx, ystart, hx, hy)
		
		//ㅎ
		
				hy=ysz/2; //1/2
				let qy=hy/2; //1/4
				setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
		//rect(xstart+hx*3-qy/2, ystart, qy, qy);  //ㅗ 
			rect(xstart+hx*3-hx/2, ystart, hx, qy);  //ㅗ 

		//setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, ystart+qy+qy));

		rect(xstart+hx*2, ystart+qy, xsz/2, qy);  //ㅡ
		mysz=min(ysz/2, xsz);  //
		//setGradientFill(createVector(xstart+xsz/2, qy*3),createVector(xstart+xsz/2+mysz, qy*3+mysz));
 		circle(xstart+hx*3, ystart+qy*3, mysz); //ㅇ
	
	}
	
	
	
	else if(myc=='ㄵ') //	종성
	{
		//ㄴ
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz/2, ysz);
		
		  let hy=ysz/2;
			let hx=xsz/4;
		
			fill(jongbg);
							bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+hx, ystart+hy));
			rect(xstart+hx, ystart, hx, hy)
		//ㅈ
		
		let ty=ysz/7;
		setGradientFill(createVector(xstart+xsz/2,ystart),createVector(xstart+xsz/2,ystart+ty));

		rect(xstart+xsz/2,ystart, xsz/2, ty)
		
		let hh=xsz/4;
		
		//setGradientFill(createVector(hh,ty),createVector(hh, choy));
		triangle(xstart+xsz/2+hh, ystart+ty,    xstart+xsz/2, ystart+ysz,  xstart+xsz/2+xsz/2, ystart+ysz);
		
		
	
	}
	
	else if(myc=='ㄺ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/5;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
		//ㅁ
			bgsG(createVector(xstart+tx*4, ystart+qy),createVector(xstart+tx*4+tx*3, ystart+qy*5));
			rect(xstart+tx*4, ystart+qy, tx*3, qy*4)
	}
	
	//'ㄿ'
	
	else if(myc=='ㄾ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/5;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
		
		//ㅌ
		  let fy=ysz/5;
			let hx=xsz/4;
		
			fill(jongbg);
											bgsG(createVector(xstart+hx*3, ystart+fy),createVector(xstart+hx+hx, ystart+fy+fy));

			rect(xstart+hx*3, ystart+fy, hx, fy)
													bgsG(createVector(xstart+hx*3, ystart+fy*3),createVector(xstart+hx+hx, ystart+fy*3+fy));

			rect(xstart+hx*3, ystart+fy*3, hx, fy)
		
	}
	
	else if(myc=='ㄿ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/5;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
		
		//ㅍ
			let ty=ysz/3;
			let fx=xsz/10;
		
			fill(jongbg);
			bgsG(createVector(xstart+xsz/2, ystart+ty),createVector(xstart+xsz/2+fx, ystart+ty+ty));
			rect(xstart+xsz/2, ystart+ty, fx, ty)
		
			bgsG(createVector(xstart+xsz/2+fx*2, ystart+ty),createVector(xstart+xsz/2+fx*2+fx, ystart+ty+ty));
			rect(xstart+xsz/2+fx*2, ystart+ty, fx, ty)
			bgsG(createVector(xstart+xsz/2+fx*4, ystart+ty),createVector(xstart+xsz/2+fx*4+fx, ystart+ty+ty));
			rect(xstart+xsz/2+fx*4, ystart+ty, fx, ty)
		
		
	}
	
				else if(myc=='ㄽ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz/2, ystart+ysz));
			rect(xstart,ystart, xsz/2, ysz);
		
		  let qy=ysz/5;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
 
		
		let hh=xsz/4;
		setGradientFill(createVector(xstart+hh*3, ystart),createVector(xstart+hh*3, ystart+ysz));
		triangle(xstart+hh*3, ystart,    xstart+hh*2, ystart+ysz,  xstart+hh*4, ystart+ysz);
	
		
	}
	
			else if(myc=='ㄻ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/5;
			let tx=xsz/8;
		

			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
		//ㅁ
		/* //위크기로 적용
			bgsG(createVector(xstart+tx*5, ystart+qy),createVector(xstart+tx*5+tx*2, ystart+qy*2));
			rect(xstart+tx*5, ystart+qy*2, tx*2, qy)
		*/
		
			let qqy=ysz/3;
			let qqx=xsz/3;
		
			bgsG(createVector(xstart+tx*5.5, ystart+qqy),createVector(xstart+tx*5.5+tx, ystart+qqy+qqy));
			rect(xstart+tx*5.5, ystart+qqy, tx, qqy)
	}
	
	
		
			else if(myc=='ㄼ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/5;
			let qqy=ysz/4;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
		//ㅂ
			bgsG(createVector(xstart+tx*5, ystart),createVector(xstart+tx*5+tx*2, ystart+qqy));
			rect(xstart+tx*5, ystart, tx*2, qqy)
			bgsG(createVector(xstart+tx*5, ystart+qqy*2),createVector(xstart+tx*5+tx*2, ystart+qqy*2+qqy));
			rect(xstart+tx*5, ystart+qqy*2, tx*2, qqy)
	}
	
	
	
	
	else if(myc=='ㅀ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz/2, ystart+ysz));
			rect(xstart,ystart, xsz/2, ysz);
		
		  let qy=ysz/5;
			let qqy=ysz/4;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));

			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
		//ㅎ
			//ㅎ
		
				hy=ysz/2; //1/2
				qy=hy/2; //1/4
			let hx=xsz/4;
				setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
		//rect(xstart+hx*3-qy/2, ystart, qy, qy);  //ㅗ 
					rect(xstart+hx*3-hx/2, ystart, hx, qy);  //ㅗ 

	
		//setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, ystart+qy+qy));

		rect(xstart+hx*2, ystart+qy, xsz/2, qy);  //ㅡ
		mysz=min(ysz/2, xsz);  //
		//setGradientFill(createVector(xstart+xsz/2, qy*3),createVector(xstart+xsz/2+mysz, qy*3+mysz));
 		circle(xstart+hx*3, ystart+qy*3, mysz); //ㅇ
		
	}
	
	 
	
	
				else if(myc=='ㅄ') //ㄱㄴ 모델
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz/2, ystart+ysz));
			rect(xstart,ystart, xsz/2, ysz);
		
		  let qy=ysz/5;
			let qqy=ysz/4;
			let tx=xsz/8;
		
			fill(jongbg);
															bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));
/*
			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
*/
		//ㅂ
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx*5+tx*2, ystart+qqy));
			rect(xstart+tx, ystart, tx*2, qqy)
			bgsG(createVector(xstart+tx*5, ystart+qqy*2),createVector(xstart+tx*5+tx*2, ystart+qqy*2+qqy));
			rect(xstart+tx, ystart+qqy*2, tx*2, qqy)
		
		let hh=xsz/4;
		setGradientFill(createVector(xstart+hh*3, ystart),createVector(xstart+hh*3, ystart+ysz));
		triangle(xstart+hh*3, ystart,    xstart+hh*2, ystart+ysz,  xstart+hh*4, ystart+ysz);
		
		
	}
	
					else if(myc=='ㄳ') //ㄱㄴ 모델

		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz/2, ystart+ysz));
			rect(xstart,ystart, xsz/2, ysz);
		
		  let ty=ysz/2;
			let qqy=ysz/4;
			let tx=xsz/2;
		
			fill(jongbg);
/*
			rect(xstart, ystart+qy, tx*2, qy)
			bgsG(createVector(xstart+tx*2, ystart+qy*3),createVector(xstart+tx*4, ystart+qy*3+qy));
			rect(xstart+tx*2, ystart+qy*3, tx*2, qy)
*/
		//ㄱ
			bgsG(createVector(xstart , ystart+ty),createVector(xstart+tx/2 , ystart+ty+ty)); 
			rect(xstart , ystart+ty, tx/2, ty) ;  ///왜 tx가 아니라 tx/2지? #QQQ
		
		
		let hh=xsz/4;
		setGradientFill(createVector(xstart+hh*3, ystart),createVector(xstart+hh*3, ystart+ysz));
		triangle(xstart+hh*3, ystart,    xstart+hh*2, ystart+ysz,  xstart+hh*4, ystart+ysz);
	
		
	}
	
	
	
	
	
			//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
 //rect(chojung,0, cellsz-chojung, choy)
	
}