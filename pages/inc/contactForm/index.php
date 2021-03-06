<?php
require_once './vendor/autoload.php';

$helperLoader = new SplClassLoader('Helpers', './vendor');
$mailLoader   = new SplClassLoader('SimpleMail', './vendor');

$helperLoader->register();
$mailLoader->register();

use Helpers\Config;
use SimpleMail\SimpleMail;

$config = new Config;
$config->load('./config/config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name    = stripslashes(trim($_POST['form-name']));
  $email   = stripslashes(trim($_POST['form-email']));
  $subject = stripslashes(trim($_POST['form-subject']));
  $message = stripslashes(trim($_POST['form-message']));
  $pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

  if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $subject)) {
    die("Header injection detected");
  }

  $emailIsValid = filter_var($email, FILTER_VALIDATE_EMAIL);

  if ($name && $email && $emailIsValid && $subject && $message) {
    $mail = new SimpleMail();

    $mail->setTo($config->get('emails.to'));
    $mail->setFrom($config->get('emails.from'));
    $mail->setSender($name);
    $mail->setSenderEmail($email);
    $mail->setSubject($config->get('subject.prefix') . ' ' . $subject);

    $body = "
    <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
    <html>
    <head>
    <meta charset=\"utf-8\">
    </head>
    <body>
    <h1>{$subject}</h1>
    <p><strong>{$config->get('fields.name')}:</strong> {$name}</p>
    <p><strong>{$config->get('fields.email')}:</strong> {$email}</p>
    <p><strong>{$config->get('fields.message')}:</strong> {$message}</p>
    </body>
    </html>";

    $mail->setHtml($body);
    $mail->send();

    $emailSent = true;
  } else {
    $hasError = true;
  }
}
?>
<link rel="stylesheet" href="/resources/css/bootstrap.min.css" type="text/css" media="all">
<link rel="stylesheet" href="/resources/css/mb-components.css" type="text/css" media="all">
<style type="text/css">
body {
  background-color:transparent !important;
  font-family: "Open Sans", sans-serif;;
  font-size: 16px;
}
.jumbotron {
  background-color:transparent !important;
  padding:20px;
}
iframe#contact {
  background-color:transparent !important;
}
.contact-info {
  text-align:center;
  visibility: visible;
  padding:20px;
}

</style>
<div class="jumbotron">

  <?php if(!empty($emailSent)): ?>
    <div class="col-md-7 col-md-offset-3">
      <div class="alert alert-success text-center"><?php echo $config->get('messages.success'); ?></div>
    </div>
  <?php else: ?>
    <?php if(!empty($hasError)): ?>
      <div class="col-md-6 col-md-offset-4">
        <div class="alert alert-danger text-center"><?php echo $config->get('messages.error'); ?></div>
      </div>
    <?php endif; ?>

    <form action="<?php echo $_SERVER['REQUEST_URI']; ?>" enctype="application/x-www-form-urlencoded" id="contact-form" class="form-vertical" method="post">
      <div class="col-xs-6">
        <div class="form-group">
          <label for="form-name" class="col-md-1 control-label left"><?php echo $config->get('fields.name'); ?></label>
          <input type="text" class="form-control" id="form-name" name="form-name" placeholder="<?php echo $config->get('fields.name'); ?>" required>
        </div>
        <div class="form-group">
          <label for="form-subject" class="col-md-2 control-label left"><?php echo $config->get('fields.subject'); ?></label>
          <input type="text" class="form-control" id="form-subject" name="form-subject" placeholder="<?php echo $config->get('fields.subject'); ?>" required>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="form-group">
          <label for="form-email" class="col-md-1 control-label left"><?php echo $config->get('fields.email'); ?></label>
          <input type="email" class="form-control" id="form-email" name="form-email" placeholder="<?php echo $config->get('fields.email'); ?>" required>
        </div>
        <div class="form-group">
          <label for="form-human" class="col-md-1 control-label left">Human?</label><br/>
          <input type="checkbox" class="form-control" id="form-human" name="form-human" required>
        </div>
      </div>
      <p>&nbsp;</p>
      <div class="form-group">
        <label for="form-message" class="col-md-2 control-label"><?php echo $config->get('fields.message'); ?></label>
        <div class="col-md-10">
          <textarea class="form-control materialize-textarea" rows="3" id="form-message" name="form-message" placeholder="<?php echo $config->get('fields.message'); ?>" required></textarea>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-10">
          <button type="submit" class="btn btn-warning btn-lg"><?php echo $config->get('fields.btn-send'); ?></button>
        </div>
      </div>
    </form>
  <?php endif; ?>
  <script type="text/javascript" src="public/js/contact-form.js"></script>
  <script type="text/javascript">
  new ContactForm('#contact-form');
  </script>
</div>
