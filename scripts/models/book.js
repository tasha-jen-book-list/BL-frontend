'use strict';

(function (module) {
    
    function Book(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    function errorCallback(err) {
        console.log(err);
        module.errorView.init(err);
    }

    
    Book.all = [];
    
    Book.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/books`)
            .then(data => {
                Book.all = data.map(each => new Book(each));
                if(callback) callback();
            })
            .catch(errorCallback);
    };
    
    Book.detail = null;

    Book.fetchOne = (id, callback) => {
        $.getJSON(`${API_URL}/books/${id}`)
            .then(data => {
                Book.detail = new Book(data);
                if(callback) callback();
            })
            .catch(errorCallback);
    };

    Book.create = function(data, callback) {
        $.post(`${API_URL}/new`, data)
            .then((data) => {
                if(callback) callback(data);
            })
            .catch(errorCallback);
    };

    module.Book = Book;

})(window.module);