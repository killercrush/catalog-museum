<?php
header("Content-Type: text/event-stream\n\n");
header('Cache-Control: no-cache');
try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}
$query = $connection->prepare('SELECT `id`, `parent_id`, `name` FROM `categories` WHERE id = :id');

while (true) {
  session_start();
  if($_SESSION["isPageChanged"]) {
    $query->bindValue(':id', $_SESSION["page"]);

    if (!$query->execute()) {
      echo 'data: неверный запрос' . "\n\n";
    } else {
      $page = $query->fetchAll()[0];
      echo 'data: <pre>' . $_SESSION["page"] . $page['name'] . "</pre>\n\n";
      $_SESSION["isPageChanged"] = false;
    }
  }
  session_write_close();

  ob_end_flush();
  flush();
  usleep(100000);
}

?>