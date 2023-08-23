
'use strict'
function onInitGallery(){
    renderImages()
}

function renderGallery(){
    renderImages()
}
function renderImages(){
    let strHtml = ''
    gImgs.forEach(img => strHtml += `
        <div class="gallery-item">
        <img src="${img.url}" onclick="onClickImg(${img.id})">
        </div>`
    )
    setElHtml('main-gallery', strHtml)
}


