'use strict';

(function(module) {
    const Book = module.Book;

    const bookView = {};

    bookView.initIndexPage = () => {
        bookView.loadBooks();
        bookView.handleSubmit();
    };
    
    bookView.loadBooks = () => {
        Book.all.forEach(book => {
            bookView.loadBook(book);
        });
    };

    bookView.loadBook = book => {
        $('#books').append(book.toHtml());
    };

    // bookView.handleSubmit = () => {
    //     $('#add-book').on('submit', event => {
    //         event.preventDefault();
            
    //         const book = new Book({
    //             task: $('#book-task').val()
    //         });

    //         book.insert(() => {
    //             $('#book-task').val('');
    //             bookView.loadBook(book);
    //         });
    //     });
    // };

    // What does your module export
    module.bookView = bookView;

})(window.app || (window.app = {}));