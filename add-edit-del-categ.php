<?php
try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

$action = $_REQUEST['action'];
if (strval($_REQUEST['id']) == '') exit('FAIL');

 	
switch ($action) {
	case 'add':
		$query = $connection->prepare('INSERT INTO `categories` (id, parent_id, name) VALUES (:id, :parent_id, :name)');
		$query->bindValue(':id', $_REQUEST['id']);
		$query->bindValue(':parent_id', $_REQUEST['parent_id']);
		$query->bindValue(':name', $_REQUEST['name']);
		break;
	case 'edit':
		$query = $connection->prepare('UPDATE `categories` SET name = :name WHERE id=:id');
		$query->bindValue(':id', $_REQUEST['id']);
		$query->bindValue(':name', $_REQUEST['name']);
		break;
	case 'del':
		$query = $connection->prepare('DELETE FROM `categories` WHERE id=:id');
		$query->bindValue(':id', $_REQUEST['id']);
		break;		
	default:
		//echo 'FAIL';
		exit('FAIL');
		break;
}

	if ($query->execute()) {
	    echo 'OK';
	} else {
	    echo 'FAIL';
	}
	


?>