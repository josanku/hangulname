function datdat(x,y, mychar,  xsz, ysz, mymode)
{
	let fst;
	let scnd;
	let thrd;
	let se=0; //세자음
	
	let yet_cho_point=-1;
	for(let i=0; i<yet_cho_ssang.length;i++)
	{
		if(myc==yet_cho_ssang[i][0]) 
			{ 
				yet_cho_point=i;
				if(yet_cho_ssang[i][1].length==3) se=1;

			}

	}
	
				//	print("THERE="+myc);

	let yet_jong_point=-1;
	for(let i=0; i<yet_jong_ssang.length;i++)
	{
		if(myc==yet_jong_ssang[i][0]) //ퟸ
			{ 
				yet_jong_point=i;
				//print("MATCHED="+myc);
				if(yet_jong_ssang[i][1].length==3) 
				{se=1;
				}
			}
		
	}
	
	
	if(yet_cho_point==-1 &&  yet_jong_point==-1)
	{
	switch(mychar)
	{
			//				chojong_line(myc, 0,'ㅣ')

		case 'ㄲ':
			fst=scnd='ㄱ';
			break;	
			
		case 'ㄸ':
			fst=scnd='ㄷ';
			break;
			 
		case 'ㅃ':
			fst=scnd='ㅂ';

			break;
		case 'ㅆ':
			fst=scnd='ㅅ';

			break;
		case 'ㅉ':
			fst=scnd='ㅈ';

			break;

			//	if(myc=='ㄺ'||myc=='ㄻ'||myc=='ㄼ'||myc=='ㅄ'||   myc=='ㄳ'||myc=='ㄽ'||   myc=='ㄵ'||myc=='ㄶ'||myc=='ㄼ'||myc=='ㄾ'||myc=='ㅀ')

		case 'ㄺ':
			fst='ㄹ'; scnd='ㄱ';
			break;	
		case 'ㄻ':
			fst='ㄹ'; scnd='ㅁ';
			break;	
			
		case 'ㄼ':
			fst='ㄹ'; scnd='ㅂ';

			break;	
		case 'ㅄ':
			fst='ㅂ'; scnd='ㅅ';

			break;	
						//myc=='ㄳ'||myc=='ㄽ'||   

		case 'ㄳ':
			fst='ㄱ'; scnd='ㅅ';

			break;	
		case 'ㄽ':
			fst='ㄹ'; scnd='ㅅ';

			break;	
			
		// myc=='ㄵ'||myc=='ㄶ'||||myc=='ㄾ'||myc=='ㅀ')
		case 'ㄵ':
			fst='ㄴ'; scnd='ㅈ';

			break;	
		case 'ㄶ':
			fst='ㄴ'; scnd='ㅎ';
			break;	
		case 'ㄾ':
			fst='ㄹ'; scnd='ㅌ';
			break;	
			
		case 'ㄿ':
			fst='ㄹ'; scnd='ㅍ';
			break;	
		case 'ㅀ':
			fst='ㄹ'; scnd='ㅎ';
			break;
			
	//옛한글	
		case 'ᄕ':
			fst='ㄴ'; scnd='ㄷ';
			break;	
		case 'ᄕ':
			fst='ㄴ'; scnd='ㄷ';
			break;	
		case 'ᅚ':
			fst='ㄱ'; scnd='ㄷ';
			break;	
		case 'ᄓ':
			fst='ㄴ'; scnd='ㄱ';
			break;	
		case 'ᄔ':
			fst='ㄴ'; scnd='ㄴ';
			break;				
			//옛초성 전체 = "ᄕ", "ᄖ", "ᅛ", "ᅜ", "ᅝ", "ᄗ",  "ᅞ", "ꥠ", "ꥡ", "ꥢ", "ꥣ", "ꥤ", "ꥥ", "ᄘ", "ꥦ", "ꥧ", "ᄙ", "ꥨ", "ꥩ", "ꥪ", "ꥫ", "ꥬ", "ꥭ", "ꥮ", "ᄚ", "ᄛ",  "ꥯ", "ꥰ", "ᄜ", "ꥱ", "ᄝ", "ᄞ", "ᄟ", "ᄠ", "ᄈ", "ᄡ", "ᄢ", "ᄣ", "ᄤ", "ᄥ", "ᄦ", "ꥲ", "ᄧ", "ᄨ", "ꥳ", "ᄩ", "ᄪ", "ꥴ", "ᄫ", "ᄬ",  "ᄭ", "ᄮ", "ᄯ", "ᄰ", "ᄱ", "ᄲ", "ᄳ", "ᄊ", "ꥵ", "ᄴ", "ᄵ", "ᄶ", "ᄷ", "ᄸ", "ᄹ", "ᄺ", "ᄻ", "ᄼ", "ᄽ", "ᄾ", "ᄿ", "ᅀ", "ᅁ", "ᅂ", "ꥶ", "ᅃ", "ᅄ", "ᅅ", "ᅆ", "ᅇ", "ᅈ", "ᅉ", "ᅊ", "ᅋ", "ꥷ", "ᅌ",  "ᅍ",  "ꥸ", "ᅎ", "ᅏ", "ᅐ", "ᅑ", "ᅒ", "ᅓ", "ᅔ", "ᅕ",  "ꥹ", "ᅖ", "ꥺ", "ᅗ",  "ꥻ", "ᅘ", "ᅙ", "ꥼ",
														
	}	
	}
	else if( yet_cho_point!=-1) //옛초성 쌍초성  //							
	{
		fst=yet_cho_ssang[yet_cho_point][1][0];
		scnd=yet_cho_ssang[yet_cho_point][1][1];
		//print("쌍초성 yetCHO"+myc +":"+yet_cho_point+":"+fst+":"+scnd);
		if(se==1) thrd=yet_cho_ssang[yet_cho_point][1][2];

	}
		else if( yet_jong_point!=-1) //옛초성 쌍초성  //							
	{
		fst=yet_jong_ssang[yet_jong_point][1][0];
		scnd=yet_jong_ssang[yet_jong_point][1][1];
	//	print("yetJONG"+myc +":"+yet_jong_point+":"+fst+":"+scnd);
		if(se==1) thrd=yet_jong_ssang[yet_jong_point][1][2];

	}
	
	
	
	if(se==0)
	{
		chojong_line2(x,y,fst, xsz/2,ysz, mymode)
		chojong_line2(x+xsz/2,y,scnd, xsz/2,ysz, mymode)
		//print("datdat FS: "+mychar+"="+fst+scnd);

	}
	else 
	{
		chojong_line2(x,y,fst, xsz/3,ysz, mymode)
		chojong_line2(x+xsz/3,y,scnd, xsz/3,ysz, mymode)
		chojong_line2(x+xsz*2/3,y,thrd, xsz/3,ysz, mymode)
		//print("datdat FST:   "+mychar+"="+fst+scnd+thrd);


	}
}