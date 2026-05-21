
//이임 케이스 ///////////////////////////////////////////////////
function dns0_line(x, y)
{
push()
	translate(x, y);
 	let jungtype;

	//let choyt=random(cellsz/4, cellsz*3/4);
	
	if(nojong==1) //hancheck에서 nojong 이 결정됨 ... 받침이 없을 경우 
			choy=yw;
			//choy=cellsz;
	else  //받침이 있는 경우
			choy=random(yw/4, yw*3/4);
			//choy=random(cellsz/4, cellsz*3/4);
	
	//choy=random([cellsz, choyt]);//종성이 없거나 있거나  
	//choy=cellsz/2;
	//ㅡㅗㅛㅜㅠ 케이스 추가해야함
	chojung=random(xw/4, xw*3/4); // x 축 초성과 중성을 나누는 것임 
	chox=chojung;
	
	//chojung=random(cellsz/4, cellsz*3/4);
	//chox=chojung;
	
	let mysz;
	let rr=random();
	
	//초성//
	
	//let myc=random(['ㅇ', 'ㅅ', 'ㅁ', 'ㄱ','ㅋ','ㄴ', 'ㄷ','ㅌ','ㄹ','ㅂ','ㅍ', 'ㅎ','ㅈ','ㅊ']);
	//chocho(myc);
	//myc='ㅎ';
	

//	if(mal!='') //mal 이 있으면
	myc=mycho;

	let yet_cho_flag=0;
	for(let i=0; i<yet_cho.length;i++)
	{
		if(myc==yet_cho[i]) 
		{ 
			yet_cho_flag=1;
		  //print("this is YET CHO : dns0_line" +myc);
		}
	}
				let ssang=0;
				let se=0; //셋자음
	
				if(yet_cho_flag==1) //  //옛한글 복자음 처리
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
			//print("this is yet cho : dns0_line" +myc + ssang);

	
	//let const = "ᄕ","ᄖ","ᅛ","ᅜ", "ᅝ", "ᄗ",  "ᅞ", "ꥠ", "ꥡ", "ꥢ", "ꥣ", "ꥤ",     "ᄘ", "ꥦ",      "ᄙ", "ꥨ", "ꥩ",        "ꥬ", "ꥭ", "ꥮ", "ᄚ","ꥯ", "ꥰ", "ᄜ", "ꥱ","ᄞ", "ᄟ", "ᄠ", "ᄈ", "ᄡ", "ᄧ", "ᄨ", "ꥳ", "ᄩ", "ᄪ", "ꥴ", "ᄭ", "ᄮ", "ᄯ", "ᄰ", "ᄱ", "ᄲ",   "ᄊ",   "ᄶ", "ᄷ", "ᄸ", "ᄹ", "ᄺ", "ᄻ",  "ᅁ", "ᅂ", "ꥶ", "ᅃ", "ᅄ", "ᅅ", "ᅆ", "ᅇ", "ᅈ", "ᅉ", "ᅊ", "ᅋ", "ꥷ",  "ᅍ", "ᅒ","ᅓ","ꥹ","ᅖ","ꥺ", "ꥻ", "ᅘ"];

	if(onlyhol!=1)
	{
 		if(juldat==1)
		{
//			if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'||myc=='ㅆ'||myc=='ㅉ')//ᅚ
						if(myc=='ㄲ'||myc=='ㄸ'||myc=='ㅃ'||myc=='ㅆ'||myc=='ㅉ'|| ssang==1 ||se==1) //ᅚ
						{
							datdat(0,0, myc,  chox, choy, 'ㅣ') //초성
						}
				//chojong_line(myc, 0,'ㅣ')
			else
			//	chojong_line(myc, 0,'ㅣ')
			 chojong_line2(0,0, myc, chojung, choy, 'ㅣ')

		}
		else
		{
				if(ssang==1 || se==1) //쌍셋자음... 옛한글
				{
					datdat(0,0, myc,  chox, choy, 'ㅣ') //초성
				}
				else
				{
					chojong_line2(0,0, myc, chojung, choy, 'ㅣ')
				}
		}
	}

  
	 /*
	if(onlyhol!=1)
	{
 		if(juldat==1)
			chojong_line(myc, 0,'ㅣ')
		else
			chojong(myc, 0,'ㅣ')
	}
 */

		if(julhol==1)
		{
					strokeCap(PROJECT) 
				//let sw=min(xsz,ysz)/10;

				strokeWeight(stsz);
				stroke(random(colors));
		}
	else
		noStroke();

	
	fill(random(colors));
	//중성//
	
	let mycircle=1;
	if(mycircle==1)
	{
 		
	mysz=min(choy, xw-chojung)/2; //1, 2
	//fill(200)
	let lr=mysz/2;
	//ㅁㅏㅁ
		//let myc=random(['ㅣ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅐ','ㅔ', 'ㅖ', 'ㅒ']); 
				
		let myc=random(['ㅣ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅐ','ㅔ', 'ㅖ', 'ㅒ'	,'ퟄ']); //	ퟄ 옛한글 포함
				//let myc=random(['ㅣ', 'ㅏ',   'ㅓ' ]);
		//myc='ㅏ';
	//if(mal!='') //mal 이 있으면
		myc=myjung;
		
 		//let mych=random(['ㅑ']);
  	let xxr=random();
		if(myc=='ㅏ'||myc=='ᅡ') //아
		{
			let hhxsz=(xw-chojung)/2; //x를 두개로 나눔
			if(hhxsz>choy) hhxsz=choy;
			
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/2-stsz/2, xw-stsz/2, choy/2-stsz/2)
			}
			else
			{
			  if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
					setGradientFill(createVector(chojung+(xw-chojung)/2+lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2+lr, choy/2+mysz/2));
				else //같은 세로 grade
					setGradientFill(createVector(chojung+(xw-chojung)/2+lr-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2+lr+mysz/2, choy/2));
				
				//circle(chojung+(xw-chojung)/2+lr, choy/2, mysz);
							circle(chojung+(xw-chojung)/2+hhxsz/2, choy/2, hhxsz);
				setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
				rect(chojung,0, (xw-chojung)/2, choy)
			}
		}
		else if(myc=='ㅑ'||myc=='ᅣ')
		{
								if(julhol==1)
			{
				//setGradientFill(createVector(cellsz/2,choy),createVector(cellsz/2,choy+mysz));
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/3-stsz/2, xw-stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-stsz/2, choy*2/3-stsz/2)
			}
			else
			{
				if(dhanul==1) //가로 grade...x 일정 Y 값 바뀜
					setGradientFill(createVector(chojung+(xw-chojung)/2+lr, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2+lr, choy*2/3+mysz/2));
				else
					setGradientFill(createVector(chojung+(xw-chojung)/2+lr-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2+lr+mysz/2, choy*2/3));
				
				circle(chojung+(xw-chojung)/2+lr, choy/3, mysz);
				circle(chojung+(xw-chojung)/2+lr, choy*2/3, mysz);

				setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
				rect(chojung,0, (xw-chojung)/2, choy)
			}
 		}
		else if(myc=='ㅓ'||myc=='ᅥ')
		{
			let hhxsz=(xw-chojung)/2; //x를 두개로 나눔
			if(hhxsz>choy) hhxsz=choy;
			
		if(julhol==1)
			{
				//setGradientFill(createVector(cellsz/2,choy),createVector(cellsz/2,choy+mysz));
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/2-stsz/2, xw-stsz/2, choy/2-stsz/2)
			}
			else
			{
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy/2+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/2));
			circle(chojung+(xw-chojung)/2-hhxsz/2, choy/2, hhxsz);
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung),choy/2));
			rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, choy)
			}
		}
		
		else if(myc=='ㅕ'||myc=='ᅧ')
		{
					if(julhol==1)
			{
				//setGradientFill(createVector(cellsz/2,choy),createVector(cellsz/2,choy+mysz));
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/3-stsz/2, xw-stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-stsz/2, choy*2/3-stsz/2)

			}
			else
			{
				
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy*2/3+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/3));
			circle(chojung+(xw-chojung)/2-lr, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2-lr, choy*2/3, mysz);

			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung),choy/2));
			rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, choy)
		}
		}
		else if(myc=='ᆥ') //ㅕ + ㅑ
		{
			let xa=chojung;
			let ya=0;
			let xasz=(xw-chojung)/2;
			let yasz=choy;
			hanhol_draw('ㅕ', xa, ya, xasz, yasz);
			hanhol_draw('ㅑ', xa+xasz, ya, xasz, yasz);
		}
		//ힿ
		else if(myc=='ힿ') //ㅣ +ㅕ 
		{
					if(julhol==1)
			{
				//setGradientFill(createVector(cellsz/2,choy),createVector(cellsz/2,choy+mysz));
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/3-stsz/2, xw-stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-stsz/2, choy*2/3-stsz/2)

			}
			else
			{
				
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung),choy/2));
			rect(chojung,0, (xw-chojung)/8, choy) //ㅣ
			rect(chojung+(xw-chojung)/2,0, (xw-chojung)/2, choy)
				
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy*2/3+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/3));
			
			circle(chojung+(xw-chojung)/2-lr, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2-lr, choy*2/3, mysz);



		}
		}
		
		else if(myc=='ㅣ'||myc=='ᅵ') //옛한글 'ᅵ' 추가

		{
			if(julhol==1)
			{
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
				
			}
			else
			{
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
			//setGradientFill(createVector(chojung,choy/2),createVector(chojung+(cellsz-chojung), choy/2));

			rect(chojung, 0, (xw-chojung), choy)
			}
		}
		
		//'ᆝ' 이하늘아 ㅣ+
				else if(myc=='ᆝ') //옛한글 'ᆝ' 추가 ㅣ+하늘아

		{
			let yq=choy/4;
			
			if(julhol==1)
			{
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
				
			}
			else
			{
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
			//setGradientFill(createVector(chojung,choy/2),createVector(chojung+(cellsz-chojung), choy/2));

			rect(chojung, 0, (xw-chojung), choy-yq)
			let myr=min(yq, xw-chojung);
			circle(chojung+(xw-chojung)/2, choy-myr/2,   myr)

			}
		}
		
				//'ᆢ'
		
		else if(myc=='ᆢ') //옛한글 'ᅵ' 추가 :

		{
			let minxy=min(xw-chojung, choy);
			
			if(julhol==1)
			{
				//line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
				
			}
			else
			{
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
			//setGradientFill(createVector(chojung,choy/2),createVector(chojung+(cellsz-chojung), choy/2));

			//circle(chojung+(xw-chojung)/2, choy*1/3, minxy/2)
			//circle(chojung+(xw-chojung)/2, choy*2/3, minxy/2)
				let radjust=0;
				if(radjust==1 || random()<0.5)
				{
					circle(xw-minxy/4, minxy/4, minxy/2)
					circle(xw-minxy/4, choy-minxy/4, minxy/2)
				}
				else //center
				{
					circle(chojung+(xw-chojung)/2, minxy/4, minxy/2)
					circle(chojung+(xw-chojung)/2, choy-minxy/4, minxy/2)
				}
			}
		}
		
		else if(myc=='ퟄ' || myc=='ㅣㅣ') //    ퟄ  ㅣㅣ=ㅣ+ㅣ  고어
		{
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/2-stsz/2, xw-stsz/2, choy/2-stsz/2)
				//line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)

			}
			else
			{
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2, choy/2+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2+mysz/2, choy/2));
			
			//circle(chojung+(xw-chojung)/2, choy/2, mysz);
			}
		}
		
		
		else if(myc=='ㅐ'||myc=='ᅤ'||myc=='ᅢ') //

		{
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/2-stsz/2, xw-stsz/2, choy/2-stsz/2)
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)

			}
			else
			{
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2, choy/2+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2+mysz/2, choy/2));
			
			circle(chojung+(xw-chojung)/2, choy/2, mysz);
			}
		}
		
		//'ᆘ'
		
				else if(myc=='ᆘ') // 옛한글 추가 ㅣㅏ 'ᆘ'  ㅐ를 조정

		{
			if(julhol==1)
			{
				//조정필요 ㅐ
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/2-stsz/2, xw-stsz/2, choy/2-stsz/2)
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)

			}
			else
			{
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2, choy/2+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2+mysz/2, choy/2));
			
			circle(chojung+(xw-chojung)/2+lr, choy/2, mysz);
			}
		}
		
		
		else if(myc=='ㅔ'||myc=='ᅦ')

		{
						
		if(julhol==1)
			{
				let jungsplit=(xw-chojung)/2
				line(chojung+stsz/2, choy/2-stsz/2, xw-jungsplit - stsz/2, choy/2-stsz/2)
 				line(xw-jungsplit-stsz/2, 0+stsz/2, xw-jungsplit-stsz/2, choy-stsz/2)
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
			}
			else
			{
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/2-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy/2+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/2),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/2));
			circle(chojung+(xw-chojung)/2-lr, choy/2, mysz);
			}
		}
		
		else if(myc=='ㅖ'||myc=='ᅨ')
		{
					if(julhol==1)
			{
				let jungsplit=(xw-chojung)/2
				line(chojung+stsz/2, choy/3-stsz/2, xw-jungsplit - stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-jungsplit - stsz/2, choy*2/3-stsz/2)

 				line(xw-jungsplit-stsz/2, 0+stsz/2, xw-jungsplit-stsz/2, choy-stsz/2)
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
			}
			else
			{
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy*2/3+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/3));
			circle(chojung+(xw-chojung)/2-lr, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2-lr, choy*2/3, mysz);
		}
		}
		
		
//		'ퟀ'
				else if(myc=='ퟀ') //'ퟀ' ㅣ+ㅖ 옛한글 중성
		{
					if(julhol==1)
			{
				let jungsplit=(xw-chojung)/2
				line(chojung+stsz/2, choy/3-stsz/2, xw-jungsplit - stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-jungsplit - stsz/2, choy*2/3-stsz/2)

 				line(xw-jungsplit-stsz/2, 0+stsz/2, xw-jungsplit-stsz/2, choy-stsz/2)
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
			}
			else
			{
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/4, choy/2));
			rect(chojung, 0, (xw-chojung)/4, choy)
			setGradientFill(createVector(chojung+(xw-chojung)/4,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung+(xw-chojung)/4, 0, (xw-chojung)/4, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy*2/3+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/3));
			circle(chojung+(xw-chojung)/2-lr, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2-lr, choy*2/3, mysz);
		}
		}
		
		else if(myc== 'ᆙ') //옛한글 ㅣㅑ 
		{
					if(julhol==1)
			{
				let jungsplit=(xw-chojung)/2
				line(chojung+stsz/2, choy/3-stsz/2, xw-jungsplit - stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-jungsplit - stsz/2, choy*2/3-stsz/2)

 				line(xw-jungsplit-stsz/2, 0+stsz/2, xw-jungsplit-stsz/2, choy-stsz/2)
 				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
			}
			else
			{
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2-lr, choy*2/3+mysz/2));
			else
				setGradientFill(createVector(chojung+(xw-chojung)/2-lr-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2-lr+mysz/2, choy/3));
			circle(chojung+(xw-chojung)/2+lr, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2+lr, choy*2/3, mysz);
		}
		}
		
	
		
		else if(myc=='ㅒ'||myc=='ힿ') //옛한글 중성 추가
		{
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/3-stsz/2, xw-stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-stsz/2, choy*2/3-stsz/2)
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
			}
			else
			{		
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung, 0, (xw-chojung)/2, choy)
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2, choy*2/3+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2+mysz/2, choy/3));
			circle(chojung+(xw-chojung)/2, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2, choy*2/3, mysz);
		}
		}
	//'ힾ' 'ힾ'
		
		
		else if(myc=='ힾ') //옛한글 중성 추가 ㅣ+ㅒ
		{
			if(julhol==1)
			{
 				line(chojung+stsz/2, 0+stsz/2, chojung+stsz/2, choy-stsz/2)
				line(chojung+stsz/2, choy/3-stsz/2, xw-stsz/2, choy/3-stsz/2)
				line(chojung+stsz/2, choy*2/3-stsz/2, xw-stsz/2, choy*2/3-stsz/2)
				line(xw-stsz/2, 0+stsz/2, xw-stsz/2, choy-stsz/2)
			}
			else
			{		
			//setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			//rect(chojung, 0, (xw-chojung)/2, choy)
				
			setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung)/4, choy/2));
			rect(chojung, 0, (xw-chojung)/4, choy)
			setGradientFill(createVector(chojung+(xw-chojung)/4,choy/2),createVector(chojung+(xw-chojung)/2, choy/2));
			rect(chojung+(xw-chojung)/4, 0, (xw-chojung)/4, choy)
				
			
			setGradientFill(createVector(chojung+(xw-chojung)/2,choy/2),createVector(chojung+(xw-chojung), choy/2));
			rect(chojung+(xw-chojung)/2, 0, (xw-chojung)/2, choy)
			
			if(dhanul==1) //가로 grade...x 일정 y 값 바뀜
				setGradientFill(createVector(chojung+(xw-chojung)/2, choy/3-mysz/2),createVector(chojung+(xw-chojung)/2, choy*2/3+mysz/2));
			else	
				setGradientFill(createVector(chojung+(xw-chojung)/2-mysz/2, choy/3),createVector(chojung+(xw-chojung)/2+mysz/2, choy/3));
			circle(chojung+(xw-chojung)/2, choy/3, mysz);
						//setGradientFill(createVector(chojung,0),createVector(chojung+(cellsz-chojung), choy));
			circle(chojung+(xw-chojung)/2, choy*2/3, mysz);
		}
		}
		
		
	}
	else
	{ //|
		setGradientFill(createVector(chojung,choy/2),createVector(chojung+(xw-chojung), choy/2));
 		rect(chojung,0, xw-chojung, choy)
	}
	
	
//setGradientFill(createVector(chojung,choy/2),createVector(chojung+(w-chojung),choy));
// rect(chojung,choy/2, w-chojung, choy/2)
	
//setGradientFill(createVector(0,choy),createVector(0+w,choy+(w-choy)));
 //rect(0,choy, w, w-choy)
	// stroke(255);
	//strokeWeight(5);
	
	//종성
	
	myc=random(['ㅇ', 'ㅅ', 'ㅁ', 'ㄱ','ㅋ','ㄴ', 'ㄷ','ㅌ','ㄹ','ㅂ','ㅍ', 'ㅎ','ㅈ','ㅊ']);
	//myc='ㅁ';
	//if(mal!='') //mal 이 있으면
	myc=myjong;
	/*
	if(onlyhol!=1)
	{
		if(juldat==1)
			chojong_line(myc, choy,'ㅣ');
		else
			chojong(myc, choy,'ㅣ');

	}
	*/
	//print(myc);
myc=myjong;
//		myc='ퟸ';

//	myc='ퟸ';

	let yet_jong_flag=0;
	for(let i=0; i<yet_jong.length;i++)
	{			
// 
		if(myc==yet_jong[i])
		{  
			yet_jong_flag=1;
 
		}
	}
	
	//print(myc);
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
				datdat(0,choy, myc,  xw, yw-choy, 'ㅣ') //종성
				//chojong_line(myc, 0,'ㅣ')
			else
				//chojong_line2(myc, choy,'ㅣ');
						 chojong_line2(0,choy, myc, xw, yw-choy, 'ㅣ')

		}
		else
		{
			//chojong(myc, choy,'ㅣ');
				if(   ssang==1 || se==1)//ᅚ  //옛한글 복자음 처리
					{

 						datdat(0,choy, myc,  xw, yw-choy, 'ㅣ')
					}
				else
				{
					print("||myc=="+"'"+myc+"'");
						chojong_line2(0,choy, myc, xw, yw-choy, 'ㅣ')
				}

		}
	}

	
	
	pop();
	

}