'use strict';

const STORAGE_KEY = 'books';
const PAGE_SIZE = 6;
var gBooks;
var gActiveBook;
var gPageIdx = 0;

function createBooks() {
	var books = loadFromStorage(STORAGE_KEY);
	if (!books || !books.length) {
		books = generateNames(25).map(function (bookName, i) {
			return _createBook(bookName, getRandomIntInclusive(5, 30), i + 1);
		}); // i + 1 is used for random pic generation in _createBook function
	}
	console.log(books);
	gBooks = books;
	saveToStorage(STORAGE_KEY, books);
}

function getBooksForDisplay() {
	var startIdx = gPageIdx * PAGE_SIZE;
	return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function nextPage() {
	if (gPageIdx === Math.ceil(gBooks.length / PAGE_SIZE) - 1) return;
	gPageIdx++;
}

function prevPage() {
	if (gPageIdx === 0) return;
	gPageIdx--;
}

function changePage(newPage) {
	gPageIdx = newPage;
}

function getBook(bookId) {
	gActiveBook = gBooks.find(function (book) {
		return book.id === bookId;
	});
	if (gActiveBook === -1) return;
	return gActiveBook;
}

function removeBook(bookId) {
	var bookIdx = gBooks.findIndex(function (book) {
		return bookId === book.id;
	});
	// console.log('Deleting Book:', gBooks[bookIdx]);
	gBooks.splice(bookIdx, 1);
	saveToStorage(STORAGE_KEY, gBooks);
}

function addBook(bookName, bookPrice) {
	gBooks.unshift(_createBook(bookName, bookPrice));
	saveToStorage(STORAGE_KEY, gBooks);
}

function updateBook(val, newVal) {
	gActiveBook[val] = newVal;
	saveToStorage(STORAGE_KEY, gBooks);
	gActiveBook = null;
}
// function updateBook(newPrice) {
// 	gActiveBook.bookPrice = newPrice;
// 	saveToStorage(STORAGE_KEY, gBooks);
// 	gActiveBook = null;
// }

// function addBookRating(bookRating) {
// 	gActiveBook.rate = bookRating;
// 	saveToStorage(STORAGE_KEY, gBooks);
// 	gActiveBook = null;
// }

// function sortBy(type, direction) {
// 	if (type === 'bookName') {
// 		return gBooks.sort(function (book1, book2) {
// 			return book2.bookName.localeCompare(book1.bookName) * diff
// 		});
// 	} else {
// 		return gBooks.sort(function (book1, book2) {
// 			return direction === 'ascending'
// 				? book1.[bookPrice] - book2.bookPrice
// 				: book2.bookPrice - book1.bookPrice;
// 		});
// 	}
// }
function sortBy(type, direction) {
	if (type === 'bookName') {
		return gBooks.sort(function (book1, book2) {
			return direction === 'ascending'
				? book1.bookName.localeCompare(book2.bookName)
				: book2.bookName.localeCompare(book1.bookName);
		});
	} else {
		return gBooks.sort(function (book1, book2) {
			return direction === 'ascending'
				? book1.bookPrice - book2.bookPrice
				: book2.bookPrice - book1.bookPrice;
		});
	}
}

function getTotalPages() {
	return Math.ceil(gBooks.length / PAGE_SIZE);
}

//Private Functions:

function _createBook(bookName, bookPrice, randomPic) {
	console.log('bookPrice :>> ', bookPrice);
	return {
		id: makeId(),
		bookName,
		bookPrice,
		rate: 0,
		bookImg: `https://picsum.photos/100/150?random=${randomPic}`,
		bookAbout: makeLorem(30),
	};
}
