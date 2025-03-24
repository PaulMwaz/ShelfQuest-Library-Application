from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from app import db  # ✅ Import db from app/__init__.py

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    user_books = db.relationship('UserBooks', backref='user', lazy="joined")
    reviews = db.relationship('Review', back_populates='user', lazy="joined")  # Changed to back_populates

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    books = db.relationship('Book', backref='admin', lazy="joined")


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    books = db.relationship('Book', backref='category', lazy="joined")


class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    file_url = db.Column(db.String(200), nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('admins.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    reviews = db.relationship('Review', back_populates='book', lazy="joined")  # Changed to back_populates


class UserBooks(db.Model):
    __tablename__ = 'user_books'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), primary_key=True)
    viewed_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    review = db.Column(db.Text, nullable=True)
    sentiment = db.Column(db.String(10), nullable=True)  # 'up' or 'down'
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Use back_populates to define bidirectional relationships
    user = db.relationship('User', back_populates='reviews')  # Changed to back_populates
    book = db.relationship('Book', back_populates='reviews')  # Changed to back_populates
