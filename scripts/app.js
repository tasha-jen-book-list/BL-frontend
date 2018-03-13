'use strict';

(function(module) {

    const bookView = module.bookView;
    
    Book.prototype.toHtml = function() {
        return bookTemplate(this);
    };
    bookView.loadBook = book => {
        $('#books').append(book.toHtml());
    };

    page('/', () => bookView.init());
    page('/book/new', () => bookView.initNew());
    page('/book/:id', (ctx) => bookView.initDetail(ctx.params.id));

    page({ hashbang: true });

})(window.module);