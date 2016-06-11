<?php
try {
	$connection = new PDO('mysql:host=127.0.0.1;port=3306;dbname=c9;charset=UTF8', 'killercrush', '');
	$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

$categories = json_encode($connection->query("SELECT `id`, IFNULL(parent_id, '\#') AS parent, `name` AS text FROM `categories` 
	ORDER BY CAST(REPLACE( parent_id, '.', '') AS UNSIGNED), CAST(REPLACE( id, '.', '') AS UNSIGNED)")->fetchAll(), 
                    JSON_UNESCAPED_UNICODE);

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Административная панель</title>
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" href="css/normalize.css" />
	<link rel="stylesheet" href="css/jstree-theme/style.min.css" />
	<link rel="stylesheet" href="css/sweetalert.css">
	<link rel="stylesheet" href="css/admin-panel.css" />
</head>
<body>
	<div class="container">
		<div class="header-container">
			<img src="/images/logo.png" alt="Музей ОНК" class="header-container__logo">
			<div class="title">
				<h1 class="title__main">Административная панель</h1>
				<h2 class="title__sub" id="subtitle"></h2>
			</div>
		</div>
		<div class="editor-container">
			<div class="category-tree">
				<div id="categ_tree"></div>
			</div>
			<div class="editor">
				<input type="textarea" name="editor"/>
				<div class="btn-group">
					<button class="btn-group__button btn-group__button--red" id="del_categ">Удалить</button>
					<button class="btn-group__button btn-group__button--blue" id="add_categ">Добавить подкатегорию</button>
					<!--<button id="edit_categ">Изменить</button>-->
					<button class="btn-group__button btn-group__button--green" id="save-content">Сохранить</button>
				</div>
			</div>			
		</div>
	</div>

<script src="js/jquery.min.js"></script>
<script src="js/jstree.min.js"></script>
<script src="ckeditor/ckeditor.js"></script>
<script src="js/sweetalert.min.js"></script>
<script >
	$('#categ_tree').jstree({ 'core' : {
		"themes": {
            // "name": "default-dark",
            "dots": false,
            "icons": false
        },
	    'data' :  
	    <?php echo $categories ?>	
		, 'check_callback' : true }
	});
	

	
	var editor = CKEDITOR.replace('editor', {
		filebrowserBrowseUrl : '/file-upload/browse.php',
        filebrowserUploadUrl : '/file-upload/upload.php',
        on: {
	        instanceReady: function( evt ) {
	            // $('#categ_tree').on('ready.jstree', function(e, data) {
						$("#categ_tree").jstree("select_node", "1");
					// }).jstree();
	        }
	    }
	});
	var filter = new CKEDITOR.filter( editor );
	filter.addElementCallback( function( el ) {
	     return CKEDITOR.FILTER_SKIP_TREE;
	} );
	var btn_save_content = $('#save-content');
	btn_save_content.click(function() {
		
		$.ajax({
		  url: "save-categ-content.php",
		  type: 'POST',
		  data: {id: $('#categ_tree').jstree('get_selected')[0],
		  		data: editor.getData()},
		  success: function(data) {
		  	if (data == 'OK') {
		  		swal({ title: "Сохранено", type: "info" });
		    	//alert("Сохранено");
		  	} else {
		  		swal({ title: "Ошибка при сохранении", type: "error" });
		  		// alert("Ошибка при сохранении");
		  	}
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		  	swal({ title: "Ошибка при сохранении", type: "error" });
		  	// alert("Ошибка при сохранении");
		  	console.error(jqXHR, textStatus, errorThrown);
		  }
		});
	});
	
	var subtitle = $('#subtitle');
	$('#categ_tree').on('select_node.jstree', function(e, data) {
		subtitle.text(data.node.text);
		$('.selected-path').removeClass('selected-path');
		$('.selected-path-icon').removeClass('selected-path-icon');
		var parents = $('.jstree-anchor.jstree-clicked').parents( "li" );
		parents.children('.jstree-anchor').addClass('selected-path');
		parents.children('.jstree-icon').addClass('selected-path-icon');
		
		editor.updateElement();
        editor.setData('');
        editor.setReadOnly(true);
		if (data.node.children.length == 0) {
			editor.setReadOnly(false);
			$.ajax({
			  url: "get-categ-content.php",
			  type: 'GET',
			  data: 'id=' + data.node.id,
			  success: function(content) {
			  	editor.setData(content);
			  	
			  },
			  error: function(jqXHR, textStatus, errorThrown) {
			  	swal({ title: "Ошибка при получении содержимого категории", type: "error" });
			  	// alert("Ошибка при получении содержимого категории");
			  	console.error(jqXHR, textStatus, errorThrown);
			  }
			});
		}
	}).jstree();
	var btn_add_categ  = $('#add_categ');
	//var btn_edit_categ  = $('#edit_categ');
	var btn_del_categ  = $('#del_categ');
	
	//, 'plugins' : [ 'contextmenu' ], 'contextmenu': {items: customMenu}
	// function customMenu(node) {
	//     var items = {
	//         addItem: {
	//             label: "Добавить",
	//             action: function () {
	//             	console.log(node);
	//             	var id = node.id + '.' + (node.children.length + 1);
	//             	var name = prompt('Введите название категории', '');
	//             	if (name == '' || name == null) {
	//             		if (name == '') alert('Нужно ввести название');
	//             		return;
	//             	}
	//             	$.ajax({
	//             		url: "add-edit-del-categ.php",
	//             		type: 'POST',
	//             		data: {
	//             			action: 'add',
	//             			id: id,
	//             			name: name
	//             		},
	//             		success: function(data) {
	//             			if (data == 'OK') {
	//             				alert("Сохранено");
	//             				$('#categ_tree').jstree('create_node', node, {
	//             					'state': 'opened',
	//             					'text': name,
	//             					"id": id
	//             				}, 'inside', false, false);
	//             			}
	//             			else {
	//             				alert("Ошибка при сохранении");
	//             			}
	//             		},
	//             		error: function(jqXHR, textStatus, errorThrown) {
	//             			alert("Ошибка при сохранении");
	//             			console.log(jqXHR, textStatus, errorThrown);
	//             		}
	//             	});
	//             	}
	//             	},
	//             	renameItem: { // The "delete" menu item
	//             			label: "Переименовать",
	//             			action: function() {
	//             				alert('del')
	//             			}
	//             		},
	//             		deleteItem: { // The "delete" menu item
	//             			label: "Удалить",
	//             			action: function() {
	//             				alert('del')
	//             			}
	//             		}
	//             	};

	//             	if ($(node).hasClass("folder")) {
	//         // Delete the "delete" menu item
	//         delete items.deleteItem;
	//     }
	
	//     return items;
	// }

	btn_add_categ.click(function() {
		var parent_id = $('#categ_tree').jstree('get_selected')[0];
	    if (parent_id == undefined) {
	    	swal({ title: "Выберите категорию", type: "warning" });
	    	// alert('Выберите категорию');
	    	return;
	    }
	    var parent_node = $('#categ_tree').jstree('get_node', parent_id);
	    // id = parent_node.id + '.' + (parent_node.children.length + 1);
	    
	    var new_id;
	    var n = 0;
	    var is_id_free = false;
	    while (!is_id_free) {
	    	n++;
	    	new_id = parent_node.id + '.' + n;
	    	is_id_free = true;
	    	for(var i = 0; i < parent_node.children.length; i++) {
	    		if (new_id == parent_node.children[i]) {
	    			is_id_free = false;
	    		}
			}
	    } 
		// console.log(new_id);
	
	    // var name = prompt('Введите название категории', '');
	    
	    swal({
	    	title: "Введите название категории",
	    	type: "input",
	    	showCancelButton: true,
	    	closeOnConfirm: false,
	    	animation: "slide-from-top",
	    	cancelButtonText: "Отмена",
	    	inputPlaceholder: "Название"
	    }, function(inputValue) {
	    	if (inputValue === false) return false;
	    	if (inputValue == '' || inputValue == null) {
	    		if (inputValue == '') swal({
	    			title: "Нужно ввести название",
	    			type: "warning"
	    		}); //alert('Нужно ввести название');
	    		return;
	    	}
	    	$.ajax({
	    		url: "add-edit-del-categ.php",
	    		type: 'POST',
	    		data: {
	    			action: 'add',
	    			id: new_id,
	    			name: inputValue,
	    			parent_id: parent_node.id
	    		},
	    		success: function(result) {
	    			if (result == 'OK') {
	    				swal({
	    					title: "Сохранено",
	    					type: "success"
	    				});
	    				// alert("Сохранено");

	    				$('#categ_tree').jstree('create_node', parent_node, {
	    					'text': inputValue,
	    					"id": new_id
	    				}, 'last', false, false);
	    				$('#categ_tree').jstree('open_node', parent_node);
	    				$('#categ_tree').jstree('deselect_all');
	    				$('#categ_tree').jstree('select_node', new_id);
	    			}
	    			else {
	    				swal({
	    					title: "Ошибка при сохранении",
	    					type: "error"
	    				});
	    				// alert("Ошибка при сохранении");
	    				console.error(result);
	    			}
	    		},
	    		error: function(jqXHR, textStatus, errorThrown) {
	    			swal({
	    				title: "Ошибка при сохранении",
	    				type: "error"
	    			});
	    			// alert("Ошибка при сохранении");
	    			console.error(jqXHR, textStatus, errorThrown);
	    		}
	    	});
	    });
	    
	});
	btn_del_categ.click(function() {
		var id = $('#categ_tree').jstree('get_selected')[0];
		if (id == undefined) {
			swal({
				title: "Выберите категорию",
				type: "warning"
			});
			// alert('Выберите категорию');
			return;
		}
		// if (!confirm('Вы действительно хотите удалить выделенную категорию?')) return;

		swal({
			title: "Вы действительно хотите удалить выделенную категорию?",
			text: "Это действие нельзя отменить",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Да",
			cancelButtonText: "Отмена"
				// closeOnConfirm: false
		}, function() {
			var node = $('#categ_tree').jstree('get_node', id);

			$.ajax({
				url: "add-edit-del-categ.php",
				type: 'POST',
				data: {
					action: 'del',
					id: id
				},
				success: function(result) {
					if (result == 'OK') {
						swal({
							title: "Удалено",
							type: "success"
						});
						// alert("Удалено");
						// console.log(node);
						$('#categ_tree').jstree('delete_node', node);
						$('#categ_tree').jstree('open_node', node.parent);
						$('#categ_tree').jstree('deselect_all');
						$('#categ_tree').jstree('select_node', node.parent);
					}
					else {
						swal({
							title: "Ошибка при удалении",
							type: "error"
						});
						// alert("Ошибка при удалении");
						console.error(result);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					swal({
						title: "Ошибка при удалении",
						type: "error"
					});
					// alert("Ошибка при удалении");
					console.error(jqXHR, textStatus, errorThrown);
				}
			});
		});

	});

</script>
</body>
</html>