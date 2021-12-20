const findAuthorById = (authors, authorId) =>
    authors.find(author => author.id === authorId)

const findBookById = (books, bookId) =>
    books.find(book => book.id === bookId)

const partitionBooksByBorrowedStatus = (books) => {
    const arrayToReturn = []
    const checkedOutBooks = []
    const returnedBooks = []

    books.forEach(book => {
        if (book.borrows.some(borrowedBook => !borrowedBook.returned)) {
            checkedOutBooks.push(book)
        } else {
            returnedBooks.push(book)
        }
    })

    arrayToReturn.push(checkedOutBooks)
    arrayToReturn.push(returnedBooks)
    return arrayToReturn
}

const getBorrowersForBook = (book, accounts) => {
    const borrowersForBook = []
    accounts.reduce((previous, current) => {
        if (book.borrows
            .some(borrowedBook => borrowedBook.id === current.id)) {
            const accountToPush = {...accounts.find(account => account.id === current.id)}
            let isReturned = true
            if (!book.borrows.find(borrow => borrow.id === current.id).returned) {
                isReturned = false
            }
            accountToPush['returned'] = isReturned
            borrowersForBook.push(accountToPush)
        }
    })
    return borrowersForBook
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};
