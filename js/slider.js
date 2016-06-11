function Slider(options, body) {
  var elem = options.elem;

  var thumbElem = elem.querySelector('.slider__thumb');

  var max = options.max || 100;
  var sliderCoords, thumbCoords, shiftX, shiftY;
  
  var pixelsPerValue = (elem.clientHeight - thumbElem.clientHeight) / max;
  
  this.setThumbHeight = function (h) {
    thumbElem.style.height = h + 'px';
    pixelsPerValue = (elem.clientHeight - thumbElem.clientHeight) / max;
    setValue(0);
  };
  elem.ondragstart = function() {
    return false;
  };

  elem.onmousedown = function(event) {
    if (event.target.closest('.slider__thumb')) {
      startDrag(event.clientX, event.clientY);
      return false; // disable selection start (cursor change)
    }
  }

  function startDrag(startClientX, startClientY) {
    sliderCoords = elem.getBoundingClientRect();
    thumbCoords = thumbElem.getBoundingClientRect();
    shiftX = startClientX - thumbCoords.left;
    shiftY = startClientY - thumbCoords.top;

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }
  
  // elem.ontouchstart = function(event) {
  //   if (event.target.closest('.slider__thumb')) {
  //     startDrag_touch(event.touches[0].clientX, event.touches[0].clientY);
  //     return false; // disable selection start (cursor change)
  //   }
  // };

  elem.addEventListener('touchstart', function(event) {
    if (event.target.closest('.slider__thumb')) {
      startDrag_touch(event.touches[0].clientX, event.touches[0].clientY);
      return false; // disable selection start (cursor change)
    }
  });
  
  
  function startDrag_touch(startClientX, startClientY) {
    sliderCoords = elem.getBoundingClientRect();
    thumbCoords = thumbElem.getBoundingClientRect();
    shiftX = startClientX - thumbCoords.left;
    shiftY = startClientY - thumbCoords.top;

    document.addEventListener('touchmove', onDocumentTouchMove);
    document.addEventListener('touchend', onDocumentTouchEnd);
  }
  function moveTo(clientY) {
    // вычесть координату родителя, т.к. position: relative
    var newTop = clientY - shiftY - sliderCoords.top;

    // курсор ушёл вне слайдера
    if (newTop < 0) {
      newTop = 0;
    }
    var bottomEdge = elem.offsetHeight - thumbElem.offsetHeight;
    if (newTop > bottomEdge) {
      newTop = bottomEdge;
    }

    thumbElem.style.top = newTop + 'px';

    elem.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      detail: positionToValue(newTop)
    }));
  }

  function valueToPosition(value) {
    return pixelsPerValue * value;
  }

  function positionToValue(left) {
    return Math.round(left / pixelsPerValue);
  }

  function onDocumentMouseMove(e) {
    moveTo(e.clientY);
    // console.log('onDocumentMouseMove');
    e.stopPropagation();
    e.preventDefault();
  }

  function onDocumentMouseUp() {
    endDrag();
  }
  function onDocumentTouchMove(e) {
    moveTo(e.touches[0].clientY);
    // console.log('onDocumentTouchMove');
    e.stopPropagation();
    e.preventDefault();
  }

  function onDocumentTouchEnd() {
    endDrag_touch();
  }
  function endDrag() {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);

    elem.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: positionToValue(parseInt(thumbElem.style.top))
    }));
  }
  function endDrag_touch() {
    document.removeEventListener('touchmove', onDocumentTouchMove);
    document.removeEventListener('touchend', onDocumentTouchEnd);

    elem.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: positionToValue(parseInt(thumbElem.style.top))
    }));
  }
  
  function setValue(value) {
    thumbElem.style.top = valueToPosition(value) + 'px';
  }

  this.setValue = setValue;
  
  function incVal() {
    var top = isNaN(parseInt(thumbElem.style.top, 10)) ? 0 : parseInt(thumbElem.style.top, 10);
    var newTop = top - valueToPosition(1);

    if (newTop < 0) {
      newTop = 0;
    }

    thumbElem.style.top = newTop + 'px';
    elem.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      detail: positionToValue(newTop)
    }));
  }
  this.incVal = incVal;
  
  function decVal() {
    var top = isNaN(parseInt(thumbElem.style.top, 10)) ? 0 : parseInt(thumbElem.style.top, 10);
    var newTop = top + valueToPosition(1);

    var bottomEdge = elem.offsetHeight - thumbElem.offsetHeight;
    if (newTop > bottomEdge) {
      newTop = bottomEdge;
    }

    thumbElem.style.top = newTop + 'px';
    elem.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      detail: positionToValue(newTop)
    }));
  }
  this.decVal = decVal;
}

var sliderElem = document.getElementById('slider');
var sliderThumb = sliderElem.querySelector('.slider__thumb');
var sliderUp = document.getElementById('slider_up');
var sliderDown = document.getElementById('slider_down');
var sliderContainer =document.getElementById('slider_container');

var slider = new Slider({
  elem: sliderElem,
  max: 100
});
var timeout_id = -1;
sliderUp.onmousedown = function () {
  slider.incVal;
  if (timeout_id == -1) timeout_id = setInterval(slider.incVal, 50);
};
sliderUp.addEventListener('touchstart', function(event) {
  slider.incVal;
  if (timeout_id == -1) timeout_id = setInterval(slider.incVal, 50);
  // console.log('touchstart: ' + timeout_id);
});

sliderDown.onmousedown = function () {
  slider.decVal;
  if (timeout_id == -1) timeout_id = setInterval(slider.decVal, 50);
};
sliderDown.addEventListener('touchstart', function(event) {
  slider.decVal;
  if (timeout_id == -1) timeout_id = setInterval(slider.decVal, 50);
  // console.log('touchstart: ' + timeout_id);
});

document.onmouseup = function () {
  // console.log('mouseup: ' + timeout_id);
  clearInterval(timeout_id);
  timeout_id = -1;
};
document.addEventListener('touchend', function(event) {
  // console.log('touchend: ' + timeout_id);
  clearInterval(timeout_id);
  timeout_id = -1;
});


sliderElem.addEventListener('slide', function(event) {
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
    });
  }
  if (contentWin == undefined) return;
  var scrollHeight = Math.max(
    contentWin.document.body.scrollHeight, contentWin.document.documentElement.scrollHeight,
    contentWin.document.body.offsetHeight, contentWin.document.documentElement.offsetHeight,
    contentWin.document.body.clientHeight, contentWin.document.documentElement.clientHeight
  );
  // console.log(event.detail, scrollHeight, parseInt(event.detail, 10) * (scrollHeight / 100));
  contentWin.scrollTo(0, parseInt(event.detail, 10) * (scrollHeight / 100));
});