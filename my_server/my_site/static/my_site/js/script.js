document.addEventListener('DOMContentLoaded', () => {
    /* Регулярные выражения для проверки значений полей */
    const regExpName = /^[a-z0-9_-]{3,16}$/;
    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/igm;
    const regExpPass =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    const regExpTel = /^\+375 \((17|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;

    const formReg = document.querySelector('.form-reg');
    const pass = formReg.querySelector('.formPass');
    const passConf = formReg.querySelector('.formPassConfirmation');
    // const inputPass = document.querySelector('.form-reg_input');
    // const iconPass = document.getElementById('pass-icon');

    const form = document.getElementById('form');
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    //Скрипт для бургер-меню сайта
    $ (document).ready (function() {
        $('.header_burger').click(function(event) {
            $('.header_burger, .header_menu').toggleClass('active');
            $('body').toggleClass('lock');
        });
    });    

    // Обработка данных формы регистрации
    let isValidate = false;
    function regFormValues(event) {
        event.preventDefault();

        const formDataReg = new FormData(formReg);
        const values = Object.fromEntries(formDataReg,entries());
        return values;
    }
    formReg.addEventListener('submit', regFormValues);

    const submit = () => {
        alert('Данные оправлены');  //занести данные в БД
    }

    // проверка username
    const validateElem = (elem) => {
        if (elem.name === 'username') {
            if(!regExpName.test(elem.value)) {
                isValidate = false;
                formAddError(elem);
            } else {
                isValidate = true;
                formRemoveError(elem);
            }
        }
        // проверка email
        if (elem.name === 'email') {
            if(!regExpEmail.test(elem.value)) {
                isValidate = false;
                formAddError(elem);
            } else {
                isValidate = true;
                formRemoveError(elem);
            }
        }
        // проверка password
        if (elem.name === 'password') {
            if(!regExpPass.test(elem.value) && elem.value !== '') {
                isValidate = false;
                alert ('Введите корректный пароль!');
                formAddError(elem);
            } else {
                isValidate = true;
                formRemoveError(elem);
            }
        }
        // проверка соответствия паролей
        if (elem.name === 'passwordConfirmation') {
            if (pass.value !== passConf.value && passConf.value !== '') {
                isValidate = false;
                alert ('Пароли не совпадают!');
                formAddError(elem);
            } else {
                isValidate = true;
                formRemoveError(elem);
            }
            if(!regExpPass.test(elem.value) && elem.value !== '') {
                isValidate = false;
                formAddError(elem);
            } else {
                isValidate = true;
                formRemoveError(elem);
            }
        }
    }

    for (let elem of formRegInputs) {
        if (elem.class === 'form-reg_input') {
            elem.addEventListener('blur', () => {
                validateElem(elem);
            });
        }
    }

    function formAddError(elem) {
        elem.parrentElement.classList.add('error');
        elem.classList.add('error');
    }

    function formRemoveError(elem) {
        elem.parrentElement.classList.remove('error');
        elem.classList.remove('error');
    }

    formReg.addEventListener('submit', (event) => {
        event.preventDefault();
        let formRegInputs = document.querySelectorAll('.form-reg_input');

        for (elem in formRegInputs) {
            if (elem.value === '') {
                isValidate = false;
                formAddError(elem);
            } else {
                isValidate = true;
                formRemoveError(elem);
            }
        }
        if (isValidate) {
            submit();
            formReg.reset();
        }
    });

    //Скрипт для передачи значений из JS в PHP с помощью ajax
    $(document).on('click', '#form-reg_btn_signup', function() {
        let userNameReg = formReg.querySelector('#login-signup').value;
        let emailReg = formReg.querySelector('#email-signup').value;
        let passwordReg = formReg.querySelector('#password-signup').value;

        $.agax ({
            url: 'sendmail.php',
            type: 'POST',
            dataType: 'json',
            data: {
                'name': userNameReg,
                'email': emailReg,
                'password': passwordReg
            }, success: function() {
                alert('Данные успешно отправлены!');
            }
        });
    });

    /* Скрипт для формы обратной связи */
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault(); //запрет автомат отправки формы

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка!');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля!');
        }

        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('._req');

            // проверка обязательных атрибутов
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
                // проверка email
                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                // проверка tel
                } else if (input.classList.contains('_tel')) {
                    //Создание маски телефона
                    let telNumber = form.getElementById('formTel');
                    let maskOptions = {
                        mask: '+375(00)000-00-00',
                        lazy: false
                    }
                    let mask = new Mask(telNumber,  maskOptions);
                    if (telTest(mask)) {
                        formAddError(input);
                        error++;
                    }
                // проверка checkbox
                } else if(input.getAttribute('type') === 'checkbox' && input.checked === false) {
                    formAddError(input);
                    error++;
                } else if (input.value === '') {
                        formAddError(input);
                        error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parrentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parrentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //функция проверки email
    function emailTest(input) {
        return regExpEmail.test(input.value);
    }

    //функция проверки tel
    function telTest(input) {
        return regExpTel.test(input.value);
    }

    // Работа с картинкой
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    })

    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert ('Разрешены только изображения!');
            formImage.value = '';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert ('Файл должен быть менее 2 Мб!');
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        }
        reader.onerror = function (e) {
            alert ('Ошибка!');
        }
        reader.readAsDataURL(file);
    }
});
