'use strict';

(function(module) {
    const Book = module.Book;
    const User = module.User;
    const errorView = module.errorView;

    const bookView = {};
    const handleError = err => errorView.init(err);

    const bookTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

    bookView.init = () => {
        $('#books-view').show();

        $('#books').empty();
        Book.all.forEach(book => {
            const bookCard = bookTemplate(book);
            $('#books').append(bookCard);
        });
    };

    bookView.initNew = () => {
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

    bookView.initDetail = () => {
        console.log('detail running');

        const bookDetail = detailTemplate(Book.detail);

        $('#book-detail-view')
            .empty()
            .append(bookDetail)
            .show();
        
        if(User.current && User.current.isAdmin){
            $('#delete').show();
            $('#update').show();
            
            $('#delete').on('click', () => {
                Book.delete(Book.detail.id)
                    .then(() => {
                        page('/home');
                    })
                    .catch(handleError);
            });
            $('#update').on('click', () => {
                page(`/books/${Book.detail.id}/update`);
            });
        }
        else {
            $('#delete', '#update').hide();
        }
    };

    bookView.initUpdate = () => {
        console.log('update finished');

        $('#book-new-view').show();

        const book = Book.detail;
        
        $('input[name=title]').val(book.title);
        $('input[name=author]').val(book.author);
        $('input[name=isbn]').val(book.isbn);
        $('input[name=image_url]').val(book.image_url);
        $('input[name=description]').val(book.description);

        $('#book-form')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();
            
                const data = {
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=image_url]').val(),
                    description: $('input[name=description]').val(),
                    id: book.id
                };

                Book.update(data).then(() => {
                    $('#book-form')[0].reset();
                    page(`/books/${book.id}`);
                });
            });
    };
    // What does your module export
    module.bookView = bookView;

})(window.module);