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
        $.getJSON(`${API_URL}/books`) //eslint-disable-line
            .then(data => {
                Book.all = data.map(each => new Book(each));
                if(callback) callback();
            })
            .catch(errorCallback);
    };
    
    Book.detail = null;

    Book.fetchOne = (id, callback) => {
        $.getJSON(`${API_URL}/books/${id}`) //eslint-disable-line
            .then(data => {
                Book.detail = new Book(data);
                if(callback) callback();
            })
            .catch(errorCallback);
    };

    Book.create = function(data, callback) {
        $.post(`${API_URL}/books`, data) //eslint-disable-line
            .then((data) => {
                if(callback) callback(data);
            })
            .catch(errorCallback);
    };

    Book.update = data => {
        return $.ajax({
            url: `${API_URL}/books/${data.id}`, //eslint-disable-line
            method: 'PUT',
            data: data
        });
    };

    Book.delete = id => {
        return $.ajax({
            url: `${API_URL}/books/${id}`, //eslint-disable-line
            method: 'DELETE',
        });
    };

    module.Book = Book;

})(window.module);