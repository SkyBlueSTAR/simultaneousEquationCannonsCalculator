const cardSize = 5*window.screen.width/128;

let isMouseOverContextmenu = false;
let levels = [4,4,4,4,4,4,4];
let currentMenu = 0;
let showingPattern = 1;
let cardList = {
    total:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    ex:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    banish:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0]
    ],
}

window.onload = ()=>{
    const loop = setInterval(()=>{
        if(document.getElementById('monster_1').classList.contains('card1')){
            document.getElementById('monster_1').children[0].textContent = '☆'+levels[0];
            document.getElementById('monster_1').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_1').children[0].textContent = '0';
            document.getElementById('monster_1').children[0].style.color='#FFF5B5'
        }
        if(document.getElementById('monster_2').classList.contains('card1')){
            document.getElementById('monster_2').children[0].textContent = '☆'+levels[1];
            document.getElementById('monster_2').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_2').children[0].textContent = '0';
            document.getElementById('monster_2').children[0].style.color='#FFF5B5'
        }
        if(document.getElementById('monster_3').classList.contains('card1')){
            document.getElementById('monster_3').children[0].textContent = '☆'+levels[2];
            document.getElementById('monster_3').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_3').children[0].textContent = '0';
            document.getElementById('monster_3').children[0].style.color='#FFF5B5'
        }
        if(document.getElementById('monster_4').classList.contains('card1')){
            document.getElementById('monster_4').children[0].textContent = '☆'+levels[3];
            document.getElementById('monster_4').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_4').children[0].textContent = '0';
            document.getElementById('monster_4').children[0].style.color='#FFF5B5'
        }
        if(document.getElementById('monster_5').classList.contains('card1')){
            document.getElementById('monster_5').children[0].textContent = '☆'+levels[4];
            document.getElementById('monster_5').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_5').children[0].textContent = '0';
            document.getElementById('monster_5').children[0].style.color='#FFF5B5'
        }
        if(document.getElementById('monster_6').classList.contains('card3')){
            document.getElementById('monster_6').children[0].textContent = '☆'+levels[5];
            document.getElementById('monster_6').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_6').children[0].textContent = '0';
            document.getElementById('monster_6').children[0].style.color='#FFF5B5'
        }
        if(document.getElementById('monster_7').classList.contains('card3')){
            document.getElementById('monster_7').children[0].textContent = '☆'+levels[6];
            document.getElementById('monster_7').children[0].style.color='#000000'
        }else{
            document.getElementById('monster_7').children[0].textContent = '0';
            document.getElementById('monster_7').children[0].style.color='#FFF5B5'
        }
        const result = calculateEquation();
        if(result.length==0){
            document.getElementById('result').textContent = 'パターン0/0';
        }else{
            if(showingPattern > result.length)showingPattern = result.length;
            if(showingPattern < 1)showingPattern = 1;
            document.getElementById('result').textContent = 'パターン'+showingPattern+'/'+result.length;
            if(!document.getElementById('px'+result[showingPattern-1][0])?.classList.contains('for_banish') || !document.getElementById('py'+result[showingPattern-1][1])?.classList.contains('for_banish') || !document.getElementById('py'+result[showingPattern-1][2])?.classList.contains('for_bounce') || !document.getElementById('py'+result[showingPattern-1][3])?.classList.contains('for_bounce') || !document.getElementById('py'+result[showingPattern-1][4])?.classList.contains('for_select')){
                let temp = [];
                for(const t of document.getElementsByClassName('for_banish')){
                    temp.push(t);
                }
                temp.forEach(v=>v.classList.remove('for_banish'));
                temp = [];
                for(const t of document.getElementsByClassName('for_bounce')){
                    temp.push(t);
                }
                temp.forEach(v=>v.classList.remove('for_bounce'));
                temp = [];
                for(const t of document.getElementsByClassName('for_select')){
                    temp.push(t);
                }
                temp.forEach(v=>v.classList.remove('for_select'));
                document.getElementById('px'+result[showingPattern-1][0]).classList.add('for_banish');
                document.getElementById('py'+result[showingPattern-1][1]).classList.add('for_banish');
                document.getElementById('px'+result[showingPattern-1][2]+'b').classList.add('for_bounce');
                document.getElementById('py'+result[showingPattern-1][3]+'b').classList.add('for_bounce');
                document.getElementById('monster_'+result[showingPattern-1][4]).classList.add('for_select');
            }
        }
    },10)
    for(const cardArea of document.getElementsByClassName('cardArea')){
        let emptyImg = document.createElement('img');
        emptyImg.src = './imgs/empty.png'
        emptyImg.width = cardSize;
        emptyImg.classList.add('card');
        cardArea.appendChild(emptyImg);
    }
    for(const cardArea of document.getElementsByClassName('emptyArea')){
        let emptyImg = document.createElement('img');
        emptyImg.src = './imgs/empty.png';
        emptyImg.width = cardSize;
        cardArea.appendChild(emptyImg);
    }

    window.addEventListener('contextmenu',ev=>{
        if(!(document.elementFromPoint(ev.clientX, ev.clientY)?.parentElement.classList.contains('monster') && (document.elementFromPoint(ev.clientX, ev.clientY)?.parentElement.classList.contains('card1') || document.elementFromPoint(ev.clientX, ev.clientY)?.parentElement.classList.contains('card3')) && document.elementFromPoint(ev.clientX, ev.clientY)?.parentElement.classList.contains('opposite')))return;
        ev.preventDefault();
        currentMenu = Number(document.elementFromPoint(ev.clientX, ev.clientY)?.parentElement.id.substring(8));
        document.getElementById('level').value = levels[currentMenu-1];
        document.getElementById('contextmenu').style.left=ev.clientX+'px';
        document.getElementById('contextmenu').style.top=ev.clientY+'px';
        document.getElementById('contextmenu').style.display='block';
    })

    document.getElementById('contextmenu').addEventListener('mouseover',()=>{
        isMouseOverContextmenu = true;
    })

    document.getElementById('contextmenu').addEventListener('mouseleave',()=>{
        isMouseOverContextmenu = false;
    })

    document.body.addEventListener('click',ev=>{
        if(!isMouseOverContextmenu){
            document.getElementById('contextmenu').style.display='none';
            currentMenu = 0;
        }
        let targetElement = document.elementFromPoint(ev.clientX, ev.clientY);
        if(!targetElement?.classList.contains('card'))return;
        let parent = targetElement.parentElement;

        if(parent.classList.contains('magicTrap')){
            if(parent.classList.contains('none')){
                parent.classList.remove('none');
                parent.classList.add('card');
                let mtImg = document.createElement('img');
                mtImg.src = './imgs/magic_trap.png'
                mtImg.style.transform = 'rotate('+(parent.classList.contains('mine')?'0':'180')+'deg)'
                mtImg.width = cardSize;
                mtImg.classList.add('card');
                parent.removeChild(targetElement);
                parent.appendChild(mtImg);
            }else{
                parent.classList.remove('card');
                parent.classList.add('none');
                let emptyImg = document.createElement('img');
                emptyImg.src = './imgs/empty.png'
                emptyImg.width = cardSize;
                emptyImg.classList.add('card');
                parent.removeChild(targetElement);
                parent.appendChild(emptyImg);
            }
        }
        
        if(parent.classList.contains('monster')){
            if(parent.classList.contains('both')){
                if(parent.classList.contains('none')){
                    parent.classList.remove('none');
                    parent.classList.add('card1');
                    parent.classList.add('mine');
                    let moImg = document.createElement('img');
                    moImg.src = './imgs/monster.png'
                    moImg.style.transform = 'rotate(0deg)'
                    moImg.width = cardSize;
                    moImg.classList.add('card');
                    parent.removeChild(targetElement);
                    parent.appendChild(moImg);
                }else if(parent.classList.contains('card1')){
                    parent.classList.remove('card1');
                    parent.classList.add('card2');
                    let moImg = document.createElement('img');
                    moImg.src = './imgs/link.png'
                    moImg.style.transform = 'rotate(0deg)'
                    moImg.width = cardSize;
                    moImg.classList.add('card');
                    parent.removeChild(targetElement);
                    parent.appendChild(moImg);
                }else if(parent.classList.contains('card2')){
                    parent.classList.remove('card2');
                    parent.classList.add('card3');
                    parent.classList.remove('mine');
                    parent.classList.add('opposite');
                    let moImg = document.createElement('img');
                    moImg.src = './imgs/monster.png'
                    moImg.style.transform = 'rotate(180deg)'
                    moImg.width = cardSize;
                    moImg.classList.add('card');
                    parent.removeChild(targetElement);
                    parent.appendChild(moImg);
                }else if(parent.classList.contains('card3')){
                    parent.classList.remove('card3');
                    parent.classList.add('card4');
                    let moImg = document.createElement('img');
                    moImg.src = './imgs/link.png'
                    moImg.style.transform = 'rotate(180deg)'
                    moImg.width = cardSize;
                    moImg.classList.add('card');
                    parent.removeChild(targetElement);
                    parent.appendChild(moImg);
                }else{
                    parent.classList.remove('card4');
                    parent.classList.add('none');
                    parent.classList.remove('opposite');
                    let emptyImg = document.createElement('img');
                    emptyImg.src = './imgs/empty.png'
                    emptyImg.width = cardSize;
                    emptyImg.classList.add('card');
                    parent.removeChild(targetElement);
                    parent.appendChild(emptyImg);
                }
            }else if(parent.classList.contains('none')){
                parent.classList.remove('none');
                parent.classList.add('card1');
                let moImg = document.createElement('img');
                moImg.src = './imgs/monster.png'
                moImg.style.transform = 'rotate('+(parent.classList.contains('mine')?'0':'180')+'deg)'
                moImg.width = cardSize;
                moImg.classList.add('card');
                parent.removeChild(targetElement);
                parent.appendChild(moImg);
            }else if(parent.classList.contains('card1')){
                parent.classList.remove('card1');
                parent.classList.add('card2');
                let moImg = document.createElement('img');
                moImg.src = './imgs/link.png'
                moImg.style.transform = 'rotate('+(parent.classList.contains('mine')?'0':'180')+'deg)'
                moImg.width = cardSize;
                moImg.classList.add('card');
                parent.removeChild(targetElement);
                parent.appendChild(moImg);
            }else{
                parent.classList.remove('card2');
                parent.classList.add('none');
                let emptyImg = document.createElement('img');
                emptyImg.src = './imgs/empty.png'
                emptyImg.width = cardSize;
                emptyImg.classList.add('card');
                parent.removeChild(targetElement);
                parent.appendChild(emptyImg);
            }
        }
    });

    for(const cardAmount of document.getElementsByClassName('card_amount')){
        cardAmount.addEventListener('change',()=>{
            cardAmount.value=Number(cardAmount.value);
            let id = cardAmount.id;
            document.getElementById(id+"b").max = cardAmount.value;
            cardList.total[cardAmount.id.substring(0,1)=='x'?0:1][Number(cardAmount.id.substring(1))-1] = Number(cardAmount.value);
            cardList.ex[cardAmount.id.substring(0,1)=='x'?0:1][Number(cardAmount.id.substring(1))-1] = cardList.total[cardAmount.id.substring(0,1)=='x'?0:1][Number(cardAmount.id.substring(1))-1] - cardList.banish[cardAmount.id.substring(0,1)=='x'?0:1][Number(cardAmount.id.substring(1))-1] 
            let amount = 0;
            for(const c of document.getElementsByClassName('card_amount')){
                amount += Number(c.value);
            }
            for(const c of document.getElementsByClassName('card_amount')){
                c.max = 15+Number(c.value)-amount;
            }
        })
    }

    for(const cardAmountB of document.getElementsByClassName('card_amount_b')){
        cardAmountB.addEventListener('change',()=>{
            cardAmountB.value=Number(cardAmountB.value);
            cardList.banish[cardAmountB.id.substring(0,1)=='x'?0:1][Number(cardAmountB.id.substring(1,cardAmountB.id.length-1))-1] = Number(cardAmountB.value);
            cardList.ex[cardAmountB.id.substring(0,1)=='x'?0:1][Number(cardAmountB.id.substring(1,cardAmountB.id.length-1))-1] = cardList.total[cardAmountB.id.substring(0,1)=='x'?0:1][Number(cardAmountB.id.substring(1,cardAmountB.id.length-1))-1] - cardList.banish[cardAmountB.id.substring(0,1)=='x'?0:1][Number(cardAmountB.id.substring(1,cardAmountB.id.length-1))-1]
        })
    }

    document.getElementById('level').addEventListener('change',()=>{
        levels[currentMenu-1] = Number(document.getElementById('level').value);
    })

    document.getElementById('before').addEventListener('click',()=>{
        showingPattern--;
    })

    document.getElementById('next').addEventListener('click',()=>{
        showingPattern++;
    })
}

function calculateEquation(){
    //フィールド・手札のカード枚数を求める
    let fieldCardAmount = document.getElementsByClassName('cardArea').length - document.getElementsByClassName('none').length;
    let handCardAmount = Number(document.getElementById('my_hand_num').value) + Number(document.getElementById('opposite_hand_num').value);
    let cards = fieldCardAmount + handCardAmount;

    let resultPattern = [];
    for(let x = 1; x < 14; x++){
        let y=0;
        //2枚以上EXに残っているエクシーズモンスターを使用して2x+y=cardsを満たせるかの検証
        //EXに2枚残っていない場合continue
        if(cardList.ex[0][x-1] < 2)continue;
        //yが1~12に収まらない場合continue
        if(cards-2*x < 1 || cards-2*x > 12)continue;
        //yに対応する融合を積んでいる場合yにレベルを代入、そうでない場合continue
        if(document.getElementById("y"+(cards-2*x)).value>0){
            y=cards-2*x;
        }else{
            continue;
        }
        let banishedXyz = [];
        let banishedFusion = [];
        //相手のフィールドのモンスターについてx+y=(lv||rank)を満たせるかの検証
        cardList.banish[0].forEach((n,i)=>{if(n>=1||i+1==x)banishedXyz.push(i+1)});
        cardList.banish[1].forEach((n,i)=>{if(n>=1||i+1==y)banishedFusion.push(i+1)});
        for(let m = 1; m<8; m++){
            //相手カードクラスがついていない場合continue
            if(!document.getElementById('monster_'+m).classList.contains('opposite'))continue;
            //card4クラス(相手リンク)の場合continue
            if(document.getElementById('monster_'+m).classList.contains('card4'))continue;
            //その位置のモンスターのレベルがx+yで表せる場合resultPatternとしてx,y,x2,y2,mを保存
            for(const x2 of banishedXyz){
                for(const y2 of banishedFusion){
                    if(x2+y2==levels[m-1]){
                        resultPattern.push([x,y,x2,y2,m]);
                    }
                }
            }
        }
    }
    return resultPattern;
}