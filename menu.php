<?php

try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}
// WHERE parent_id IS NULL ORDER BY CAST(id AS UNSIGNED)
$menu = json_encode($connection->query("SELECT `id`, IFNULL(parent_id, '\#') AS parent, `name` FROM `categories` 
	ORDER BY CAST(REPLACE( parent_id, '.', '') AS UNSIGNED), CAST(REPLACE( id, '.', '') AS UNSIGNED)")->fetchAll(), 
                    JSON_UNESCAPED_UNICODE);
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    	<title>Музей ОНК</title>
    	<meta name="viewport" content="width=device-width" />
    	<link rel="stylesheet" href="css/normalize.css" />
    	<link href="onscreen-keyboard/css/keyboard.min.css" rel="stylesheet">
        <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/start/jquery-ui.css" rel="stylesheet">
        <link rel="stylesheet" href="css/sweetalert.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="container">
            <div class="header-container">
    			<img src="/images/logo-large.png" alt="Музей ОНК" class="header-container__logo">
    			<div class="search">
    				<input id="search_input" type="text" name="" class="search__input" placeholder="Поиск"/>
    				<button id="search" class="green-button__button">Искать</button>
    			</div>
		    </div>
            <!--<button style="position: absolute; top: 0; right: 0" id="btn_sec_wnd">Открыть второе окно</button>-->
            <div class="breadcrumbs__wrap">
                <div id="breadcrumbs" class="breadcrumbs"></div>
            </div>
            <ul class="menu-container" id="menu_container"> </ul>
            <div class="green-button__container">
                <button id="db" class="green-button__button green-button__button--large">База данных</button>
            </div>
            <div class="controls-container">
                <a id="prev_page" href="#" class="controls-container__btn"><img class="controls-container__icon" src="/images/controls-left.png"></img>Назад</a>
                <div id="pages_nums" class="controls-container__page-btn-container">
                </div>
                <a id="next_page" href="#" class="controls-container__btn controls-container__btn--right">Вперед<img class="controls-container__icon controls-container__icon--right" src="/images/controls-right.png"></img></a>
            </div>
        </div>
        <div id="slider_container" class="slider__container">
            <div id="slider_up" class="slider__btn"></div>
            <div id="slider" class="slider">
                <div class="slider__thumb"></div>
            </div>
            <div id="slider_down" class="slider__btn slider__btn--down"></div> 
        </div>
        
        <script>
        <?php echo ' var menu_json = \'' . $menu . '\';'; ?>
        </script>
        <script src="js/jquery.min.js"></script>
        <script src="js/sweetalert.min.js"></script>
        <script type="text/javascript" src="js/pdfjs/build/pdf.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
        <script src="onscreen-keyboard/js/jquery.keyboard.js"></script>
        <script src="onscreen-keyboard/js/jquery.keyboard.extension-all.min.js"></script>
        
        <script src="onscreen-keyboard/languages/ru.min.js"></script>
        <script src="onscreen-keyboard/layouts/ms-Russian.min.js"></script>
        
        
        <script src="js/slider.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/search.js"></script>
    </body>
</html>