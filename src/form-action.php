<?php
header("Content-Type: text/html; charset=utf-8");

$name = empty($_POST['name']) ? '' : $_POST['name'];
$phone = empty($_POST['tel']) ? '' : $_POST['tel'];
$comment = empty($_POST['question']) ? '' : $_POST['question'];

if (!empty($_POST['question']) && !empty($_POST['name'])) {
	$fileContent = "WhatsApp number = ". $phone . ", name = " . $name . ", question = " . $comment;
} else if (!empty($_POST['name'])) {
	$fileContent = "WhatsApp number = ". $phone . ", name = " . $name;
} else {
	$fileContent = "WhatsApp number = ".$phone;
}

mail("kayakingfuerteventura@gmail.com, kl@hl2b.ru", "Message from Paragliding", $fileContent, "From: kayakingfuerteventura@gmail.com");

?>