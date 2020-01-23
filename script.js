function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateForm() {
    var error = $('#error');
    var firstname = $('#firstname').val().trim();
    var lastname = $('#lastname').val().trim();
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    var confirmPassword = $('#confirm-password').val().trim();
    var email = $('#email').val().trim();

    // Validate firstname
    if (firstname.length < 4) {
        error.text('First name not valid!');
        error.show();
        return false;
    }

    // Validate lastname
    if (lastname.length < 4) {
        error.text('Last name not valid!');
        error.show();
        return false;
    }

    // Validate username
    if (username.length < 8 || username.length > 20) {
        error.text('Username name not valid!');
        error.show();
        return false;
    }

    // Validate password and confirm password
    if (password != confirmPassword) {
        error.text('Passwords do not match!');
        error.show();
        return false;
    }

    // Validate email
    if (!validateEmail(email)) {
        error.text('Email not valid!');
        error.show();
        return false;
    }

    // Return true because the form is valid
    return true;
}


$('#registration-form').submit(function (event) {
    // event.preventDefault();

    if (!validateForm()) {
        event.preventDefault();
    }
});

$('.input').keyup(function () {
    var value = $(this).val().trim();
    $(this).val(value);
})

$('#username').on('blur', function () {
    var username = $(this).val().trim();
    var el = $(this);

    if (username.length >= 7 && username.length <= 20) {
        $.ajax({
            type: 'POST',
            url: 'username.php',
            data: {
                username: username
            },
            success: function (data) {
                if (!data.valid) {
                    el.removeClass('is-valid');
                    el.addClass('is-invalid');
                } else {
                    el.removeClass('is-invalid');
                    el.addClass('is-valid');
                }
            },
            dataType: 'json'
        });
    } else {
        el.removeClass('is-valid');
        el.addClass('is-invalid');
    }
});

$('#email').on('input', function () {
    var email = $(this).val().trim();
    var el = $(this);

    if (validateEmail(email)) {
        $.post(
            'email.php',
            {
                email: email
            },
            function (data) {
                if (!data.valid) {
                    el.removeClass('is-valid');
                    el.addClass('is-invalid');
                } else {
                    el.removeClass('is-invalid');
                    el.addClass('is-valid');
                }
            },
            'json'
        );
    } else {
        el.removeClass('is-valid');
        el.addClass('is-invalid');
    }
});