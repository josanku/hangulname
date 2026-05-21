//https://openprocessing.org/sketch/1934560/
/*
Reference

@Okazz
https://openprocessing.org/sketch/1781381
*/
//let min=20;

function nemorandom(x, y, ww, hh, mymin){
    if(ww >= mymin && hh >= mymin) //최소크기보다 크면
		{
        if(ww >= hh){ //x축이 크거나 같으면
            let szX = ww * random(0.1, 0.9);
            nemorandom(x, y, szX, hh, mymin); // x 축을 둘로 나눔
            nemorandom(x + szX, y, ww - szX, hh, mymin);
        }
        else if(hh > ww){ //높이가 크면 둘로 나눔
            let szY = hh * random(0.1, 0.9);
            nemorandom(x, y, ww, szY, mymin);
            nemorandom(x, y + szY, ww, hh - szY, mymin);
        }

    } else {
        // noFill()
        drawShape(x, y, ww, hh) //작으면 그냥 그림
    }
}

function drawShape(x, y, ww, hh)
{
    //fill(colF);
   // stroke(colS);
   // strokeWeight(1.5);
//stroke('red');
//	rect(x,y,ww,hh);
	 
	
 				if(mal!='')
				{
						mychar='';
						if(malrandom==1)
						{
							//mychar=mal[int(random(mal.length))];
							//while(mychar==''||mychar==' ') //blank는 skip
							{
									mychar=mal[int(random(mal.length))];
							}
						}
						else //순서대로
						{
							if(ord<mal.length) 
								mychar=mal[ord];
							ord++;
							if(ord==mal.length)
							{
								ord=0;
							}
						}
 		 				jungtype=hanalysis(mychar);
 			} //ma ==''
			else 
			{
				mychar=String.fromCodePoint(int(random(44032, 44032+11172)));
				//jungtype=random([0,1,2]); //?
				jungtype=hanalysis(mychar);
			}
						 

			let rchar=0; //랜덤으로 선택함
			
			if(rchar==1)
			{
				mychar=String.fromCodePoint(int(random(44032, 44032+11172)));
				jungtype=hanalysis(mychar);
			}
//print(mychar+":"+jungtype);	
			if(julrandomly==1)
			{
 				juldat=random([0,1]);
			 julhol=random([0,1]);
			}

			
			let diff_char=0;	//글자마다 새로운 색깔
			if(diff_char==1)
			{
				palette=random(palettes);
				colors= palette.colors.concat();
			}
			
	xw=ww;
	yw=hh;
	
	
	if(check_en(mychar)==1)
	{
		if(julrandomly==1)
				julen= random([0,1]);
		dns_en(x,y,mychar)
	}
	else
	{
			if(jungtype==0) //미 밈
			{
					dns_line(x,y);
			}
			else if(jungtype==1) //므믐 
					dns1_line(x,y);
			else if(jungtype==2) //뫼묌
					dns2_line(x,y);
			else if(jungtype==3) //자음만 있거나 중성만 있는 경우  onlydat 
					dns3(x,y);
	}
		 
}

function check_en(ch) 
{


        if( (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
					return 1;

}