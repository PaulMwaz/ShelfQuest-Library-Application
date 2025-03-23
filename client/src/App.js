import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import HomePage from "./pages/HomePage.js";

function navigateTo(page) {
  const content = document.querySelector(".content");
  content.innerHTML = "";

  switch (page) {
    case "home":
      content.appendChild(HomePage());
      break;
    case "about":
      import("./pages/AboutPage.js").then((module) => {
        content.innerHTML = module.default();
      }).catch(error => console.error("Failed to load AboutPage:", error));
      break;
    case "library":  // ✅ Replace "events" with "library"
      import("./pages/LibraryPage.js").then((module) => {
        content.innerHTML = module.LibraryPage();
        module.setupLibrary();
      }).catch(error => console.error("Failed to load LibraryPage:", error));
      break;
    case "books":
      displayBooks();
      break;
    case "login":
      import("./pages/LoginPage.js").then((module) => {
        content.innerHTML = module.LoginPage();
        module.setupLogin();
      }).catch(error => console.error("Failed to load LoginPage:", error));
      break;
    case "register":
      import("./pages/RegisterPage.js").then((module) => {
        content.innerHTML = module.RegisterPage();
        module.setupRegister();
      }).catch(error => console.error("Failed to load RegisterPage:", error));
      break;
    default:
      content.appendChild(HomePage());
  }
}

function toggleMenu() {
  const navLinks = document.querySelector(".nav_links");
  navLinks.classList.toggle("active");
}

const App = () => {
  document.getElementById("root").innerHTML = `
        ${Navbar()}
        <div class="content"></div>
        ${Footer()}
    `;
  navigateTo("home");
};

window.navigateTo = navigateTo;
window.toggleMenu = toggleMenu;
export default App;
