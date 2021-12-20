const getTotalBooksCount = (books) => books.length

const getTotalAccountsCount = (accounts) => accounts.length

const getBooksBorrowedCount = (books) => {
    const borrowedBooks = []
    books.forEach(book => {
        book.borrows.forEach(borrowedBook => {
            if (!borrowedBook.returned)
                borrowedBooks.push(borrowedBook)
        })
    })
    return borrowedBooks.length
}

const getMostCommonGenres = (books) => {
    const genreObject = {};
    books.forEach((book) => {
        !genreObject[book.genre]
            ? genreObject[book.genre] = 1
            : genreObject[book.genre] += 1
    });
    return Object.entries(genreObject)
        .map(([name, count]) => {
            return {
                name,
                count
            };
        })
        .sort((genre1, genre2) =>
            genre2.count - genre1.count)
        .slice(0, 5)
}

const getMostPopularBooks = (books) => {
    return books.map(book => {
        return {
            name: book.title,
            count: book.borrows.length
        }
    })
        .sort((book1, book2) => (book1.count < book2.count ? 1 : -1))
        .slice(0, 5)
}

const getMostPopularAuthors = (books, authors) => {
    const mostPopularAuthors = [];
    authors.forEach((author) => {
        const authorObj = {
            name: `${author.name.first} ${author.name.last}`,
            count: 0
        };
        books.forEach((book) => {
            if (book.authorId === author.id) {
                authorObj.count += book.borrows.length;
            }
        });
        mostPopularAuthors.push(authorObj);
    });
    return mostPopularAuthors
        .sort((author1, author2) =>
            author2.count - author1.count)
        .slice(0, 5);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
