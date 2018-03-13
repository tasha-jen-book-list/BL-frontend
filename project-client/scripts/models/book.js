'use strict';

console.log('Do I work?');
// const API_URL = 'http://localhost:3000';
const API_URL = 'https://bc2-booklist.herokuapp.com';

(function (module) {

    const template = Handlebars.compile($('#book-template').html());
    
    function Book(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }
    
    Book.prototype.toHtml = function() {
        return template(this);
    };

    // Define "instance" data methods
    Book.prototype.insert = function(callback) {
        $.post(`${API_URL}/books`, {
            task: this.task
        })
            .then(data => {
                Object.keys(data).forEach(key => this[key] = data[key]);
                if(callback) callback();
            });
    };
    
    Book.all = [];
    
    Book.prototype.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/books`)
            .then(data => {
                Book.all = data.map(each => new Book(each));
                if(callback) callback();
            })
            .catch(console.log);
    };

    module.Book = Book;

})(window.app || (window.app = {}));