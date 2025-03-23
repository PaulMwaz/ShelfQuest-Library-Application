import aboutImage from "../images/AboutUs.jpg";

const AboutPage = () => {
  return `
        <div class="about_content">
            <h2>About ShelfQuest Digital Library</h2>
            <div class="about_image_container">
                <img src="${aboutImage}" alt="About ShelfQuest" class="about_image">
            </div>
            <p class="about_text">
               ShelfQuest Digital Library is a one-stop platform for seamless access to a wide range of digital resources, including academic, entertainment, and self-development content.ShelfQuest is your one-stop digital library.
            </p>
        </div>
    `;
};

export default AboutPage;
