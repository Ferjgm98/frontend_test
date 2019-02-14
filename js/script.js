/**
 * Menu mobile
 */
function initEventMenu() {
    document.querySelector('.hamburger').classList.toggle('is-active');
    document.querySelector('.menu_mobile_list').classList.toggle('menu-active');
    const width = window.innerWidth;

    if(document.querySelector('.menu_mobile_list').classList.contains('menu-active') && width < 991) {
        console.log('here');
        document.querySelector('body').style.overflowY = 'hidden';
    } else {
        document.querySelector('body').style.overflowY = 'auto';
    }
    document.querySelector('.menu-list-mobile').classList.toggle('menu-show');
}

function removeActiveItemsMenu() {
    const arrItemsMenu = Array.from(document.querySelectorAll('.item-menu'));
    arrItemsMenu.forEach(el => {
        el.classList.remove('active');
    });
}


document.querySelector('.hamburger').addEventListener('click', initEventMenu);


/**
 * Fin Menu mobile
 */

 /**
 * Add Camera Info
 */

const cameras = {
    canon: {
        brand: 'Canon',
        model: 'Canon EOS 5D Mark II',
        shutterSpeed: '1/4000s',
        aperture: 'f/4.5',
        focal: '230mm',
        iso: '250'
    },
    nikon: {
        brand: 'Nikon',
        model: 'Nikon D700',
        shutterSpeed: '1/2500s',
        aperture: 'f/1.2',
        focal: '25mm',
        iso: '200'
    }
}

const photoInfo = Array.from(document.querySelectorAll('.grid-gallery-item .photo-info'));

photoInfo.forEach(el => {
    if(el.dataset.cam) addPhotoDetails(cameras[el.dataset.cam], el);
});

function addPhotoDetails(camera, el) {
    const markup = `
        <div class="row">
        <div class="col-6 col-info">
        <p class="feature">Make</p>
        <p class="value">${camera.brand}</p>
        <p class="feature">Model</p>
        <p class="value">${camera.model}</p>
        <p class="feature">Shutter Speed</p>
        <p class="value">${camera.shutterSpeed}</p>
        </div>
        <div class="col-6 col-info">
        <p class="feature">Aperture</p>
        <p class="value">${camera.aperture}</p>
        <p class="feature">Focal Length</p>
        <p class="value">${camera.focal}</p>
        <p class="feature">Iso</p>
        <p class="value">${camera.iso}</p>
        </div>
    </div>
    `;

    el.insertAdjacentHTML('afterbegin', markup);
} 


function removeActivePhotoInfo() {
    const arrItemsMenu = Array.from(document.querySelectorAll('.photo-info'));
    arrItemsMenu.forEach(el => {
        el.classList.remove('active');
    });
}



 /**
 * Fin Add Camera Info
 */

 
 /*=============================================
 =            Eventos            =
 =============================================*/

 
const arrayEventos = Array.from(document.querySelectorAll('.menu_mobile_list, .navbar, .grid-gallery'));

arrayEventos.forEach(el => el.addEventListener('click', e => {
    if(e.target.matches('.item-menu')) {
        removeActiveItemsMenu();
        e.target.classList.add('active');
        initEventMenu();
    } else if(e.target.matches('.grid-gallery-item')) {
        e.target.lastElementChild.classList.toggle('active');
        // removeActivePhotoInfo();
    }
}));

if(document.querySelector('.grid-gallery')) {
        document.querySelector('.grid-gallery').addEventListener('click', e => {
        e.preventDefault();
    if(e.target.matches('.grid-gallery-item--img')){
        const splitIndex = e.target.parentNode.parentNode.classList[1].split('-');
        const caption = e.target.parentNode.parentNode.lastElementChild.lastElementChild;
        // console.log(caption);
        const index = splitIndex[splitIndex.length-1] - 1;
        galleryStup(index, caption);
        // console.log(index);
    }
    });
}
 
 /*=====  End of Eventos  ======*/

 
 /*=============================================
 =            Photoswipe section            =
 =============================================*/

 
function galleryStup(index, caption) {
    const pwspElement = document.querySelectorAll('.pswp')[0];
    
    const photosArray = Array.from(document.querySelectorAll('.link-photo'));
    
    const items = photosArray.map(el => {
        const current = Array.from(el.attributes);
    
        if(current) {
            return {
                src: current[0].value,
                w: parseInt(current[2].nodeValue, 10),
                h: parseInt(current[3].nodeValue, 10),
            }
        }
    });
    var options = {
        index: index
    };
    
    
    const gallery = new PhotoSwipe(pwspElement, PhotoSwipeUI_Default, items, options);
    document.querySelector('.pswp__caption__center').textContent = 'Hola';
    gallery.init();
}


 /*=====  End of Photoswipe section  ======*/

 
 /*=============================================
 =            Counter section            =
 =============================================*/


 const elementsToAnimate = Array.from(document.querySelectorAll('.count'));

 elementsToAnimate.forEach(el => {
     const number = parseInt(el.textContent, 10);
     const numberToAnimate = new CountUp(el, 0, number);
     if(!numberToAnimate.error) {
         numberToAnimate.start();
     } else {
         console.log(numberToAnimate.error);
     }
 })
 
 /*=====  End of Counter section  ======*/
 
 
 /*=============================================
 =            Swiper slider section            =
 =============================================*/

const mySwiper = new Swiper('.swiper-testimonial', {
     direction: 'horizontal',
     loop: true,
     pagination: {
         el: '.swiper-pagination',
         type: 'fraction'
     },
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev'
     },
     slidesPerView:'auto',
     centeredSlides: true,
     visibilityFullFit: true,
     autoResize: false,
     initialSlide : 0,
     loop : true,
     loopedSlides : 20,
     observer: true,
     observeParents: true,
     observeSlideChildren: true,
     on: {
         resize: function() {
            updateSlides('testimonial');
         },
         change: function() {
            updateSlides('testimonial');
         },
         observerUpdate: function (){
            updateSlides('testimonial');
         }
     }
 });

const pricingSwiper = new Swiper('.swiper-pricing', {
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    slidesPerView: 'auto',
    slidesPerColumn: 'auto',
    centeredSlides: false,
    visibilityFullFit: false,
    autoResize: false,
    initialSlide : 2,
    loop : true,
    loopedSlides : 20,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    on: {
        resize: function() {
            updateSlides('pricing');
        },
        change: function() {
            updateSlides('pricing');
        },
        observerUpdate: function (){
            updateSlides('pricing');
        }
    }
});

function updateSlides(type = 'both') {
    if(type === 'testimonial') {
        mySwiper.update();
        mySwiper.updateSize();
        mySwiper.updateSlides();
        mySwiper.updateProgress();
        mySwiper.updateSlidesClasses();
    } else if (type === 'pricing') {

        pricingSwiper.update();
        pricingSwiper.updateSize();
        pricingSwiper.updateSlides();
        pricingSwiper.updateProgress();
        pricingSwiper.updateSlidesClasses();

    } else if(type === 'both') {
        mySwiper.update();
        mySwiper.updateSize();
        mySwiper.updateSlides();
        mySwiper.updateProgress();
        mySwiper.updateSlidesClasses();

        pricingSwiper.update();
        pricingSwiper.updateSize();
        pricingSwiper.updateSlides();
        pricingSwiper.updateProgress();
        pricingSwiper.updateSlidesClasses();
    }
 }

 ['.swiper-testimonial', '.swiper-pricing'].forEach(el => ['click', 'mouseover'].forEach(event => {
    if(document.querySelector(el)) {
            document.querySelector(el).addEventListener(event, () => {
            updateSlides('both');
        });
    }
 }));

 /*=====  End of Swiper slider section  ======*/

 /**
  * Form validator
  */

let isEmail = false;

function mailValidator(selector, messageSelector, messageErr = '',  messageSuccess = '', ) {
    const input = document.querySelector(selector);
    const emailReEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    isEmail = false;
    if(input) {
        if(emailReEx.test(input.value)  && input.value !== '') {
            document.querySelector(messageSelector).textContent = messageSuccess;
            document.querySelector(messageSelector).style.opacity = '1';
            document.querySelector('.input-btn').style.borderColor = '#fff';
            input.style.borderColor = '#fff';
            isEmail = true;
        } else {
            document.querySelector(messageSelector).textContent = messageErr;
            document.querySelector(messageSelector).style.opacity = '1';
            document.querySelector('.input-btn').style.borderColor = '#5328fe';
            input.style.borderColor = '#5328fe';
            isEmail = false;
        }
    }
}

function animateCss(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

document.querySelector('.input-text').addEventListener('keydown', () => mailValidator('.input-text', '.message-validator'));

document.querySelector('.form-container').addEventListener('submit', e => {
    e.preventDefault();
    isEmail = false;

    mailValidator('.input-text', '.message-validator', 'Please check your information and try again.');
    if(isEmail === false) {
        animateCss('.form-box', 'shake')
        return false;
    } else {
        document.querySelector('.form-box').classList.remove('shake');
        document.querySelector('.message-validator').textContent = 'Thanks for singing up. Check your mail.';
        return true;
    }
});


/*=============================================
=            Video Section            =
=============================================*/

const videoItem = document.querySelector('.video-item');

const videoControls = document.querySelector('.control-video');

const section = document.querySelector('.section-video');

if(videoControls) {
        videoControls.addEventListener('click', e => {
            const wichButton = e.target.dataset.media;
            if(wichButton === 'play-pause') {
                section.classList.remove('unplayed');
                if(section.classList.contains('paused')) {
                    section.classList.remove('paused');
                    section.classList.add('playing');
                    videoItem.play();
                } else if(section.classList.contains('playing')) {
                    section.classList.remove('playing');
                    section.classList.add('paused');
                    videoItem.pause();
                }
            } else if (wichButton === 'mute-unmute') {
                section.classList.toggle('muted');
                if(section.classList.contains('muted')) {
                    videoItem.muted = true;
                } else {
                    videoItem.muted = false;  
                }
            }
    });
}

/*=====  End of Video Section  ======*/


/*=============================================
=            Map section            =
=============================================*/

function initMap() {
    const location = {lat: 40.6901721, lng: -73.9892954};
    const infoWindowMarkup = `
    <h1 style="color: #111">e.Oliver</h1>
    <div style="color: #111">756 Livingston Street, Brooklyn, NY 11201</div>
    `;

    const image = './dist/../images/marker.svg';



    const map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: location, disableDefaultUI: true,
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#111111"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#111111"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
    } );


    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowMarkup
    })

    const marker = new google.maps.Marker({
        position: location, 
        map: map, 
        title: 'e.Oliver',
        icon: image
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}



/*=====  End of Map section  ======*/


/*=============================================
=            Form contact            =
=============================================*/

const inputArray = Array.from(document.querySelectorAll('.input-contact'));

let isValid = false;
function checkInput(input, type) {
    let regEx = '';
    if(type === 'text') {
        regEx = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚ]+$/;
    } else if(type === 'email') {
        regEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    } else if (type === 'tel'){
        regEx = /^\d{8}$/;
    } else if (type === 'textarea') {
        regEx = '';
    }
    
    if(regEx === '') {
        if(input.value !== '') {
            return true;
        } else {
            return false;
        }
    } else {
        if(regEx.test(input.value)) {
            return true;
        } else {
            return false;
        }
    }

    //2. Aply style in the element 
}

inputArray.forEach(input => {
    input.addEventListener('focus', e => {
        e.target.parentNode.firstElementChild.style.transform = 'translateY(-25px)';
    });

    ['change', 'focusout'].forEach(event => {

        input.addEventListener(event, e => {
            const element = e.target.parentNode.firstElementChild;
            // console.log(e.target.parentNode);
            test = checkInput(e.target, e.target.type);
            if(test === false) {
                if(e.target.value === '') {
                    element.style.transform = 'translateY(10px)';
                }
                e.target.style.borderColor = '#5328fe';
            } else {
                element.style.transform = 'translateY(-25px)';
                e.target.style.borderColor = '#fff';
            }
        });
    });
    
})


if(document.querySelector('.contact-form')) {
        document.querySelector('.contact-form').addEventListener('submit', e => {
        e.preventDefault();
        let valid = false;
        let counter = 0;
        inputArray.forEach(input => {
            let curValid =  checkInput(input, input.type);
            if(curValid === true) {
                counter++;
            }
        });

        if(counter === inputArray.length) {
            valid = true;
        } else {
            valid = false;
        }

        if(valid === false) {
            animateCss('.contact-form', 'shake');
            inputArray.forEach(input => {
                input.style.borderColor = '#5328fe';
            });

            document.querySelector('.message-form').textContent = 'Please check your information and try again.'
            return false;
        } else {
            document.querySelector('.message-form').textContent = `Thanks, I'll keep in touch with you as soon as posible!`
            return true;
        }
    });
}

if(document.getElementById('open-p')) {
    document.getElementById('open-p').addEventListener('click', e => {
        e.preventDefault();
    
        const popup = document.querySelector('.popup--contact');
        popup.classList.add('is-open')

        document.querySelector('body').style.overflowY = 'hidden';

    });
}

if(document.querySelector('.close-popup')) {

    document.querySelector('.close-popup').addEventListener('click', () => {
        const popup = document.querySelector('.popup--contact');
        popup.classList.remove('is-open');
        document.querySelector('body').style.overflowY = 'auto';
    });
}

/*=====  End of Form contact  ======*/


/*=============================================
=            Scroll suave            =
=============================================*/

const arrLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

arrLinks.forEach(link => {
    link.addEventListener('click', e => {
        const hashValue = link.getAttribute('href');
        const target = document.querySelector(hashValue);

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        history.pushState(null, null, hashValue);
        e.preventDefault();

    });
});


/*=====  End of Scroll suave  ======*/











 
 
 
 
 
 
 
