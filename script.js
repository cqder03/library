const library = [];

function createBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(book) {
    library.push(book);
}

function displayBooks() {
    const tableBody = document.querySelector('table > tbody');
    for (let book of library) {
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

        tableBody.appendChild(tableRow);
        tableRow.appendChild(titleRow);
        tableRow.appendChild(authorRow);
        tableRow.appendChild(pagesRow);
        tableRow.appendChild(readRow);
        tableRow.appendChild(deleteRow);
        readRow.appendChild(readButton);
        deleteRow.appendChild(deleteButton);
    }
}

