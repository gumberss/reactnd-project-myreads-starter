var fillShelfService = function (booksWithoutShelf, booksWithShelf) {

    if (!booksWithShelf) booksWithShelf = [];

    return booksWithoutShelf.map(book => {

        book.shelf = "none";

        var findedBookWithShelf = booksWithShelf.find(bookWithShelf => bookWithShelf.id === book.id);

        return findedBookWithShelf || book;
    });
}

export default fillShelfService;