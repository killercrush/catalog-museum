{"filter":false,"title":"browse.php","tooltip":"/file-upload/browse.php","ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":21,"column":102},"end":{"row":21,"column":102},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":26,"state":"start","mode":"ace/mode/php"}},"hash":"83c83035a195a755a5b4c7b5c5f995d72f28638f","undoManager":{"mark":49,"position":49,"stack":[[{"start":{"row":0,"column":0},"end":{"row":141,"column":9},"action":"insert","lines":["<?php  ","header(\"Content-Type: text/html; charset=utf-8\\n\");  ","header(\"Cache-Control: no-cache, must-revalidate\\n\");  ","header(\"Expires: Sat, 26 Jul 1997 05:00:00 GMT\");  ","","// e-z params  ","$dim = 150;         /* image displays proportionally within this square dimension ) */  ","$cols = 4;          /* thumbnails per row */","$thumIndicator = '_th'; /* e.g., *image123_th.jpg*) -> if not using thumbNails then use empty string */  ","?>  ","<!DOCTYPE html>  ","<html>  ","<head>  ","    <title>browse file</title>  ","    <meta charset=\"utf-8\">  ","","    <style>  ","        html,  ","        body {padding:0; margin:0; background:black; }  ","        table {width:100%; border-spacing:15px; }  ","        td {text-align:center; padding:5px; background:#181818; }  ","        img {border:5px solid #303030; padding:0; verticle-align: middle;}  ","        img:hover { border-color:blue; cursor:pointer; }  ","    </style>  ","","</head>  ","","","<body>  ","","<table>  ","","<?php  ","","$dir = $_GET['dir'];    ","","$dir = rtrim($dir, '/'); // the script will add the ending slash when appropriate  ","","$files = scandir($dir);  ","","$images = array();  ","","foreach($files as $file){  ","    // filter for thumbNail image files (use an empty string for $thumIndicator if not using thumbnails )","    if( !preg_match('/'. $thumIndicator .'\\.(jpg|jpeg|png|gif)$/i', $file) )  ","        continue;  ","","    $thumbSrc = $dir . '/' . $file;  ","    $fileBaseName = str_replace('_th.','.',$file);  ","","    $image_info = getimagesize($thumbSrc);  ","    $_w = $image_info[0];  ","    $_h = $image_info[1]; ","","    if( $_w > $_h ) {       // $a is the longer side and $b is the shorter side","        $a = $_w;  ","        $b = $_h;  ","    } else {  ","        $a = $_h;  ","        $b = $_w;  ","    }     ","","    $pct = $b / $a;     // the shorter sides relationship to the longer side","","    if( $a > $dim )   ","        $a = $dim;      // limit the longer side to the dimension specified","","    $b = (int)($a * $pct);  // calculate the shorter side","","    $width =    $_w > $_h ? $a : $b;  ","    $height =   $_w > $_h ? $b : $a;  ","","    // produce an image tag","    $str = sprintf('<img src=\"%s\" width=\"%d\" height=\"%d\" title=\"%s\" alt=\"\">',   ","        $thumbSrc,  ","        $width,  ","        $height,  ","        $fileBaseName  ","    );  ","","    // save image tags in an array","    $images[] = str_replace(\"'\", \"\\\\'\", $str); // an unescaped apostrophe would break js  ","","}","","$numRows = floor( count($images) / $cols );  ","","if( count($images) % $cols != 0 )  ","    $numRows++;  ","","","// produce the correct number of table rows with empty cells","for($i=0; $i<$numRows; $i++)   ","    echo \"\\t<tr>\" . implode('', array_fill(0, $cols, '<td></td>')) . \"</tr>\\n\\n\";  ","","?>  ","</table>  ","","","<script>  ","","// make a js array from the php array","images = [  ","<?php   ","","foreach( $images as $v)  ","    echo sprintf(\"\\t'%s',\\n\", $v);  ","","?>];  ","","tbl = document.getElementsByTagName('table')[0];  ","","td = tbl.getElementsByTagName('td');  ","","// fill the empty table cells with the img tags","for(var i=0; i < images.length; i++)  ","    td[i].innerHTML = images[i];  ","","","// event handler to place clicked image into CKeditor","tbl.onclick =   ","","    function(e) {  ","","        var tgt = e.target || event.srcElement,  ","            url;  ","","        if( tgt.nodeName != 'IMG' )  ","            return;  ","","        url = '<?php echo $dir;?>' + '/' + tgt.title;  ","","        this.onclick = null;  ","","        // $_GET['CKEditorFuncNum'] was supplied by CKeditor","        window.opener.CKEDITOR.tools.callFunction(<?php echo $_GET['CKEditorFuncNum']; ?>, url);  ","","        window.close();  ","    }  ","</script>  ","</body>  ","</html>  "],"id":1}],[{"start":{"row":34,"column":7},"end":{"row":34,"column":8},"action":"insert","lines":["/"],"id":2}],[{"start":{"row":34,"column":8},"end":{"row":34,"column":9},"action":"insert","lines":["/"],"id":3}],[{"start":{"row":34,"column":7},"end":{"row":34,"column":28},"action":"insert","lines":["\"../images/uploaded/\""],"id":4}],[{"start":{"row":34,"column":28},"end":{"row":34,"column":29},"action":"insert","lines":[";"],"id":5}],[{"start":{"row":8,"column":20},"end":{"row":8,"column":21},"action":"remove","lines":["h"],"id":6}],[{"start":{"row":8,"column":19},"end":{"row":8,"column":20},"action":"remove","lines":["t"],"id":7}],[{"start":{"row":8,"column":18},"end":{"row":8,"column":19},"action":"remove","lines":["_"],"id":8}],[{"start":{"row":6,"column":7},"end":{"row":6,"column":9},"action":"remove","lines":["15"],"id":9},{"start":{"row":6,"column":7},"end":{"row":6,"column":8},"action":"insert","lines":["4"]}],[{"start":{"row":6,"column":8},"end":{"row":6,"column":9},"action":"insert","lines":["0"],"id":10}],[{"start":{"row":34,"column":18},"end":{"row":34,"column":26},"action":"remove","lines":["uploaded"],"id":11}],[{"start":{"row":34,"column":11},"end":{"row":34,"column":19},"action":"insert","lines":["uploaded"],"id":12}],[{"start":{"row":34,"column":19},"end":{"row":34,"column":20},"action":"insert","lines":["/"],"id":13}],[{"start":{"row":34,"column":26},"end":{"row":34,"column":27},"action":"remove","lines":["/"],"id":14}],[{"start":{"row":7,"column":8},"end":{"row":7,"column":9},"action":"remove","lines":["4"],"id":15},{"start":{"row":7,"column":8},"end":{"row":7,"column":9},"action":"insert","lines":["3"]}],[{"start":{"row":73,"column":34},"end":{"row":73,"column":57},"action":"remove","lines":["width=\"%d\" height=\"%d\" "],"id":16}],[{"start":{"row":73,"column":57},"end":{"row":73,"column":58},"action":"insert","lines":["/"],"id":17}],[{"start":{"row":73,"column":58},"end":{"row":73,"column":59},"action":"insert","lines":["/"],"id":18}],[{"start":{"row":73,"column":59},"end":{"row":73,"column":82},"action":"insert","lines":["width=\"%d\" height=\"%d\" "],"id":19}],[{"start":{"row":75,"column":8},"end":{"row":75,"column":11},"action":"insert","lines":["// "],"id":20},{"start":{"row":76,"column":8},"end":{"row":76,"column":11},"action":"insert","lines":["// "]}],[{"start":{"row":21,"column":73},"end":{"row":21,"column":74},"action":"insert","lines":[" "],"id":21}],[{"start":{"row":21,"column":74},"end":{"row":21,"column":75},"action":"insert","lines":["w"],"id":22}],[{"start":{"row":21,"column":75},"end":{"row":21,"column":76},"action":"insert","lines":["i"],"id":23}],[{"start":{"row":21,"column":76},"end":{"row":21,"column":77},"action":"insert","lines":["d"],"id":24}],[{"start":{"row":21,"column":74},"end":{"row":21,"column":77},"action":"remove","lines":["wid"],"id":25},{"start":{"row":21,"column":74},"end":{"row":21,"column":79},"action":"insert","lines":["width"]}],[{"start":{"row":21,"column":79},"end":{"row":21,"column":81},"action":"insert","lines":[":;"],"id":26}],[{"start":{"row":21,"column":80},"end":{"row":21,"column":81},"action":"insert","lines":[" "],"id":27}],[{"start":{"row":21,"column":81},"end":{"row":21,"column":82},"action":"insert","lines":["3"],"id":28}],[{"start":{"row":21,"column":82},"end":{"row":21,"column":83},"action":"insert","lines":["3"],"id":29}],[{"start":{"row":21,"column":83},"end":{"row":21,"column":84},"action":"insert","lines":["%"],"id":30}],[{"start":{"row":21,"column":83},"end":{"row":21,"column":84},"action":"remove","lines":["%"],"id":31}],[{"start":{"row":21,"column":82},"end":{"row":21,"column":83},"action":"remove","lines":["3"],"id":32}],[{"start":{"row":21,"column":81},"end":{"row":21,"column":82},"action":"remove","lines":["3"],"id":33}],[{"start":{"row":21,"column":81},"end":{"row":21,"column":82},"action":"insert","lines":["1"],"id":34}],[{"start":{"row":21,"column":82},"end":{"row":21,"column":83},"action":"insert","lines":["0"],"id":35}],[{"start":{"row":21,"column":83},"end":{"row":21,"column":84},"action":"insert","lines":["0"],"id":36}],[{"start":{"row":21,"column":84},"end":{"row":21,"column":85},"action":"insert","lines":["%"],"id":37}],[{"start":{"row":21,"column":86},"end":{"row":21,"column":87},"action":"insert","lines":[" "],"id":38}],[{"start":{"row":21,"column":87},"end":{"row":21,"column":88},"action":"insert","lines":["h"],"id":39}],[{"start":{"row":21,"column":88},"end":{"row":21,"column":89},"action":"insert","lines":["e"],"id":40}],[{"start":{"row":21,"column":89},"end":{"row":21,"column":90},"action":"insert","lines":["i"],"id":41}],[{"start":{"row":21,"column":90},"end":{"row":21,"column":91},"action":"insert","lines":["g"],"id":42}],[{"start":{"row":21,"column":91},"end":{"row":21,"column":92},"action":"insert","lines":["h"],"id":43}],[{"start":{"row":21,"column":92},"end":{"row":21,"column":93},"action":"insert","lines":["t"],"id":44}],[{"start":{"row":21,"column":93},"end":{"row":21,"column":95},"action":"insert","lines":[":;"],"id":45}],[{"start":{"row":21,"column":94},"end":{"row":21,"column":95},"action":"insert","lines":[" "],"id":46}],[{"start":{"row":21,"column":95},"end":{"row":21,"column":96},"action":"insert","lines":["a"],"id":47}],[{"start":{"row":21,"column":96},"end":{"row":21,"column":97},"action":"insert","lines":["u"],"id":48}],[{"start":{"row":21,"column":97},"end":{"row":21,"column":98},"action":"insert","lines":["t"],"id":49}],[{"start":{"row":21,"column":98},"end":{"row":21,"column":99},"action":"insert","lines":["o"],"id":50}]]},"timestamp":1462632619000}