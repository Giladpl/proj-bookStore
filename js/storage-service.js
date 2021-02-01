'use strict';

function saveToStorage(STORGAE_KEY, val) {
    localStorage.setItem(STORGAE_KEY, JSON.stringify(val))
}

function loadFromStorage(STORGAE_KEY) {
    var val = localStorage.getItem(STORGAE_KEY)
    return JSON.parse(val)
}