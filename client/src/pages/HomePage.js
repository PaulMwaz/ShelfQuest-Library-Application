import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";

function HomePage() {
  const div = document.createElement("div");
  div.classList.add("home_content");

  div.innerHTML = `
        <h2>Welcome to the ShelfQuest Digital Library!</h2>
        <div class="slideshow-container">
            <div class="slide fade"><img src="${slide1}" alt="Slide 1"></div>
            <div class="slide fade"><img src="${slide2}" alt="Slide 2"></div>
            <div class="slide fade"><img src="${slide3}" alt="Slide 3"></div>
        </div>
    `;

  let slideIndex = 0;
  const slides = div.querySelectorAll(".slide");

  function showSlides() {
    slides.forEach((slide) => (slide.style.display = "none"));
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
  }

  showSlides();
  return div;
}

export default HomePage;
