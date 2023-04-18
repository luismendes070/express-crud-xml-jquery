// Define a Book interface to represent a book object
interface Book {
  id: number;
  title: string;
  author: string;
  published: number;
}

// Define a function to get all books from the XML file
function getBooks(): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'data.xml',
      dataType: 'xml',
      success: (xml) => {
        const books: Book[] = [];
        $(xml).find('book').each((index, element) => {
          const book: Book = {
            id: Number($(element).attr('id')),
            title: $(element).find('title').text(),
            author: $(element).find('author').text(),
            published: Number($(element).find('published').text()),
          };
          books.push(book);
        });
        resolve(books);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// Define a function to get a book by ID from the XML file
function getBookById(id: number): Promise<Book | undefined> {
  return getBooks().then((books) => {
    return books.find((book) => book.id === id);
  });
}

// Define a function to add a book to the XML file
function addBook(book: Book): Promise<Book> {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'data.xml',
      dataType: 'xml',
      method: 'POST',
      data: `<book id="${book.id}">
              <title>${book.title}</title>
              <author>${book.author}</author>
              <published>${book.published}</published>
            </book>`,
      success: () => {
        resolve(book);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// Define a function to update a book in the XML file
function updateBook(book: Book): Promise<Book> {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `data.xml?id=${book.id}`,
      dataType: 'xml',
      method: 'PUT',
      data: `<book id="${book.id}">
              <title>${book.title}</title>
              <author>${book.author}</author>
              <published>${book.published}</published>
            </book>`,
      success: () => {
        resolve(book);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// Define a function to delete a book from the XML file
function deleteBook(id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `data.xml?id=${id}`,
      dataType: 'xml',
      method: 'DELETE',
      success: () => {
        resolve(id);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

