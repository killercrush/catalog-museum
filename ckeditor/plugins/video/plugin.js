CKEDITOR.plugins.add( 'video', {
    icons: 'video',
    init: function( editor ) {
        editor.addCommand( 'video', new CKEDITOR.dialogCommand( 'videoDialog' ) );
        editor.ui.addButton( 'video', {
            label: 'Insert video',
            command: 'video',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'videoDialog', this.path + 'dialogs/video.js' );
    }
});