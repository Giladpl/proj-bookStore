'use strict';

var gCurrLang = 'eng';

var gTrans = {
	title: {
		eng: 'Welcome to my bookshop',
		he: 'ברוכים הבאים לחנות שלי',
	},
	'header-id': {
		eng: 'ID',
		he: 'מספר סידורי',
	},
	'header-title': {
		eng: 'Title',
		he: 'כותרת',
	},
	'header-price': {
		eng: 'price',
		he: 'מחיר',
	},
	'header-action': {
		eng: 'Action',
		he: 'פעולה',
	},
	'btn-read': {
		eng: 'Read',
		he: 'לקריאה',
	},
	'btn-update': {
		eng: 'Update',
		he: 'עדכון',
	},
	'btn-remove': {
		eng: 'Remove',
		he: 'הסרה',
	},
	'btn-submit': {
		eng: 'Submit',
		he: 'הוספה',
	},
	'add-book-title': {
		eng: 'Add New Book',
		he: 'הוספת ספר חדש',
	},
	'add-title-placeholder': {
		eng: `Book's Title`,
		he: `שם הספר`,
	},
	'add-price-placeholder': {
		eng: `Book's Price`,
		he: `מחיר הספר`,
	},
	'modal-book-name': {
		eng: `Book's Name`,
		he: 'שם הספר',
	},
	'modal-book-price': {
		eng: `Book's Price`,
		he: 'מחיר הספר',
	},
	'modal-rating-placeholder': {
		eng: `Rating`,
		he: `דירוג`,
	},
	'modal-rating-current': {
		eng: `Current Rating:`,
		he: `דירוג נוכחי`,
	},
	'update-price': {
		eng: 'Enter a new price:',
		he: 'הזן מחיר חדש',
	},
};

function setLang(lang) {
	gCurrLang = lang;
}

function getCurrLang() {
	return gCurrLang;
}

function doTrans() {
	var els = document.querySelectorAll('[data-trans]');
	els.forEach(function (el) {
		var transKey = el.dataset.trans;
		var txt = getTrans(transKey);

		if (el.nodeName === 'INPUT') el.setAttribute('placeholder', txt);
		else el.innerText = txt;
	});
}

function getTrans(transKey) {
	var keyTrans = gTrans[transKey];
	if (!keyTrans) return 'UNKNOWN';
	var txt = keyTrans[gCurrLang];

	// if not found return english
	if (!txt) txt = keyTrans['eng'];
	return txt;
}

function formatCurrency(price) {
	var changeRatio = 3.5;
	if (gCurrLang === 'eng') return '$' + price;
	return new Intl.NumberFormat('he-IL', {
		style: 'currency',
		currency: 'ILS',
	}).format(price / changeRatio);
}
