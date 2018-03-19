'use strict';
    
(function (module) {


    function Volume(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    function errorCallback(err) {
        console.log(err);
        module.errorView.init(err);
    }
    
    Volume.found = null;
    Volume.total = 0;
    Volume.search = '';
    
    Volume.find = search => {

        //${data.title.trim()}${data.author.trim()}${data.isbn.trim()}`)
        
        Volume.search = search;
        if (!Volume.search) {
            Volume.found = null;
            Volume.total = 0;
            return Promise.resolve();
        }
        
        return $.getJSON(`${GOOGLE_API_URL}/volumes?search=${encodeURIComponent(search)}`)
            .then(result => {
                Volume.found = result.books;
                Volume.total = result.total;
            });
    };
    
    Volume.import = isbn => {
        return $.ajax({
            url: `${GOOGLE_API_URL}/books`,
            method: 'PUT'
        });
    };
    
    module.Volume = Volume;

})(window.module);