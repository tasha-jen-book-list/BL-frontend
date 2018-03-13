'use strict';

(function (module) {
    
    function Book(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }
    
    Book.prototype.toHtml = function() {
        return bookTemplate(this);
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
    
    Book.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/books`)
            .then(data => {
                Book.all = data.map(each => new Book(each));
                if(callback) callback();
            })
            .catch(console.log);
    };

    module.Book = Book;

})(window.module);