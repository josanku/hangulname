 

//믜 믬 y=> 3 등분

//콰쿼 ㅏㅓ 조정 필요
function dns2_line(x, y)
{
	
	
	let eudominance=0; //현재 디폴트임 
	
	push()
	
	//let nojong=0; //don't change
	chojung=random(xw/4, xw*3/4);
	chox=chojung; //중성이 시작하는  x 점
	
	
	translate(x, y);
	let mysz;
	
	if(nojong==1) //hancheck에서 nojong 이 결정됨  종성없음
	{
			//choy=cellsz;
		choy=random(yw/4, yw*3/4); //중성이 시작하는 y 점
		jongy=yw;
	}
	else
	{ //종성 있음
		choy=random(yw*2/9, yw*4/9);
		jongy=random(yw*4/9, yw*7/9)  //종단시작y
	}
	//print("1. choy="+choy);
		
	
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
	
	
	
	//chojong(myc, 0,'ㅢ')
	/*
		if(juldat==1)
			chojong_line(myc, 0,'ㅢ')
		else
			chojong(myc, 0,'ㅢ')
	*/	
	
	
	if(onlyhol!=1)
	{
 		if(juldat==1)
		{
//			if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'||myc=='ㅆ'||myc=='ㅉ')//ᅚ
						if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'||myc=='ㅆ'||myc=='ㅉ'|| ssang==1 ||se==1) //ᅚ
						{
						//	datdat(0,0, myc, chox, choy, 'ㅡ') //초성
				datdat(0,0, myc,  chox, choy, 'ㅢ') //초성

						}
				//chojong_line(myc, 0,'ㅡ')
			else
			//	chojong_line(myc, 0,'ㅡ')
					chojong_line2(0,0, myc, chojung, choy, 'ㅢ')

		}
		else
		{
				if(ssang==1 || se==1) //쌍셋자음... 옛한글
				{
					datdat(0,0, myc,  chox, choy, 'ㅢ') //초성
				}
				else
				{
					chojong_line2(0,0, myc, chojung, choy, 'ㅢ')
				}
		}
	}
	
	

				if(julhol==1)
		{
			
					strokeCap(PROJECT) 
				//let sw=min(xsz,ysz)/10;

				strokeWeight(stsz);
				stroke(random(colors));
	
}
	else
	{
		 	noStroke();
				fill(random(colors));

	}

	  
	
 	
	//noStroke();

	//중성
	mycircle=1;
	
	//yet_jung_dns2
	
	myc=myjung;

	

	//오른쪽// 중성
	//웨 만별도로 ....|o |식으로 표현
	if(mycircle==1)
	{
 		
	mysz=min(choy, xw-chojung)/2; //1, 2 1/2
	//fill(200)
	let lr=mysz/2;
	//ㅁㅏㅁ
	//let xxr=random();
			let myc=random(['ㅣ', 'ㅏ', 'ㅓ', 'ㅔ', 'ㅐ']); //ㅞ 의 ㅔ 만 있음
		//myc='';
			//if(mal!='') //mal 이 있으면
		//ㅏ....
		myc=myjungㅏ; //복모음에서 ㅡ가 ㅏ 보다 우선임
		
		
		/**
		
		yet_jung 에서 ㅏ 타입인자 ㅗ 타입인지를 검색하고, 0,1,2를 그냥 좌표값에 맞게 콜하면됨... case를 쓸 필요가 없음
		**/
		
		//구분함......
		
		if(myc=='ㅏ') //아
		{
				let hhxsz=(xw-chojung)/2;
 			  let ah;
				if(hhxsz > choy)
						hhxsz=choy;
			
						
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, jongy-stsz/2)
				line(chojung+stsz/2, jongy/2-stsz/2, xw-stsz/2, jongy/2-stsz/2)
			}
			else
			{
				if(dhanul==1) //가로 grade...x일정 Y 값 바뀜 이
					setGradientFill(createVector(chojung+(xw-chojung)/2+lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2+lr, choy/2+mysz/2));
				else
					setGradientFill(createVector(chojung+(xw-chojung)/2+lr-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2+lr+mysz/2, choy/2));

			//	circle(chojung+(xw-chojung)/2+lr, choy/2, mysz);
					circle(chojung+(xw-chojung)/2+hhxsz/2, jongy/2, hhxsz);

			
			
				if(eudominance==1) //ㅣ보다 ㅡ 위주 
				{
					setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
					rect(chojung,0, (xw-chojung)/2, choy)
				}
				else //ㅡ 보다 ㅣ 위주
				{
					setGradientFill(createVector(chojung,choy/2),createVector(chojung + (xw-chojung)/2, jongy/2));
					rect(chojung,0, (xw-chojung)/2, jongy);
				}
			}
 		}
		else if(myc=='ㅓ') //어
		{
							let hhxsz=(xw-chojung)/2;

			 			  let ah;
				if(hhxsz > choy)
						hhxsz=choy;
			if(julhol==1)
			{
  			line(xw-stsz/2, 0+stsz/2, xw-stsz/2, jongy-stsz/2) //ㅣ
				line(chox+stsz/2, jongy/2-stsz/2, xw-stsz/2, jongy/2-stsz/2)
			}
			else
			{
							
			if(dhanul==1) //가로 grade...x일정 Y 값 바뀜 이
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy/2+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2),createVector(chojung+(xw-chojung)/2-lr+mysz, choy/2));

			//circle(chojung+(cellsz-chojung)/2-lr, choy/2, mysz);
						//circle(chojung+(cellsz-chojung)/2-lr, jongy/2, mysz);
									circle(chojung+(xw-chojung)/2-hhxsz/2, jongy/2, hhxsz);

			if(eudominance==1) //ㅣ보다 ㅡ 위주 
			{
				setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
				rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, choy)
			}
			else //이
			{
				setGradientFill(createVector(chojung+(xw-chojung)/2,jongy/2),createVector((xw-chojung)/2, jongy/2));
				rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, jongy)
			}
			}
	}
	
	else if(myc=='ㅔ') //어
	{
			if(julhol==1)
			{
  			line(xw-(xw-chox)/2-stsz/2, 0+stsz/2, xw-(xw-chox)/2-stsz/2, jongy-stsz/2) //ㅣ
				line(chox+stsz/2, jongy/2-stsz/2, xw-(xw-chox)/2-stsz/2, jongy/2-stsz/2)
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, jongy-stsz/2) //ㅣ

			}
			else
			{
			if(eudominance==1) //ㅣ보다 ㅡ 위주 
			{
				setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
				rect(chojung,0, (xw-chojung)/2, choy)
				
				setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung),choy/2));
				rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, choy)
			}
			else //이
			{
				setGradientFill(createVector(chojung,jongy/2),createVector(chojung+(xw-chojung)/2, jongy/2));
				rect(chojung,0, (xw-chojung)/2, jongy)
				
				setGradientFill(createVector(chojung+(xw-chojung)/2,jongy/2),createVector((xw-chojung)/2, jongy/2));
				rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, jongy)
			}
			if(dhanul==1) //가로 grade...x일정 Y 값 바뀜 이
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy/2+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-lr, choy/2),createVector(chojung+(xw-chojung)/2-lr+lr, choy/2));
			circle(chojung+(xw-chojung)/2-lr, jongy/2, mysz);
			
		}
	}
		
	else if(myc=='ㅐ') // 돼
	{
						
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, jongy-stsz/2)
				line(chojung+stsz/2, jongy/2-stsz/2, xw-stsz/2, jongy/2-stsz/2)
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, jongy-stsz/2)
 			}
			else
			{
			 
				setGradientFill(createVector(chojung,jongy/2),createVector(chojung+(xw-chojung)/2, jongy/2));
				rect(chojung,0, (xw-chojung)/2, jongy)
				
				setGradientFill(createVector(chojung+(xw-chojung)/2,jongy/2),createVector((xw-chojung)/2, jongy/2));
				rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, jongy)
			 
			if(dhanul==1) //가로 grade...x일정 Y 값 바뀜 이
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy/2+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2),createVector(chojung+(xw-chojung)/2-lr+lr*2, choy/2));
			circle(chojung+(xw-chojung)/2, jongy/2, mysz);
	
		//print("2. choy="+choy);
			}
		}
		
		
	else if(myc=='ㅣ')
	{ //|
	if(julhol==1)
			{
 
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, jongy-stsz/2)
 			}
			else
			{
				
			if(eudominance==1) //ㅣ보다 ㅡ 위주 
			{
				setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
 				rect(chojung,0, xw-chojung, choy)
			}
		else
		{
				setGradientFill(createVector(chojung,jongy/2),createVector(chojung+(xw-chojung), jongy/2));
 				rect(chojung,0, xw-chojung, jongy)
		}
			}
	}
	
	
	}
	// 아래쪽 중성
	//ㅡㅡㅡ
	//if(mal!='') //mal 이 있으면
					
	myc=myjungㅗ;
	
	if(mycircle==1)
	{
			if(nojong==0){
				mysz=(yw-choy-(yw-jongy))/2; //1, 2
			}
	else
	{
			mysz=(yw-choy)/2; //1, 2
	}
		
	//fill(200)
		let lr=mysz/2; //ym
	//circle(chojung+(w-chojung)/2+lr, choy/2, mysz);
		let yr=random();
		let xm=chox/2; //ㅈㅜㅇㄱㅏㄴ
		
		
		myc=random(['ㅡ', 'ㅗ', 'ㅜ']); //ㅞ 의 ㅔ 만 있음
		//myc='';
			
		
		//if(mal!='') //mal 이 있으면
			{
					myc=myjungㅗ; //복모음에서 ㅡ가 ㅏ 보다 우선임

			}

		
		if(myc=="ㅗ") //오
		{

			if(julhol==1)
			{
 				line(chox/2-stsz/2, choy+stsz/2, chox/2-stsz/2,jongy-stsz/2); 
				line(stsz/2, jongy-stsz/2, chox-stsz/2, jongy-stsz/2)
			}
			else
			{
				
			if(eudominance==1) //ㅣ보다 ㅡ 위주 
			{
			  if(dhanul==1) //가로 grade...y일정 X 값 바뀜
					setGradientFill(createVector(xm-mysz/2, choy+mysz-lr),createVector(xm+mysz/2, choy+mysz-lr));
				else
					setGradientFill(createVector(xm, choy+mysz-lr-mysz/2),createVector(xm, choy+mysz-lr+mysz/2));
				circle(xm, choy+mysz-lr,  mysz);
				setGradientFill(createVector(xw/2,choy),createVector(xw/2,choy+jongy));
		 		rect(0,choy+mysz, xw, yw-mysz)//_L
			}
			else
			{
				mysz=min(chox, mysz) ///확인필요
				lr=mysz/2;
			  if(dhanul==1) //가로 grade...y일정 X 값 바뀜
					setGradientFill(createVector(xm-mysz/2, choy+mysz-lr),createVector(xm+mysz/2, choy+mysz-lr));
				else
					setGradientFill(createVector(xm, choy+mysz-lr-mysz/2),createVector(xm, choy+mysz-lr+mysz/2));
				
				circle(xm, choy+mysz-lr,  mysz);
				
				setGradientFill(createVector(chox/2,choy+mysz),createVector(chox/2,choy+mysz*2));
				
				rect(0,choy+mysz, chox, mysz)//-| 오른쪽 중성이 우위임  ㅡ보다 ㅣ 위주
			}
			}
		}
		else if(myc=="ㅜ")  //우
		{
							mysz=min(chox, mysz) ///확인필요
					lr=mysz/2;
			
			if(julhol==1)
			{
				line(stsz/2, choy+stsz/2, chox-stsz/2, choy+stsz/2) //-
 				line(chox/2-stsz/2, choy+stsz/2, chox/2-stsz/2,jongy-stsz/2); 
			}
			else
			{
				
		 	if(eudominance==1) //ㅣ보다 ㅡ 위주 
			{

				setGradientFill(createVector(xm/2,choy),createVector(xm/2,choy+jongy));
				rect(0,choy, xw, mysz)//-|
				
				if(dhanul==1) //가로 grade...y일정 X 값 바뀜
					setGradientFill(createVector(xw/2-mysz/2,choy+mysz+lr),createVector(xw/2+mysz/2,choy+mysz+lr));
				else
					setGradientFill(createVector(xw/2,choy+mysz+lr-mysz/2),createVector(xw/2,choy+mysz+lr+mysz/2));
				circle(xw/2,choy+mysz+lr,  mysz);
			}
			else
			{

				setGradientFill(createVector(chox/2,choy),createVector(chox/2,choy+mysz));
				rect(0,choy, chox, mysz)//-|
								
				if(dhanul==1) //가로 grade...y일정 X 값 바뀜
					setGradientFill(createVector(xm-mysz/2,choy+mysz+lr),createVector(xm+mysz/2,choy+mysz+lr));
				else
					setGradientFill(createVector(xm,choy+mysz+lr-mysz/2),createVector(xm,choy+mysz+lr+mysz/2));
				circle(xm,choy+mysz+lr,  mysz);
			}

			}
			}
		else //으
		{
						
			if(julhol==1)
			{
				line(stsz/2, jongy-stsz/2, chox-stsz/2, jongy-stsz/2) 
			}
			else
			{
				
										//mysz=min(chox, mysz) ///확인필요

			setGradientFill(createVector(xm/2,choy),createVector(xm/2,choy+jongy));
 			rect(0,choy, chojung, xw-choy-(xw-jongy))//-|
			 		//	rect(0,choy, xm, chojung)//-|
			}
		}
		
	}
	 
	else // --- 만 있는 경우임
	{
			setGradientFill(createVector(chox/2,choy),createVector(chox/2, choy+jongy));
 			rect(0,choy, chox, xw-choy-(xw-jongy))//-|
	}
	
 	
//noStroke();
	//종성
	
	if(nojong==0)
		 {
			 
		myc=random(['ㅇ', 'ㅅ', 'ㅁ', 'ㄱ','ㅋ','ㄴ', 'ㄷ','ㅌ','ㄹ','ㅂ','ㅍ', 'ㅎ','ㅈ','ㅊ']);
	//chocho(myc);
	//myc='ㅌ';
			 //	if(mal!='') //mal 이 있으면
					myc=myjong;
			 /*
		if(juldat==1)
			chojong_line(myc, jongy,'ㅢ')
		else
			chojong(myc, jongy,'ㅢ')
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
				datdat(0,jongy, myc,  xw, yw-jongy, 'ㅢ') //종성
				//chojong_line(myc, 0,'ㅣ')
			else
				//chojong_line2(myc, choy,'ㅣ');
							chojong_line2(0,jongy, myc, xw, yw-jongy, 'ㅢ')

		}
		else
		{
			//chojong(myc, choy,'ㅣ');
				if(   ssang==1 || se==1)//ᅚ  //옛한글 복자음 처리
					{

				datdat(0,jongy, myc,  xw, yw-jongy, 'ㅢ') //종성
					}
				else
				{
					//print("||myc=="+"'"+myc+"'");
							chojong_line2(0,jongy, myc, xw, yw-jongy, 'ㅢ')
				}

		}
	}

			 
	//chojong(myc, jongy, 'ㅢ')
	
			 
}
	pop()

}


