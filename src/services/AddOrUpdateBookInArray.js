var addOrUpdateBookInArray = function (book, array) {

    if (!array) array = [];

    var indexOfBook = array.map(arrayBook => arrayBook.id).indexOf(book.id);

    if (indexOfBook !== -1)
        array.splice(indexOfBook, 1);

    return [...array, book];
}

export default addOrUpdateBookInArray;