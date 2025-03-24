import "./styles.css";
import App from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    App();
    console.log("ShelfQuest Digital Library App initialized successfully.");
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
});
