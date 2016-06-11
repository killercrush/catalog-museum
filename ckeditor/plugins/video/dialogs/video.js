CKEDITOR.dialog.add( 'videoDialog', function( editor ) {
    return {
        title: 'Добавление видео',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-select',
                label: 'Выберите файл',
                elements: [
                    {
                        type: 'file',
                        id: 'upload',
                        // label: 'Select file from your computer',
                        size: 38
                    },
                    {
                        type: 'text',
                        id: 'width',
                        label: 'Ширина',
                        validate: CKEDITOR.dialog.validate.integer( "Введите число" )
                    },
                    {
                        type: 'text',
                        id: 'height',
                        label: 'Высота',
                        validate: CKEDITOR.dialog.validate.integer( "Введите число" )
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;
            var iframe = $('#' + dialog.getContentElement( 'tab-select', 'upload' ).domId + ' iframe');
            var file = $('input[type=file]', iframe.contents())[0].files[0];
            var formData = new FormData();
            formData.append('upload', file);
            formData.append('type', 'video');
            
            $.ajax({
                url: '/file-upload/upload.php',
                data: formData,
                // THIS MUST BE DONE FOR FILE UPLOADING
                contentType: false,
                processData: false,
                type: "POST",
                async: false,
                success: function(data) {
    		  	if (data != 'FAIL') {
    		  	    
    		  	    var div = editor.document.createElement( 'div' );
    		    	var video = editor.document.createElement( 'video' );

                    video.setAttribute( 'width', dialog.getValueOf( 'tab-select', 'width' ) );
                    video.setAttribute( 'height', dialog.getValueOf( 'tab-select', 'height' ) );
                    //video.setText( dialog.getValueOf( 'tab-basic', 'video' ) );
        
                    // var id = dialog.getValueOf( 'tab-adv', 'id' );
                    // if ( id )
                    //     video.setAttribute( 'id', id );
                    video.appendTo(div);
                    editor.insertElement( div );
                    
                    video.setAttribute( 'loop', '' );
                    video.setAttribute( 'controls', '' );
                     video.setAttribute( 'src', data );
    		  	} else {
    		  		alert("Ошибка при сохранении");
    		  	}
    		  },
    		  error: function(jqXHR, textStatus, errorThrown) {
    		  	alert("Ошибка при сохранении");
    		  	console.log(jqXHR, textStatus, errorThrown);
    		  }
            });
        }
    };
});