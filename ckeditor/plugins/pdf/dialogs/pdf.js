CKEDITOR.dialog.add( 'pdfDialog', function( editor ) {
    return {
        title: 'Добавление PDF',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-select',
                label: 'Выберите файл',
                elements: [
                    // {
                    //     type: 'text',
                    //     id: 'filename',
                    //     label: 'Имя файла',
                    //     validate: CKEDITOR.dialog.validate.notEmpty( "Выберите файл" )
                    // },
                    {
                        type: 'file',
                        id: 'upload',
                        // label: 'Select file from your computer',
                        size: 38
                    },
                    // {
                    //     type: 'fileButton',
                    //     id: 'fileId',
                    //     label: 'Upload file',
                    //     'for': [ 'tab1', 'upload' ],
                    //     filebrowser: {
                    //         onSelect: function( fileUrl, data ) {
                    //             alert( 'Successfully uploaded: ' + fileUrl );
                    //         }
                    //     }
                    // },
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
            }//,
            // {
            //     id: 'tab-upload',
            //     label: 'Загрузка на сервер',
            //     elements: [
            //         {
            //             type: 'text',
            //             id: 'id',
            //             label: 'Id'
            //         }
            //     ]
            // }
        ],
        onOk: function() {
            var dialog = this;
            var iframe = $('#' + dialog.getContentElement( 'tab-select', 'upload' ).domId + ' iframe');
            var file = $('input[type=file]', iframe.contents())[0].files[0];
            var formData = new FormData();
            formData.append('upload', file);
            formData.append('type', 'pdf');
            
            $.ajax({
                url: '/file-upload/upload.php',
                data: formData,
                // THIS MUST BE DONE FOR FILE UPLOADING
                contentType: false,
                processData: false,
                type: "POST",
                async: false,
                success: function(data) {
                console.log(data);
    		  	if (data != 'FAIL') {
    		    	var pdf = editor.document.createElement( 'iframe' );
                    pdf.setAttribute( 'src', data );
                    pdf.setAttribute( 'width', dialog.getValueOf( 'tab-select', 'width' ) );
                    pdf.setAttribute( 'height', dialog.getValueOf( 'tab-select', 'height' ) );
                    //pdf.setText( dialog.getValueOf( 'tab-basic', 'pdf' ) );
        
                    // var id = dialog.getValueOf( 'tab-adv', 'id' );
                    // if ( id )
                    //     pdf.setAttribute( 'id', id );
                    editor.insertElement( pdf );
    		  	} else {
    		  		alert("Ошибка при сохранении");
    		  	}
    		  },
    		  error: function(jqXHR, textStatus, errorThrown) {
    		  	alert("Ошибка при сохранении");
    		  	console.error(jqXHR, textStatus, errorThrown);
    		  }
            });
        }
    };
});