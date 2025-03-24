const Navbar = () => {
    return `
        <nav class="navbar">
            <h2 class="logo">ShelfQuest Digital Library</h2>
            <div class="menu-icon" onclick="toggleMenu()">&#9776;</div>
            <ul class="nav_links">
                <li><a href="#" onclick="navigateTo('home')">Home</a></li>
                <li><a href="#" onclick="navigateTo('about')">About</a></li>
                <li><a href="#" onclick="navigateTo('library')">Library</a></li>  <!-- ✅ Updated -->
                <li><a href="#" onclick="navigateTo('login')">Login</a></li>
                <li><a href="#" onclick="navigateTo('register')">Register</a></li>
            </ul>
        </nav>
    `;
  };
  
  export default Navbar;
  