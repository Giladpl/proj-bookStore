'use strict';

function onInit() {
	console.log('onInit');
	createBooks();
	renderBooks();
	renderPaging();
}

function renderBooks() {
	// console.log('renderBooks');

	var books = getBooksForDisplay();
	var strHtmls = books.map(function (book, i) {
		return `
      \t<tr>
      <td>${i + 1 + gPageIdx * PAGE_SIZE}</td>
      <td>${book.id}</td>
      <td>${book.bookName}</td>
      <td>$ ${book.bookPrice}</td>
      <td onclick="onReadBook('${
				book.id
			}')"><button class="btns btn-read" >Read</button></td>
      <td onclick="onUpdateBook('${
				book.id
			}')"><button class="btns btn-update">Update</button></td>
      <td onclick="onRemoveBook('${
				book.id
			}')"><button class="btns btn-reDelete" >Remove</button></td>
    </tr>\n
      `;
	});
	document.querySelector('.table-body').innerHTML = strHtmls.join('');
}

function renderPaging() {
	var totalPages = getTotalPages();
	var strHtml = '';
	for (var i = 0; i < totalPages; i++) {
		strHtml += `\t<button onclick="onPageNum(${i})">${i + 1}</button>\n`;
	}
	document.querySelector('.pagging').innerHTML = strHtml;
	// console.log(strHtml);
}

function onPageNum(newPage) {
	// console.log('onPageNum', page);
	changePage(newPage);
	renderBooks();
}

function onRemoveBook(bookId) {
	// console.log('onRemoveBook');
	removeBook(bookId);
	renderBooks();
	renderPaging();
}

function onAddBook() {
	// console.log('onAddBook');
	var bookName = document.querySelector('input[name=bookName]').value;
	var bookPrice = document.querySelector('input[name=bookPrice]').value;
	addBook(bookName, bookPrice);
	renderBooks();
	renderPaging();
}

function onUpdateBook(bookId) {
	// console.log('onUpdateBook');
	document.querySelector('.modal-update').classList.remove('hide');
	getBook(bookId);
}

function onUpdatePrice(ev) {
	// console.log('onUpdatePriceBook');
	ev.preventDefault();
	var newPrice = document.querySelector('input[name=update-price]').value;
	updateBook('bookPrice', newPrice);
	renderBooks();
	(document.querySelector('input[name=update-price]').value = 0);
	document.querySelector('.modal-update').classList.add('hide');
}

function onReadBook(bookId) {
	// console.log('onReadBook');
	onToggleModal();
	var book = getBook(bookId);
	document.querySelector('.modal-bookName').innerText = `${book.bookName}`;
	document.querySelector('.modal-bookPrice').innerText = `${book.bookPrice}`;
	document.querySelector('.modal-bookAbout').innerText = `${book.bookAbout}`;
	document.querySelector('.curr-rating').innerText = `${book.rate}`;
	document.querySelector('.modal-bookImg').src = `${book.bookImg}`;
}

function onToggleModal() {
	document.querySelector('.modal-read').classList.toggle('hide');
	document.querySelector('.overlay').classList.toggle('hide');
}

function onChangeRating(ev) {
	// console.log('onChangeRating');
	ev.preventDefault();
	var newBookRating = document.querySelector('input[name=rating]').value;
	document.querySelector('input[name=rating]').value = 0;
	document.querySelector('.curr-rating').innerText = bookRating;
	addBookRating('bookRating', newBookRating);
}

function onSortBy(type, direction) {
	sortBy(type, direction);
	renderBooks();
}

function onNextPage() {
	nextPage();
	renderBooks();
}

function onPrevPage() {
	prevPage();
	renderBooks();
}
