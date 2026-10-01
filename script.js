// Function to programmatically generate 100 sample books
function generateBooks(count) {
  const titlesPrefix = [
    "The Art of", "Principles of", "Advanced", "Introduction to", "Mastering",
    "Secrets of", "The Guide to", "Understanding", "Exploring", "The History of"
  ];

  const topics = [
    "Machine Learning", "Quantum Physics", "Modern Architecture", "Ancient Empires",
    "Cybersecurity", "Data Structures", "Astronomy", "Philosophy", "Psychology",
    "World Economics", "Digital Marketing", "Biochemistry", "Artificial Intelligence"
  ];

  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "David", "Elizabeth"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Taylor", "Anderson"];

  const categories = [
    "Programming", "Science", "History", "Fiction", "Philosophy",
    "Technology", "Psychology", "Business"
  ];

  const bookList = [];

  for (let i = 1; i <= count; i++) {
    const prefix = titlesPrefix[Math.floor(Math.random() * titlesPrefix.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    bookList.push({
      id: i,
      title: `${prefix} ${topic}`,
      author: `${firstName} ${lastName}`,
      category: category
    });
  }

  return bookList;
}

// Generate array containing exactly 100 books
const books = generateBooks(100);

// DOM Elements
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
      <button class="borrow-btn" onclick="openBorrowModal('${book.title.replace(/'/g, "\\'")}', '${book.author.replace(/'/g, "\\'")}')">Borrow</button>
    `;
    bookGrid.appendChild(card);
  });
}

// Search functionality across all 100 books
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm) ||
    book.category.toLowerCase().includes(searchTerm)
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
