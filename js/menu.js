  var Menu = function(container, item_list_json) {
      var item_list = JSON.parse(item_list_json);
      var breadcrumbs = document.getElementById('breadcrumbs');
      var breadcrumbs_arr = [];
      breadcrumbs.innerHTML = '<a href="#" id="back" class="breadcrumbs__btn"><img src="/images/arrow-back.png" alt="Каталог" class="breadcrumbs__btn-icon">Каталог</a>';
      var btn_back = document.getElementById('back');
      var items_per_page = 6;
      var curr_page = 1;
      var pages_path = [];
      var curr_page_item_count = 0;
      var page_block = document.getElementById('pages_nums');
      var set_items_per_page = function(items_count) {
          items_per_page = items_count;
          if (items_per_page > 6) {
            container.className = 'menu-container menu-container--small-items';
          } else {
            container.className = 'menu-container';
          }
      };
      
      var btn_prev_page = document.getElementById('prev_page');
      btn_prev_page.onclick = function() {
        if(Math.ceil(curr_page_item_count / items_per_page) >= 2) {
            curr_page--;
            if(curr_page < 1) {
                curr_page = Math.ceil(curr_page_item_count / items_per_page);
            }
            show_node_childs(current_node);
        }
      };
      var btn_next_page = document.getElementById('next_page');
      btn_next_page.onclick = function() {
        if(Math.ceil(curr_page_item_count / items_per_page) >= 2) {
            curr_page++;
            if(curr_page > Math.ceil(curr_page_item_count / items_per_page)) {
                curr_page = 1;
            }
            show_node_childs(current_node);
        }
        
      };      
      var btn_toggle_items = document.getElementById('db');
      btn_toggle_items.onclick = function () {
        if(items_per_page == 6) {
          set_items_per_page(12);
          breadcrumbs.className = 'breadcrumbs--small';
        } else {
          set_items_per_page(6);
          breadcrumbs.className = 'breadcrumbs';
        }
        curr_page = 1;
        
        init_page_nums(items_per_page);
        show_node_childs(current_node);
      };

      var init_page_nums = function(items_per_page) {
        //page_block.children = [];
        while(page_block.firstChild) {
          page_block.removeChild(page_block.firstChild);
        }
        for(var i = 0; i < Math.ceil(curr_page_item_count / items_per_page); i++) {
           //page_block.children[i] = document.createElement('a');
           var a = document.createElement('a');
           page_block.appendChild(a);
           a.innerText = (i + 1).toString();
           a.href = '#';
            if ((i + 1) == curr_page) {
              a.className = 'controls-container__page-btn controls-container__page-btn--active';
            } else {
              a.className = 'controls-container__page-btn';
              a.onclick = (function (i) {
                curr_page = i;
                show_node_childs(current_node);
              }).bind(null, i + 1);
            }
        }
          //curr_page = page;
      };
      var clear = function() {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
      };
      var Node = function(text, id, parent) {
          this.id = id;
          this.text = text;
          this.parent = parent;
          this.children = [];
          this.domNode = document.createElement('li');
      };
      var root = new Node('root', -1);
      var current_node = root;
      var show_node_childs = function(node) {
          var items_count = 12;
          btn_back.style = '';
          breadcrumbs.className = 'breadcrumbs--content-visible';
          container.className = 'menu-container menu-container--sub-items';
          sliderContainer.style.display = 'none';
          btn_toggle_items.parentNode.style.display = 'none';
          if (node == root) {
            items_per_page == 6 ? breadcrumbs.className = 'breadcrumbs' : breadcrumbs.className = 'breadcrumbs--small';
            set_items_per_page(items_per_page);
            items_count = items_per_page;
            btn_back.style = 'visibility: hidden;';
            btn_toggle_items.parentNode.style.display = '';
          } else {
            
            // breadcrumbs_arr.forEach(function (item) {
            //   var span = document.createElement('span');
            //   span.innerText = ' / ' + item.text;
            //   breadcrumbs.appendChild(span);
            // });
          }
          current_node = node;
          curr_page_item_count = node.children.length;
          $(container).hide();
          clear();
          var last = Math.min(curr_page * items_count, node.children.length);
          for(var i = (curr_page - 1) * items_count; i < last; i++) {
              container.appendChild(node.children[i].domNode);
          }
          $(container).fadeIn('slow');
          init_page_nums(items_count);
          // page_block.children.forEach(function (page_num) {
          //   if (Math.parseInt(page_num.innerText) == curr_page) {
          //     page_num.className = 'controls-container__page-btn controls-container__page-btn--active';
          //   } else {
          //     page_num.className = 'controls-container__page-btn';
          //   }
          // });
        //   node.children.forEach(function(child) {
        //       container.appendChild(child.domNode);
        //   });
          if (node.parent != undefined) {
              btn_back.onclick = (function (parent, page) {
                curr_page = pages_path.pop();
                breadcrumbs.removeChild(breadcrumbs.lastChild);
                show_node_childs(parent);
              }).bind(null, node.parent, curr_page);
          }
          else {
              btn_back.onclick = function() {
                  alert('КУДА?!');
              };
          }

      };

      var add_children = function(parent_node, parent_id) {
          item_list.forEach(function(item) {
              if (item.parent == parent_id) {
                  var child = new Node(item.name, item.id, parent_node);
                  //var li = document.createElement('li');
                  child.domNode.className = 'menu-item';
                  
                  if (item.parent == '#') {
                      var img = document.createElement('img');
                      img.className = 'menu-item__icon';
                      img.src = '/images/menu-icons/' + item.id + '.png';
                      child.domNode.appendChild(img);
                  }
                  
                  var h3 = document.createElement('h3');
                  h3.className = 'menu-item__title';

                  if (item.name.length > 45) h3.className = 'menu-item__title menu-item__title--small-font'; // костыль Т_Т
                  h3.innerText = item.name;
                  child.domNode.appendChild(h3);
                  // $(child.domNode).fadeOut();
                  //child.domNode = li;
                  parent_node.children.push(child);
                  add_children(child, item.id);
              }
          });
          if (parent_node.children.length > 0) {
              parent_node.domNode.onclick = (function (parent) {
                pages_path.push(curr_page);
                var span = document.createElement('span');
                span.innerText = '\u00a0/ ' + parent.text;
                span.className = 'breadcrumbs__breadcrumb';
                breadcrumbs.appendChild(span);
                curr_page = 1;
                show_node_childs(parent);
              }).bind(null, parent_node);
              // show_node_childs.bind(null, parent_node);
          }
          else {
              parent_node.domNode.onclick = show_content.bind(null, parent_node.id, parent_node.text, parent_node.parent.text);
          }
      };
      
      this.search = function(search_str) {
        var result_nodes = [];
        var search_reg_exp = new RegExp( search_str.split(/\ /).filter(function (w) { return w.length > 2 }).join('|'), "i" );

        var search_childs = function (childs) {
          childs.forEach(function (child) {
            
            if (child.text.search(search_reg_exp) != -1) {
              result_nodes.push(child);
            }
            if (child.children.length > 0) {
              search_childs(child.children);
            }
          });
        };
        search_childs(root.children);
        // console.log(result_nodes);
        
        var ul = document.createElement('ul');
        ul.className = 'search-results';
        if (result_nodes.length < 1) {
          var li = document.createElement('li');
          li.className = 'search-results__item';
          li.innerText = 'Ничего не найдено';
          ul.appendChild(li);
          return ul;
        }
        
        result_nodes.forEach(function(node) {
          var li = document.createElement('li');
          li.className = 'search-results__item';
          li.innerText = node.text;
          if (node.children.length > 0) {
            var show_node = node;
          } else {
            show_node = node.parent;
            var show_content_func = show_content.bind(null, node.id, node.text,  node.parent.text);
          }
          li.onclick = (function (parent, show_content) {
            var parent_parent = parent;
            pages_path = [];
            while (breadcrumbs.children.length > 1) {
              breadcrumbs.removeChild(breadcrumbs.lastChild);
            }
            while (parent_parent && parent_parent != root) {
              pages_path.push(1);
              var span = document.createElement('span');
              span.innerText = '\u00a0/ ' + parent_parent.text;
              span.className = 'breadcrumbs__breadcrumb';
              // breadcrumbs.insertBefore(span, breadcrumbs.lastChild);
              breadcrumbs.insertBefore(span, btn_back.nextSibling);
              parent_parent = parent_parent.parent;
            }
            curr_page = 1;
            show_node_childs(parent);
            if (show_content !== undefined) show_content();
          }).bind(null, show_node, show_content_func);
          ul.appendChild(li);
        });
        return ul;
      };
      this.init = function() {
          add_children(root, '#');
          show_node_childs(root);
      };
  };
  var kool_menu = new Menu(document.getElementById('menu_container'), menu_json);
  kool_menu.init();
  var menu = {};

//   function to_page(id_categ, name_categ) {
//       console.log(id_categ);
//       xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//           if (xhttp.readyState == 4 && xhttp.status == 200) {
//               var res = xhttp.responseText;
//               if (res != 'NO_CHILD') {
//                   create_menu(res);
//               }
//               else {
//                   newWin.document.getElementById('header').innerText = 'Выберите категорию';
//                   var cnt = newWin.document.getElementById('content');
//                   while (cnt.firstChild) {
//                       cnt.removeChild(cnt.firstChild);
//                   }
//               }
//           }
//       };
//       xhttp.open("GET", "set-page.php?id=" + id_categ, true);
//       xhttp.send();
//   }

//   function create_menu(menu_items) {
//       var menu_container = document.getElementById('menu_container');

//       menu_items = JSON.parse(menu_items);

//       menu_items.forEach(function(item) {
//           var li = document.createElement('li');
//           var childs = menu_items.filter(function(child_item) {
//               if (child_item.parent == item.id) {
//                   //console.log(child_item.parent, item.id);
//                   return true;
//               }
//           });
//           if (childs.length > 0) {
//               li.onclick = show_childs.bind(null, childs);
//           }
//           else {
//               li.onclick = show_content.bind(null, item.id, item.name);
//           }
//           if (item.parent != '#') li.style = 'display: none';
//           li.className = 'menu__item';
//           li.innerText = item.name;
//           menu_container.appendChild(li);
//           menu[item.id] = li;
//       });
//   }
  //create_menu(menu_json);
  // var btn_sec_wnd = document.getElementById('btn_sec_wnd');
  var contentWin;
  // btn_sec_wnd.onclick = function() {
  //     var w = screen.width / 2;
  //     var h = screen.height;
  //     newWin = window.open("content.html", "hello",
  //         "width=" + w +
  //         ",height=" + h +
  //         ",top=0" +
  //         ",left=" + w
  //     );
  // };

//   function show_childs(childs) {
//       newWin.document.getElementById('header').innerText = 'Выберите категорию';
//       var cnt = newWin.document.getElementById('content');
//       while (cnt.firstChild) {
//           cnt.removeChild(cnt.firstChild);
//       }
//       Object.keys(menu).forEach(function(id) {
//           menu[id].style = 'display: none';
//       });
//       childs.forEach(function(child) {
//           menu[child.id].style = '';
//       });
//   }

  function show_content(id, name, parent_name) {
    if (contentWin == undefined) {
      swal({
        title: "Окно контента",
        text: "Открыть окно для отображения контента категорий?",
        type: "info",
        showCancelButton: true,
        // confirmButtonColor: "#DD6B55",
        confirmButtonText: "Да",
        cancelButtonText: "Нет"
      }, function() {
        var w = screen.width / 2;
        var h = screen.height;
        contentWin = window.open("content.html", "hello",
          "width=" + w +
          ",height=" + h +
          ",top=0" +
          ",left=" + w);
        contentWin.onbeforeunload = function(){
          contentWin = undefined;
        };
      });
    }
    if (contentWin == undefined) return;
    
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
              var res = xhttp.responseText;
              //console.log(res);
              if (res != 'FAIL') {
                var div = document.createElement('div');
                div.innerHTML = res;
                var elements = div.childNodes[0];
                var cnt = contentWin.document.getElementById('content');
                while (cnt.firstChild) {
                  cnt.removeChild(cnt.firstChild);
                }
                cnt.appendChild(elements);
                var icon_id = id.indexOf('.') == -1 ? id.substr(0) : id.substr(0, id.indexOf('.'));
                contentWin.document.getElementById('header_icon').src = '/images/menu-icons/' + icon_id + '.png';
                contentWin.document.getElementById('header_subtitle').innerText = name;
                contentWin.document.getElementById('header_title').innerText = parent_name;

                /*Отображение pdf во всю длину, тупо скопировано из инета*/
                function renderPDF(url, canvasContainer, options) {
                  var options = options || {
                    scale: 1
                  };

                  function renderPage(page) {
                    var viewport = page.getViewport(options.scale);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var renderContext = {
                      canvasContext: ctx,
                      viewport: viewport
                    };

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    canvasContainer.appendChild(canvas);

                    var pageRendering = page.render(renderContext);
                    
                    var completeCallback = pageRendering._internalRenderTask.callback;
                    pageRendering._internalRenderTask.callback = function(error) {
                      completeCallback.call(this, error);
                      
                      var scrollHeight = Math.max(
                        contentWin.document.body.scrollHeight, contentWin.document.documentElement.scrollHeight,
                        contentWin.document.body.offsetHeight, contentWin.document.documentElement.offsetHeight,
                        contentWin.document.body.clientHeight, contentWin.document.documentElement.clientHeight
                      );
                      slider.setThumbHeight(Math.max(sliderElem.clientHeight *
                        (contentWin.document.documentElement.clientHeight / scrollHeight), 40));
                    };
                  }

                  function renderPages(pdfDoc) {
                    for (var num = 1; num <= pdfDoc.numPages; num++)
                      pdfDoc.getPage(num).then(renderPage);
                  }
                  PDFJS.disableWorker = true;
                  PDFJS.getDocument(url).then(renderPages);
                }

                var pdfs = contentWin.document.getElementsByTagName('iframe');
                for (var i = 0; i < pdfs.length; i++) {
                  if (pdfs[i].width != '' || pdfs[i].height != '') continue;
                  var holder = contentWin.document.createElement('div');
                  pdfs[i].parentNode.insertBefore(holder, pdfs[i]);
                  renderPDF(pdfs[i].src, holder);
                  pdfs[i].parentNode.removeChild(pdfs[i]);
                }
                var vids = contentWin.document.getElementsByTagName('video');
                   for (var i = 0; i < vids.length; i++) {
                     vids[i].removeAttribute('controls');
                     vids[i].setAttribute('autoplay', '');
                   }
                sliderContainer.style = 'display: block';
                var scrollHeight = Math.max(
                  contentWin.document.body.scrollHeight, contentWin.document.documentElement.scrollHeight,
                  contentWin.document.body.offsetHeight, contentWin.document.documentElement.offsetHeight,
                  contentWin.document.body.clientHeight, contentWin.document.documentElement.clientHeight
                );
                slider.setThumbHeight(Math.max(sliderElem.clientHeight *
                  (contentWin.document.documentElement.clientHeight / scrollHeight), 40));
              }
              else {
                swal({
                  title: "Ошибка",
                  text: "Ошибка при получении содержимого категории",
                  type: "error",
                  confirmButtonText: "OK"
                });
              }
          }
      };
      xhttp.open("GET", "get-categ-content.php?id=" + id, true);
      xhttp.send();
  }
  
  $('#search_input').keyboard({

  // set this to ISO 639-1 language code to override language set by the layout
  // http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  // language defaults to "en" if not found
  language     : 'ru', // string or array

  // *** choose layout ***
  layout       : 'ms-Russian',
  customLayout : { 'normal': ['{cancel}'] },

  position     : {
    // optional - null (attach to input/textarea) or a jQuery object
    // (attach elsewhere)
    of : null,
    my : 'center top',
    at : 'center top',
    // used when "usePreview" is false
    // (centers keyboard at bottom of the input/textarea)
    at2: 'center bottom'
  },

  // // allow jQuery position utility to reposition the keyboard on window resize
  // reposition   : true,

  // // preview added above keyboard if true, original input/textarea used if false
  usePreview   : false,

  // // if true, the keyboard will always be visible
  // alwaysOpen   : false,

  // // give the preview initial focus when the keyboard becomes visible
  // initialFocus : true,

  // // if true, keyboard will remain open even if the input loses focus.
  // stayOpen     : false,

  css : {
    // input & preview
    input          : 'ui-widget-content ui-corner-all',
    // keyboard container
    container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
    // default state
    buttonDefault  : 'ui-state-default ui-corner-all',
    // hovered button
    buttonHover    : 'ui-state-hover',
    // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
    buttonAction   : 'ui-state-active',
    // used when disabling the decimal button {dec}
    buttonDisabled : 'ui-state-disabled',
    // empty button class name {empty}
    buttonEmpty    : 'ui-keyboard-empty'
  },
  autoAccept   : true,
});

swal({
  title: "Окно контента",
  text: "Открыть окно для отображения контента категорий?",
  type: "info",
  showCancelButton: true,
  // confirmButtonColor: "#DD6B55",
  confirmButtonText: "Да",
  cancelButtonText: "Нет"
}, function() {
      var w = screen.width / 2;
      var h = screen.height;
      contentWin = window.open("content.html", "hello",
          "width=" + w +
          ",height=" + h +
          ",top=0" +
          ",left=" + w );
      contentWin.onbeforeunload = function(){
        contentWin = undefined;
    };
  }
);