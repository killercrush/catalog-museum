<?php
if( isset($_REQUEST['type']) && isset($_FILES['upload']) ) {
    $tmp_file = $_FILES['upload']['tmp_name']; 
    $full_name = "../uploaded/" . $_REQUEST['type'] . '/' . date('Ymd_His_') . $_FILES['upload']['name'];
    if (move_uploaded_file($tmp_file, $full_name)) {
        exit(substr($full_name, 2));
    } else {
        exit('FAIL' . $full_name);
    }
}

if(isset($_FILES['upload'])){
    $file = $_FILES['upload']['tmp_name']; 
    $con_images = "../uploaded/images/" .  date('Ymd_His_') . $_FILES['upload']['name'];
    move_uploaded_file($file, $con_images );
    $url = "//catalog-museum-killercrush.c9users.io/" . $con_images;

   $funcNum = $_GET['CKEditorFuncNum'] ;
   // Optional: instance name (might be used to load a specific configuration file or anything else).
   $CKEditor = $_GET['CKEditor'] ;
   // Optional: might be used to provide localized messages.
   $langCode = $_GET['langCode'] ;
    
   // Usually you will only assign something here if the file could not be uploaded.
   $message = '';
   echo 'Загружено';
}
?>