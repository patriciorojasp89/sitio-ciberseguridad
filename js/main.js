// js/main.js
$(document).ready(function () {
    // Año automático en el footer
    $('#year').text(new Date().getFullYear());

    // ==========================
    // VALIDACIÓN FORMULARIO CONTACTO
    // ==========================
    const $form = $('#contactForm');
    if ($form.length) { // solo en consejos.html
        $form.on('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // helper para validar campos vacíos
            function checkRequired($field) {
                if (!$field.val() || $field.val().trim() === '') {
                    $field.addClass('is-invalid').removeClass('is-valid');
                    isValid = false;
                } else {
                    $field.removeClass('is-invalid').addClass('is-valid');
                }
            }

            const $nombre = $('#nombre');
            const $email = $('#email');
            const $motivo = $('#motivo');
            const $mensaje = $('#mensaje');

            // Validar campos obligatorios
            checkRequired($nombre);
            checkRequired($motivo);
            checkRequired($mensaje);

            // Validación simple de email
            const emailVal = $email.val().trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                $email.addClass('is-invalid').removeClass('is-valid');
                isValid = false;
            } else {
                $email.removeClass('is-invalid').addClass('is-valid');
            }

            const $alert = $('#formAlert');
            if (!isValid) {
                $alert
                    .removeClass('d-none alert-success')
                    .addClass('alert-danger')
                    .text('Por favor revisa los campos marcados en rojo.');
                return;
            }

            // Si todo está OK, simulamos envío
            $alert
                .removeClass('d-none alert-danger')
                .addClass('alert-success')
                .text('¡Gracias por tu mensaje! Responderemos a tu correo a la brevedad.');

            // Limpiar formulario después de unos segundos o al tiro
            $form[0].reset();
            $('.is-valid').removeClass('is-valid');
        });
    }

    // ==========================
    // TEST DE SEGURIDAD EN MODAL
    // ==========================
    const $btnCalcularTest = $('#btnCalcularTest');
    if ($btnCalcularTest.length) {
        $btnCalcularTest.on('click', function () {
            let score = 0;

            const q1 = $('input[name="q1"]:checked').val();
            const q2 = $('input[name="q2"]:checked').val();
            const q3 = $('input[name="q3"]:checked').val();

            if (q1 === 'segura') score++;
            if (q2 === 'verificar') score++;
            if (q3 === 'activar') score++;

            const $feedback = $('#testFeedback');

            if (!q1 || !q2 || !q3) {
                $feedback
                    .removeClass('text-success text-danger')
                    .addClass('text-danger')
                    .text('Responde todas las preguntas antes de calcular el resultado.');
                return;
            }

            if (score === 3) {
                $feedback
                    .removeClass('text-danger')
                    .addClass('text-success')
                    .text('¡Excelente! Obtuviste 3/3. Tienes buenas prácticas de seguridad digital.');
            } else if (score === 2) {
                $feedback
                    .removeClass('text-danger')
                    .addClass('text-success')
                    .text('Vas bien: obtuviste 2/3. Revisa las respuestas incorrectas para reforzar tu seguridad.');
            } else {
                $feedback
                    .removeClass('text-success')
                    .addClass('text-danger')
                    .text('Obtuviste ' + score + '/3. Te recomiendo revisar los consejos de la página para mejorar tu seguridad.');
            }
        });
    }
});
