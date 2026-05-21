//믜 믬 y=> 3 등분

//콰쿼 ㅏㅓ 조정 필요
function hanhol(x, y)
{
	
	
	let eudominance=0; //현재 디폴트임 
	let myjung3;
	
	//let nojong=0; //don't change
	chojung=random(xw/4, xw*3/4);
	chox=chojung; //중성이 시작하는  x 점
	
	push()
	print("x= "+x);
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
 
	let hol_2=0;
	let hol_3=0;
	let yet_jung_dns2_oh_flag=0; // ㅗ 우세 
	let yet_jung_pos;
 
	

	

	for(let i=0; i<yet_jung_dns2_oh.length;i++)
	{
		if(myc==yet_jung_dns2_oh[i])
			yet_jung_dns2_oh_flag=1;
	}
	
	//print("oh 우세" + myjungㅏ+myjungㅗ);
	//print("oh 우세    " +  myjung+". "+yet_jung_dns2_oh_flag);

	for(let i=0; i<yet_jung_ssang.length;i++)
	{
			if(myc==yet_jung_ssang[i][0]) 
			{ 		
				if(yet_jung_ssang[i][1].length==2) 
				{
					hol_2=1; //쌍모음
					myjungㅗ =yet_jung_ssang[i][1][0]; //ㅗ가 먼저 올 수도 있지 않나?
					myjungㅏ =yet_jung_ssang[i][1][1];
					print("ㅗ ㅏ: "+ myjungㅗ + myjungㅏ);
				}
				else if(yet_jung_ssang[i][1].length==3) //myjung=  	'ᆋ'
				{
					hol_3=1; //모음 3개
					print("3333");
					myjungㅗ =yet_jung_ssang[i][1][0];
					myjungㅏ =yet_jung_ssang[i][1][1];
					myjung3 =yet_jung_ssang[i][1][2]; //나중에 세팅

				}
			}
	}
	

	if(yet_jung_dns2_oh_flag==0) // ㅣ 우세
	{
		if(hol_2==1) //아
		{
			let xa, ya; //아 시작점
			xa=chojung;
			ya=0;
			//ㅏ
			let xasz=(xw-chojung);
			let yasz=jongy; //종성시작점까지 

			hanhol_draw(myjungㅏ, xa, ya, xasz,yasz);
			//ㅗ
			xa=0;
			ya=choy;
			xasz=chojung;
			yasz=yw-choy-(yw-jongy);
			hanhol_draw(myjungㅗ, xa,ya,xasz,yasz);
		
		}
		

	}
	else //ㅗ 우세 ㅗ+ㅣ
	{
		if(hol_2==1) //아
		{
			let xa, ya; //아 시작점
			xa=chojung;
			ya=0;
			//ㅏ
			let xasz=(xw-chojung);
			//let yasz=jongy; //종성시작점까지
			let yasz=choy; //종성시작점까지
			//print(myjungㅏ);
			hanhol_draw(myjungㅏ, xa, ya, xasz,yasz);
			
			//ㅗ
			xa=0;
			ya=choy;
			//xasz=chojung;
			xasz=xw;

			yasz=yw-choy-(yw-jongy);
			hanhol_draw(myjungㅗ, xa,ya,xasz,yasz);
		}

	}

	
	if(hol_3==1)
	{
			if(myc=='ᆋ'|| myc=='ᆗ')
			{
				print("THREE HOLSORI"+myc);

				let xa, ya; //아 시작점
				xa=chojung;
				ya=0;

				let xasz=(xw-chojung);
				let yaszfull=yw-choy-(yw-jongy);
				yasz=choy+yaszfull/2

				hanhol_draw(myjungㅏ, xa,ya, xasz, yasz);

						//ㅗ
				xa=0;
				ya=choy;
				xasz=chojung;
			//	yasz=yw-choy-(yw-jongy);
				yasz=yaszfull/2;
				hanhol_draw(myjungㅗ, xa,ya,xasz, yasz);
				//ㅗ___
				xasz=xw;
				hanhol_draw(myjung3, xa,ya+yasz, xasz, yasz );
			}
			else if(myc=='ힽ')  //ㅣ	ㅑ	ㅗ
			{

				let xa, ya; //아 시작점
				xa=chojung;
				ya=0;
		
				let xasz=(xw-chojung)/2;
				let yasz=choy;
				hanhol_draw('ㅣ', xa,ya, xasz, yasz);
				hanhol_draw('ㅑ', xa+xasz,ya, xasz, yasz);
				xa=0;
				ya=choy;
				xasz=xw;
				yasz=yw-choy-(yw-jongy);
				hanhol_draw('ㅗ', xa,ya, xasz, yasz);
			}
			else if(myc=='ힶ') //ㅜ + ㅣ + ㅣ
			{
				let xa, ya; //아 시작점
				xa=chojung;
				ya=0;
		
				let xasz=(xw-chojung)/2;
				let yasz=jongy;
				hanhol_draw('ㅣ', xa,ya, xasz, yasz);
				hanhol_draw('ㅣ', xa+xasz,ya, xasz, yasz);
				xa=0;
				ya=choy;
				xasz=chojung;
				yasz=yw-choy-(yw-jongy);
				hanhol_draw('ㅜ', xa,ya, xasz, yasz);
			}
		
			else if(myc=='ퟁ') //	ㅣㅗ ㅣ //ㅗ우세
			{
				let xa, ya; //아 시작점
				xa=chojung;
				ya=0;
		
				let xasz=(xw-chojung);
				let yasz=choy;
				hanhol_draw('ㅣ', xa,ya, xasz, yasz);
				xa=0;
				ya=choy;
				xasz=xw;
				yaszfull=yw-choy-(yw-jongy);
				yasz=yaszfull/2;
				hanhol_draw('ㅗ', xa,ya, xasz, yasz);
				hanhol_draw('ㅣ', xa,ya+yasz, xasz, yasz);
			}

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


