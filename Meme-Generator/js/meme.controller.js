'use strict'
let gElCanvas
let gCtx
var gCurrLine = null
var gIsLineClick = false
var gTouchEvents = ["touchstart", "touchmove", "touchend"]

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // console.log('gCtx', gCtx)
    addListeners()
}

function onClickGallery() {
    removeClass("hide", "main-gallery")
    addClass("hide", "canvas-container")
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener("resize", () => { })
}

function addMouseListeners() {
    gElCanvas.addEventListener("mousemove", onMove)
    gElCanvas.addEventListener("mousedown", onDown)
    gElCanvas.addEventListener("mouseup", onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener("touchmove", onMove)
    gElCanvas.addEventListener("touchstart", onDown)
    gElCanvas.addEventListener("touchend", onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (isLineClick(pos)) {
        gIsLineClick = true
      gCurrLine = getSelectedLine()
      document.querySelector("#txt-input").value = gCurrLine.txt
    } else if (isStickerClick(pos)) {
    } else if (isCanvasClick(pos)) {
      console.log("canvas clicked")
      setSelectedLine(-1)
    }
}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (gIsLineClick) {
      moveLine(pos)
      renderMeme()
    }
  }
function onUp(){
    gIsLineClick = true
}

function getEvPos(ev) {
    var pos = {
      posX: ev.offsetX,
      posY: ev.offsetY,
    }
    if (gTouchEvents.includes(ev.type)) {
      ev.preventDefault()
      ev = ev.changedTouches[0]
      pos = {
        posX: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        posY: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
    }
    return pos
  }

function renderMeme() {
    var meme = getMeme()
    var img = new Image()
    img.src = `meme-imgs/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line) => {
            drawText(
                line.txt,
                line.size,
                line.font,
                line.align,
                line.color,
                line.strokeColor,
                line.strokeWith,
                line.posX,
                line.posY
            )
            var line = getSelectedLine()
            if (line) {
                var textWidth = gCtx.measureText(line.txt).width
                var textHeight = line.size
                var textX = line.posX - textWidth / 2
                var textY = line.posY - textHeight
                if (line.align === "left") {
                    textX = line.posX
                }
                if (line.align === "right") {
                    textX = line.posX - textWidth
                }
                gCtx.beginPath()
                gCtx.rect(textX, textY, textWidth, textHeight)
                gCtx.strokeStyle = "black"
                gCtx.stroke()
            }
        })
    }
}


function isLineClick(clickedPos) {
    var meme = getMeme()
    var line = meme.lines.find((line) => {
      return (
        clickedPos.x >= line.posX - gCtx.measureText(line.txt).width / 2 &&
        clickedPos.x <= line.posX + gCtx.measureText(line.txt).width / 2 &&
        clickedPos.y >= line.posY - line.size &&
        clickedPos.y <= line.posY
      )
    })
    if (line) {
      setSelectedLine(meme.lines.indexOf(line))
      line.haveBorder = !line.haveBorder
      renderMeme()
  
      return true
    }
    return false
  }

  function isStickerClick(clickedPos) {
    var meme = getMeme()
    var sticker = meme.stickers.find((sticker) => {
      return (
        clickedPos.x >= sticker.posX &&
        clickedPos.x <= sticker.posX + sticker.size &&
        clickedPos.y >= sticker.posY &&
        clickedPos.y <= sticker.posY + sticker.size
      )
    })
    if (sticker) {
      setSelectedSticker(meme.stickers.indexOf(sticker))
      console.log("sticker", sticker)
      return true
    }
    return false
  }

  function isCanvasClick(clickedPos) {
    var canvas = {
      posX: 0,
      posY: 0,
      size: gElCanvas.width,
    }
    if (
      clickedPos.x >= canvas.posX &&
      clickedPos.x <= canvas.posX + canvas.size &&
      clickedPos.y >= canvas.posY &&
      clickedPos.y <= canvas.posY + canvas.size
    ) {
      renderMeme()
      return true
    }
    return false
  }
  
function drawText(text, size, font, align, color, strokeColor, strokeWidth, posX, posY) {

    gCtx.lineWidth = strokeWidth
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.fillText(text, posX, posY)
    gCtx.strokeText(text, posX, posY)
}

function onClickImg(imgId) {
    createMeme(imgId)
    renderMeme()
    addClass('hide', 'main-gallery')
    removeClass('hide', 'canvas-container')
}

function moveLine(pos) {
    gCurrLine.posX = pos.x
    gCurrLine.posY = pos.y
}

function onChangeText(text) {
    var line = getSelectedLine()
    if (!line)return alert('please choose a line')
        changeText(text, getSelectedLineIdx())
        renderMeme()
}

function onAddLine() {
    var text = document.querySelector("#txt-input").value
    if (!text) return
    addLine(text)
    renderMeme()
}

function onDeleteLine() {
    var lineIdx = getSelectedLineIdx()
    deleteLine(lineIdx)
    renderMeme()
}

function onSwitchLine(diff) {
    var line = getSelectedLine()
    if (!line) returnalert('please choose a line')
    var newLineIdx = switchLine(diff)
    setSelectedLine(newLineIdx)
    console.log('newLineIdx', newLineIdx)
    renderMeme()
}

function onChangeSize(diff) {
    var line = getSelectedLine()
      if (!line)return alert('please choose a line')
      changeFontSize(diff, getSelectedLineIdx())
      renderMeme()
  }

  function onAlignText(align) {
    var line = getSelectedLine()
    if (!line) return alert('please choose a line')
    changeAlign(align, getSelectedLineIdx())
    renderMeme()
  }

  function onFontChange(font) {
    var line = getSelectedLine()
    if (!line) return alert('please choose a line')
    changeFont(font, getSelectedLineIdx())
    renderMeme()
}

function onFontColor(color) {
    var line = getSelectedLine()
    if (!line)return alert('please choose a line')
    changeFontColor(color, getSelectedLineIdx())
    renderMeme()
}

function onStrokeColor(color) {
    var line = getSelectedLine()
    if (!line) return alert('please choose a line')
    changeStrokeColor(color, getSelectedLineIdx())
    renderMeme()
} 

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}