'use strict'

let gCounterImages = 1
var gImgs = [
    { id: 1, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'celeb'] },
    { id: 2, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['cute', 'dog', 'animal'] },
    { id: 3, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['cute', 'dog', 'baby', 'animal'] },
    { id: 4, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['lazy', 'cat', 'animal'] },
    { id: 5, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'baby'] },
    { id: 6, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'awkward'] },
    { id: 7, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'baby'] },
    { id: 8, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'celeb', 'happy'] },
    { id: 9, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['baby', 'funny', 'cute'] },
    { id: 10, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'caleb'] },
    { id: 11, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['player', 'kiss', 'happy'] },
    { id: 12, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['caleb', 'old man'] },
    { id: 13, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['caleb', 'actor'] },
    { id: 14, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['actor', 'serious'] },
    { id: 15, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['actor', 'famous'] },
    { id: 16, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'old man', 'happy'] },
    { id: 17, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['serious', 'famous'] },
    { id: 18, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
    { id: 19, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
    { id: 20, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
    { id: 21, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
]

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme;

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'I work on it',
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            font: 'Impact',
            size: 20,
            posX: 150,
            posY: 50,
            haveBorder: false
        }],
        stickers: []
    }
}

function addLine(text) {
    gMeme.lines.push({
        txt: text,
        size: 20,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        font: 'Ariel',
        posX: 150,
        posY: 50
    });
}

function deleteLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1)
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setSelectedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}
function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0  
    else { gMeme.selectedLineIdx++ }
    return gMeme.selectedLineIdx
}

function changeText(text, lineIdx) {
    gMeme.lines[lineIdx].txt = text
}

function changeAlign(align, lineIdx) {
    gMeme.lines[lineIdx].align = align
}

function changeFontSize(diff, lineIdx) {
    gMeme.lines[lineIdx].size += diff
    gMeme.lines[lineIdx].posY -= diff / 2
}

function changeFont(font, lineIdx) {
    gMeme.lines[lineIdx].font = font
}

function changeFontColor(color, lineIdx) {
    gMeme.lines[lineIdx].color = color;
}

function changeStrokeColor(color, lineIdx) {
    gMeme.lines[lineIdx].strokeColor = color;
}

function changeFontColor(color, lineIdx) {
    gMeme.lines[lineIdx].color = color
}

function changeStrokeColor(color, lineIdx) {
    gMeme.lines[lineIdx].strokeColor = color
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

