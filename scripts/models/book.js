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
        $.post(`${API_URL}/books`, data)
            .then((data) => {
                if(callback) callback(data);
            })
            .catch(errorCallback);
    };

    Book.update = data => {
        return $.ajax({
            url: `${API_URL}/books/${data.id}`,
            method: 'PUT',
            data: data
        });
    };

    Book.delete = id => {
        return $.ajax({
            url: `${API_URL}/books/${id}`,
            method: 'DELETE',
        });
    };

    Book.found = null;
    Book.total = 0;
    Book.search = '';

    Book.find = search => {
        Book.search = search;
        return $.getJSON(`${API_URL}/volumes?search=${encodeURIComponent(search)}`)
            .then(result => {
                Book.found = result.books;
                Book.total = result.total;
            });
    };

    Book.import = isbn => {
        return $.ajax({
            url: `${API_URL}/books`,
            method: 'PUT'
        });
    };

    module.Book = Book;

})(window.module);