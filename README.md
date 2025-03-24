# 📚 ShelfQuest Digital Library Application

A full-stack digital library application that allows users to browse, manage, and access books digitally. Built with **React (Frontend) and Flask (Backend)**, it integrates a database to store books, user data, and other related entities.

---

## 🚀 Features

- User authentication & authorization  
- Book catalog with search & filter functionality  
- Borrowing and returning system  
- User roles (Admin, Member)  
- Responsive UI for an enhanced user experience  
- REST API for seamless communication between frontend & backend  

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** (with Webpack for bundling)  
- **CSS** (for styling)  

### Backend:
- **Flask** (Python)  
- **SQLAlchemy** (ORM)  
- **SQLite** (Database)  

---

## 📂 Project Structure

ShelfQuest-Digital-Library-Application/ │── client/ # Frontend (React) │ ├── public/
│ ├── src/ │ │ ├── components/ # Reusable UI components │ │ ├── images/ # Static assets │ │ ├── pages/ # Different pages of the app │ │ ├── App.js # Main React app component │ │ ├── index.js # Entry point for React │ ├── package.json # Frontend dependencies │ ├── webpack.config.js # Webpack configuration │ │── server/ # Backend (Flask) │ ├── app/ │ │ ├── routes/ # API routes │ │ ├── models.py # Database models │ │ ├── config.py # Configurations │ ├── migrations/ # Database migrations │ ├── requirements.txt # Python dependencies │ ├── run.py # Application entry point │ │── shelfquest.db # SQLite Database


## 🔧 Setup & Installation

### Prerequisites:
- Node.js & npm  
- Python 3 & pip  
- Virtual environment (recommended)

### 1️⃣ Backend Setup (Flask)
```sh
cd server
pipenv install flask
pipenv shell
flask run
```

> The Flask server should now be running.

### 2️⃣ Frontend Setup (React)
```sh
cd client
npm install
npm start
```

> The React application should now be running at `http://localhost:3000`.

## 📌 API Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/books`             | Fetch all books            |
| GET    | `/books/<id>`        | Get details of a book      |
| POST   | `/books`             | Add a new book             |
| PUT    | `/books/<id>`        | Update a book              |
| DELETE | `/books/<id>`        | Delete a book              |
| POST   | `/auth/register`     | Register a user            |
| POST   | `/auth/login`        | Login a user               |

# 📖 Future Enhancements - ShelfQuest Digital Library

## 1️⃣ Book Management  
- Upload and store books (PDF, EPUB, MOBI).  
- Online reader with bookmarks and dark mode.  
- Categorization and filtering by genre, author, etc.  
- **Book reviews & ratings** for user feedback.  

## 2️⃣ Admin Panel 🛠  
- Manage users, books, and content.  
- Assign roles and control access.  
- **User profiles & settings** for customization.  

## 3️⃣ Advanced Features 🚀  
- Smart search and book recommendations.  
- Reading progress tracking and analytics.  
- Multi-device sync for bookmarks.  
- **Premium features & payments** for exclusive content.
 

## 📜 License
This project is licensed under **MIT License**.
