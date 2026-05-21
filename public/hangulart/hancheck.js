	let hanhan=[];
	let oneone=1;
	let nojong=0; //종성이 없을 떄 1로 세팅됨
	let nojung=0;
	let myjungㅗ, myjungㅏ;

	let mycho, myjung, myjong;
	let mychocolor, myjungcolor,myjongcolor;
	let mychar;


function hanalysis(char) 
{
	
	let cc='';
	let jj='';
	nojong=0; //종성이 없을 때 1로 세팅됨
	nojung=0;
	mycho='';
	myjung='';
	myjong='';
	onlyhol=0;
	
	let jungtype; //미므믜 0,1,2
	
	if(char=='ㆍ') //예외처리
	{
		jungtype=1; //므
		myjung='ㆍ';	
		nojong=1;
		onlyhol=1;
		return jungtype;
	}

			hanhan=hansplit(char);
	
	

		//초성
		//mycho=hanhan[0];
 		let od=0;
	
	if(hanhan.length==1)  //홀 똔 닿 한자
	{
		
		onlyhol=0;
		nojong=1;
		for(let i=0; i < 중성.length; i++)
		{
			if(hanhan[0]==중성[i])
			{
					onlyhol=1;
			}
			
		}
		
		if(onlyhol==1){
					myjung=hanhan[0];	
					jungtype=checkjungtype();

		}
		else
		{
					mycho=hanhan[0]; //초성종성 모두지만 초성으로 전달
					jungtype=3; //닿 소리 하나임
		}
	}
	else //정상적인 글자 초성임
		mycho=hanhan[0];
		
	

	
		if(hanhan.length>1) //중성있음
		{
						myjung=hanhan[1];


			// 미므뫼 타입 구분함 

			     	if(myjung=="ㅣ"||myjung=="ㅏ"||myjung=="ㅐ"||myjung=="ㅑ"||myjung=="ㅒ"||myjung=="ㅓ"||myjung=="ㅔ"||myjung=="ㅕ"||myjung=="ㅖ")
						 jungtype=0; //미, 밈
						else if(myjung=="ㆍ"||myjung=="ㅡ"||myjung=="ㅗ"||myjung=="ㅛ"||myjung== "ㅜ"||myjung== "ㅠ") 
						 jungtype=1; //므, 믐
						//else if(myjung=="ㅢ"||myjung=="ㅘ"||myjung=="ㅙ"||myjung=="ㅚ"||myjung=="ㅝ"||myjung=="ㅞ"||myjung== "ㅟ")
						else if(myjung=="ㅢ"||myjung=="ㅘ"|| myjung=="ㅚ"||myjung=="ㅝ"||myjung== "ㅟ")
						{
								jungtype=2; //믜, 믬
							  myjungㅏ=jung[jungindex][1]; //복모음에서 ㅡ가 ㅏ 보다 우선임
							  myjungㅗ=jung[jungindex][0];
					

							
						}
						else if(myjung=="ㅙ")
						{
								jungtype=2; //믜, 믬
							  myjungㅏ="ㅐ";
							  myjungㅗ="ㅗ";
						}
						else if(myjung=="ㅞ")
						{
								jungtype=2; //믜, 믬
							  myjungㅏ="ㅔ";
							  myjungㅗ="ㅜ";
						}
			
 		}
	
			//종성있나?
			if(hanhan.length==3)
			{

						myjong=hanhan[2];


			}
			else
			{
				nojong=1;  //종성없음

			}
	
	return(jungtype);

	//hankan(xx,yy, hanhan.length, jungtype);
	//hankan(myx, myy,wsize, thick, mychar)

}


function checkjungtype()
{
			// 미므뫼 타입 구분함 
	let jungtype;

			     	if(myjung=="ㅣ"||myjung=="ㅏ"||myjung=="ㅐ"||myjung=="ㅑ"||myjung=="ㅒ"||myjung=="ㅓ"||myjung=="ㅔ"||myjung=="ㅕ"||myjung=="ㅖ")
						 jungtype=0; //미, 밈
						else if(myjung=="ㆍ"||myjung=="ㅡ"||myjung=="ㅗ"||myjung=="ㅛ"||myjung== "ㅜ"||myjung== "ㅠ") 
						 jungtype=1; //므, 믐
						//else if(myjung=="ㅢ"||myjung=="ㅘ"||myjung=="ㅙ"||myjung=="ㅚ"||myjung=="ㅝ"||myjung=="ㅞ"||myjung== "ㅟ")
						else if(myjung=="ㅢ"||myjung=="ㅘ"|| myjung=="ㅚ"||myjung=="ㅝ"||myjung== "ㅟ")
						{
								jungtype=2; //믜, 믬
							  myjungㅏ=jung[jungindex][1]; //복모음에서 ㅡ가 ㅏ 보다 우선임
							  myjungㅗ=jung[jungindex][0];
		

							
						}
						else if(myjung=="ㅙ")
						{
								jungtype=2; //믜, 믬
							  myjungㅏ="ㅐ";
							  myjungㅗ="ㅗ";
						}
						else if(myjung=="ㅞ")
						{
								jungtype=2; //믜, 믬
							  myjungㅏ="ㅔ";
							  myjungㅗ="ㅜ";
						}
	
	return jungtype;
}
