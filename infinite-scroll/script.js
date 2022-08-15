
const accessKey = 'fuezIAn0idTygoqTb373DKum_LAPjnpVqcGRS8Eea5g';
const secretKey = 'Fcxlo5gpWn0BQeG2DeJe6EMW6Y_9dmk43PcRsNOAUQ4';
const count = 30;
const photoApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;
const loader = document.getElementById('loader');

const imageContainer = document.getElementById('image-container');
let photosArray = [];


// Check if allimage were loaded
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
function imageLoaded(){
    imagesLoaded++;
    console.log('Images loaded: ', imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('loader hidden');
        console.log('ready = ', ready);
    }
}

// Helper function to set Attribute on DOM elements
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// Displaying photos
// Create Elements for Links & Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images: ', totalImages)

    // Run For Each function for each obect in Array
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img>inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(photoApiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log ("Error fetching hoto data");
    }
}

// Check to see if Scrolling near bottom of age, load more photo
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log('Load more');
    }
});

// On Load
getPhotos();