const count = 10
const apiKey = 'hWR5Vi6pTnsEBNi6yQ7dzb2hnF3eqjJvESzyaAKAO5c'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

let photoArray = []
let ready = false
let imageLoaded = 0
let totalImages = 0

//Function
function imagesLoaded() {
  imageLoaded++;
  if (imageLoaded == totalImages) {
    ready = true;
    $('#loader')[0].hidden = true
  }
}

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
  totalImages = photoArray.length;
  photoArray.forEach(photo => {
    const item = document.createElement('a')
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    })

    const img = document.createElement('img')
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    img.addEventListener('load', imagesLoaded)

    item.appendChild(img)
    $('#image-container')[0].appendChild(item)
  })
}

async function getPhotosFromAPI() {
  try {
    const response = await fetch(apiUrl)
    photoArray = await response.json()
    imageLoaded = 0

    displayPhotos()

  } catch (error) {
    console.log(error)
  }
}

// On Load
getPhotosFromAPI()

$(window).scroll(function() {
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 150) && ready) {
    ready = false
    getPhotosFromAPI()
  }
})
