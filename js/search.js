var btn_search = document.getElementById('search');
var inp_search = document.getElementById('search_input');
var res_box = false;

btn_search.onclick = function() {
    var search_string = inp_search.value;
    search_string = search_string.trim();
    if (search_string.length < 3) {
        alert('Введите не менее 3 символов');
        return;
    }
    res_box = kool_menu.search(search_string);
    document.getElementsByClassName('container')[0].appendChild(res_box);
    res_box.style.width =  inp_search.offsetWidth + 'px';
    res_box.style.top = $(inp_search).offset().top + inp_search.offsetHeight + 'px';
    res_box.style.left = $(inp_search).offset().left + 'px';
};

document.addEventListener('mouseup', function(event) {
    if (!event.target.closest('.search-results')  &&  res_box) {
        res_box.parentNode.removeChild(res_box);
        res_box = false;
    }
});
document.addEventListener('touchend', function(event) {
    if (!event.target.closest('.search-results') &&  res_box) {
        res_box.parentNode.removeChild(res_box);
        res_box = false;
    }
});