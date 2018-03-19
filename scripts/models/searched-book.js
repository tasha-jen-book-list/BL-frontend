'use strict';
    
(function (module) {

    const Book = module.Book;

    function Volume(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }
    
    Volume.found = null;
    Volume.total = 0;
    Volume.search = '';
    
    Volume.find = search => {
        
        Volume.search = search;
        if (!Volume.search) {
            Volume.found = null;
            Volume.total = 0;
            return Promise.resolve();
        }
        
        return $.getJSON(`${API_URL}/volumes/find?q=${encodeURI(search)}`) //eslint-disable-line
            .then(result => {
                Volume.found = result.books;
                Volume.total = result.total;
            });
    };
    
    Volume.import = (isbn, callback) => {
        const search = isbn.slice(8, isbn.length);
        return $.ajax({
            url: `${API_URL}/books/volumes/${search}`, //eslint-disable-line
            method: 'PUT'
        })
            .then(data => {
                Book.detail = new Book(data);
                if (callback) callback(Book.detail);
            })
            .catch(err => {
                console.error(err);
            });
    };
    
    module.Volume = Volume;

})(window.module);