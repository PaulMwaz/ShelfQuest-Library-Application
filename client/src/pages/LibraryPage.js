const LibraryPage = () => {
  return `
        <div class="library_wrapper">
            <h2>Library</h2>
            <button onclick="openAddBookModal()">+ Add New Book</button>
            <div id="booksContainer">Loading books...</div>

            <!-- Pop-up Modal for Add Book -->
            <div id="addBookModal" class="modal">
                <div class="modal-content">
                    <span class="close-btn" onclick="closeModal()">&times;</span>
                    <h3>Add New Book</h3>
                    <form id="add-book-form" onsubmit="addNewBook(event)">
                        <label>Title:</label>
                        <input type="text" id="add-book-title" required>
                        <label>Author:</label>
                        <input type="text" id="add-book-author" required>
                        <label>File URL:</label>
                        <input type="text" id="add-book-file-url" required>
                        <button type="submit">Add Book</button>
                        <button type="button" onclick="closeModal()">Cancel</button>
                    </form>
                </div>
            </div>

            <!-- Pop-up Modal for Edit Book -->
            <div id="modal" class="modal">
                <div class="modal-content">
                    <span class="close-btn" onclick="closeModal()">&times;</span>
                    <h3 id="modal-title">Edit Book</h3>
                    <form id="modal-form">
                        <input type="hidden" id="modal-book-id">
                        <label>Title:</label>
                        <input type="text" id="modal-title-input">
                        <label>Author:</label>
                        <input type="text" id="modal-author-input">
                        <label>File URL:</label>
                        <input type="text" id="modal-file-url-input">
                        
                        <!-- Review Section -->
                        <div id="review-section">
                            <label>Review:</label>
                            <textarea id="modal-review-input"></textarea>
                            <div class="thumbs-container">
                                <button type="button" id="thumbs-up" onclick="setThumb('up')">👍</button>
                                <button type="button" id="thumbs-down" onclick="setThumb('down')">👎</button>
                            </div>
                        </div>

                        <button type="submit">Submit</button>
                        <button type="button" onclick="closeModal()">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    `;
};

// ✅ Setup Library Page
const setupLibrary = async () => {
  const booksContainer = document.getElementById("booksContainer");

  try {
    const response = await fetch("http://localhost:5000/api/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const books = await response.json();

    if (books.length === 0) {
      booksContainer.innerHTML = "<p>No books available.</p>";
      return;
    }

    booksContainer.innerHTML = books
      .map(
        (book) => `
          <div class="book-card">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <a href="${book.file_url}" target="_blank">📖 Read Book</a>
            <button onclick="openEditModal(${book.id}, '${book.title}', '${book.author}', '${book.file_url}')">✏️ Edit</button>
            <button onclick="deleteBook(${book.id})">🗑️ Delete</button>
            <button onclick="openReviewModal(${book.id})">💬 Review</button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Failed to fetch books:", error);
    booksContainer.innerHTML = "<p>Failed to load books. Please try again later.</p>";
  }
};

// ✅ Open Add Book Modal
window.openAddBookModal = () => {
  document.getElementById("addBookModal").style.display = "block";
};

// ✅ Close Modal
window.closeModal = () => {
  document.getElementById("addBookModal").style.display = "none";
  document.getElementById("modal").style.display = "none";
};

// ✅ Add New Book Function (POST Request)
window.addNewBook = async (event) => {
  event.preventDefault();

  const title = document.getElementById("add-book-title").value;
  const author = document.getElementById("add-book-author").value;
  const fileUrl = document.getElementById("add-book-file-url").value;

  if (!title || !author || !fileUrl) {
    alert("Please provide all book details.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, author, file_url: fileUrl }),
    });

    if (response.ok) {
      alert("Book added successfully!");
      closeModal();
      setupLibrary(); // Refresh UI after adding book
    } else {
      const data = await response.json();
      alert(data.message || "Failed to add book.");
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

// ✅ Open Edit Modal
window.openEditModal = (bookId, title, author, fileUrl) => {
  document.getElementById("modal-title").innerText = "Edit Book";
  document.getElementById("modal-title-input").value = title;
  document.getElementById("modal-author-input").value = author;
  document.getElementById("modal-file-url-input").value = fileUrl;
  document.getElementById("review-section").style.display = "none"; // Hide review section
  document.getElementById("modal-book-id").value = bookId;
  document.getElementById("modal-form").onsubmit = (event) => editBook(event, bookId);
  document.getElementById("modal").style.display = "block";
};

// ✅ Open Review Modal
window.openReviewModal = (bookId) => {
  document.getElementById("modal-title").innerText = "Leave a Review";
  document.getElementById("modal-title-input").style.display = "none"; // Hide book fields
  document.getElementById("modal-author-input").style.display = "none";
  document.getElementById("modal-file-url-input").style.display = "none";
  document.getElementById("review-section").style.display = "block"; // Show review section
  document.getElementById("modal-review-input").value = "";
  document.getElementById("modal-book-id").value = bookId;
  document.getElementById("modal-form").onsubmit = (event) => reviewBook(event, bookId);
  document.getElementById("modal").style.display = "block";
};

// ✅ Set thumbs-up or thumbs-down
let reviewSentiment = null;
window.setThumb = (thumbType) => {
  reviewSentiment = thumbType;
  document.getElementById("thumbs-up").style.backgroundColor = thumbType === "up" ? "#10b981" : "";
  document.getElementById("thumbs-down").style.backgroundColor = thumbType === "down" ? "#dc2626" : "";
};

// ✅ Submit Review Function (POST Request)
window.reviewBook = async (event, bookId) => {
  event.preventDefault();
  const reviewText = document.getElementById("modal-review-input").value;
  const userId = localStorage.getItem("user_id");  // Assuming user_id is stored in localStorage after login
  const sentiment = reviewSentiment;  // Sentiment could be 'up' or 'down'

  if (!reviewText || !sentiment) {
    alert("Please provide a review and select a sentiment.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/review/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user_id: userId, review: reviewText, sentiment: sentiment }),
    });

    if (response.ok) {
      alert("Review added successfully!");
      closeModal();  // Close the modal after successful submission
    } else {
      const data = await response.json();
      alert(data.message || "Failed to add review.");
    }
  } catch (error) {
    console.error("Error reviewing book:", error);
  }
};

// ✅ Edit Book Function (PUT Request)
window.editBook = async (event, bookId) => {
  event.preventDefault();
  const title = document.getElementById("modal-title-input").value;
  const author = document.getElementById("modal-author-input").value;
  const fileUrl = document.getElementById("modal-file-url-input").value;

  try {
    const response = await fetch(`http://localhost:5000/api/edit/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, author, file_url: fileUrl }),
    });

    if (response.ok) {
      alert("Book updated successfully!");
      closeModal();
      setupLibrary(); // Refresh UI after update
    } else {
      alert("Failed to update book.");
    }
  } catch (error) {
    console.error("Error updating book:", error);
  }
};

// ✅ Delete Book Function (DELETE Request)
window.deleteBook = async (bookId) => {
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    const response = await fetch(`http://localhost:5000/api/delete/${bookId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Book deleted successfully!");
      setupLibrary(); // Refresh UI after delete
    } else {
      alert("Failed to delete book.");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

export { LibraryPage, setupLibrary };
