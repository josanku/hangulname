function hanhol_draw(holsori,x,y, xsz, ysz)
{

	push()
	translate(x,y)
	let myr;
	let yh=ysz/2
	let xh=xsz/2;

	switch(holsori)
	{
		case 'ㆍ':
		case 'ᆞ':
			myr=min(xsz, ysz)
			setGradientFill(createVector(xsz/2, 0), createVector(xsz, ysz/2));
			circle(xsz/2, ysz/2,  myr);
			break;
		case 'ㅡ':
		case 'ㅡ':
		case 'ᅳ':
			setGradientFill(createVector(xsz/2, 0), createVector(xsz/2, ysz/2));
			rect(0,0, xsz, ysz);
			break
		case 'ㅗ':
			myr=min(xsz,yh)
			setGradientFill(createVector(xsz/2-myr/2, myr/2), createVector(xsz/2+myr/2, myr/2));
			circle(xsz/2, yh-myr/2, myr);
			
			setGradientFill(createVector(xsz/2, yh), createVector(xsz/2, ysz));
			rect(0,yh, xsz, yh);
			break
			
		case 'ㅛ':
			myr=min(xsz/2,yh)

			if(dhanul==1) //가로 grade...y일정 X 값 바뀜
			setGradientFill(createVector(xsz/4, yh/2),createVector(xsz, yh/2));
			circle(xsz/4,yh/2,  myr);
			circle(xsz*3/4, yh/2,  myr);
			
			setGradientFill(createVector(xsz/2,yh),createVector(xsz/2,ysz));
		 	rect(0,yh, xsz, yh)//-|
			break;
			
		case 'ㅜnew':
			setGradientFill(createVector(xsz/2, 0), createVector(xsz, ysz/2));
			rect(0,0,xsz,yh);
			myr=min(xsz,yh)

			circle(xsz/2, yh+myr/2, myr);
			break
			case 'ㅜ': //ORG
		case 'ᅮ':
					myr=min(xsz,yh)



					if(nojong==1 && random()<0.5) // 종성이 없을 때 ... 맨 아래로 정렬... 맨 아래 공백 없애기 위한 것임.... 랜덤하게 선택하는 것도 좋음
					{
						setGradientFill(createVector(xsz/2,ysz-myr-yh),createVector(xsz/2,yh));
						rect(0,ysz-myr-yh, xsz, yh)//-|
						
						setGradientFill(createVector(xsz/2-myr/2, ysz-myr/2),createVector(xsz/2+myr/2, ysz-myr/2));
						
						circle(xsz/2, ysz-myr/2,  myr);
					}
					else  //종성여부 관계 없음... 종성이 없을 때 아래가 빔
					{

						setGradientFill(createVector(xsz/2,0),createVector(xsz/2,yh));
						rect(0,0, xsz, yh)//-|
						
						setGradientFill(createVector(xsz/2-myr/2, yh+yh/2),createVector(xsz/2+myr/2, yh+yh/2));
						circle(xsz/2, yh+myr/2,  myr);

					}
			break;
			case 'ㅠ': 
		case  'ᅲ':
				myr=min(xsz/2,yh);
				setGradientFill(createVector(xsz/2,0),createVector(xsz/2,yh));
				rect(0,0, xsz, yh)//-|
			
			if(random() <0.6) //ㅡ에 붙임
			{
				setGradientFill(createVector(0, yh+myr/2),createVector(xsz, yh+myr/2));
				circle(xsz/4, yh+myr/2,  myr);
				circle(xsz*3/4, yh+myr/2,  myr);
			}
			else
			{
				setGradientFill(createVector(0, yh+yh/2),createVector(xsz, yh+yh/2));
				circle(xsz/4, yh+yh/2,  myr);
				circle(xsz*3/4, yh+yh/2,  myr);
			}
			
			break;
			case 'ㅣ':
			setGradientFill(createVector(0, ysz/2), createVector(xsz, ysz/2));
			rect(0,0, xsz, ysz);
			break
			
			case 'ㅏ':
				xh=min(xh, ysz);
		
				setGradientFill(createVector(0, ysz/2), createVector(xsz, ysz/2));
			
				rect(0,0, xh, ysz);
				circle(xh+xh/2, ysz/2, xh);
				break;

			case 'ㅏ':
				myr=min(xh, ysz);
				setGradientFill(createVector(0, ysz/2), createVector(xsz, ysz/2));
			
				rect(0,0, xh, ysz);
				circle(xh+myr/2, ysz/2, myr);
				break;
			
			
			case 'ㅑ':
				myr=min(xh/2, ysz);
		
				setGradientFill(createVector(0, ysz/2), createVector(xsz, ysz/2));
				rect(0,0, xh, ysz)
				
				circle(xh+myr/2, ysz/3, myr);
				circle(xh+myr/2, ysz*2/3, myr);
				break;
			
			case 'ㅓ':
				myr=min(xh, ysz);
		
				setGradientFill(createVector(0, ysz/2), createVector(xsz, ysz/2));
				circle(xh-myr/2, ysz/2, myr);
				rect(xh,0, xh, ysz);
			break;
			case 'ㅕ':
				myr=min(xh/2, ysz);
		
				setGradientFill(createVector(0, ysz/2), createVector(xsz, ysz/2));				
				circle(xh-myr/2, ysz/3, myr);
				circle(xh-myr/2, ysz*2/3, myr);
			
				rect(xh,0, xh, ysz)

				break;
				case 'ㅔ':
					myr=min(xh, ysz);
			
					setGradientFill(createVector(0, ysz/2), createVector(xh, ysz/2));
					rect(0,0, xh, ysz)
					setGradientFill(createVector(xh, ysz/2), createVector(xsz, ysz/2));
					rect(xh,0, xh, ysz)

					setGradientFill(createVector(xh, yh-myr/2), createVector(xh, yh+myr/2));
					circle(xh-myr/2, yh, myr);
					break;
			
				case 'ㅐ':
					myr=min(xh, ysz);
			
					setGradientFill(createVector(0, ysz/2), createVector(xh, ysz/2));
					rect(0,0, xh, ysz)
					setGradientFill(createVector(xh, ysz/2), createVector(xsz, ysz/2));
					rect(xh,0, xh, ysz)

					setGradientFill(createVector(xh, yh-myr/2), createVector(xh, yh+myr/2));
					circle(xh, yh, myr);
					break;
			
				case 'ㅖ':
					myr=min(xh/2, ysz);

					setGradientFill(createVector(0, ysz/2), createVector(xh, ysz/2));
					rect(0,0, xh, ysz)
					setGradientFill(createVector(xh, ysz/2), createVector(xsz, ysz/2));
					rect(xh,0, xh, ysz)

					setGradientFill(createVector(xh, 0), createVector(xh, ysz));
					circle(xh-myr/2,  ysz/3, myr);
					circle(xh-myr/2,  ysz*2/3, myr);
					break;
			
				case 'ㅒ':
					myr=min(xh/2, ysz);

					setGradientFill(createVector(0, ysz/2), createVector(xh, ysz/2));
					rect(0,0, xh, ysz)
					setGradientFill(createVector(xh, ysz/2), createVector(xsz, ysz/2));
					rect(xh,0, xh, ysz)

					setGradientFill(createVector(xh, 0), createVector(xh, ysz));
					circle(xh,  ysz/3, myr);
					circle(xh,  ysz*2/3, myr);
					break;
					
	}
	
	pop()
	
}