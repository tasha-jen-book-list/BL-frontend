'use strict';

(function(module) {

    const Book = module.Book;
    const bookView = module.bookView;

    page('BL-frontend/', () => Book.fetchAll(bookView.init));
    page('BL-frontend/books/new', () => bookView.initNew());
    page('BL-frontend/books/:id', (ctx) => Book.fetchOne(ctx.params.id, bookView.initDetail));
    page('/igloo', ()=> console.log('bucket'));

    page('*', () => page.redirect('/BL-frontend/'));

    page({ hashbang: true });

})(window.module);