'use strict';

(function(module) {
    const Book = module.Book;

    const bookView = {};

    const bookTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

    function resetView() {
        $('.view').hide();
    }


    bookView.init = () => {
        bookView.loadBooks();
        resetView();
        $('#books-view').show();

        // bookView.handleSubmit();
    };

    bookView.initNew = () => {
        resetView();
        $('#new-book-view').show();
    }; 

    bookView.initDetail = id => {
        resetView();
        $('#detail-book-view').show();
        $('#book-id').text(id);
    }; 
    
    bookView.loadBooks = () => {
        Book.all.forEach(book => {
            bookView.loadBook(book);
        });
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