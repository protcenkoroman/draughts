/**
 *  0 - белая клетка
 *  1 - пустая черная клетка
 *  2 - черная клетка с белой шашкой
 *  3 - черная клетка с белой дамкой
 *  4 - черная клетка с черной шашкой
 *  5 - черная клетка с черной дамкой
 */

class Field {
    constructor(field, num, fill) {
        this.field = field;
        this.num = num;
        this.fill = fill;
    }
}

checkerboard = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']

placement = [];
listParty = [];
move = 0;

function startingPosition() {
    for (let i = 0; i < 64; i++) {
        let fill = '/images/imagesForParty/whiteField.jpg';
        switch (i) {
            case 40:
            case 42:
            case 44:
            case 46:
            case 49:
            case 51:
            case 53:
            case 55:
            case 56:
            case 58:
            case 60:
            case 62:
                fill = '/images/imagesForParty/whiteChecker.jpg';
                break;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
            case 14:
            case 17:
            case 19:
            case 21:
            case 23:
                fill = '/images/imagesForParty/blackChecker.jpg';
                break;
            case 24:
            case 26:
            case 28:
            case 30:
            case 33:
            case 35:
            case 37:
            case 39:
                fill = '/images/imagesForParty/blackField.jpg';
                break;
        }
        let field = new Field(checkerboard[i], i, fill);
        this.placement.push(field);
    }
    this.listParty.push(this.placement);

    let element = document.getElementById('board');
    let divs = element.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        let url = this.listParty[0][i].fill;
        divs[i].style.backgroundImage = 'url(' + url + ')';
    }
}

function moveTo(move) {
    let element = document.getElementById('board');
    let divs = element.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        let url = this.listParty[move][i].fill;
        divs[i].style.backgroundImage = 'url(' + url + ')';
    }
    this.move = move;
}

function next() {
    Array.from(document.querySelectorAll('#partyText a')).forEach(item => {
        item.classList.remove('currentMove');
    })
    if (this.move < listParty.length - 1) {
        this.move++;
    }
    else {
        this.move = listParty.length - 1;
    }
    moveTo(this.move);
    document.querySelector('#partyText a:nth-child(' + this.move + ')').classList.add("currentMove");
}

function prev() {
    Array.from(document.querySelectorAll('#partyText a')).forEach(item => {
        item.classList.remove('currentMove');
    })
    if (this.move > 1) {
        this.move--;
        document.querySelector('#partyText a:nth-child(' + this.move + ')').classList.add("currentMove");
    } else {
        this.move = 0;
    }
    moveTo(this.move);
}

function toStart() {
    Array.from(document.querySelectorAll('#partyText a')).forEach(item => {
        item.classList.remove('currentMove');
    })
    this.move = 0;
    moveTo(this.move);
}

function toEnd() {
    Array.from(document.querySelectorAll('#partyText a')).forEach(item => {
        item.classList.remove('currentMove');
    })
    this.move = this.listParty.length - 1;
    moveTo(this.move);
    document.querySelector('#partyText a:nth-child(' + this.move + ')').classList.add("currentMove");
}


function getParty(text) {
    let list = text.split(' ');
    list.pop();
    for (let i = 0; i < list.length; i++) {
        let position = list[i].indexOf('.');
        if (position > 0) {
            list[i] = list[i].slice(position + 1);
        }
    }

    for (let i = 0; i < list.length; i++) {
        let listMove = JSON.parse(JSON.stringify(this.listParty[this.listParty.length - 1]));
        let moveArr = [];
        /** тихий ход */
        if (list[i].indexOf('-') > 0) {
            moveArr = list[i].split('-');
            let from = listMove.find(f => f.field === moveArr[0]);
            let to = listMove.find(f => f.field === moveArr[1]);
            if (i % 2 === 0) {
                if (from.fill === '/images/imagesForParty/whiteQueen.jpg') {
                    to.fill = '/images/imagesForParty/whiteQueen.jpg';
                } else if (to.num < 8) {
                    to.fill = '/images/imagesForParty/whiteQueen.jpg';
                } else {
                    to.fill = '/images/imagesForParty/whiteChecker.jpg';
                }
            }
            if (i % 2 === 1) {
                if (from.fill === '/images/imagesForParty/blackQueen.jpg') {
                    to.fill = '/images/imagesForParty/blackQueen.jpg';
                } else if (to.num > 55) {
                    to.fill = '/images/imagesForParty/blackQueen.jpg';
                } else {
                    to.fill = '/images/imagesForParty/blackChecker.jpg';
                }
            }
            from.fill = '/images/imagesForParty/blackField.jpg';
        }
        /** взятие */
        if (list[i].indexOf(':') > 0) {
            let fillWhite = '/images/imagesForParty/whiteChecker.jpg';
            let fillBlack = '/images/imagesForParty/blackChecker.jpg';
            let fieldWhiteFill = '';
            let fieldBlackFill = '';
            moveArr = list[i].split(':');
            for (let a = 0; a < moveArr.length - 1; a++) {
                let from = listMove.find(f => f.field === moveArr[a]);
                if (i % 2 === 0) {
                    fieldWhiteFill = from.fill;
                }
                if (i % 2 === 1) {
                    fieldBlackFill = from.fill;
                }
                let to = listMove.find(f => f.field === moveArr[moveArr.length - 1]);
                let to2 = listMove.find(f => f.field === moveArr[a + 1]);

                from.fill = '/images/imagesForParty/blackField.jpg';
                /** определяем поля для очистки */
                if ((Math.abs(from.num - to2.num)) % 7 === 0) {
                    let sumClearField = (Math.abs(from.num - to2.num)) / 7;
                    for (let j = 0; j < sumClearField; j++) {
                        let clearField1 = listMove.find(f => f.num === Math.min(from.num, to2.num) + j * 7);
                        clearField1.fill = '/images/imagesForParty/blackField.jpg';
                    }

                }
                if ((Math.abs(from.num - to2.num)) % 9 === 0) {
                    let sumClearField = (Math.abs(from.num - to2.num)) / 9;
                    for (let j = 0; j < sumClearField; j++) {
                        let clearField2 = listMove.find(f => f.num === Math.min(from.num, to2.num) + j * 9);
                        clearField2.fill = '/images/imagesForParty/blackField.jpg';
                    }
                }

                if (i % 2 === 0) {
                    if (fieldWhiteFill === '/images/imagesForParty/whiteQueen.jpg') {
                        fillWhite = '/images/imagesForParty/whiteQueen.jpg';
                    }
                    if (fillWhite === '/images/imagesForParty/whiteChecker.jpg') {
                        switch (to.field) {
                            case "b8":
                            case "d8":
                            case "f8":
                            case "h8":
                                fillWhite = '/images/imagesForParty/whiteQueen.jpg';
                                break;
                        }
                    } else {
                        fillWhite = '/images/imagesForParty/whiteQueen.jpg';
                    }
                    to.fill = fillWhite;
                }
                if (i % 2 === 1) {
                    if (fieldBlackFill === '/images/imagesForParty/blackQueen.jpg') {
                        fillBlack = '/images/imagesForParty/blackQueen.jpg';
                    }
                    if (fillBlack === '/images/imagesForParty/blackChecker.jpg') {
                        switch (to.field) {
                            case "a1":
                            case "c1":
                            case "e1":
                            case "g1":
                                fillBlack = '/images/imagesForParty/blackQueen.jpg';
                                break;
                        }
                    } else {
                        fillWhite = '/images/imagesForParty/blackQueen.jpg';
                    }
                    to.fill = fillBlack;
                }

            }
        }
        this.listParty.push(listMove);
    }
}

document.getElementById("partyText").addEventListener('click', e => {
    Array.from(document.querySelectorAll('#partyText a')).forEach(item => {
        item.classList.remove('currentMove');
    })
    e.target.classList.add("currentMove");
});

startingPosition();

const partyText = document.getElementById('partyText');

getParty(partyText.innerText);

