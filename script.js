const library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;  
    }
}

function addBooks(...books) {
    for (let book of books) {
        library.push(book);
    }
}

function displayAllBooks() {
    for (let book of library) {
        displayBook(book);
    }
}

function displayBook(book) {
    const tableBody = document.querySelector('table > tbody');
    let tableRow = document.createElement('tr');
    let titleRow = document.createElement('td');
    let authorRow = document.createElement('td');
    let pagesRow = document.createElement('td');
    let readRow = document.createElement('td');
    let deleteRow = document.createElement('td')
    let readButton = document.createElement('button');
    let deleteButton = document.createElement('button')
    titleRow.classList.add('title');
    authorRow.classList.add('author');
    pagesRow.classList.add('pages');
    readRow.classList.add('read-status');
    deleteRow.classList.add('delete');
    readButton.classList.add('read-button');
    deleteButton.classList.add('delete-button');        
    titleRow.textContent = book['title'];
    authorRow.textContent = book['author'];
    pagesRow.textContent = book['pages'];
    if (book['read'].toLowerCase() === 'read') {
        readButton.textContent = 'READ';
        readButton.classList.add('read');
    } else if (book['read'].toLowerCase() === 'not read') {
        readButton.textContent = 'NOT READ';
        readButton.classList.add('not-read');
    }
    deleteButton.textContent = 'DELETE';
    readButton.addEventListener('click', () => {
        if (book['read'].toLowerCase() === 'read') {
            book['read'] = 'not read';
            readButton.textContent = 'NOT READ';
            readButton.classList.remove('read');
            readButton.classList.add('not-read');
        } else if (book['read'].toLowerCase() === 'not read') {
            book['read'] = 'read';
            readButton.textContent = 'READ';
            readButton.classList.remove('not-read');
            readButton.classList.add('read');   
        }
    });
    deleteButton.addEventListener('click', () => {
        tableBody.removeChild(tableRow);
        let index = findBooksIndex(book);
        if (index === 'Error') {
            console.log('Error');
        } else {
            library.splice(index, 1);
        }
    });
    tableBody.appendChild(tableRow);
    tableRow.appendChild(titleRow);
    tableRow.appendChild(authorRow);
    tableRow.appendChild(pagesRow);
    tableRow.appendChild(readRow);
    tableRow.appendChild(deleteRow);
    readRow.appendChild(readButton);
    deleteRow.appendChild(deleteButton);
}

function transferBookData() {
    const bookField = document.querySelector('#book-input');
    const authorField = document.querySelector('#author-input');
    const pagesField = document.querySelector('#pages-input');
    const statusField = document.querySelector('#status-input');
    let pagesFieldVal = pagesField.value.slice(0, 1);

    
    const newBook = new Book(bookField.value, authorField.value, pagesField.value, statusField.value);
    addBooks(newBook);
    displayBook(newBook);
}

function showError(field) {
   if (field === 'book-name') {
        const bookInput = document.querySelector('#book-input');
        const bookError = document.querySelector('.book-name-error');
        if (bookInput.validity.typeMissmatch) {
            bookError.classList.add('show');
            bookError.textContent = 'Name of the book can\'t  be a number';
        } else if (bookInput.validity.tooShort) {
            bookError.classList.add('show');
            bookError.textContent = 'Name of the book have to be at least 5 characters long';
        } else if (bookInput.validity.valueMissing) {
            bookError.classList.add('show');
            bookError.textContent = 'You need to enter name of the book';
        }
   } else if (field === 'author-name') {
        const authorInput = document.querySelector('#author-input');
        const authorError = document.querySelector('.author-name-error');
        if (authorInput.validity.typeMissmatch) {
            authorError.classList.add('show');
            authorError.textContent = 'Name of the author can\'t  be a number';
        } else if (authorInput.validity.tooShort) {
            authorError.classList.add('show');
            authorError.textContent = 'Name of the author have to be at least 5 character long';
        } else if (authorInput.validity.valueMissing) {
            authorError.classList.add('show');
            authorError.textContent = 'You need to enter name of the author';
        }
    } else if (field === 'page-count') {
        const pagesInput = document.querySelector('#pages-input');
        const pagesError = document.querySelector('.pages-count-error');
        if (pagesInput.validity.typeMissmatch) {
            pagesError.classList.add('show');
            pagesError.textContent = 'You need to enter number of pages here';
        } else if (pagesInput.validity.rangeUnderflow) {
            pagesError.classList.add('show');
            pagesError.textContent = 'Book has to have more than 49 pages to be considered one';
        } else if (pagesInput.validity.valueMissing) {
            pagesError.classList.add('show');
            pagesError.textContent = 'You need to enter the number of pages';
        }
    }
}

function deleteError(field) {
    if (field === 'book-name') {
        const bookError = document.querySelector('.book-name-error');
        bookError.classList.remove('show');
        bookError.textContent = '';
    } else if (field === 'author-name') {
        const authorError = document.querySelector('.author-name-error');
        authorError.classList.remove('show');
        authorError.textContent = '';
    } else if (field === 'page-count') {
        const pagesError = document.querySelector('.pages-count-error');
        pagesError.classList.remove('show');
        pagesError.textContent = '';
    }
}

function defaultValues() {
    document.querySelector('#book-input').value = '';
    document.querySelector('#author-input').value = '';
    document.querySelector('#pages-input').value = 0;
    document.querySelector('#status-input').value = 'not read';
}


function findBooksIndex(book) {
    let arrMaxIndex = library.length - 1;
    for (let i = 0; i <= arrMaxIndex; i++) {
        if (book.title === library[i].title) {
            if (book.author === library[i].author) {
                if (book.pages === library[i].pages) {
                    if (book.read === library[i].read) {
                        return i;
                    }
                }
            }
        }
    }
    return 'Error';
}

document.querySelector('#book-input').addEventListener('input', () => {
        console.log('Inputing book name info');
        const bookInput = document.querySelector('#book-input');
        if (bookInput.validity.typeMissmatch ||
            bookInput.validity.tooShort ||
            bookInput.validity.valueMissing) {
            showError('book-name');
        } else if (bookInput.validity.valid) {
            deleteError('book-name');
        }
});

document.querySelector('#author-input').addEventListener('input', () => {
    console.log('Inputing author name info');
    const authorInput = document.querySelector('#author-input');
        if (authorInput.validity.typeMissmatch ||
            authorInput.validity.tooShort ||
            authorInput.validity.valueMissing) {
            showError('author-name')
        } else if (authorInput.validity.valid) {
            deleteError('author-name');
        }
});
document.querySelector('#pages-input').addEventListener('input', () => {
    console.log('Inputing page count info');
    const pagesInput = document.querySelector('#pages-input');
        if (pagesInput.validity.typeMissmatch ||
            pagesInput.validity.rangeUnderflow ||
            pagesInput.validity.valueMissing) {
            showError('page-count');
        } else if (pagesInput.validity.valid) {
            deleteError('page-count');
        }
});

const button = document.querySelector('.submit-button');
button.addEventListener('click', () => {
    const bookInput = document.querySelector('#book-input');
    const authorInput = document.querySelector('#author-input');
    const pagesInput = document.querySelector('#pages-input');

    if (!bookInput.validity.valid) {
        showError('book-name');
        return;
    } else if (!authorInput.validity.valid) {
        showError('author-name');
        return;
    } else if (!pagesInput.validity.valid) {
        showError('page-count');
        return;
    }
    
    transferBookData();
});

const trashBtn = document.querySelector('.trash-button');
trashBtn.addEventListener('click', defaultValues);

/* Default books */
const book1 = new Book('The Hobbit','J.R.R  Tolkien', 295,'read');
const book2 = new Book('Pride and Prejudice', 'Jane Austen', 279, 'not read');
const book3 = new Book('The Book Thief', 'Markus Zusak', 592, 'not read');
addBooks(book1, book2, book3);
displayAllBooks();

