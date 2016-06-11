function Slider(options) {
  var elem = options.elem;

  var thumbElem = elem.querySelector('.slider__thumb');

  var max = options.max || 100;
  var sliderCoords, thumbCoords, shiftX, shiftY;

  // [<*>----------------]
  //   |...............|
  // first            last
  var pixelsPerValue = (elem.clientWidth - thumbElem.clientWidth) / max;

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
    thumbCoords = thumbElem.getBoundingClientRect();
    shiftX = startClientX - thumbCoords.left;
    shiftY = startClientY - thumbCoords.top;

    sliderCoords = elem.getBoundingClientRect();

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
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
  }

  function onDocumentMouseUp() {
    endDrag();
  }

  function endDrag() {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);

    elem.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: positionToValue(parseInt(thumbElem.style.left))
    }));
  }

  function setValue(value) {
    thumbElem.style.left = valueToPosition(value) + 'px';
  }

  this.setValue = setValue;
}

var sliderElem = document.getElementById('slider');

var slider = new Slider({
  elem: sliderElem,
  max: 100
});