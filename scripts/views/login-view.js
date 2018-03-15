'use strict';

(function(module) {

    const User = module.User;

    const loginView = {};

    loginView.init = () => {
        $('#admin-view').show();
        if(User.isAdmin) {
            $('#admin-form').hide();
            $('#logged-in').show();
        }
        else {
            $('#admin-form').off('submit').on('submit', handleSubmit);
            $('#logged-in').hide();
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        User.auth($('#passphrase').val())
            .then(user => {
                if(!user.isAdmin) alert('passphrase not correct');
                else {
                    $('#admin-form')[0].reset();
                    page('/home');
                }
            });
    };

    module.loginView = loginView;

})(window.module);