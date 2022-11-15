<?php
    /* ---Подключение файлов--- */
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exeption;
    use PHPMailer\PHPMailer\SMTP;

    require 'phpmailer\src\Exeption.php;'
    require 'phpmailer\src\PHPMailer.php';
    require 'phpmailer\src\SMTP.php';

    /* ---Настройка мэйлера и отправка тестового сообщения--- */
    $mail = new PHPMailer(true);
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->CharSet = 'UTF-8';
        $mail->setLanguage('ru', 'phpmailer/language/');
        $mail->IsHTML(true);

        $mail->Host = 'smtp.gmail.com';
        $mail->Username = 'A.Seliazniova30032012';
        $mail->Password = 'igncyzbvdsnijhjp';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('a.seliazniova30032012@gmail.com', 'Алеся Селезнева');
        $mail->addAdress('alesyagirl@mail.ru');
        $mail->Subject = $title;
        $mail->Body = $body;

        $mail->setFrom('a.seliazniova30032012@gmail.com', 'Алеся Селезнева');
        $mail->addAdress('alesyagirl@mail.ru');
        $mail->Subject = 'Привет! Это Алеся Селезнева';

        $title = 'Тема письма';
        /* Формирование письма в виде таблицы
        $c = true;
        $title = 'Заголовок письма';
        foreach($_POST as $key => $value) {
            if ($value != '' && $key != 'project_name' && $key != 'admin_email' && $key != 'form_subject') {
                $body.= "
                " .(($c != $c) ? '<tr>':'<tr style="background-color:#fff">') . "
                    <td style='padding: 10px; border: #ccc 1px solid;'><b>$key</b></td>
                    <td style='padding: 10px; border: #ccc 1px solid:'>$value</td>
                </tr>
                ";
            }
        }
        $body = "<table style='width: 100%;'>$body</table>;
        */

        $body = '<h1>Вот Вам письмо!</h1>';

    /* ---Проверка на наличие информации в полях ввода и извлечение данных--- */
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['gender']))){
        $body.='<p><strong>Пол:</strong> '.$_POST['gender'].'</p>';
    }

    if(trim(!empty($_POST['age']))){
        $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    }

    if(trim(!empty($_POST['tel']))){
        $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
    }

    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    if(!empty($FILES['image']['tmp_name'])){
        $filePath = __DIR__."/files/" . $_FILES['image']['tmp_name'];

        if (copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail=>addAttachment($fileAttach);
        }
    }
    $mail->Body = $body;

    /* ---Отправка сообщения на мэйлер--- */
    $mail->send();

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($reaponse);

    } catch (Exeption $e) {
        $status = 'Сообщение не отправлено. Причина ошибки: {$mail->ErrorInfo}';
    }
?>
