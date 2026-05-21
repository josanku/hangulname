/*
복자음 닿소리 크기를 1:1, 1:2, 2:1로 변화 주도록 => 현재  ㄱㄱ , ㄷㄷ ㅅㅅ ㅈㅈ 구현했음 ,  구현하고  ㅈㅈ ㄹㅁ...등등 구현해야함 
//'ㆍ, ㆁ, ㆆ, ㅿ'
*/


function chojong_line2(x,ystart, myc, xsz, ysz, mymode)
			//chojong_line2(x,y,'ㄱ', xsz,ysz, mymode)
//function chojong_line(myc, ystart, mymode)

{	
	let jongbg=255;
	//let ystart;
	let xstart=x;
	//let xsz;
	//let ysz;
	//stroke(0);
 	//초성
	let diffcolor=0;   //ㅎㅊㅈ
	
/*
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
 
	}
	
	*/
	//print(myc);
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
	else
		noStroke()
 
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
	//print("CHOJONG_line2: "+myc);

	if(myc=='ㅁ채움')
	{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
 	}
	else if(myc=='ㅁ'|| myc=='ᄆ'||myc==	'ᆷ') //ᄆ
	{
			let hy=ysz/3;
			let hx=xsz/3;

		if(juldat==1)
		{
			noFill();
			rect(xstart+stsz,ystart+stsz, xsz-stsz*2, ysz-stsz*2)
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz)
			//fill(jongbg);

		if(random() <0.5)
 			bgsG(createVector(xstart+hx, ystart+hy),createVector(xstart+hx+hx, ystart+hy*2));
		else
		 	setGradientFill(createVector(xstart+hx,ystart+hy),createVector(xstart+hx, ystart+hy*2));
		rect(xstart+hx,ystart+hy, hx, hy)
		}
		
	}
	
		else if(myc=='ᄝ'||myc==	'ᇢ') //옛
	{
			let hy=ysz/4;
			let hx=xsz/3;

		if(juldat==1)
		{
			noFill();
			rect(xstart+stsz,ystart+stsz, xsz-stsz*2, ysz-hy-stsz*2)
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz-hy)
			//fill(jongbg);

		if(random() <0.5)
 			bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+hx, ystart+hy));
		else
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));

			rect(xstart+hx,ystart+hy, hx, hy)
			
			setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			circle(xstart+xsz/2,ystart+ysz-hy/2, hy)
		}
		
	}
	
		else if(myc=='ㄱ'|| myc=='ᆨ'||myc=='ᄀ')
	{
				if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		 //-
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz)
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
		else if(myc=='ㅋ'||myc=='ᄏ'||myc==	'ᆿ') //ᄏ
	{
		if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz)
			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)		

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
	
	
	else if(myc=='ㄴ'||myc=='ᄂ'||myc==	'ㄴ'||myc==' ᆫ'||myc=='ᆫ')
	{
		if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
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

	else if(myc=='ㄷ'||myc=='ᄃ'||myc==	'ᆮ')
	{
		if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
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
	
	
		else if(myc=='ㅌ'||myc=='ᄐ'|| myc==' ᇀ'|| myc==	'ᇀ') 
	{
				
		  let fy=ysz/5;
			let hx=xsz/2;
		
				if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
			
			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)

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
	
	 
		else if(myc=='ㄹ'||myc=='ᄅ'||myc==	'ᆯ') //ㄱㄴ 모델
	{
			let qy=ysz/5;
			let tx;
		if(juldat==1)
		{
					
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		 //-

			line(xstart+xsz-stsz, ystart+stsz, xstart+xsz-stsz, ystart+ysz/2); //|

			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)		 //-
			line(xstart+stsz, ystart+ysz/2, xstart+stsz, ystart+ysz-stsz); //|
			line(xstart+stsz,ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz)		 //_
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
			tx=xsz/7; // 반까지만
			//qy=ysz/10;
		}
		 
			bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));
			rect(xstart, ystart+qy, tx*2, qy)
		
			bgsG(createVector(xsz-tx*2, ystart+qy*3),createVector(xsz, ystart+qy*3+qy));
			rect(xstart+xsz-tx*2, ystart+qy*3, tx*2, qy)
		}
		
	}
	//ᄛ
	else if(myc=='ᄛ'||myc==	'ퟝ') //ㄱㄴ 모델 옛한글 ㄹ+ㅇ
	{
			let qy=ysz/6;
			let tx;
		if(juldat==1)
		{
					
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		 //-

			line(xstart+xsz-stsz, ystart+stsz, xstart+xsz-stsz, ystart+ysz/2); //|

			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)		 //-
			line(xstart+stsz, ystart+ysz/2, xstart+stsz, ystart+ysz-stsz); //|
			line(xstart+stsz,ystart+ysz-qy-stsz, xstart+xsz-stsz, ystart+ysz-qy-stsz)		 //_
 		}
		else
		{
			
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz-qy);
			let mysz=min(qy,xsz);
			circle(xstart+xsz/2,ystart+ysz-qy/2, mysz);


		
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
			tx=xsz/7; // 반까지만
			//qy=ysz/10;
		}
		 
			bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));
			rect(xstart, ystart+qy, tx*2, qy)
		
			bgsG(createVector(xsz-tx*2, ystart+qy*3),createVector(xsz, ystart+qy*3+qy));
			rect(xstart+xsz-tx*2, ystart+qy*3, tx*2, qy)
		}
		
	}
	 	
	
	else if(myc=='ㅂ'||myc=='ᄇ'||myc==' ᆸ' ||myc=='ᆸ') //||myc==	'ᆸ'
	{
				
		  let qy=ysz/4;
			let tx=xsz/3;		
		if(juldat==1)
		{
			//ㄴ
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅡ
			
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz) //오른 |
			line(xstart+stsz, ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2); //-
 		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);

			//fill(jongbg);
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
			rect(xstart+tx, ystart, tx, qy)
			
			
		if(random() <0.5)
			bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
		else
		 	setGradientFill(createVector(xstart+tx,ystart+qy*2),createVector(xstart+tx, ystart+qy*3));
		rect(xstart+tx, ystart+qy*2, tx, qy)
			
		}
	}
	//ㅸ
				else if(myc=='ㅸ'||myc=='ᄫ'||myc==	'ᇦ')
	{
				
		  let qy=ysz/5;
			let tx=xsz/3;		
		if(juldat==1)
		{
			//ㄴ
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-qy-stsz); //ㅡ
			
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz) //오른 |
			line(xstart+stsz, ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2); //-
			noFill()
			circle(xstart+xsz/2, ystart+qy*4+qy/2, qy); //확인 안했음
 		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz-qy);
			let myr=min(qy, tx);
			circle(xstart+myr/2, ystart+qy*4+myr/2, myr); //확인 안했음

			fill(jongbg);
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
			rect(xstart+tx, ystart, tx, qy)
			bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
			rect(xstart+tx, ystart+qy*2, tx, qy)
		}
	}
	
		else if(myc=='ㅍ'||myc=='ᄑ'||myc==	'ᇁ')
	{
		 	let ty=ysz/3;
			let fx=xsz/5;
		
					if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		 //-

			line(xstart+fx-stsz, ystart+stsz, xstart+fx-stsz, ystart+ysz-stsz);
			line(xstart+fx*4-stsz, ystart+stsz, xstart+fx*4-stsz, ystart+ysz-stsz);

			line(xstart+stsz,ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz)		 //_

			
 		}
		else
		{
			setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		

		
			fill(jongbg);
			bgsG(createVector(xstart, ystart+ty),createVector(xstart+fx, ystart+ty+ty));
			rect(xstart, ystart+ty, fx, ty)
			
			//ㅁ
						
			if(random() <0.5)
				bgsG(createVector(xstart+fx*2, ystart+ty),createVector(xstart+fx*2+fx, ystart+ty+ty));
			else
				setGradientFill(createVector(xstart+fx*2.5,ystart+ty),createVector(xstart+fx*2.5, ystart+ty*2));
			rect(xstart+fx*2, ystart+ty, fx, ty)
			
			
			bgsG(createVector(xstart+fx*4, ystart+ty),createVector(xstart+fx*4+fx, ystart+ty+ty));
			rect(xstart+fx*4, ystart+ty, fx, ty)
		}
	}
	//ᅗ
	
			else if(myc=='ᅗ'||myc==	'ᇴ')
	{
		 	let ty=ysz/4;
			let fx=xsz/5;
					if(juldat==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		 //-

			line(xstart+fx-stsz, ystart+stsz, xstart+fx-stsz, ystart+ysz-stsz);
			line(xstart+fx*4-stsz, ystart+stsz, xstart+fx*4-stsz, ystart+ysz-stsz);

			line(xstart+stsz,ystart+ysz-ty-stsz, xstart+xsz-stsz, ystart+ysz-ty-stsz)		 //_

			
 		}
		else
		{
			setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz-ty);
			let mysz=min(ty, xsz);
			circle(xstart+xsz/2,ystart+ysz-ty/2, ty);
		
			fill(jongbg);
			bgsG(createVector(xstart, ystart+ty),createVector(xstart+fx, ystart+ty+ty));
			rect(xstart, ystart+ty, fx, ty)
			bgsG(createVector(xstart+fx*2, ystart+ty),createVector(xstart+fx*2+fx, ystart+ty+ty));
			rect(xstart+fx*2, ystart+ty, fx, ty)
			bgsG(createVector(xstart+fx*4, ystart+ty),createVector(xstart+fx*4+fx, ystart+ty+ty));
			rect(xstart+fx*4, ystart+ty, fx, ty)
			
		}
	}
	
	else if(myc=='ㅇ'|| myc=='ᄋ'||myc==	'ᆼ'||myc=='ᆼ')  
	{
		if(juldat==1)
		{

		mysz=min(ysz, xsz); 
		noFill();
						//fill('blue');
 		circle(xstart+xsz/2, ystart+ysz/2, mysz-stsz*2); //ㅇ
 
		}
		else
		{
		mysz=min(ysz, xsz); 
		
		setGradientFill(createVector(xsz/2, ystart+ysz/2-mysz/2),createVector(xsz/2, ystart+ysz/2+mysz/2));
 		circle(xstart+xsz/2, ystart+ysz/2, mysz); //ㅇ
		}
	}
	else if(myc=='ㅎ'|| myc=='ᄒ'||myc==	'ᇂ')
	{
		let hy=ysz/2; //1/2
		let qy=hy/2; //1/4
//p5.js에서는 strokeCap() 함수를 사용하여 선의 끝  ROUND, SQUARE, 그리고 PROJECT.
		if(juldat==1)
		{
				line(xstart+xsz/2, ystart+stsz, xstart+xsz/2, ystart+qy) //
				line(xstart+stsz,ystart+qy, xstart+xsz-stsz, ystart+qy)
				noFill();
				//fill('blue');
				mysz=min(ysz*2/3, xsz);  //
				//circle(xsz/2, ystart+ysz*2/3, mysz-sw); //ㅇ
				ellipse(xstart+xsz/2, ystart+ysz*2/3, mysz-stsz*2,mysz-stsz*2); //ㅇ

		}
		else
		{
			if(diffcolor==1)
			{
			setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
			rect(xstart+xsz/2-qy/4, ystart, qy/2, qy);  //ㅗ 

			//line(xsz/2, 0, xsz/2, qy)

			setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, ystart+qy+qy));

			rect(0, ystart+qy, xsz, qy);  //ㅡ
			//line(0,qy, xsz, qy)
			mysz=min(ysz/2, xsz);  //
			setGradientFill(createVector(xstart+xsz/2, qy*3),createVector(xstart+xsz/2+mysz, qy*3+mysz));
			circle(xstart+xsz/2, ystart+qy*3, mysz); //ㅇ
			}
			else
			{
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
		//	rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

			//rect( xsz/2-xsz/16,  ystart, xsz/8, qy);  //ㅗ  /NEW => ㅎ
			let headxsz=min(qy, xsz/2);
			if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
				rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
			else //기하학적 미를 위해서 x를 넓게
				rect( xstart+ xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ


			rect(xstart, ystart+qy, xsz, qy);  //ㅡ
			mysz=min(ysz/2, xsz);  //
			circle(xstart+xsz/2, ystart+qy*3, mysz); //ㅇ
			}
		}
	}
	
	//ᅙㆆ
		else if(myc=='ᅙ' || myc=='ㆆ'||myc==	'ᇹ')//||myc==	'ᇹ'
	{
		let hy=ysz/2; //1/2
		let qy=ysz/3; //1/3
//p5.js에서는 strokeCap() 함수를 사용하여 선의 끝  ROUND, SQUARE, 그리고 PROJECT.
		if(juldat==1)
		{
				line(xstart+xsz/2, ystart+stsz, xstart+xsz/2, ystart+qy) //
				line(xstart+stsz,ystart+qy, xstart+xsz-stsz, ystart+qy)
				noFill();
				//fill('blue');
				mysz=min(ysz*2/3, xsz);  //
				//circle(xsz/2, ystart+ysz*2/3, mysz-sw); //ㅇ
				ellipse(xstart+xsz/2, ystart+ysz*2/3, mysz-stsz*2,mysz-stsz*2); //ㅇ

		}
		else
		{
			if(diffcolor==1)
			{
			setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
			rect(xstart+xsz/2-qy/4, ystart, qy/2, qy);  //ㅗ 

			//line(xsz/2, 0, xsz/2, qy)

			setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, ystart+qy+qy));

			rect(0, ystart+qy, xsz, qy);  //ㅡ
			//line(0,qy, xsz, qy)
			mysz=min(ysz/2, xsz);  //
			setGradientFill(createVector(xstart+xsz/2, qy*3),createVector(xstart+xsz/2+mysz, qy*3+mysz));
			circle(xstart+xsz/2, ystart+qy*3, mysz); //ㅇ
			}
			else
			{
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
		//	rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

			//rect( xsz/2-xsz/16,  ystart, xsz/8, qy);  //ㅗ  /NEW => ㅎ
			let headxsz=min(qy, xsz/2);
				/*
			if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
				rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
			else //기하학적 미를 위해서 x를 넓게
				rect( xstart+ xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ
*/
				mysz=min(qy*2, xsz);  //

				if(random()<0.7)
					rect(xstart, ystart, xsz, qy);  //ㅡ
				else  //x축이 클경우 y축 크기 만큼의 원 크기로 ㅡ 폭을 줄여줌
					rect(xstart+xsz/2-mysz/2, ystart, mysz, qy);  //ㅡ

					

		//	rect(xstart, ystart+qy, xsz, qy);  //ㅡ
			circle(xstart+xsz/2, ystart+qy*2, mysz); //ㅇ
			}
		}
	}
	//ᅌ  //옛이응
			else if(myc=='ㆁ' || myc=='ᅌ'|| myc=='ᇰ') //옛이응ㅊ  ||myc==	'ᇰ'
	{
		let hy=ysz/1.3; //1/2
		let qy=ysz/1.3; //1/3
		let qq=xsz/4;
//p5.js에서는 strokeCap() 함수를 사용하여 선의 끝  ROUND, SQUARE, 그리고 PROJECT.
		if(juldat==1)
		{
				line(xstart+xsz/2, ystart+stsz, xstart+xsz/2, ystart+qy) //
				line(xstart+stsz,ystart+qy, xstart+xsz-stsz, ystart+qy)
				noFill();
				//fill('blue');
				mysz=min(ysz*2/3, xsz);  //
				//circle(xsz/2, ystart+ysz*2/3, mysz-sw); //ㅇ
				ellipse(xstart+xsz/2, ystart+ysz*2/3, mysz-stsz*2,mysz-stsz*2); //ㅇ

		}
		else
		{
			if(diffcolor==1)
			{
			setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
			rect(xstart+xsz/2-qy/4, ystart, qy/2, qy);  //ㅗ 

			//line(xsz/2, 0, xsz/2, qy)

			setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, ystart+qy+qy));

			rect(0, ystart+qy, xsz, qy);  //ㅡ
			//line(0,qy, xsz, qy)
			mysz=min(ysz/2, xsz);  //
			setGradientFill(createVector(xstart+xsz/2, qy*3),createVector(xstart+xsz/2+mysz, qy*3+mysz));
			circle(xstart+xsz/2, ystart+qy*3, mysz); //ㅇ
			}
			else
			{
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
		//	rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

			//rect( xsz/2-xsz/16,  ystart, xsz/8, qy);  //ㅗ  /NEW => ㅎ
			let headxsz=min(qy, xsz/2);
				/*
			if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
				rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
			else //기하학적 미를 위해서 x를 넓게
				rect( xstart+ xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ
*/
					mysz=min(qy, xsz/2);  //
					rect(xstart+xsz/2-mysz/8, ystart, mysz/4, qy/2);  //ㅡ

		//	rect(xstart, ystart+qy, xsz, qy);  //ㅡ
			circle(xstart+xsz/2, ystart+qy/2+mysz/4, mysz); //ㅇ
			}
		}
	}
	
	else if(myc=='ㅅ' || myc=='ᄉ'||myc==' ᆺ'||myc==' ᆺ'||myc=='ᆺ') //?ᄾ ᄉ||myc==	'ᆺ'
	{

		let hh=xsz/2;
		if(juldat==1)
		{
				noFill();
				triangle(xstart+hh+stsz, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.4, ystart+ysz-stsz);
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
			triangle(xstart+hh, ystart,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
	}
	//
		else if(myc=='ㅿ'||myc=='ᅀ'||myc=='ᇫ') //여린ㅅ
	{
		let hh=xsz/2;
		let xqq=hh/4;
		let yqq=ysz/8;
		if(juldat==1)  //ㅅ과 구분 안됨...구분해야함
		{
				noFill();
				triangle(xstart+hh+stsz, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.4, ystart+ysz-stsz);
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
			triangle(xstart+hh, ystart,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
			
			fill(bgcolor)
			noStroke();
			triangle(xstart+hh, ystart+ysz/1.7-yqq,    xstart+hh-xqq,  ystart+ysz/1.7+yqq,  xstart+hh+xqq, ystart+ysz/1.7+yqq);
		}
	}
	//ᄼ
		else if(myc=='ᄼ') //ᄼ 옛한글
	{
		let hh=xsz/2;
		let qq=hh/2;
		if(juldat==1) //?
		{
				noFill();
				triangle(xstart+hh+stsz, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.4, ystart+ysz-stsz);
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
			triangle(xstart+hh, ystart,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
			fill(bgcolor)
			//fill(0);
			noStroke();
						
			bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qq, ystart+ysz/2+ysz/2));
			quad(xstart+qq, ystart+ysz,     xstart+qq*2, ystart+ysz/2,     xstart+qq*3, ystart+ysz/2,   xstart+xsz, ystart+ysz);
			
		}
	}
	//ᄾ
	else if(myc=='ᄾ') //ᄾ 옛한글
	{
		let hh=xsz/2;
		let qq=hh/2;
		if(juldat==1) //?
		{
				noFill();
				triangle(xstart+hh+stsz, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.4, ystart+ysz-stsz);
		}
		else
		{	
			setGradientFill(createVector(xstart+xsz/2, ystart),createVector(xstart+xsz/2, ystart+ysz));
			triangle(xstart+hh, ystart,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
			
			fill(bgcolor)  ///두번째에는 fill이 동작하지 않아 bgsG로 처리함 ??????????????????
			noStroke();
			bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qq, ystart+ysz/2+ysz/2));
			quad(xstart, ystart+ysz,     xstart+qq, ystart+ysz/2,     xstart+qq*2, ystart+ysz/2,   xstart+xsz-qq, ystart+ysz);
		}
	}

			else if(myc=='ㅈ'|| myc=='ᄌ'|| myc==' ᆽ'||myc=='ᆽ') //||myc==	'ᆽ'ㅑ myc='ᆽ'
	{
	
		let ty=ysz/4;
		let hh=xsz/2;
		if(juldat==1)
		{
				line(xstart+stsz,ystart+stsz, xstart+xsz-stsz,ystart+stsz);
							//strokeCap(ROUND) 
			//fill('green');
			noFill();
				triangle(xstart+hh, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.5, ystart+ysz-stsz);
			fill(bgcolor)
			noStroke();
			let bsz=min(stsz*2, ymargin);
			//rect(xstart, ystart-bsz, xsz, bsz); //꽃지점 생기는 현상 방지
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
	
	else if(myc=='ᅐ') //옛한글 ᅐ //ᅎ
	{
	
		let ty=ysz/4;
		let hh=xsz/2;
		let qq=hh/2;
		if(juldat==1)
		{
				line(xstart+stsz,ystart+stsz, xstart+xsz-stsz,ystart+stsz);
							//strokeCap(ROUND) 
			//fill('green');
			noFill();
				triangle(xstart+hh, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.5, ystart+ysz-stsz);
			fill(bgcolor)
			noStroke();
			let bsz=min(stsz*2, ymargin);
			//rect(xstart, ystart-bsz, xsz, bsz); //꽃지점 생기는 현상 방지
		}
		else
		{
			setGradientFill(createVector(xstart,ystart),createVector(xstart,ystart+ysz));
			rect(xstart,ystart, xsz, ty)
			//setGradientFill(createVector(hh,ty),createVector(hh, choy));
			triangle(xstart+hh, ystart+ty,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
		
			bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qq, ystart+ysz/2+ysz/2));
			quad(xstart, ystart+ysz,     xstart+qq*0.7, ystart+ysz/1.5,     xstart+qq*2, ystart+ysz/1.5,   xstart+xsz-qq, ystart+ysz);

		}
		
	else if(myc=='ᅎ') //옛한글 //
	{
	
		let ty=ysz/4;
		let hh=xsz/2;
		let qq=hh/2;
		if(juldat==1)
		{
				line(xstart+stsz,ystart+stsz, xstart+xsz-stsz,ystart+stsz);
							//strokeCap(ROUND) 
			//fill('green');
			noFill();
				triangle(xstart+hh, ystart+stsz*4,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.5, ystart+ysz-stsz);
			fill(bgcolor)
			noStroke();
			let bsz=min(stsz*2, ymargin);
			//rect(xstart, ystart-bsz, xsz, bsz); //꽃지점 생기는 현상 방지
		}
		else
		{
			setGradientFill(createVector(xstart,ystart),createVector(xstart,ystart+ysz));
			rect(xstart,ystart, xsz, ty)
			//setGradientFill(createVector(hh,ty),createVector(hh, choy));
			triangle(xstart+hh, ystart+ty,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
		
			bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qq, ystart+ysz/2+ysz/2));
			quad(xstart+qq, ystart+ysz,     xstart+qq*2, ystart+ysz/1.5,     xstart+qq*3.2, ystart+ysz/1.5,   xstart+xsz, ystart+ysz);

		}
	
	else if(myc=='ㅊ'|| myc=='ᄎ'||myc==	'ᆾ')
	{
		let hy=ysz/2; //1/2
		let qy=hy/2; //1/4
		
		if(juldat==1)
		{
				line(xsz/2, ystart+stsz, xsz/2,  ystart+qy) //|
				line(stsz, ystart+qy, xsz-stsz,  ystart+qy)		//ㅡ
				noFill();
				mysz=min(ysz*2/3, xsz); 
							//mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+qy+stsz*2,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.5, ystart+ysz-stsz);

			
		}
		else 
		{

				if(diffcolor==1)
				{
				setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
				//rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

							let headxsz=min(qy, xsz/2);
				if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
					rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
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
					rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
				else //기하학적 미를 위해서 x를 넓게
					rect( xstart+xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ

				//setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, qy));
				rect(xstart, ystart+qy, xsz, qy);  //ㅡ	


				mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+hy,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);

				}
		}
	}
	
	
	else if(myc=='ᅔ') //옛 ᅔ
	{
		let hy=ysz/2; //1/2
		let qy=hy/2; //1/4
		
		if(juldat==1)
		{
				line(xsz/2, ystart+stsz, xsz/2,  ystart+qy) //|
				line(stsz, ystart+qy, xsz-stsz,  ystart+qy)		//ㅡ
				noFill();
				mysz=min(ysz*2/3, xsz); 
							//mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+qy+stsz*2,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.5, ystart+ysz-stsz);

			
		}
		else 
		{

				if(diffcolor==1)
				{
				setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
				//rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

							let headxsz=min(qy, xsz/2);
				if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
					rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
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
					rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
				else //기하학적 미를 위해서 x를 넓게
					rect( xstart+xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ

				//setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, qy));
				rect(xstart, ystart+qy, xsz, qy);  //ㅡ	


				mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+hy,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
							 let qq=xsz/4;

				bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qq, ystart+ysz/2+ysz/2));
				quad(xstart+qq, ystart+ysz,     xstart+qq*2, ystart+ysz/1.3,     xstart+qq*3.4, ystart+ysz/1.3,   xstart+xsz, ystart+ysz);

				}
		}
	}
	
		else if(myc=='ᅕ') //옛 ᅕ
	{
		let hy=ysz/2; //1/2
		let qy=hy/2; //1/4
		
		if(juldat==1)
		{
				line(xsz/2, ystart+stsz, xsz/2,  ystart+qy) //|
				line(stsz, ystart+qy, xsz-stsz,  ystart+qy)		//ㅡ
				noFill();
				mysz=min(ysz*2/3, xsz); 
							//mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+qy+stsz*2,    xstart+stsz*1.5, ystart+ysz-stsz,  xstart+xsz-stsz*1.5, ystart+ysz-stsz);

			
		}
		else 
		{

				if(diffcolor==1)
				{
				setGradientFill(createVector(xsz/2-qy/2, ystart),createVector(xsz/2-qy/2, ystart+qy));
				//rect(xsz/2-qy/2, ystart, qy, qy);  //ㅗ 

							let headxsz=min(qy, xsz/2);
				if(random()<0.6)  //훈민정음에 따라서... 하늘로 솟는 x크기를 작게
					rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
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
					rect( xstart+xsz/2-headxsz/2,  ystart, headxsz, qy);  //ㅗ  /NEW => ㅎ
				else //기하학적 미를 위해서 x를 넓게
					rect( xstart+xsz/4,  ystart, xsz/2, qy);  //ㅗ  /NEW => ㅎ

				//setGradientFill(createVector(xstart, ystart+qy),createVector(xstart+xsz, qy));
				rect(xstart, ystart+qy, xsz, qy);  //ㅡ	


				mysz=min(ysz/2, xsz);  //
				let hh=xsz/2;
				//setGradientFill(createVector(xstart+hh, ystart+hy),createVector(xstart+hh, ysz));
				triangle(xstart+hh, ystart+hy,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
							 let qq=xsz/4;

				bgsG(createVector(xstart, ystart+ysz/2),createVector(xstart+qq, ystart+ysz/2+ysz/2));
			quad(xstart, ystart+ysz,     xstart+qq*0.7, ystart+ysz/1.3,     xstart+qq*2, ystart+ysz/1.3,   xstart+xsz-qq, ystart+ysz);

				}
		}
	}
	
	//초성 종성
	else if(myc=='ㄲ'||myc=='ᄁ')
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
	
		else if(myc=='ㄸ'|| myc=='ᄄ')
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
	//ᄬ
		else if(myc=='ᄬ') //ㅃㅇ 옛한글
	{
			let qy=ysz/5;
			let tx=xsz/6;
		
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz-qy);
		  let mysz=min(xsz, qy);
					circle(xstart+xsz/2,ystart+ysz-qy/2, qy);

		

		
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
	
	
		else if(myc=='ㅆ'||myc==	'ᆻ')
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
	else if(myc=='ㅉ'||myc==	'ퟹ') //종||myc==	'ퟹ'
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