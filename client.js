

const Library = require("./Library");

const collection = new Library("mongodb://127.0.0.1:27017", "Library", "books");


// ! all books
async function displayAllBooks() {
  const allBooks = await collection.allBooks();
  allBooks.forEach(book => console.log(book));
}


// ! by Id
(async () => {
  const id = "63f1499a527aa430426f7eb3";
  const book = await collection.findOneBook(id);
  const message = `Book with ID ${id}:`;
  console.log(message, book);
})();

//  ! findManyBook :query
(async () => {
  const query = { author: "dom delouise" };
  const books = await collection.findManyBooks(query);
  books.forEach(book => console.log(book));
})();
// ! Add new Book

const newBook = {
  title: "Foundation",
  author: "Isaac Asimov",
  copies: 3
};


collection.addBook(newBook);

//  !  changeBook Method

const newInfo = { title: "Oranges", author: "Sam Jackson", copies: 3 };
collection.changeBook("63f1499a527aa430426f7eb3", newInfo);

// ! remove book
(async () => {
  const id = "63f15da4e3eed85182497cb1";
  await collection.removeBook(id);
})();


displayAllBooks();
