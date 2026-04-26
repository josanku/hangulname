// English → Korean transliteration
// Uses a name dictionary for common names, rule-based fallback for others.

const DICT: Record<string, string> = {
  // Male
  james:'제임스', john:'존', robert:'로버트', michael:'마이클', william:'윌리엄',
  david:'데이비드', richard:'리처드', joseph:'조셉', thomas:'토마스', charles:'찰스',
  christopher:'크리스토퍼', daniel:'다니엘', matthew:'매튜', anthony:'앤서니', mark:'마크',
  donald:'도널드', steven:'스티븐', paul:'폴', andrew:'앤드류', joshua:'조슈아',
  kenneth:'케네스', kevin:'케빈', brian:'브라이언', george:'조지', timothy:'티모시',
  ronald:'로널드', edward:'에드워드', jason:'제이슨', jeffrey:'제프리', ryan:'라이언',
  jacob:'제이콥', gary:'게리', nicholas:'니콜라스', eric:'에릭', jonathan:'조나단',
  stephen:'스티븐', larry:'래리', justin:'저스틴', scott:'스콧', brandon:'브랜든',
  benjamin:'벤저민', samuel:'사무엘', gregory:'그레고리', frank:'프랭크',
  alexander:'알렉산더', patrick:'패트릭', jack:'잭', dennis:'데니스', jerry:'제리',
  tyler:'타일러', aaron:'에런', adam:'애덤', henry:'헨리', nathan:'네이선',
  peter:'피터', kyle:'카일', noah:'노아', ethan:'이든', liam:'리암', mason:'메이슨',
  oliver:'올리버', logan:'로건', lucas:'루카스', owen:'오웬', aiden:'에이든',
  carter:'카터', julian:'줄리언', caleb:'케일럽', hunter:'헌터', ian:'이언',
  christian:'크리스천', dylan:'딜런', austin:'오스틴', sean:'숀', alan:'앨런',
  russell:'러셀', walter:'월터', carl:'칼', albert:'앨버트', arthur:'아서',
  harry:'해리', roger:'로저', wayne:'웨인', bruce:'브루스', louis:'루이',
  leon:'레온', chris:'크리스', travis:'트래비스', cole:'콜', evan:'에번',
  luke:'루크', alex:'알렉스', max:'맥스', jake:'제이크', joe:'조', mike:'마이크',
  // Female
  mary:'메리', patricia:'패트리샤', jennifer:'제니퍼', linda:'린다', barbara:'바버라',
  elizabeth:'엘리자베스', susan:'수전', jessica:'제시카', sarah:'사라', karen:'캐런',
  lisa:'리사', nancy:'낸시', betty:'베티', margaret:'마거릿', sandra:'산드라',
  ashley:'애슐리', dorothy:'도러시', kimberly:'킴벌리', emily:'에밀리', donna:'도나',
  michelle:'미셸', carol:'캐럴', amanda:'아만다', melissa:'멜리사', deborah:'데버라',
  stephanie:'스테파니', rebecca:'레베카', sharon:'섀런', laura:'로라', cynthia:'신시아',
  kathleen:'캐슬린', amy:'에이미', angela:'앤젤라', shirley:'셜리', anna:'애나',
  brenda:'브렌다', pamela:'파멜라', emma:'에마', nicole:'니콜', helen:'헬렌',
  samantha:'사만다', katherine:'캐서린', christine:'크리스틴', rachel:'레이첼',
  carolyn:'캐롤린', janet:'재닛', catherine:'캐서린', maria:'마리아', heather:'헤더',
  diane:'다이앤', julie:'줄리', victoria:'빅토리아', kelly:'켈리', kelley:'켈리', christina:'크리스티나',
  joan:'조앤', evelyn:'에블린', lauren:'로런', alice:'앨리스', julia:'줄리아',
  olivia:'올리비아', hannah:'해나', jacqueline:'재클린', martha:'마사', megan:'메건',
  andrea:'안드레아', ann:'앤', jean:'진', sophia:'소피아', isabella:'이저벨라',
  ava:'에이바', mia:'미아', abigail:'애비게일', madison:'매디슨', charlotte:'샬럿',
  harper:'하퍼', amelia:'아밀리아', ella:'엘라', grace:'그레이스', chloe:'클로이',
  zoey:'조이', riley:'라일리', lily:'릴리', ellie:'엘리', natalie:'나탈리', leah:'레아',
  hazel:'헤이즐', aurora:'오로라', nora:'노라', camila:'카밀라',
  // Last names
  smith:'스미스', johnson:'존슨', williams:'윌리엄스', brown:'브라운', jones:'존스',
  garcia:'가르시아', miller:'밀러', davis:'데이비스', wilson:'윌슨', anderson:'앤더슨',
  taylor:'테일러', jackson:'잭슨', white:'화이트', harris:'해리스', martin:'마틴',
  thompson:'톰프슨', young:'영', allen:'앨런', king:'킹', wright:'라이트',
  torres:'토레스', nguyen:'응우옌', hill:'힐', green:'그린', adams:'애덤스',
  nelson:'넬슨', baker:'베이커', hall:'홀', rivera:'리베라', campbell:'캠벨',
  mitchell:'미첼', roberts:'로버츠', gomez:'고메즈', phillips:'필립스', evans:'에번스',
  turner:'터너', diaz:'디아스', parker:'파커', cruz:'크루즈', edwards:'에드워즈',
  collins:'콜린스', reyes:'레예스', stewart:'스튜어트', morris:'모리스', murphy:'머피',
  cook:'쿡', rogers:'로저스', morgan:'모건', cooper:'쿠퍼', peterson:'피터슨',
  bailey:'베일리', reed:'리드', howard:'하워드', ramos:'라모스', kim:'김', cox:'콕스',
  ward:'워드', watson:'왓슨', brooks:'브룩스', wood:'우드', bennett:'베넷',
  gray:'그레이', hughes:'휴즈', price:'프라이스', sanders:'샌더스', patel:'파텔',
  long:'롱', ross:'로스', foster:'포스터', powell:'파월', jenkins:'젠킨스',
  perry:'페리', bell:'벨', coleman:'콜먼', butler:'버틀러', henderson:'헨더슨',
  barnes:'반스', fisher:'피셔', simmons:'시먼스', jordan:'조던', patterson:'패터슨',
  hamilton:'해밀턴', graham:'그레이엄', reynolds:'레이놀즈', griffin:'그리핀',
  wallace:'월러스', moreno:'모레노', west:'웨스트', hayes:'헤이즈', bryant:'브라이언트',
  gibson:'깁슨', ellis:'엘리스', tran:'트란', spencer:'스펜서', hawkins:'호킨스',
  arnold:'아널드', pierce:'피어스', watkins:'왓킨스', hart:'하트', knight:'나이트',
  // Famous
  trump:'트럼프', obama:'오바마', biden:'바이든', clinton:'클린턴', bush:'부시',
  reagan:'레이건', lincoln:'링컨', einstein:'아인슈타인', darwin:'다윈', newton:'뉴턴',
  shakespeare:'셰익스피어', beethoven:'베토벤', mozart:'모차르트', bach:'바흐',
  picasso:'피카소', freud:'프로이트', marx:'마르크스', tesla:'테슬라', gates:'게이츠',
  jobs:'잡스', musk:'머스크', bezos:'베조스', buffett:'버핏', zuckerberg:'저커버그',
  woods:'우즈', federer:'페더러', ronaldo:'호날두', messi:'메시', curry:'커리',
  presley:'프레슬리', lennon:'레넌', mccartney:'매카트니', swift:'스위프트',
  beyonce:'비욘세', madonna:'마돈나', adele:'아델', pitt:'피트', depp:'뎁',
  cruise:'크루즈', hanks:'행크스', streep:'스트립', jolie:'졸리', winslet:'윈슬릿',
  elon:'일론', nolan:'놀런', scarlett:'스칼릿', violet:'바이올렛', jasmine:'재스민',
  penelope:'페넬로페', vivian:'비비안', eleanor:'엘리너', claire:'클레어',
  blake:'블레이크', brianna:'브리애나', autumn:'오텀', savannah:'서배나',
  naomi:'나오미', isabelle:'이저벨', annabelle:'애너벨',
  caroline:'캐롤라인', carolyn:'캐롤린', carol:'캐럴',
  kathryn:'캐스린', kate:'케이트', katie:'케이티',
  beatrice:'베어트리스', beatrix:'비어트릭스', florence:'플로런스',
  virginia:'버지니아', georgia:'조지아', frances:'프랜시스',
  harriet:'해리엇', veronica:'베로니카', vanessa:'버네사', valentina:'발렌티나',
  eloise:'엘로이즈', claudia:'클로디아', constance:'콘스턴스',
  clarence:'클래런스', eugene:'유진', reginald:'레지널드',
  bernard:'버나드', clifford:'클리퍼드', lloyd:'로이드',
  raymond:'레이먼드', leonard:'레너드', jerome:'제롬', wilbur:'윌버',
  grant:'그랜트', polk:'포크', fillmore:'필모어', buchanan:'뷰캐넌',
  garfield:'가필드', cleveland:'클리블랜드', mckinley:'맥킨리',
  harding:'하딩', coolidge:'쿨리지', hoover:'후버', eisenhower:'아이젠하워',
  truman:'트루먼', kennedy:'케네디', nixon:'닉슨',
  chaplin:'채플린', hitchcock:'히치콕', kubrick:'큐브릭', spielberg:'스필버그',
  scorsese:'스코세이지', tarantino:'타란티노', fincher:'핀처', eastwood:'이스트우드',
};

// Jamo indices for building Unicode syllables
const CHO: Record<string,number> = {
  ㄱ:0,ㄲ:1,ㄴ:2,ㄷ:3,ㄸ:4,ㄹ:5,ㅁ:6,ㅂ:7,ㅃ:8,ㅅ:9,ㅆ:10,ㅇ:11,ㅈ:12,ㅉ:13,ㅊ:14,ㅋ:15,ㅌ:16,ㅍ:17,ㅎ:18
};
const JUNG: Record<string,number> = {
  ㅏ:0,ㅐ:1,ㅑ:2,ㅒ:3,ㅓ:4,ㅔ:5,ㅕ:6,ㅖ:7,ㅗ:8,ㅘ:9,ㅙ:10,ㅚ:11,ㅛ:12,ㅜ:13,ㅝ:14,ㅞ:15,ㅟ:16,ㅠ:17,ㅡ:18,ㅢ:19,ㅣ:20
};
const JONG: Record<string,number> = {
  '':0,ㄱ:1,ㄲ:2,ㄳ:3,ㄴ:4,ㄵ:5,ㄶ:6,ㄷ:7,ㄹ:8,ㄺ:9,ㄻ:10,ㄼ:11,ㄽ:12,ㄾ:13,ㄿ:14,ㅀ:15,ㅁ:16,ㅂ:17,ㅄ:18,ㅅ:19,ㅆ:20,ㅇ:21,ㅈ:22,ㅊ:23,ㅋ:24,ㅌ:25,ㅍ:26,ㅎ:27
};

function syl(cho: string, jung: string, jong = ''): string {
  const c = CHO[cho] ?? 11;
  const v = JUNG[jung];
  const j = JONG[jong] ?? 0;
  if (v === undefined) return cho + jung;
  return String.fromCharCode(0xAC00 + (c * 21 + v) * 28 + j);
}

// Returns list of (jamo, isVowel) tokens
function tokenize(s: string): Array<{j: string; v: boolean}> {
  const out: Array<{j: string; v: boolean}> = [];
  let i = 0;
  while (i < s.length) {
    const two = s.slice(i, i+2);
    const one = s[i];

    // digraph consonants
    if (two === 'ch') { out.push({j:'ㅊ',v:false}); i+=2; continue; }
    if (two === 'sh') { out.push({j:'ㅅ',v:false}); i+=2; continue; }
    if (two === 'th') { out.push({j:'ㅅ',v:false}); i+=2; continue; }
    if (two === 'ph') { out.push({j:'ㅍ',v:false}); i+=2; continue; }
    if (two === 'wh') { out.push({j:'ㅎ',v:false}); i+=2; continue; }
    if (two === 'ck') { out.push({j:'ㅋ',v:false}); i+=2; continue; }
    if (two === 'ng') { out.push({j:'ㅇ',v:false}); i+=2; continue; }
    if (two === 'gh') { i+=2; continue; } // silent
    if (two === 'qu') { out.push({j:'ㅋ',v:false}); i+=2; continue; }
    if (two === 'tch') { out.push({j:'ㅊ',v:false}); i+=3; continue; }

    // digraph vowels
    if (two === 'ee' || two === 'ea' || two === 'ie' || two === 'ei') { out.push({j:'ㅣ',v:true}); i+=2; continue; }
    if (two === 'oo' || two === 'ou' || two === 'ue' || two === 'ew') { out.push({j:'ㅜ',v:true}); i+=2; continue; }
    if (two === 'ai' || two === 'ay') { out.push({j:'ㅔ',v:true}); i+=2; continue; } // simplified: "ay" → 에이 → just 에
    if (two === 'oa' || two === 'ow' || two === 'oe') { out.push({j:'ㅗ',v:true}); i+=2; continue; }
    if (two === 'au' || two === 'aw') { out.push({j:'ㅗ',v:true}); i+=2; continue; }
    if (two === 'oi' || two === 'oy') { out.push({j:'ㅗ',v:true}); i+=2; continue; }
    if (two === 'ui') { out.push({j:'ㅜ',v:true}); i+=2; continue; }

    // single vowels
    if (one === 'a') { out.push({j:'ㅏ',v:true}); i++; continue; }
    if (one === 'e') { out.push({j:'ㅔ',v:true}); i++; continue; }
    if (one === 'i') { out.push({j:'ㅣ',v:true}); i++; continue; }
    if (one === 'o') { out.push({j:'ㅗ',v:true}); i++; continue; }
    if (one === 'u') { out.push({j:'ㅜ',v:true}); i++; continue; }
    if (one === 'y') {
      // y as vowel if not at start or if following a consonant at end
      const prev = out.length > 0 ? out[out.length-1] : null;
      if (!prev || !prev.v) { out.push({j:'ㅣ',v:true}); } else { out.push({j:'ㅣ',v:true}); }
      i++; continue;
    }

    // consonants
    const cmap: Record<string, string> = {
      b:'ㅂ', c:'ㅋ', d:'ㄷ', f:'ㅍ', g:'ㄱ', h:'ㅎ', j:'ㅈ', k:'ㅋ',
      l:'ㄹ', m:'ㅁ', n:'ㄴ', p:'ㅍ', r:'ㄹ', s:'ㅅ', t:'ㅌ',
      v:'ㅂ', w:'ㅜ', x:'ㄱ', z:'ㅈ',
    };
    // c before e/i/y → ㅅ
    if (one === 'c' && 'eiy'.includes(s[i+1] ?? '')) { out.push({j:'ㅅ',v:false}); i++; continue; }
    // g before e/i → ㅈ
    if (one === 'g' && 'ei'.includes(s[i+1] ?? '')) { out.push({j:'ㅈ',v:false}); i++; continue; }

    if (cmap[one]) { out.push({j:cmap[one],v:false}); i++; continue; }

    // skip unknowns
    i++;
  }
  return out;
}

function combine(tokens: Array<{j:string; v:boolean}>): string {
  let result = '';
  let i = 0;

  while (i < tokens.length) {
    const cur = tokens[i];

    if (cur.v) {
      // standalone vowel → ㅇ + vowel
      result += syl('ㅇ', cur.j);
      i++;
    } else {
      // consonant
      const next = tokens[i+1];
      if (next?.v) {
        // C + V → syllable
        result += syl(cur.j, next.j);
        i += 2;
      } else {
        // lone consonant (end of word or C+C) → C + 으
        result += syl(cur.j, 'ㅡ');
        i++;
      }
    }
  }

  return result;
}

function transliterateWord(word: string): string {
  const key = word.toLowerCase();
  if (DICT[key]) return DICT[key];

  // Try with doubled consonants collapsed (e.g. kelley → keley, then kelly)
  const dedup = key.replace(/([bcdfghjklmnpqrstvwxyz])\1+/g, '$1');
  if (DICT[dedup]) return DICT[dedup];

  // Try stripping trailing silent 'e'
  const stripped = dedup.endsWith('e') && dedup.length > 2 ? dedup.slice(0, -1) : dedup;
  if (DICT[stripped]) return DICT[stripped];

  // Rule-based fallback with phoneme substitutions
  const norm = dedup
    .replace(/igh/g, 'ai')    // night → nait
    .replace(/tion/g, 'shon') // -tion → 션
    .replace(/sion/g, 'shon') // -sion → 션
    .replace(/ey$/, 'i')      // -ey → 이 (kelley→keli is still rule-based; dict handles known names)
    .replace(/([^aeiou])le$/, '$1el'); // -ble → -bel, -tle → -tel (handle final syllable)

  const tokens = tokenize(norm.endsWith('e') && norm.length > 2 ? norm.slice(0, -1) : norm);
  return combine(tokens);
}

export function transliterate(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map(transliterateWord)
    .join(' ');
}
