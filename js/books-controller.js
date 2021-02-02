'use strict';

function onInit() {
	// console.log('onInit');
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
      <td>${formatCurrency(book.bookPrice)}</td>
      <td onclick="onReadBook('${
				book.id
			}')"><button data-trans="btn-read" class="btns btn-read" >Read</button></td>
      <td onclick="onUpdateBook('${
				book.id
			}')"><button data-trans="btn-update"  class="btns btn-update">Update</button></td>
      <td onclick="onRemoveBook('${
				book.id
			}')"><button data-trans="btn-remove" class="btns btn-remove" >Remove</button></td>
    </tr>\n
      `;
	});
	document.querySelector('.table-body').innerHTML = strHtmls.join('');
	doTrans();
}

function renderPaging() {
	var totalPages = getTotalPages();
	var currLang = getCurrLang();
	console.log('currLang :>> ', currLang);
	var rightArrowStr = '&#9658;';
	var leftArrowStr = '&#9668;';
	var strHtml = `<button onclick="onPrevPage()">${currLang === 'eng' ? leftArrowStr : rightArrowStr}</button>`;
	for (var i = 0; i < totalPages; i++) {
		strHtml += `\t<button onclick="onPageNum(${i})">${i + 1}</button>\n`;
	}
	strHtml += `<button onclick="onNextPage()">${currLang === 'eng' ? rightArrowStr : leftArrowStr}</button>`;
	document.querySelector('.paging').innerHTML = strHtml;
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

function onAddBook(ev) {
	// console.log('onAddBook');
	ev.preventDefault();
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
	var newPrice = +document.querySelector('input[name=update-price]').value;
	updateBook('bookPrice', newPrice);
	renderBooks();
	document.querySelector('input[name=update-price]').value = 0;
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
	document.querySelector('.curr-rating').innerText = newBookRating;
	updateBook('bookRating', newBookRating);
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

function onSetLang(lang) {
	setLang(lang);
	if (lang === 'he') {
		document.body.classList.add('rtl');
	} else {
		document.body.classList.remove('rtl');
	}
	renderBooks();
	renderPaging();
}
