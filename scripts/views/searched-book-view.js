'use strict';

(function (module) {

    const resultTemplate = Handlebars.compile($('#result-template').html());

    const Volume = module.Volume;
    const searchedView = {};

    searchedView.initSearch = () => {
        $('#form-search-view').show();

        $('#search-results')
            .empty()
            .append(Volume.found.map(resultTemplate))
            .on('click', 'button', handleAdd);


        $('#search-form')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const form = event.target;
                const search = form.elements.search.value;
            // const data = {
            //     title: $('input[name=title]').val(),
            //     author: $('input[name=author]').val(),
            //     isbn: $('input[name=isbn]').val(),
            // };
    
            // page(`/volumes?search=${encodeURIComponent(search)}`);
            });

        const handleAdd = function(){
            const isbn = $(this).data('isbn');
            Volume.import(isbn)
                .then(book => page(`books/${book.id}`));
        };
    };

}) (window.module);