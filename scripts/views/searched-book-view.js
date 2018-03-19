'use strict';

(function (module) {

    const resultTemplate = Handlebars.compile($('#result-template').html());

    const Volume = module.Volume;
    const searchedView = {};

    searchedView.initSearch = () => {
        $('#form-search-view').show();

        $('#search-form')
            .off('submit')
            .on('submit', handleSearch);

        $('#search-results')
            .empty();

        if (Volume.found) handleResults();
    };

    const handleAdd = function(){
        const isbn = $(this).data('isbn');
        Volume.import(isbn, (book) => page(`/books/${book.id}`) );
    };

    const handleSearch = e => {
        e.preventDefault();
        $('#search-results').empty();

        const searchTitle = $('#search-form input[name=search-title]').val();
        const searchAuthor = $('#search-form input[name=search-author]').val();
        const searchISBN = $('#search-form input[name=search-isbn]').val();

        if (!searchTitle && !searchAuthor && !searchISBN) {
            alert('Please enter at least one search value');
            return 'invalid search';
        } else {
            let searchString = '';
            if (searchTitle) searchString += `intitle:${searchTitle}`;
            if (searchAuthor) {
                if (searchString){
                    searchString += `+inauthor:${searchAuthor}`;}
                else {
                    searchString += `inauthor:${searchAuthor}`;
                }
            }
            if (searchISBN) {
                if (searchString){
                    searchString += `+isbn:${searchISBN}`;
                } else {
                    searchString += `isbn:${searchISBN}`;
                }
            }
            searchString = searchString.replace(/\s/g, '+');

            Volume.find(searchString)
                .then( () => handleResults() );
        }
    };

    const handleResults = () => {
        $('#search-results')
            .off('button')
            .append(Volume.found.map(resultTemplate))
            .on('click', 'button', handleAdd);

        $('#results-search-view').show();
    };

    module.searchedView = searchedView;

}) (window.module);