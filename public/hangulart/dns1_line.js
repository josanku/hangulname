

//모 몸 y=> 3 등분
function dns1_line(x, y)
{
	chojung=xw
push()
	//let nojong=0;
	
	translate(x, y);
	let mysz;

	
	if(nojong==1) //hancheck에서 nojong 이 결정됨
	{
			//choy=cellsz;
			choy=random(yw/4, yw*3/4);
			jongy=yw;
			
		}
	else
	{
		choy=random(yw*2/9, yw*3.5/9);
		jongy=random(yw*4/9, yw*7/9)  //종성시작y
	}
	
	
 	noStroke();
	//let myc=random(['ㅇ', 'ㅅ', 'ㅁ', 'ㄱ','ㅋ','ㄴ', 'ㄷ','ㅌ','ㄹ','ㅂ','ㅍ', 'ㅎ','ㅈ','ㅊ']);
	//chocho(myc);
	//if(mal!='') //mal 이 있으면
	
		myc=mycho;
				let ssang=0;
				let se=0; //셋자음
	
				//if(yet_cho_flag==1) //  //옛한글 복자음 처리
				{
					for(let i=0; i<yet_cho_ssang.length;i++)
					{
							if(myc==yet_cho_ssang[i][0]) 
							{ 
								if(yet_cho_ssang[i][1].length==2)  	
									ssang=1; //쌍자음
								else if(yet_cho_ssang[i][1].length==3)
									se=1; //쌍셋자음

							}
					}
				}
	
	/*
	if(juldat==1)
		chojong_line(myc, 0,'ㅡ')
	else
		chojong(myc, 0,'ㅡ')
	*/
	if(onlyhol!=1)
	{
 		if(juldat==1)
		{
//			if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'||myc=='ㅆ'||myc=='ㅉ')//ᅚ
						if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'||myc=='ㅆ'||myc=='ㅉ'|| ssang==1 ||se==1) //ᅚ
						{
						//	datdat(0,0, myc, chox, choy, 'ㅡ') //초성
											datdat(0,0, myc, xw, choy, 'ㅡ') //초성

						}
				//chojong_line(myc, 0,'ㅡ')
			else
			//	chojong_line(myc, 0,'ㅡ')
						 chojong_line2(0,0, myc, xw, choy, 'ㅡ')

		}
		else
		{
				if(ssang==1 || se==1) //쌍셋자음... 옛한글
				{
											datdat(0,0, myc, xw, choy, 'ㅡ') //초성
				}
				else
				{
						 chojong_line2(0,0, myc, xw, choy, 'ㅡ')
				}
		}
	}
	
	fill(random(colors));
			if(julhol==1)
		{
					strokeCap(PROJECT) 
				//let sw=min(xsz,ysz)/10;

				strokeWeight(stsz);
				stroke(random(colors));
		}
 
	
			
	
	/*
	let rr=random();
  
	if(rr<0.3)
	{
		setGradientFill(createVector(0,0),createVector(cellsz, choy));
 		rect(0,0, cellsz, choy); //ㅁ
	}
	else if(rr<0.7)
	{
		setGradientFill(createVector(cellsz/2,choy/2),createVector(cellsz/2,choy));
 		circle(cellsz/2,choy/2, choy); //ㅇ
	}
	else
		 
	{

	let hh=cellsz/2;
	setGradientFill(createVector(hh,0),createVector(hh, choy));
	triangle(hh, 0,    0, choy,  cellsz, choy);
	}
	 
	  */
 	
	//noStroke();

 //stroke("purple");
 //strokeWeight(3);
	//중성
	let mycircle=1;
	if(mycircle==1)
	{
	if(nojong==0)
		mysz=(yw-choy-(yw-jongy))/2; //1, 2
	else
		mysz=(yw-choy)/2; //1, 2  ..중성의 y축 1/2

	//fill(200)
		let lr=mysz/2;
	//circle(chojung+(w-chojung)/2+lr, choy/2, mysz);
		let yr=random();
		let myc=random(['ㆍ', 'ㅡ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ']);
//myc='ㅗ';
		//noStroke();
			//if(mal!='') //mal 이 있으면
		
				myc=myjung;
	
				noStroke();

		
		if(myc=='ㆍ')
		{
			 			setGradientFill(createVector(xw/2, yw/2-lr),createVector(xw/2, yw/2+lr));
						circle(xw/2, yw/2,  mysz);

		}
		else if(myc=='ᆞ')
		{
			let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
				hanhol_draw('ᆞ', 0,choy, xw, ysz) //

		}
		
		//'ᅳ'
		
		
			else if(myc=='ᅳ') //오
			{
			let ysz=jongy-choy;
			
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
				hanhol_draw('ᅳ', 0,choy, xw, ysz) // ㅡ
				 			//rect(0,choy, xw, ysz)//-|

			}			
//		'ᅭ'
		
			else if(myc== 'ᅭ') //요
			{
			let ysz=jongy-choy;
			
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
				//hanhol_draw( 'ᅭ', 0,choy, xw, ysz) //
								hanhol_draw('ㅛ', 0,choy, xw, ysz) //

				 			//rect(0,choy, xw, ysz)//-|

			}			
			else if(myc==	'ᅮ') //ㅜ
			{
				print("TYPE1=     "+myc);
				let ysz;
				if(jongy==0) //종성이 없음
					ysz=yw-choy;
				else
					ysz=jongy-choy;

				hanhol_draw('ᅮ', 0,choy, xw, ysz) //
								//rect(0,choy, xw, ysz)//-|

			}			
		
		//'ᅲ'
			else if(myc=='ᅲ') //ㅜ
			{
			let ysz=jongy-choy;
			
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
				hanhol_draw('ᅲ', 0,choy, xw, ysz) //
				 			//rect(0,choy, xw, ysz)//-|
			}			
		
			else if(myc=='ᆂ') //오 ㅗ+ㅗ
			{
			let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
			hanhol_draw('ㅗ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅗ', 0,choy+ysz/2, xw, ysz/2) //

				 			//rect(0,choy, xw, ysz)//-|

			}
		
			else if(myc== 'ힱ') //오 ㅗ+ㅗ+ㅣ
			{
				 let xa, ya;
				xa=0
				ya=choy;
				let xasz=xw;
				let yaszfull=jongy-choy;
				let yasz=yaszfull/3;
				
				hanhol_draw('ㅗ', xa,ya, xasz, yasz) //
				hanhol_draw('ㅗ', xa,ya+yasz, xasz, yasz) //
				hanhol_draw('ㅣ', xa,ya+yasz+yasz, xasz, yasz) //

			}			
		
		
		// 'ힱ' ㅗㅗ+ㅣ
		//'ᆃ', 
					else if(myc=='ᆃ') // ㅗ ㅜ
			{
			let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
			hanhol_draw('ㅗ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅜ', 0,choy+ysz/2, xw, ysz/2) //

				 			//rect(0,choy, xw, ysz)//-|

			}			
		
		//'ᆇ'
			else if(myc=='ᆇ') //ㅛ + ㅗ
			{
						let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅛ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅗ', 0,choy+ysz/2, xw, ysz/2) //

				
			}
		
	//	'ᆓ'
			else if(myc=='ᆓ')
			{
			let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅠ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅜ', 0,choy+ysz/2, xw, ysz/2) //
			}
			else if(myc=='ힸ') //ㅠㅗ
			{
			let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅠ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅗ', 0,choy+ysz/2, xw, ysz/2) //
			}
		
		
			else if(myc=='ᆍ')
			{
						let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅜ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅜ', 0,choy+ysz/2, xw, ysz/2) //
			}
		
		//'ힼ'	'ᆕ'	'ᆖ'
			else if(myc=='ힼ') //ㅡ+ㅗ
			{
						let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅡ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅗ', 0,choy+ysz/2, xw, ysz/2) //
			}
		else if(myc==	'ᆕ') //ㅡ+ㅜ
			{
						let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅡ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅜ', 0,choy+ysz/2, xw, ysz/2) //
			}
			else if(myc==	'ᆖ') //ㅡ+ㅡ
			{
						let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㅡ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅡ', 0,choy+ysz/2, xw, ysz/2) //
			}
		//ᆠ
			else if(myc=='ᆠ') //ㆍ+ㅜ
			{
						let ysz=jongy-choy;
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
				
			hanhol_draw('ㆍ', 0,choy, xw, ysz/2) //
			hanhol_draw('ㅜ', 0,choy+ysz/2, xw, ysz/2) //
			}
		
		
		
		else if(myc=='ㅗ'||myc=='ᅩ') //오
		{
			let csz=mysz;
			if(mysz>xw) //두 동그라미가 xw를 넘어섬
			{
				csz=xw;
 			}
			if(julhol==1)
			{
				stroke(random(colors));
				line(0,choy+mysz/2, xw, choy+mysz/2)//-|
				line(xw/2, choy+mysz/2,  xw/2, choy+stsz/2);
				noStroke();
			}
			else
			{
				
			if(dhanul==1) //가로 grade...y일정 X 값 바뀜
 				setGradientFill(createVector(xw/2-mysz/2, choy+mysz-lr),createVector(xw/2+mysz/2, choy+mysz-lr));
			else
 				setGradientFill(createVector(xw/2, choy),createVector(xw/2,choy+mysz));
			//fill('red');

			circle(xw/2, choy+mysz-csz/2,  csz);

			setGradientFill(createVector(xw/2,choy+mysz),createVector(xw/2,choy+mysz+mysz));
		 	rect(0,choy+mysz, xw, mysz)//-|
			}
		}
		else if(myc=='ㅛ') //
		{

			//mysz=min(xw, yw);
			let csz=mysz;
			if(mysz*2>xw) //두 동그라미가 xw를 넘어섬
			{
				csz=xw/2;
 			}
	 
					if(julhol==1)
			{
				stroke(random(colors));
				line(0,choy+mysz/2, xw, choy+mysz/2)//-|
				line(xw/3, choy+mysz/2,  xw/3, choy+stsz/2);
				line(xw*2/3, choy+mysz/2,  xw*2/3, choy+stsz/2);

				noStroke();
			}
			else
			{
				
				
			if(dhanul==1) //가로 grade...y일정 X 값 바뀜
				setGradientFill(createVector(xw/3-mysz/2, choy+mysz-lr),createVector(xw*2/3+mysz/2, choy+mysz-lr));
			else	
				setGradientFill(createVector(xw/2, choy),createVector(xw/2,choy+mysz));

			circle(xw/4, choy+mysz-csz/2,  csz);
			circle(xw*3/4, choy+mysz-csz/2,  csz);
			
			setGradientFill(createVector(xw/2,choy+mysz),createVector(xw/2,choy+mysz+mysz));
		 	rect(0,choy+mysz, xw, mysz)//-|
			}
	}
		else if(myc=='ㅜ') //우
		{
			//noStroke();
			let csz=mysz;
			if(mysz>xw) //두 동그라미가 xw를 넘어섬
			{
				csz=xw;
 			}
			// 
			
		
			if(julhol==1)
			{
				stroke(random(colors));
				line(0+stsz/2,choy+mysz/2, xw-stsz/2, choy+mysz/2)//-|
				line(xw/2-stsz/2, choy+mysz/2,  xw/2-stsz/2, choy+mysz/2+csz);
 			}
			else
			{

					if(nojong==1 && random()<0.5) // 종성이 없을 때 ... 맨 아래로 정렬... 맨 아래 공백 없애기 위한 것임.... 랜덤하게 선택하는 것도 좋음
					{

						if(dhanul==1) //가로 grade...y일정 X 값 바뀜
							setGradientFill(createVector(xw/2-mysz/2, choy+mysz+lr),createVector(xw/2+mysz/2, choy+mysz+lr));
						else
							setGradientFill(createVector(xw/2, choy+mysz),createVector(xw/2,choy+mysz*2));

						circle(xw/2, yw-csz/2,  csz);



					}
					else  //종성여부 관계 없음... 종성이 없을 때 아래가 빔
					{
						if(dhanul==1) //가로 grade...y일정 X 값 바뀜
							setGradientFill(createVector(xw/2-mysz/2, choy+mysz+lr),createVector(xw/2+mysz/2, choy+mysz+lr));
						else
							setGradientFill(createVector(xw/2, choy+mysz),createVector(xw/2,choy+mysz*2));

						circle(xw/2, choy+mysz+csz/2,  csz);



					}
										setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+mysz));
						rect(0,choy, xw, mysz)//-|
				}
			
		}
		else if(myc=='ㅠ') //
		{

			let csz=mysz;
			if(mysz*2>xw) //두 동그라미가 xw를 넘어섬
			{
				csz=xw/2;
 			}
			
			if(julhol==1)
			{
				stroke(random(colors));
				line(stsz/2,choy+mysz/2, xw-stsz, choy+mysz/2)//-
				line(xw/3-stsz/2, choy+mysz/2,  xw/3-stsz/2, choy+mysz/2+csz);
				line(xw*2/3-stsz/2, choy+mysz/2,  xw*2/3-stsz/2, choy+mysz/2+csz);
				noStroke();
			}
			else
			{
				
			if(nojong==1 && random()<0.5) // 종성이 없을 때 ... 맨 아래로 정렬... 맨 아래 공백 없애기 위한 것임.... 랜덤하게 선택하는 것도 좋음
			{
				if(dhanul==1) //가로 grade...y일정 X 값 바뀜
					setGradientFill(createVector(xw/3-mysz/2, choy+mysz+lr),createVector(xw*2/3+mysz/2, choy+mysz+lr));
				else
					setGradientFill(createVector(xw/2, choy+mysz),createVector(xw/2,choy+mysz*2));

				circle(xw/4, yw-csz/2,  csz);
				circle(xw*3/4, yw-csz/2,  csz);

				setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+mysz));
				
				if(random()<0.5) //아래로 내리기만 함
				{ 
					setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+mysz));
					rect(0,yw-mysz-csz, xw, mysz)//-|
				}
				else
				{
					setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+(yw-choy-csz)));
					rect(0,choy, xw, yw-choy-csz)//-| //위를 비우지 않고 다 채움
				}
				
			}
			else
			{		
				if(dhanul==1) //가로 grade...y일정 X 값 바뀜
					setGradientFill(createVector(xw/3-mysz/2, choy+mysz+lr),createVector(xw*2/3+mysz/2, choy+mysz+lr));
				else
					setGradientFill(createVector(xw/2, choy+mysz),createVector(xw/2,choy+mysz*2));

				circle(xw/4, choy+mysz+csz/2,  csz);
				circle(xw*3/4, choy+mysz+csz/2,  csz);

				setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+mysz));
				rect(0,choy, xw, mysz)//-|
			}
			}
	}

		else if(myc=='ㅡ') //으
		{
			let ysz=jongy-choy;
			
			if(jongy==0) //종성이 없음
				ysz=yw-choy;
			else
				ysz=jongy-choy;
			
			if(julhol==1)
			{
 				stroke(random(colors));
				line(0+stsz/2,choy+ysz/2, xw-stsz/2, choy+ysz/2)//-|
				//line(xw/2, choy+mysz/2,  xw/2, choy+mysz/2+csz);
				noStroke();
			}
			else
			{
				
			setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+ysz));
 			rect(0,choy, xw, ysz)//-|
 			}
		}
		
	}
	 
	else // 전체가 ...--- 만 있는 경우임 
	{
	
 			let ysz=yw-choy;
			setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+ysz));
 			rect(0,choy, xw, ysz)//-|
 
	}
 	
//noStroke();
	//종성
	
	
	if(nojong==0)
		 {
		
	myc=random(['ㅇ', 'ㅅ', 'ㅁ', 'ㄱ','ㅋ','ㄴ', 'ㄷ','ㅌ','ㄹ','ㅂ','ㅍ', 'ㅎ','ㅈ','ㅊ']);
	//chocho(myc);
	//myc='ㅎ';
			 
	//if(mal!='') //mal 이 있으면
					myc=myjong;
 			 
	//chojong_line(myc, jongy, 'ㅡ')
			 /*
		if(juldat==1)
				chojong_line(myc, jongy, 'ㅡ')
			else
			 	chojong(myc, jongy, 'ㅡ')
*/

				ssang=0;
				se=0; //셋자음
				//if(yet_jong_flag==1) //  //옛한글 복자음 처리
				{
					for(let i=0; i<yet_jong_ssang.length;i++)
					{

							if(myc==yet_jong_ssang[i][0])  //???	//ퟸ 를 못 찾음_______________________
							{ 

								if(yet_jong_ssang[i][1].length==2)  	
									ssang=1; //쌍자음
								else if(yet_jong_ssang[i][1].length==3)
									se=1; //쌍셋자음
																	
								//print("JONG: MATCHED 쌍자음 셋자음 "+myc+ssang+se);

							}
					}
				}

	
	if(onlyhol!=1)
	{
 		if(juldat==1)
		{
			if(myc=='ㄺ'||myc=='ㄻ'||myc=='ㄼ'||myc=='ㅄ'||  myc=='ㄳ'||myc=='ㄽ'||   myc=='ㄵ'||myc=='ㄶ'||myc=='ㄾ'||myc=='ㄿ'||myc=='ㅀ' || myc=='ㄲ'||myc=='ㄸ'||myc=='ㅆ'||myc=='ㅉ' ||  ssang==1 || se==1 )
				datdat(0,jongy, myc,  xw, yw-jongy, 'ㅡ') //종성
				//chojong_line(myc, 0,'ㅣ')
			else
				//chojong_line2(myc, choy,'ㅣ');
												 chojong_line2(0,jongy, myc, xw, yw-jongy, 'ㅡ')

		}
		else
		{
			//chojong(myc, choy,'ㅣ');
				if(   ssang==1 || se==1)//ᅚ  //옛한글 복자음 처리
					{

				datdat(0,jongy, myc,  xw, yw-jongy, 'ㅡ') //종성
					}
				else
				{
					//print("||myc=="+"'"+myc+"'");
												 chojong_line2(0,jongy, myc, xw, yw-jongy, 'ㅡ')
				}

		}
	}

			 
		
			 
}
	pop()

}


