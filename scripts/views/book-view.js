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

        $('#books').empty();
        Book.all.forEach(book => {
            const bookCard = bookTemplate(book);
            $('#books').append(bookCard);
        });
    };

    bookView.initNew = () => {
        resetView();
        $('#book-new-view').show();

        $('#book-form')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();
            
                const data = {
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=image_url]').val(),
                    description: $('input[name=description]').val()
                };

                Book.create(data, (book) => {
                    $('#book-form')[0].reset();
                    page(`/books/${book.id}`);
                });
            });
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


    // What does your module export
    module.bookView = bookView;

})(window.module);