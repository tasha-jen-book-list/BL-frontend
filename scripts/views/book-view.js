'use strict';

(function(module) {
    const Book = module.Book;

    const bookView = {};

    const bookTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());



    bookView.init = () => {
        bookView.loadBooks();

        $('.view').hide();
        $('#books-view').show();

        // bookView.handleSubmit();
    };

    bookView.initDetail = () => {
        $('.view').hide();
        $('#book-detail-view').show();
    }; 

    bookView.initNew = () => {
        $('.view').hide();
        $('#new-book-view').show();
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

})(window.module);