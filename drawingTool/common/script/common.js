(function (globel) {
  $('.commonDialogClose').on('click', function () {
    $(this).parents('.commonDialog').hide()
  })
  $('.commonDialogTitle').on("mousedown", function (event) {
    // var target = event.target
    var target = $(this).parents('.commonDialog').first().get(0);
    console.log(target)
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;

    target.style.position = 'absolute';
    target.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    target.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      target.style.zIndex = 500;
      target.onmouseup = null;
    };
  })
})(window)