
//이임 케이스 ///////////////////////////////////////////////////
function dns_en(x, y, mychar)
{
		xstart=0;
		ystart=0;
		xsz=xw;
		ysz=yw;
	let jongbg=255;
	
	if(julen==1)
		{
					strokeCap(PROJECT) 
				//let sw=min(xsz,ysz)/10;
				strokeWeight(stsz);
				stroke(random(colors));
		}
	else
	{
		fill(random(colors));
		noStroke();
	}
 
	
push()
	translate(x, y);
 	let jungtype;
	

	//let choyt=random(cellsz/4, cellsz*3/4);
	 if(mychar=='A'||mychar=='a')
	{
		let hh=xsz/2;
		if(julen==1)
		{
				noFill();
				line(xstart+hh, ystart+stsz/2,  xstart+stsz/2, ystart+ysz-stsz/2) // /
				line(xstart+hh, ystart+stsz/2,  xstart+xsz-stsz/2, ystart+ysz-stsz/2) //\
				line(xstart+xsz/4, ystart+ysz/2,  xstart+xsz*3/4, ystart+ysz/2) // -

		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
			triangle(xstart+hh, ystart,    xstart, ystart+ysz,  xstart+xsz, ystart+ysz);
		}
	}
	
		else if(mychar=='B' ||mychar=='b') // ㄷ 
	{
				
		  let qy=ysz/5;
			let tx=xsz/3;		
		if(julen==1)
		{
			 
			line(xstart+stsz, ystart+stsz, xstart+xsz-stsz, ystart+stsz); //-
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
			
			line(xstart+stsz, ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2); //-
			
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz) //오른 |
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅡ

 		}
		else
		{
			if(random()<0.5)
			{
				noStroke();
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart,ystart, xsz, ysz);

				fill(jongbg);
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
				rect(xstart+tx, ystart+qy, tx, qy)

				bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
				rect(xstart+tx, ystart+qy*3, tx, qy)
			}	
			else //arc
			{
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart, ystart, xstart+tx*2.25+1, ystart+qy*3);
				arc(xstart+tx*2.25, ystart+qy*2.5/2, xsz/2, qy*2.5, 270, 90, OPEN); //, [mode], [detail])
				//rect(xstart,ystart, xsz/2, ysz);
				//fill('red');
				
				rect(xstart, ystart+qy*2.5, xstart+tx*2.25+1, ystart+qy*2.5);
				//arc(xstart+tx*2.25, ystart+qy*3, xsz/2, qy*3, 270, 90, OPEN); //, [mode], [detail])
				arc(xstart+tx*2.25, ystart+qy*4-qy/4, xsz/2, qy*2.5, 270, 90, OPEN); //, [mode], [detail])

				
				//rect(xstart, ystart, tx, ysz);
				
				//rect(xstart+xsz-tx, ystart+ysz/2+qy/2, tx, ysz/2-qy/2);

				fill(jongbg);
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
				arc(xstart+tx*1.7, ystart+qy*3/2, tx/2, qy, 270, 90, OPEN); //, [mode], [detail])
				rect(xstart+tx, ystart+qy, tx*0.7+1, qy);
				
				arc(xstart+tx*1.7, ystart+qy*4-qy/2, tx/2, qy, 270, 90, OPEN); //, [mode], [detail])
				rect(xstart+tx, ystart+qy*3, tx*0.7+1, qy);

				
				
			}
		}
	}
	
		else if(mychar=='C' ||mychar=='c') // ㄷ 
	{
		let ty=ysz/3;
		let tx=xsz/2;
		
		if(julen==1)
		{
			if(random()<0.5)
			{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
			}
			else //ARC
			{
			//CHORD, PIE or OPEN
			//arc(xstart+xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2, 180-90, 360-90); //, [mode], [detail])
			
			noFill();
			arc(xstart+xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2, 180-90, 360-90, OPEN); //, [mode], [detail])
			line(xstart+xsz/2, ystart+stsz, xstart+xsz-stsz, ystart+stsz) ; 
			line(xstart+xsz/2, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz) ; 
			}

		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			if(random()<0.5)
			{
				rect(xstart,ystart, xsz, ysz);
				fill(jongbg);
				bgsG(createVector(xstart+tx*2, ystart+ty),createVector(xstart+tx*2+tx, ystart+ty+ty));
				rect(xstart+tx, ystart+ty, tx, ty)
			}
			else //ARC
			{
				arc(xstart+xsz/2, ystart+ysz/2, xsz, ysz, 180-90, 360-90, OPEN); //, [mode], [detail])
				rect(xstart+xsz/2,ystart, xsz/2, ysz);
				
				bgsG(createVector(xstart+tx*2, ystart+ty),createVector(xstart+tx*2+tx, ystart+ty+ty));
				arc(xstart+tx*1.3, ystart+ty*1.5, tx, ty, 180-90, 360-90, OPEN); //, [mode], [detail])
				rect(xstart+tx*1.3-1, ystart+ty, tx, ty) //-1 미세라인 줄이기 위해서

			}

		}
		
	}
	else if(mychar=='D' ||mychar=='d') //아
	{
			let hy=ysz/3;
			let hx=xsz/3;

		if(julen==1)
		{
			if(random()<0.5)
			{
				noFill();
				rect(xstart+stsz,ystart+stsz, xsz-stsz*2, ysz-stsz*2)
			}
			else //ARC
			{
				//CHORD, PIE or OPEN
				//arc(xstart+xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2, 180-90, 360-90); //, [mode], [detail])

				noFill();
				line(xstart+stsz, ystart+stsz, xstart+stsz, ystart+ysz-stsz) ; 
				arc(xstart+xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2, 270, 90, OPEN); //, [mode], [detail])
				line(xstart+stsz, ystart+stsz, xstart+xsz/2, ystart+stsz) ; 
				line(xstart+stsz, ystart+ysz-stsz, xstart+xsz/2, ystart+ysz-stsz) ; 

			}
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			
			if(random()<0.5)
			{
				rect(xstart,ystart, xsz, ysz)
				
				bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+hx, ystart+hy));
				rect(xstart+hx,ystart+hy, hx, hy)

			}
			else //arc
			{

				arc(xstart+xsz/2, ystart+ysz/2, xsz, ysz, 270, 90, OPEN); //, [mode], [detail])
				rect(xstart,ystart, xsz/2, ysz);
					
				bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+hx, ystart+hy));
				rect(xstart+hx,ystart+hy, hx*0.4, hy)
				arc(xstart+hx*1.39, ystart+hy*1.5, hx, hy, 270, 90, OPEN); //, [mode], [detail])

			}

		}
		
	}
			else if(mychar=='E'||mychar=='e')
	{
				
		  let fy=ysz/5;
			let hx=xsz/2;
		
				if(julen==1)
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
			else if(mychar=='F'||mychar=='f')
	{
				
		  let fy=ysz/5;
			let hx=xsz/2;
		
				if(julen==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
			//line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
			
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

			rect(xstart+hx, ystart+fy*3, hx, fy*2)
		}

	}
	else if(mychar=='G'||mychar=='g')
	{
				
		  let fy=ysz/5;
			let hx=xsz/3;
		
				if(julen==1)
		{
			if(random()<0.5)
			{
				line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)
				line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
				line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
				
				line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)
				line(xstart+xsz-stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz-stsz)
			}
			else //ARC
			{
			//CHORD, PIE or OPEN
			//arc(xstart+xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2, 180-90, 360-90); //, [mode], [detail])
			
			noFill();
			arc(xstart+xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2, 180-90, 360-90, OPEN); //, [mode], [detail])
			line(xstart+xsz/2, ystart+stsz, xstart+xsz-stsz, ystart+stsz) ; 
			line(xstart+xsz/2, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz) ; 
				
			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)
			line(xstart+xsz-stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz-stsz)
			}	 

		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
 			if(random()<0.5)
			{
				rect(xstart,ystart, xsz, ysz);
				fill(jongbg);
				bgsG(createVector(xstart+hx, ystart+fy),createVector(xstart+hx+hx, ystart+fy+fy));
				rect(xstart+hx, ystart+fy, hx*2, fy)

				bgsG(createVector(xstart+hx, ystart+fy*3),createVector(xstart+hx+hx, ystart+fy*3+fy));
				rect(xstart+hx, ystart+fy*3, hx, fy)
			}
			else //ARC
			{
				arc(xstart+xsz/2, ystart+ysz/2, xsz, ysz, 180-90, 360-90, OPEN); //, [mode], [detail])
				rect(xstart+xsz/2,ystart, xsz/2, ysz);
				
				fill(jongbg);
				bgsG(createVector(xstart+hx, ystart+fy),createVector(xstart+hx+hx, ystart+fy+fy));
				
				arc(xstart+hx*1.6, ystart+fy*2, hx*1.3, fy*2, 180, 360-90); //, [mode], [detail])
				rect(xstart+hx*1.6-1, ystart+fy, hx*1.9, fy)

			//	arc(xstart+hx*1.6, ystart+fy*1.5, hx, fy, 180-90, 360-90, OPEN); //, [mode], [detail])

				bgsG(createVector(xstart+hx, ystart+fy*3),createVector(xstart+hx+hx, ystart+fy*3+fy));
				//arc(xstart+hx*1.6, ystart+fy*3.5, hx*0.8, fy, 180-90, 360-90, OPEN); //, [mode], [detail])
				arc(xstart+hx*1.6, ystart+fy*3, hx*1.3, fy*2, 180-90, 360-90-90); //, [mode], [detail])
				rect(xstart+hx*1.6-1, ystart+fy*3, hx*0.6, fy)

				//rect(xstart+hx*3, ystart+fy, hx*1.9, fy)
//fill('red');

			}
		}

	}
	
	
		else if(mychar=='H' ||mychar=='h') //
	{
				
		  let qy=random(ysz/4, ysz/3);
			let tx=random(xsz/4, xsz/3);	
		
		
		if(julen==1)
		{
			//ㄴ
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
			//line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅡ
			line(xstart+stsz, ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2); //-

			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz) //오른 |
 		}
		else
		{		 	
			noStroke();
			setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			//fill("red");
			rect(xstart,ystart, xsz, ysz);
			fill(jongbg);
			bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
			
			rect(xstart+tx, ystart, xstart+xsz-tx*2, qy)
			bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
			rect(xstart+tx, ystart+ysz-qy, xstart+xsz-tx*2, qy)
		}
	}
	
	
		else if(mychar=='I' ||mychar=='i') //
	{
		if(julen==1)
		{
			//ㄴ
			line(xstart+xsz/2,ystart+stsz, xstart+xsz/2, ystart+ysz-stsz) //|
 		}
		else
		{		 	
			let xwide=random(xsz/3, xsz/7);
						noStroke();

			setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			//fill("red");
			rect(xstart+xsz/2-xwide/2,ystart, xwide, ysz);
		}
		
	}
	
		else if(mychar=='J' ||mychar=='j') //아
		{
				let hy=int(random(ysz*2/3, ysz*3/4));
				let hx=int(random(xsz/4, xsz/2));
			
			if(julen==1) // 줄 en
			{
				if(random()<0.5)
				{
				line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅣ
				line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz); //_
				}
				else //arc
				{
				hy=ysz/3;
					noFill();
					arc(xstart+xsz/2, ystart+hy*2, xsz-stsz*2, hy*2, 270+90, 90+90); //, [mode], [detail])
				//	arc(xstart+xsz/2, ystart+ysz-hy/2, xsz-stsz*2, hy, 270+90, 90+90); //, [mode], [detail])

					//line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-(ysz-hy))
					line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+hy*2)			 
				}
				
			}
			else
			{
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart,ystart, xsz, ysz);



				fill(jongbg);
								bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));
				rect(xstart, ystart, xsz-hx, hy)
			}
		}
	
		else if(mychar=='K' ||mychar=='k') //아
		{
			if(julen==1) // 줄 en
			{
				line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) ;//ㅣ
				line(xstart+xsz-stsz,ystart+stsz, xstart+stsz, ystart+ysz/2) ;// /
				line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz-stsz) ;// /
			}
			else
			{
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart,ystart, xsz, ysz);


				let tx=xsz/3;
				let ty=ysz/3;

				fill(jongbg);				
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+(xsz-tx), ystart+ty));
				triangle(xstart+xsz, ystart,      xstart+xsz-tx*1.3,  ystart+ysz/2,      xstart+xsz, ystart+ysz);
											
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+(xsz-tx), ystart+ty));
				triangle(xstart+tx, ystart,      xstart+tx*2,  ystart,       xstart+tx, ystart+ty);	
				
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+(xsz-tx), ystart+ty));
				triangle(xstart+tx, ystart+ty*2,      xstart+tx*2,  ystart+ysz,       xstart+tx, ystart+ysz);
				
			}
		}
	
	
		else if(mychar=='L' ||mychar=='l') //아
		{
			if(julen==1) // 줄 en
			{
				line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz); //ㅣ
				line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
			}
			else
			{
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart,ystart, xsz, ysz);

				let hy=int(random(ysz/2, ysz*2/3));
				let hx=int(random(xsz/4, xsz/2));

				fill(jongbg);
								bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));

				rect(xstart+hx, ystart, xsz-hx, hy)
			}
		}

		else if(mychar=='M' ||mychar=='m') // ㄷ 
	{
		if(julen==1)
		{
			
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz); //ㅣ
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅣ
			
			line(xstart+stsz,ystart+stsz, xstart+xsz/2, ystart+ysz/2); //v
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz/2, ystart+ysz/2); //v

			
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/4;
			let qx=xsz/4;
			let hh=ysz/2;
		
			fill(jongbg);
			bgsG(createVector(xstart+qx*2, ystart+qy),createVector(xstart+qx*2+qx, ystart+qy+qy));
			triangle(xstart, ystart,     xstart+xsz/2, ystart+hh,        xstart+xsz,  ystart); 
			
			triangle(xstart+qx, ystart+ysz,    xstart+qx, ystart+qy*2,   xstart+xsz-qx, ystart+ysz);
			triangle(xstart+xsz-qx, ystart+qy*2,    xstart+qx, ystart+ysz,     xstart+xsz-qx, ystart+ysz);


			
		}
	}
		else if(mychar=='N' ||mychar=='n') // ㄷ 
	{
		if(julen==1)
		{
			
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz); //ㅣ
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅣ
			line(xstart+stsz, ystart+stsz,  xstart+xsz-stsz, ystart+ysz-stsz) ; //\

		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/4;
			let tx=xsz/4;
		
			fill(jongbg);
			bgsG(createVector(xstart+tx*2, ystart+qy),createVector(xstart+tx*2+tx, ystart+qy+qy));
			triangle(xstart, ystart,     xstart+tx*3, ystart,        xstart+tx*3, ystart+qy*2); 
			triangle(xstart+tx, ystart+ysz,     xstart+xsz, ystart+ysz,        xstart+tx, ystart+qy*2); 
			
		}
	}
	
	else if(mychar=='O'||mychar=='o')
	{
		if(julen==1)
		{

		mysz=min(ysz, xsz); 
		noFill();
						//fill('blue');
			if(random()<0.5)
			{
 				circle(xsz/2, ystart+ysz/2, mysz-stsz*2); //ㅇ
			}
			else
			{
			ellipse(xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2); //ㅇ
			}
 
		}
		else
		{
		mysz=min(ysz, xsz); 
		setGradientFill(createVector(xsz/2, ystart+ysz/2-mysz/2),createVector(xsz/2, ystart+ysz/2+mysz/2));
		if(random()<0.5)
		{
 			circle(xsz/2, ystart+ysz/2, mysz); //ㅇ
		}
		else
		{
			ellipse(xsz/2, ystart+ysz/2, xsz, ysz); //ㅇ
		}
		}
	}
	
		else if(mychar=='P' ||mychar=='p') // ㄷ 
	{
				
		  let qy=ysz/5;
			let tx=xsz/3;		
		if(julen==1)
		{
			if(random()<0.5) //square
			{
				line(xstart+stsz, ystart+stsz, xstart+xsz-stsz, ystart+stsz); //-
				line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|

				line(xstart+stsz, ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2); //-

				line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz/2-stsz) //오른 |
		//	line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅡ
			}
			else //arc
			{
				noFill();
				line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
				arc(xstart+tx*2.25, ystart+qy*3/2, xsz/2, qy*3-stsz*2, 270, 90); //, [mode], [detail])
 				line(xstart+stsz, ystart+stsz, xstart+tx*2.25, ystart+stsz); //-
 				line(xstart+stsz, ystart+qy*3-stsz, xstart+tx*2.25, ystart+qy*3-stsz); //- 
			}
 		}
		else
		{
			
			if(random()<0.5)
			{
				noStroke();
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart,ystart, xsz, ysz);

				fill(jongbg);
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
				rect(xstart+tx, ystart+qy, tx, qy)

				bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
				rect(xstart+tx, ystart+qy*3, tx*2, qy*2)
			}
			else //arc
			{
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));

				rect(xstart, ystart, xstart+tx*2.25+1, ystart+qy*3);
				arc(xstart+tx*2.25, ystart+qy*3/2, xsz/2, qy*3, 270, 90, OPEN); //, [mode], [detail])
				//rect(xstart,ystart, xsz/2, ysz);
				rect(xstart, ystart, tx, ysz);
				
				fill(jongbg);
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
				arc(xstart+tx*1.7, ystart+qy*3/2, tx/2, qy, 270, 90, OPEN); //, [mode], [detail])
				rect(xstart+tx, ystart+qy, tx*0.7+1, qy);

			}
			
		}
	}
	
	
	else if(mychar=='Q'||mychar=='q')
	{
		if(julen==1)
		{

		mysz=min(ysz, xsz); 
		noFill();
						//fill('blue');
			if(random()<0.5)
			{
 				circle(xsz/2, ystart+ysz/2, mysz-stsz*2); //ㅇ
			 	line(xsz/2, ystart+ysz/2,  xsz/2+mysz/2-stsz*2, ystart+ysz/2 +  mysz/2-stsz*2); //ㅇ
			}
			else
			{
				ellipse(xsz/2, ystart+ysz/2, xsz-stsz*2, ysz-stsz*2); //ㅇ
			 	line(xsz/2, ystart+ysz*3/4,  xsz-stsz, ystart+ysz-stsz); //ㅇ
			}

 
		}
		else
		{
		mysz=min(ysz, xsz); 
		
		setGradientFill(createVector(xstart, ystart),createVector(xsz, ysz));
		if(random()<0.5)
		{
			circle(xsz/2, ystart+ysz/2, mysz); //ㅇ
			strokeWeight(mysz/5)
			stroke(bgcolor);
			line(xsz/2+mysz/4, ystart+mysz/4+ysz/2,  xsz/2+mysz/2-stsz*2, ystart+ysz/2 +  mysz/2-stsz*2); //ㅇ
			noStroke();
		}
		else
		{
			ellipse(xsz/2, ystart+ysz/2, xsz, ysz); //ㅇ
			strokeWeight(mysz/5)
			stroke(bgcolor);
			line(xsz*2/3, ystart+ysz*3/4,  xsz, ysz); //ㅇ
			noStroke();
		}
		}
	}
		else if(mychar=='R' ||mychar=='r') // ㄷ 
	{
				
		  let qy=ysz/5;
			let tx=xsz/3;		
		if(julen==1)
		{
			if(random()<0.5)
			{
			line(xstart+stsz, ystart+stsz, xstart+xsz-stsz, ystart+stsz); //-
			line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
			
			line(xstart+stsz, ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2); //-
			
			line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz/2) //오른 |
			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz-stsz) // \

			//line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz); //ㅡ
			}
			else //arc
			{
				noFill();
				line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz) //|
				arc(xstart+tx*2.25, ystart+qy*2.5/2, xsz/2, qy*2.5-stsz*2, 270, 90); //, [mode], [detail])

 				line(xstart+stsz, ystart+stsz, xstart+tx*2.25, ystart+stsz);
 				line(xstart+stsz, ystart+qy*2.5-stsz, xstart+tx*2.25, ystart+qy*2.5-stsz); //--
				line(xstart+stsz,ystart+ysz/2-stsz, xstart+xsz-stsz, ystart+ysz-stsz) // \

			}
 		}
		else
		{
			if(random()<0.5)
			{
					noStroke();
					setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
					rect(xstart,ystart, xsz, ysz);

					fill(jongbg);
					bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
					rect(xstart+tx, ystart+qy, tx, qy)

					bgsG(createVector(xstart+tx, ystart+qy*2),createVector(xstart+tx+tx, ystart+qy*2+qy));
					rect(xstart+tx, ystart+qy*3, tx, qy*2)

					triangle(xstart+xsz, ystart+ysz/2-qy/2,      xstart+xsz-tx/2,  ystart+ysz/2,  xstart+xsz, ystart+ysz/2+qy/2);
			}
			else //arc
			{
				rect(xstart, ystart, xstart+tx*2.25+1, ystart+qy*3);
				arc(xstart+tx*2.25, ystart+qy*3/2, xsz/2, qy*3, 270, 90, OPEN); //, [mode], [detail])
				//rect(xstart,ystart, xsz/2, ysz);
				rect(xstart, ystart, tx, ysz);
				rect(xstart+xsz-tx, ystart+ysz/2+qy/2, tx, ysz/2-qy/2);
				arc(xstart+tx*2.25, ystart+ysz/2+qy/2, xsz/2, qy*3/2, 270, 90, OPEN); //, [mode], [detail])


				fill(jongbg);
				bgsG(createVector(xstart+tx, ystart),createVector(xstart+tx+tx, ystart+qy));
				arc(xstart+tx*1.7, ystart+qy*3/2, tx/2, qy, 270, 90, OPEN); //, [mode], [detail])
				rect(xstart+tx, ystart+qy, tx*0.7+1, qy);
			}
			
		}
	}
	
	
	 
		else if(mychar=='S' ||mychar=='s') // ㄷ 
	{
			let qy=ysz/5;
			let tx=xsz/3;
		
		if(julen==1)
		{
			if(random()<0.5)
			{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)		 //-

			line(xstart+stsz, ystart+stsz, xstart+stsz, ystart+ysz/2-stsz); //|

			line(xstart+stsz,ystart+ysz/2, xstart+xsz-stsz, ystart+ysz/2)		 //-
			line(xstart+xsz-stsz, ystart+ysz/2+stsz, xstart+xsz-stsz, ystart+ysz-stsz); //|
			line(xstart+stsz,ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz)		 //_
			}
			else // arc
			{
				noFill();
					//상단
				arc(xstart+tx/2, ystart+qy*2.5/2, tx, qy*2.5-stsz*2, 180-90, 360-90, OPEN); //, [mode], [detail])
				//하단
				arc(xstart+xsz-tx/2, ystart+qy*1.25*3-stsz, tx, qy*2.5, 270, 90, OPEN); //, [mode], [detail])
				line(xstart+tx/2, ystart+stsz, xsz-stsz, ystart+stsz) //위
				line(xstart+tx/2, ystart+ysz/2-stsz, xsz-tx/2, ysz/2-stsz)   //중간
				line(xstart, ysz-stsz, xsz-tx/2-stsz, ysz-stsz)
			}
 		}
		else
		{
	if(random()<0.5)
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
			rect(xsz-tx*2, ystart+qy, tx*2, qy)

			bgsG(createVector(xsz-tx*2, ystart+qy*3),createVector(xsz, ystart+qy*3+qy));
			rect(xstart, ystart+qy*3, tx*2, qy)
	}
						
			else //ARC
			{
				//상단
				arc(xstart+tx/2, ystart+qy*3/2, tx, qy*3, 180-90, 360-90, OPEN); //, [mode], [detail])
				
				//하단
				arc(xstart+tx*2.25, ystart+qy*3.5, xsz/2, qy*3, 270, 90, OPEN); //, [mode], [detail])
								
				rect(xstart+tx/2-1,ystart,  tx*3.5/2+2, qy*3); //상단
				rect(xstart+tx-1,ystart+qy*3, tx*1.25+2, qy*2); //하단

				//상단 하단 
				rect(xstart+tx*2-1, ystart, tx+1, qy)
				rect(xstart, ystart+qy*4, tx+1, qy)
				
				bgsG(createVector(xstart, ystart+qy),createVector(xstart+tx*2, ystart+qy+qy));
				arc(xsz-tx*2, ystart+qy*1.5, tx/2, qy, 180-90, 360-90, OPEN); //, [mode], [detail])
			  rect(xsz-tx*2-1, ystart+qy, tx*2+1, qy)
				
				arc(xstart+tx*2, ystart+qy*3.5, tx/2, qy, 270, 90, OPEN); //, [mode], [detail])
				rect(xstart, ystart+qy*3, tx*2+1, qy)

				


				
				//arc(xstart+tx*2.25, ystart+qy*2.5/2, tx, qy*2.5, 180-90, 360-90, OPEN); //, [mode], [detail])

				//rect(xstart, ystart+qy*2.5, xstart+tx*2.25+1, ystart+qy*2.5);
				//arc(xstart+tx*2.25, ystart+qy*3, xsz/2, qy*3, 270, 90, OPEN); //, [mode], [detail])
			//	arc(xstart+tx*2.25, ystart+qy*4-qy/4, xsz/2, qy*2.5, 270, 90, OPEN); //, [mode], [detail])

				
				//bgsG(createVector(xstart+tx*2, ystart+ty),createVector(xstart+tx*2+tx, ystart+ty+ty));
			//	arc(xstart+tx*1.3, ystart+ty*1.5, tx, ty, 180-90, 360-90, OPEN); //, [mode], [detail])
			//	rect(xstart+tx*1.3-1, ystart+ty, tx, ty) //-1 미세라인 줄이기 위해서

			}
		
		}
		
	}
	
	
		else if(mychar=='T' ||mychar=='t') //아
		{
			if(julen==1) // 줄 en
			{
				line(xstart+stsz, ystart+stsz, xstart+xsz-stsz, ystart+stsz); //-
				line(xstart+xsz/2,ystart+stsz, xstart+xsz/2, ystart+ysz-stsz); //ㅣ
			}
			else
			{
				setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
				rect(xstart,ystart, xsz, ysz);

				let hy=int(random(ysz/4, ysz*1/3));
				let hx=int(random(xsz/3, xsz/2));

				fill(jongbg);
				bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));
				rect(xstart, ystart+hy, hx, ysz-hy)
				
				bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));
				rect(xstart+xsz-hx, ystart+hy, hx, ysz-hy)
			}
		}
	
	
	else if(mychar=='U' ||mychar=='u') //아
		{
				let hy=int(random(ysz/2, ysz*2/3));
				let hx=int(random(xsz/4, xsz/2));
			
			if(julen==1) // 줄 en
			{
				if(random()<0.5) //L|
				{
					line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
					line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
					line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-stsz)
				}
				else //arc
				{
				hy=ysz/2;
					noFill();
					arc(xstart+xsz/2, ystart+ysz-(ysz-hy), xsz-stsz*2, (ysz-hy)*2, 270+90, 90+90); //, [mode], [detail])
				//	arc(xstart+xsz/2, ystart+ysz-hy/2, xsz-stsz*2, hy, 270+90, 90+90); //, [mode], [detail])

					line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-(ysz-hy))
					line(xstart+xsz-stsz,ystart+stsz, xstart+xsz-stsz, ystart+ysz-(ysz-hy))			 
				}
			}
			else
			{

				
				if(random()<0.5)
				{
					setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
					rect(xstart,ystart, xsz, ysz);

					fill(jongbg);
					bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));
					rect(xstart+hx, ystart, xsz-hx*2, hy)
				}
				else
				{ //ARC
					setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
					arc(xstart+xsz/2, ystart+ysz-(ysz-hy)/2, xsz, (ysz-hy), 270+90, 90+90, OPEN); //, [mode], [detail])
					rect(xstart,ystart, xsz, hy+(ysz-hy)/2+1);


					fill(jongbg);
					bgsG(createVector(xstart+hx, ystart),createVector(xstart+hx+(xsz-hx), ystart+hy));
					arc(xstart+xsz/2, ystart+ysz-(ysz-hy), xsz-hx*2, (ysz-hy)/2, 270+90, 90+90, OPEN); //, [mode], [detail])

					rect(xstart+hx, ystart, xsz-hx*2, hy+1)
					
				}
				
			}
		}
	
	else if(mychar=='V'||mychar=='v')
	{
		let hh=xsz/2;
		if(julen==1)
		{
				noFill();
				line(xstart+stsz, ystart+stsz,  xstart+hh, ystart+ysz-stsz)
				line(xstart+xsz-stsz, ystart+stsz,  xstart+hh, ystart+ysz-stsz)

				//line(xstart+hh, ystart-stsz/2,  xstart-stsz/2, ystart+ysz-stsz/2)
				//line(xstart+hh, ystart-stsz/2,  xstart+xsz-stsz/2, ystart+ysz-stsz/2)
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart, ystart+ysz));
			triangle(xstart, ystart,    xstart+xsz, ystart,  xstart+hh, ystart+ysz);
		}
	}
	
	else if(mychar=='W'||mychar=='w')
	{
		let hh=xsz/2;
		//let hhx=random([xsz/3, xsz/2, xsz*2/3]);  //1:2, 1:1, 2:1 첫 삼각형의 x 넓이
let hhx=xsz/2;
		if(julen==1)
		{
				noFill();
				line(xstart+stsz, ystart+stsz,  xstart+(xsz-hhx)/2-stsz, ystart+ysz-stsz)
				line(xstart+(xsz-hhx)/2-stsz, ystart+ysz-stsz, xstart+hhx-stsz, ystart+stsz)
			
				line(xstart+hhx-stsz, ystart+stsz,   xstart+hhx+(xsz-hhx)/2-stsz, ystart+ysz-stsz)
				line(xstart+hhx+(xsz-hhx)/2-stsz,  ystart+ysz-stsz,  xstart+xsz-stsz, ystart+stsz)

				//line(xstart+hhx+(xsz-hhx)/2-stsz/2,  ystart-stsz/2,  xstart+xsz-stsz/2, ystart-stsz/2)
				//line(xstart+hh, ystart-stsz/2,  xstart-stsz/2, ystart+ysz-stsz/2)
				//line(xstart+hh, ystart-stsz/2,  xstart+xsz-stsz/2, ystart+ysz-stsz/2)
		
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart+xsz, ystart+ysz));
			triangle(xstart, ystart,   xstart+(xsz-hhx)/2, ystart+ysz,   xstart+hhx, ystart);
			triangle(xstart+hhx, ystart,   xstart+hhx+(xsz-hhx)/2, ystart+ysz,   xstart+xsz, ystart);

		}
	}
	
	else if(mychar=='X'||mychar=='x')
	{
		let xh=xsz/2;
		let yh=ysz/2;
		if(julen==1)
		{
				noFill();
				line(xstart+stsz, ystart+stsz,  xstart+xsz-stsz, ystart+ysz-stsz)
				line(xstart+xsz-stsz, ystart+stsz,  xstart+stsz, ystart+ysz-stsz)

				//line(xstart+hh, ystart-stsz/2,  xstart-stsz/2, ystart+ysz-stsz/2)
				//line(xstart+hh, ystart-stsz/2,  xstart+xsz-stsz/2, ystart+ysz-stsz/2)
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart+ysz, ystart+ysz));
			triangle(xstart, ystart,     xstart+xsz, ystart,   xstart+xh, ystart+yh);
			triangle(xstart, ystart+ysz,    xstart+xsz, ystart+ysz,  xstart+xh, ystart+yh);

		}
	}
	
	else if(mychar=='Y'||mychar=='y')
	{
		let xh=xsz/2;
		let yh=ysz/2;
		if(julen==1)
		{
				noFill();
				line(xstart+stsz, ystart+stsz,  xstart+xsz/2, ystart+ysz/2)
				line(xstart+xsz/2, ystart+ysz/2,  xstart+xsz-stsz, ystart+stsz)
				line(xstart+xsz/2, ystart+ysz/2,  xstart+xsz/2, ystart+ysz-stsz)


				//line(xstart+hh, ystart-stsz/2,  xstart-stsz/2, ystart+ysz-stsz/2)
				//line(xstart+hh, ystart-stsz/2,  xstart+xsz-stsz/2, ystart+ysz-stsz/2)
		}
		else
		{	
			setGradientFill(createVector(xstart, ystart),createVector(xstart+ysz, ystart+ysz));
			triangle(xstart, ystart,     xstart+xsz, ystart,   xstart+xh, ystart+yh);
			let xwide=random(xsz/4, xsz/6);
			rect(xstart+xsz/2-xwide/2, ystart+yh-yh/2,      xwide,  yh+ xwide);
			//triangle(xstart, ystart+ysz,    xstart+xsz, ystart+ysz,  xstart+xh, ystart+yh);

		}
	}
	
		else if(mychar=='Z' ||mychar=='z') // ㄷ 
	{
		if(julen==1)
		{
			line(xstart+stsz,ystart+stsz, xstart+xsz-stsz, ystart+stsz)
			//line(xstart+stsz,ystart+stsz, xstart+stsz, ystart+ysz-stsz)
			line(xstart+xsz-stsz, ystart+stsz,  xstart+stsz, ystart+ysz-stsz)
			line(xstart+stsz, ystart+ysz-stsz, xstart+xsz-stsz, ystart+ysz-stsz);
		}
		else
		{
		 	setGradientFill(createVector(xstart,ystart),createVector(xstart+xsz, ystart+ysz));
			rect(xstart,ystart, xsz, ysz);
		
		  let qy=ysz/4;
			let tx=xsz/4;
		
			fill(jongbg);
			bgsG(createVector(xstart+tx*2, ystart+qy),createVector(xstart+tx*2+tx, ystart+qy+qy));
			triangle(xstart, ystart+qy,     xstart+tx*2, ystart+qy,        xstart,  ystart+ysz); 
			triangle(xstart+xsz, ystart,     xstart+tx*2, ystart+qy*3,        xstart+xsz,  ystart+qy*3); 

			
		}
	}
	pop();
	

}