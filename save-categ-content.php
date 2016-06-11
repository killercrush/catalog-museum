<?php

try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}



$query = $connection->prepare('UPDATE `categories` SET content = :data WHERE id=:id');		

 	$query->bindValue(':id', $_REQUEST['id']);
 	$query->bindValue(':data', $_REQUEST['data']);

	if ($query->execute()) {
	    echo 'OK';
	} else {
	    echo 'FAIL';
	}
	


?>