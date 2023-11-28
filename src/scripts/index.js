const banner = document.querySelector('.banner__container')
const label = document.querySelector('.banner__slider')

function createBanner (res) {
    const bannerTemplate = document.querySelector('#banner-template').content
    const bannerElement = bannerTemplate.querySelector('.slide').cloneNode(true)
    const bannerName = bannerElement.querySelector('.slide__name')
    

    bannerName.textContent = res.nameOriginal
    bannerElement.style.setProperty('--poster-3', `url(${res.coverUrl})`)

    return bannerElement
}

function createLabel(res) {
    const labelTemplate = document.querySelector('#label-template')
    const labelElement = labelTemplate.querySelector('.banner__slider-label')
    return labelElement
}

// function uploadBanner (data) {
//     banner.append(createBanner(data))
//     label.append(createBanner(data))
// }