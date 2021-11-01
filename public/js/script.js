$('#contactForm').submit((e) => {
    e.preventDefault()
    $.ajax({
        url: '/mail',
        method: 'POST',
        data: {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val(),
        },
        success: (response) => {
            console.log(response);
            if (response.success) {
                alert("Mail Sent Successfully!");
                location.reload();
            } else {
                alert("Failed to Sent Mail");
                window.location.href = '/home';
            }
        },
        error: (response) => {
            alert("Try Again");
        }

    })

})