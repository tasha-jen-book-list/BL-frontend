'use strict';

(function(module) {

    const Book = module.Book;
    const bookView = module.bookView;

    $('.icon-menu').on('click', () => {
        $('.nav-menu').slideToggle(350);
    });

    page('/home', () => Book.fetchAll(bookView.init));
    page('/books/new', () => bookView.initNew());
    page('/books/:id', (ctx) => Book.fetchOne(ctx.params.id, bookView.initDetail));

    page('*', () => page.redirect('/home'));

    page({ hashbang: true });

})(window.module);
