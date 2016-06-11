<?php

try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$query = $connection->prepare('SELECT `content` FROM `categories` WHERE id=:id');
	$query->bindValue(':id', $_REQUEST['id']);
	
	if ($query->execute()) {
		$content = $query->fetchAll();
		if(!empty($content)) {
			echo '<div>' . $content[0]['content']. '</div>';
			exit();
		}
	}
} catch (PDOException $e) {
	echo 'FAIL';
	//print "Error!: " . $e->getMessage() . "<br/>";
	die();
}


?>