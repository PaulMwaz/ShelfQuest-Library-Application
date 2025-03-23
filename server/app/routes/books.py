from flask import Blueprint, jsonify, request
from app.models import Book, Review, db
from app import db

books_bp = Blueprint('books', __name__)

# ✅ Get all books
@books_bp.route('/', methods=['GET'])
def get_books():
    try:
        books = Book.query.all()
        books_list = [{"id": book.id, "title": book.title, "author": book.author, "file_url": book.file_url} for book in books]
        return jsonify(books_list), 200
    except Exception as e:
        return jsonify({"message": f"Error retrieving books: {str(e)}"}), 500

# ✅ Add a book
@books_bp.route('/add', methods=['POST'])
def add_book():
    data = request.get_json()
    title = data.get("title")
    author = data.get("author")
    file_url = data.get("file_url")

    if not title or not author or not file_url:
        return jsonify({"message": "Missing book data"}), 400

    try:
        new_book = Book(title=title, author=author, file_url=file_url)
        db.session.add(new_book)
        db.session.commit()
        return jsonify({"message": "Book added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error adding book: {str(e)}"}), 500

# ✅ Edit a book
@books_bp.route('/edit/<int:book_id>', methods=['PUT'])
def edit_book(book_id):
    data = request.get_json()
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404

    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.file_url = data.get("file_url", book.file_url)

    try:
        db.session.commit()
        return jsonify({"message": "Book updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating book: {str(e)}"}), 500

# ✅ Delete a book
@books_bp.route('/delete/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404

    try:
        db.session.delete(book)
        db.session.commit()
        return jsonify({"message": "Book deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error deleting book: {str(e)}"}), 500

# ✅ Add a review for a book
@books_bp.route('/review/<int:book_id>', methods=['POST'])
def add_review(book_id):
    data = request.get_json()
    user_id = data.get("user_id")
    review_text = data.get("review")
    sentiment = data.get("sentiment")

    if not user_id or not review_text or not sentiment:
        return jsonify({"message": "User ID, review text, and sentiment are required"}), 400

    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404

    # Check if the user already reviewed this book
    existing_review = Review.query.filter_by(user_id=user_id, book_id=book_id).first()
    if existing_review:
        return jsonify({"message": "You have already reviewed this book"}), 400

    try:
        review = Review(user_id=user_id, book_id=book_id, review=review_text, sentiment=sentiment)
        db.session.add(review)
        db.session.commit()
        return jsonify({"message": "Review added successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error adding review: {str(e)}"}), 500
