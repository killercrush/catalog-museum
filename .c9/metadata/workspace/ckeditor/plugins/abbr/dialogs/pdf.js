{"filter":false,"title":"pdf.js","tooltip":"/ckeditor/plugins/abbr/dialogs/pdf.js","undoManager":{"mark":19,"position":19,"stack":[[{"start":{"row":0,"column":0},"end":{"row":50,"column":3},"action":"insert","lines":["CKEDITOR.dialog.add( 'abbrDialog', function( editor ) {","    return {","        title: 'Abbreviation Properties',","        minWidth: 400,","        minHeight: 200,","        contents: [","            {","                id: 'tab-basic',","                label: 'Basic Settings',","                elements: [","                    {","                        type: 'text',","                        id: 'abbr',","                        label: 'Abbreviation',","                        validate: CKEDITOR.dialog.validate.notEmpty( \"Abbreviation field cannot be empty.\" )","                    },","                    {","                        type: 'text',","                        id: 'title',","                        label: 'Explanation',","                        validate: CKEDITOR.dialog.validate.notEmpty( \"Explanation field cannot be empty.\" )","                    }","                ]","            },","            {","                id: 'tab-adv',","                label: 'Advanced Settings',","                elements: [","                    {","                        type: 'text',","                        id: 'id',","                        label: 'Id'","                    }","                ]","            }","        ],","        onOk: function() {","            var dialog = this;","","            var abbr = editor.document.createElement( 'abbr' );","            abbr.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );","            abbr.setText( dialog.getValueOf( 'tab-basic', 'abbr' ) );","","            var id = dialog.getValueOf( 'tab-adv', 'id' );","            if ( id )","                abbr.setAttribute( 'id', id );","","            editor.insertElement( abbr );","        }","    };","});"],"id":1}],[{"start":{"row":12,"column":29},"end":{"row":12,"column":33},"action":"remove","lines":["abbr"],"id":2},{"start":{"row":12,"column":29},"end":{"row":12,"column":32},"action":"insert","lines":["pdf"]}],[{"start":{"row":39,"column":16},"end":{"row":39,"column":20},"action":"remove","lines":["abbr"],"id":3},{"start":{"row":39,"column":16},"end":{"row":39,"column":19},"action":"insert","lines":["pdf"]}],[{"start":{"row":39,"column":54},"end":{"row":39,"column":58},"action":"remove","lines":["abbr"],"id":4},{"start":{"row":39,"column":54},"end":{"row":39,"column":57},"action":"insert","lines":["pdf"]}],[{"start":{"row":39,"column":54},"end":{"row":39,"column":57},"action":"remove","lines":["pdf"],"id":5},{"start":{"row":39,"column":54},"end":{"row":39,"column":55},"action":"insert","lines":["e"]}],[{"start":{"row":39,"column":55},"end":{"row":39,"column":56},"action":"insert","lines":["m"],"id":6}],[{"start":{"row":39,"column":56},"end":{"row":39,"column":57},"action":"insert","lines":["b"],"id":7}],[{"start":{"row":39,"column":57},"end":{"row":39,"column":58},"action":"insert","lines":["e"],"id":8}],[{"start":{"row":39,"column":58},"end":{"row":39,"column":59},"action":"insert","lines":["d"],"id":9}],[{"start":{"row":40,"column":12},"end":{"row":40,"column":16},"action":"remove","lines":["abbr"],"id":10},{"start":{"row":40,"column":12},"end":{"row":40,"column":15},"action":"insert","lines":["pdf"]}],[{"start":{"row":41,"column":12},"end":{"row":41,"column":16},"action":"remove","lines":["abbr"],"id":11},{"start":{"row":41,"column":12},"end":{"row":41,"column":15},"action":"insert","lines":["pdf"]}],[{"start":{"row":41,"column":58},"end":{"row":41,"column":62},"action":"remove","lines":["abbr"],"id":12},{"start":{"row":41,"column":58},"end":{"row":41,"column":61},"action":"insert","lines":["pdf"]}],[{"start":{"row":45,"column":16},"end":{"row":45,"column":20},"action":"remove","lines":["abbr"],"id":13},{"start":{"row":45,"column":16},"end":{"row":45,"column":19},"action":"insert","lines":["pdf"]}],[{"start":{"row":47,"column":34},"end":{"row":47,"column":38},"action":"remove","lines":["abbr"],"id":14},{"start":{"row":47,"column":34},"end":{"row":47,"column":37},"action":"insert","lines":["pdf"]}],[{"start":{"row":0,"column":22},"end":{"row":0,"column":26},"action":"remove","lines":["abbr"],"id":15},{"start":{"row":0,"column":22},"end":{"row":0,"column":25},"action":"insert","lines":["pdf"]}],[{"start":{"row":2,"column":16},"end":{"row":2,"column":28},"action":"remove","lines":["Abbreviation"],"id":16},{"start":{"row":2,"column":16},"end":{"row":2,"column":17},"action":"insert","lines":["P"]}],[{"start":{"row":2,"column":17},"end":{"row":2,"column":18},"action":"insert","lines":["D"],"id":17}],[{"start":{"row":2,"column":18},"end":{"row":2,"column":19},"action":"insert","lines":["F"],"id":18}],[{"start":{"row":14,"column":70},"end":{"row":14,"column":82},"action":"remove","lines":["Abbreviation"],"id":19},{"start":{"row":14,"column":70},"end":{"row":14,"column":73},"action":"insert","lines":["PDF"]}],[{"start":{"row":20,"column":70},"end":{"row":20,"column":81},"action":"remove","lines":["Explanation"],"id":20},{"start":{"row":20,"column":70},"end":{"row":20,"column":73},"action":"insert","lines":["PDF"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":20,"column":73},"end":{"row":20,"column":73},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1462613026990,"hash":"1e41f8ef7b756b5bac20feb246710a4bf2fc2446"}