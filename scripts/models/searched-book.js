'use strict';
    
(function (module) {


    
    const Volume = module.Volume;

    Volume.found = null;
    Volume.total = 0;
    Volume.search = '';

    Volume.find = search => {
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
            url: `${API_URL}/books`,
            method: 'PUT'
        });
    };

})(window.module);