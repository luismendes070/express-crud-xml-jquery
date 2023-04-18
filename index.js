const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

try{

  const crud = require('./crud');

  let book: type require('./crud').Book;

  book.id = "1";
  book.title = "The Catcher in the Rye";
  book.author = "J.D. Salinger";
  book.published = "1951";

  crud.addBook(book);

}catch(error){

}
finally{

}