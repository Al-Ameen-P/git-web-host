// Sample catalog data
const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic Fiction" },
  { id: 2, title: "1984", author: "George Orwell", category: "Dystopian" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic Fiction" },
  { id: 4, title: "Clean Code", author: "Robert C. Martin", category: "Programming" },
  { id: 5, title: "Sapiens", author: "Yuval Noah Harari", category: "History" },
  { id: 6, title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming" }
];

const bookGrid = document.getElementById('bookGrid');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalAuthor = document.getElementById('modalAuthor');
const closeModalBtn = document.getElementById('closeModal');

// Render books to the DOM
function displayBooks(bookList) {
  bookGrid.innerHTML = '';

  if (bookList.length === 0) {
    bookGrid.innerHTML = '<p>No books found matching your search.</p>';
    return;
  }

  bookList.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p>By ${book.author}</p>
        <span class="tag">${book.category}</span>
      </div>
      <button class="borrow-btn" onclick="openBorrowModal('${book.title}', '${book.author}')">Borrow</button>
    `;
    bookGrid.appendChild(card);
  });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );
  displayBooks(filteredBooks);
});

// Modal functions
function openBorrowModal(title, author) {
  modalTitle.textContent = title;
  modalAuthor.textContent = `By ${author}`;
  modalOverlay.style.display = 'flex';
}

closeModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

// Close modal when clicking outside box
window.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});

// Initial render
displayBooks(books);
