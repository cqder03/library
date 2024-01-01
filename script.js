const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
    if (bookField.value.length < 1 || authorField.value.length < 1 ||
        Number(pagesField.value) < 5) {
            alert('You have to fill out book and author fields with at least 5\
            character words and book can\'t have less than 5 pages.');
            return;
        }
    
    const newBook = new Book(bookField.value, authorField.value, pagesField.value, statusField.value);
    addBooks(newBook);
    displayBook(newBook);
}

const button = document.querySelector('.submit-button');
button.addEventListener('click', transferBookData);

function findBooksIndex(book) {
    let arrMaxIndex = library.length - 1;
    for (let i = 0; i <= arrMaxIndex; i++) {
        if (book.title === library[i].title) {
            if (book.author === library[i].author) {
                if (book.pages === library[i].pages) {
                    if (book.read === library[i].read) {
                        return i;
                    } else {
                        console.log('Readings don\'t match');
                    }
                } else {
                    console.log('Pages don\'t match');
                }
            } else {
                console.log('Author\'s don\'t match');
            }
        } else {
            console.log('Names don\'t match.');
        }
    }
    return 'Error';
}

/* Default books */
const book1 = new Book('The Hobbit','J.R.R  Tolkien', 295,'read');
const book2 = new Book('Pride and Prejudice', 'Jane Austen', 279, 'not read');
const book3 = new Book('The Book Thief', 'Markus Zusak', 592, 'not read');
addBooks(book1, book2, book3);
displayAllBooks();

