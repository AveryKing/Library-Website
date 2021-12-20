const bookFunctions = require('./books')

const findAccountById = (accounts, id) =>
    accounts.filter(account => account.id === id)[0]


const sortAccountsByLastName = (accounts) => {
    return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1))
}

const getTotalNumberOfBorrows = (account, books) => {
    let total = 0
    books.forEach(book => {
        book.borrows.some(borrowedBook => borrowedBook.id === account.id)
            ? total++
            : total
    })
    return total
}

const getBooksPossessedByAccount = (account, books, authors) => {
    const borrowedBooks = []
    books.forEach(book => {
        if (book['borrows']
            .some(borrowedBook => borrowedBook.id === account.id && !borrowedBook.returned)) {
            let bookWithAuthor = {...book}
            bookWithAuthor['author'] = bookFunctions.findAuthorById(authors, book['authorId'])
            borrowedBooks.push(bookWithAuthor)
        }
    })
    return borrowedBooks
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};
