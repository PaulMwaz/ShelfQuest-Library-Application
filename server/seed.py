from app import create_app, db
from app.models import User, Admin, Book, Category, Review
from datetime import datetime

app = create_app()

def get_or_create(model, **kwargs):
    """Helper function to get or create a model instance."""
    instance = model.query.filter_by(**kwargs).first()
    if instance:
        return instance
    instance = model(**kwargs)
    db.session.add(instance)
    db.session.commit()
    return instance

def seed_data():
    with app.app_context():
        # ✅ Clear existing data (optional)
        db.session.query(User).delete()
        db.session.query(Admin).delete()
        db.session.query(Book).delete()
        db.session.query(Review).delete()
        db.session.query(Category).delete()  # Clear categories to avoid duplicate constraints
        db.session.commit()

        # ✅ Create test users
        users = [
            User(username="testuser1", email="test1@example.com"),
            User(username="testuser2", email="test2@example.com"),
            User(username="testuser3", email="test3@example.com"),
        ]

        # ✅ Set passwords for users
        for user in users:
            user.set_password("password123")
            db.session.add(user)

        # ✅ Create test admins
        admins = [
            Admin(username="admin1", email="admin1@example.com", password="adminpass"),
            Admin(username="admin2", email="admin2@example.com", password="adminpass"),
        ]

        # ✅ Set passwords for admins
        for admin in admins:
            admin.password = "adminpass"
            db.session.add(admin)

        db.session.commit()

        # ✅ Create Categories (for books)
        categories = [
            'Fiction', 
            'Non-Fiction', 
            'Science', 
            'Technology', 
            'History', 
            'Fantasy', 
            'Romance'
        ]

        for category_name in categories:
            # Check if the category already exists, if not, create it
            get_or_create(Category, name=category_name, created_at=datetime.utcnow())

        db.session.commit()

        # ✅ Create test books (20 books)
        category_fiction = Category.query.filter_by(name="Fiction").first()
        category_non_fiction = Category.query.filter_by(name="Non-Fiction").first()
        category_science = Category.query.filter_by(name="Science").first()
        category_technology = Category.query.filter_by(name="Technology").first()
        category_history = Category.query.filter_by(name="History").first()
        category_fantasy = Category.query.filter_by(name="Fantasy").first()
        category_romance = Category.query.filter_by(name="Romance").first()

        books = [
            Book(title="The Great Adventure", author="John Doe", file_url="http://example.com/book1.pdf", uploaded_by=1, category_id=category_fiction.id),
            Book(title="Learning Flask", author="Jane Doe", file_url="http://example.com/book2.pdf", uploaded_by=2, category_id=category_non_fiction.id),
            Book(title="Exploring the Cosmos", author="Cosmo Expert", file_url="http://example.com/book3.pdf", uploaded_by=1, category_id=category_science.id),
            Book(title="AI for Beginners", author="Tech Guru", file_url="http://example.com/book4.pdf", uploaded_by=2, category_id=category_technology.id),
            Book(title="The History of the World", author="History Buff", file_url="http://example.com/book5.pdf", uploaded_by=1, category_id=category_history.id),
            Book(title="Fantasy World", author="Fantasy Master", file_url="http://example.com/book6.pdf", uploaded_by=2, category_id=category_fantasy.id),
            Book(title="Romantic Tales", author="Love Author", file_url="http://example.com/book7.pdf", uploaded_by=1, category_id=category_romance.id),
            Book(title="Tech Innovations", author="Tech Innovator", file_url="http://example.com/book8.pdf", uploaded_by=2, category_id=category_technology.id),
            Book(title="Secrets of the Universe", author="Galactic Scholar", file_url="http://example.com/book9.pdf", uploaded_by=1, category_id=category_science.id),
            Book(title="Historical Moments", author="Time Traveler", file_url="http://example.com/book10.pdf", uploaded_by=2, category_id=category_history.id),
            Book(title="Fantasy Kingdoms", author="Fiction Writer", file_url="http://example.com/book11.pdf", uploaded_by=1, category_id=category_fantasy.id),
            Book(title="Future Tech", author="Future Innovator", file_url="http://example.com/book12.pdf", uploaded_by=2, category_id=category_technology.id),
            Book(title="World War II: A History", author="War Historian", file_url="http://example.com/book13.pdf", uploaded_by=1, category_id=category_history.id),
            Book(title="Artificial Intelligence 101", author="AI Expert", file_url="http://example.com/book14.pdf", uploaded_by=2, category_id=category_technology.id),
            Book(title="Understanding Space", author="Astro Expert", file_url="http://example.com/book15.pdf", uploaded_by=1, category_id=category_science.id),
            Book(title="Love and Romance", author="Romantic Writer", file_url="http://example.com/book16.pdf", uploaded_by=2, category_id=category_romance.id),
            Book(title="Inventions That Changed the World", author="Inventor Expert", file_url="http://example.com/book17.pdf", uploaded_by=1, category_id=category_technology.id),
            Book(title="The Science of Life", author="Biologist", file_url="http://example.com/book18.pdf", uploaded_by=2, category_id=category_science.id),
            Book(title="Myths and Legends", author="Mythologist", file_url="http://example.com/book19.pdf", uploaded_by=1, category_id=category_fantasy.id),
            Book(title="The Art of War", author="Sun Tzu", file_url="http://example.com/book20.pdf", uploaded_by=2, category_id=category_history.id),
        ]

        db.session.add_all(books)
        db.session.commit()

        # ✅ Add reviews for books (users reviewing books)
        reviews = [
            Review(user_id=1, book_id=1, review="Amazing story, couldn't put it down!", sentiment="up"),
            Review(user_id=2, book_id=2, review="Great guide on Flask development. Highly recommend!", sentiment="up"),
            Review(user_id=3, book_id=1, review="The adventure was okay, but could be better.", sentiment="down"),
            # Add more reviews for other books
            Review(user_id=1, book_id=3, review="An excellent introduction to the cosmos!", sentiment="up"),
            Review(user_id=2, book_id=4, review="This book on AI is very insightful.", sentiment="up"),
            Review(user_id=3, book_id=5, review="The history was fascinating, but too long.", sentiment="down"),
            Review(user_id=1, book_id=6, review="I loved this fantasy world!", sentiment="up"),
            Review(user_id=2, book_id=7, review="A touching collection of romantic stories.", sentiment="up"),
            Review(user_id=3, book_id=8, review="Tech innovations discussed were incredible.", sentiment="up"),
            Review(user_id=1, book_id=9, review="Great insights into the mysteries of the universe.", sentiment="up"),
            Review(user_id=2, book_id=10, review="Good book on world history.", sentiment="up"),
            # Add reviews for other books similarly...
        ]

        db.session.add_all(reviews)
        db.session.commit()

        print("✅ Test Users, Admins, Books, Categories, and Reviews added successfully!")

if __name__ == "__main__":
    seed_data()
