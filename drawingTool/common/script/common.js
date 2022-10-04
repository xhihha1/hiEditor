(function(globel){
    $('.commonDialogClose').on('click', function(){
        $(this).parents('.commonDialog').hide()
    })
    $('.commonDialogTitle').on("drag", function(e) {
        var x = e.pageX;
        var y = e.pageY;
        var el = $(this).parents('.commonDialog');
        // el.css('position', 'absolute');
        if (x > 0 || y > 0) {
            el.css("left", x);
            el.css("top", y);
        }
        // https://javascript.info/mouse-drag-and-drop
    })
})(window)