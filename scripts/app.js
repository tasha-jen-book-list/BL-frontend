'use strict';

(function(module) {

    const Book = module.Book;
    const bookView = module.bookView;
    

    page('/BL-frontend/', () => Book.fetchAll(bookView.init));
    console.log('igloos');
    page('/books/new', () => bookView.initNew());
    page('/books/:id', (ctx) => Book.fetchOne(ctx.params.id, bookView.initDetail));
    page('*', () => page.redirect('/'));

    page({ hashbang: true });

})(window.module);