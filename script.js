
function learnMore(){
  if (document.getElementById("admissions-link"))
    return;

  const newDiv = document.createElement("div");
  newDiv.id = "admissions-link";
  newDiv.style.margin = "1em";
  newDiv.style.padding = '1em';
  newDiv.style.backgroundColor = '#e0f7fa';
  newDiv.style.borderRadius = "8px";
  newDiv.style.textAlign = "center";

  const link = document.createElement("a");
  link.href = "#admissions";
  link.textContent = "Go to Admissions Section";
  link.style.color = "#0057b7";
  link.style.fontWeight = "bold";
  link.style.textDecoration = "none";

  newDiv.appendChild(link);
  
  const heroSection = document.getElementById("hero");
  heroSection.appendChild(newDiv);
}

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  let current = "";
  sections.forEach(section => {
    let clientHeight;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - clientHeight /3) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }
  });
});

const menuToggle = document.querySelector("#main-nav .menu-toggle");
const navLinks = document.querySelector("#main-nav ul");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


//Scroll button to the top code
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});




//Image pop up
const modal = document.getElementById('profileModal');
const img = document.getElementById('profilePic');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

//Open modal when thumnail clicked
document.querySelectorAll(".popup-trigger").forEach(img => {
img.addEventListener('click', function() {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  });
});

//Close a modal when the close icon is clicked
closeBtn.onclick = function() {
  modal.style.display = "none";
}

//Close modal when clicking outside image
modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
}


//onscroll
const services = document.querySelectorAll('.service');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{threshold: 0.3});

services.forEach(service => observer.observe(service));


//Slider for an Image
const myImages = [
  'images/maxresdefault.jpg',
  'images/Busia-SS-classroom-after.jpg',
  'images/maxresdefault.jpg',
  'images/Busia-SS-classroom-after.jpg',
  'images/maxresdefault.jpg',
  'images/Busia-SS-classroom-after.jpg'
];
let currentIndex = 0;
const slideRow = document.getElementById('slider-row');
const dotsRow = document.getElementById('dots-row');

//Initialise slider
function initSlider(){
  //Generating an image from an array
  slideRow.innerHTML = myImages.map(url => `<img src="${url}" class="slider-img">`).join('');

  //Generate Dots
  dotsRow.innerHTML = myImages.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`).join('');
}

function changeSlide(direction){
  currentIndex += direction;

  if(currentIndex >= myImages.length) currentIndex = 0;
  if(currentIndex < 0) currentIndex = myImages.length - 1;

  updateSliderPosition();
}
function goToSlide(index){
  currentIndex = index;
  updateSliderPosition();
}
function updateSliderPosition(){
  const offset = -currentIndex * 100;
  slideRow.style.transform = `translateX(${offset}%)`;

  const dots = document.querySelectorAll('.dot')
  dots.forEach((dot, i) => {
  dot.classList.toggle('active', i === currentIndex);
  });
}
initSlider();

//Set the inetrval of an automatic image scroll
let slideInterval = setInterval(() => {
  changeSlide(1);
}, 5000);

const viewport = document.querySelectorAll('slider-viewport');
viewport.addEventListener('mouseover', () => {
  clearInterval(slideInterval);
});

viewport.addEventListener('mouseleave', () => {
  slideInterval = setInterval(() => {
    changeSlide();
  }, 5000);
});

//Allow users to loop through images by swiping on the screen

let touchStartX = 0;
let touchStartY = 0;
const sliderViewport = document.querySelectorAll('.slider-viewport');
sliderViewport.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, {passive: true});
sliderViewport.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handelSwipe();
}, {passive: true});

function handelSwipe() {
  const swipeThreshold = 50;

  if(touchStartX-touchEndX > swipeThreshold) {
    changeSlide();
  } else if(touchEndX-touchStartX > swipeThreshold) {
    changeSlide(-1);
  }
}

//news section javaScript
const newsData = [
  {title: "Inter-house Debate", img: "images/event1.jpg", desc: "Debating Skills...", link: "#"},
  {title: "Annual Sports Day", img: "images/event1.jpg", desc: "Team work and Spirit...", link: "#"},
];

const newsGrid = document.querySelectorAll('.news-grid');
newsData.forEach(item => {
  const cards = document.createElement("article");
  cards.className = 'news-card';
  cards.innerHTML = `
    <img src = "${item.img}" alt = "${item.title}">
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
    <a href="${item.link}">Read More</a>
  `
  newsGrid.appendChild(card);
});



