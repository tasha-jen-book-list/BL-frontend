'use strict';

(function(module) {
    const Book = module.Book;

    const bookView = {};

    const bookTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

    function resetView() {
        $('.view').hide();
        $('.nav-menu').slideUp(350);
    }

    bookView.init = () => {
        resetView();
        $('#books-view').show();

        Book.all.forEach(book => {
            const bookCard = bookTemplate(book);
            $('#books-view').append(bookCard);
        });
        // bookView.handleSubmit();
    };

    bookView.initNew = () => {
        resetView();
        $('#book-new-view').show();
    }; 

    bookView.initDetail = id => {
        console.log('detail running');
        resetView();

        const bookDetail = detailTemplate(Book.detail);

        $('#book-detail-view')
            .empty()
            .append(bookDetail)
            .show();
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