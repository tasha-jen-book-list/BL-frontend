'use strict';

(function(module) {

    const Book = module.Book;
    const bookView = module.bookView;

    page('/', () => Book.fetchAll(bookView.init));
    page('/books/new', () => bookView.initNew());
    page('/books/:id', (ctx) => Book.fetchOne(ctx.params.id, bookView.initDetail));
    page('/igloo', ()=> console.log('bucket'));

    page('*', () => page.redirect('/BL-frontend/'));

    page({ hashbang: true });

})(window.module);