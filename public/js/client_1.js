$(document).ready(function () {
    var socket = io.connect(':1234/client');
    
    // Get Canvas variable
    cvs = $("canvas");
    ctx = cvs[0].getContext('2d');
    
    // Get initial dimensions of canvas
    var width  = cvs.width();
    var height = cvs.height();
    
    console.log(width)
    
    // check for touch device
    var isTouchDevice = 'ontouchstart' in document.documentElement;
    
    if(isTouchDevice) {
        
    } else {
        cvs.mousedown(function (mouseEvent) {
            ctx.moveTo(mouseEvent.pageX,mouseEvent.pageY);
            ctx.beginPath();
            
            $(this).mousemove(function (mouseEvent) {
                var data = { 
                    w:  width,
                    h:  height,
                    x:  mouseEvent.pageX,
                    y:  mouseEvent.pageY,
                    c:  1,
                    t:  2
                };
                
                ctx.lineTo(mouseEvent.pageX,mouseEvent.pageY);   
                ctx.stroke();
                //socket.emit('message', {msg: data});
            }).mouseup(function (mouseEvent) {
                ctx.closePath();
                cvs.unbind("mousemove")
                    .unbind("mouseup")
                    .unbind("mouseout");
            }).mouseout(function (mouseEvent) {
                ctx.closePath();
                cvs.unbind("mousemove")
                    .unbind("mouseup")
                    .unbind("mouseout");
            });
            
        });
    }
});