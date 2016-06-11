<?php
session_start();

try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

$query = $connection->prepare('SELECT `id`, `parent_id`, `name` FROM `categories` WHERE parent_id = :parent_id');

$query->bindValue(':parent_id', $_REQUEST['id']);
$query->execute();
$menu = $query->fetchAll();



if(empty($menu)) {
    $_SESSION["isPageChanged"] = true;
    $_SESSION["page"] = filter_var($_REQUEST['id'], FILTER_SANITIZE_STRING);  
    $menu = 'NO_CHILD';
} else {
    $menu = json_encode($menu, JSON_UNESCAPED_UNICODE);
}
    echo $menu;
    //header('Location: /menu.html');
?>