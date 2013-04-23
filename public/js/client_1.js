$(document).ready(function () {
    lineWidth = 8;
    lineColor = 'black';
    
    initialize(); 
    
    $(".lineWidth").find("a").click(function() {
        lineWidth = $(this).attr('lineWidth') ;
        $(".currentLineWidth").find('i').css('font-size',$(this).find('i').css('font-size'));
    });
    
    $(".lineColor").find("a").click(function() {
        lineColor = $(this).attr('lineColor') ;
        console.log(lineColor);
        $(".currentLineColor").find('i').css('color',$(this).find('i').css('color'));
    });
    
    $(".icon-refresh").parent("a").click(function() {
        $('canvas')[0].width = $('canvas')[0].width;
    });
    
});
 
// works out the X, Y position of the click inside the canvas from the X, Y position on the page
function getPosition(mouseEvent, Canvas) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
        x = mouseEvent.pageX;
        y = mouseEvent.pageY;
    } else {
        x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { X: x - Canvas.offsetLeft, Y: y - Canvas.offsetTop };
}

function initialize() {
    // get references to the canvas element as well as the 2D drawing context
    var Canvas = document.getElementById("canvas");
    var context = Canvas.getContext("2d");
    context.lineCap = 'round';

    Canvas.width = $(window).innerWidth();
    Canvas.height = $(window).innerHeight()-41;

    // This will be defined on a TOUCH device such as iPad or Android, etc.
    var is_touch_device = 'ontouchstart' in document.documentElement;

    if (is_touch_device) {
        // create a drawer which tracks touch movements
        var drawer = {
            isDrawing: false,
            touchstart: function (coors) {	
                context.beginPath();
    			context.arc(coors.x, coors.y, lineWidth/2, 0, 2 * Math.PI, true); 
                context.closePath();
				context.fill();
                
                context.beginPath();
                context.lineWidth = lineWidth;
                context.strokeStyle = lineColor;
                
                context.moveTo(coors.x, coors.y);
                this.isDrawing = true;
            },
            touchmove: function (coors) {
                if (this.isDrawing) {
                 context.lineTo(coors.x, coors.y);
                 context.stroke();
                }
            },
            touchend: function (coors) {
                if (this.isDrawing) {
                    this.touchmove(coors);
                    this.isDrawing = false;
                }
            }
        };

        // create a function to pass touch events and coordinates to drawer
        function draw(event) {

            // get the touch coordinates.  Using the first touch in case of multi-touch
            var coors = {
                x: event.targetTouches[0].pageX,
                y: event.targetTouches[0].pageY
            };

            // Now we need to get the offset of the canvas location
            var obj = Canvas;

            if (obj.offsetParent) {
                // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
                do {
                    coors.x -= obj.offsetLeft;
                    coors.y -= obj.offsetTop;
                }
                // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
                // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
                while ((obj = obj.offsetParent) != null);
            }

            // pass the coordinates to the appropriate handler
            drawer[event.type](coors);
        }


        // attach the touchstart, touchmove, touchend event listeners.
        Canvas.addEventListener('touchstart', draw, false);
        Canvas.addEventListener('touchmove', draw, false);
        Canvas.addEventListener('touchend', draw, false);

        // prevent elastic scrolling
        Canvas.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false); 
    }
    else {

        // start drawing when the mousedown event fires, and attach handlers to
        // draw a line to wherever the mouse moves to
        $("#canvas").mousedown(function (mouseEvent) {
            var position = getPosition(mouseEvent, Canvas);
            context.beginPath();
            context.arc(position.X, position.Y, lineWidth/2, 0, 2 * Math.PI, true); 
            context.closePath();
            context.fill();

            context.moveTo(position.X, position.Y);
            
            context.beginPath();
            context.lineWidth = lineWidth;
            context.strokeStyle = lineColor;

            // attach event handlers
            $(this).mousemove(function (mouseEvent) {
                drawLine(mouseEvent, Canvas, context);
            }).mouseup(function (mouseEvent) {
                finishDrawing(mouseEvent, Canvas, context);
            }).mouseout(function (mouseEvent) {
                finishDrawing(mouseEvent, Canvas, context);
            });
        });

    }
	
	context.lineWidth = 10; 
}

// draws a line to the x and y coordinates of the mouse event inside
// the specified element using the specified context
function drawLine(mouseEvent, Canvas, context) {

    var position = getPosition(mouseEvent, Canvas);
    
    context.lineTo(position.X, position.Y);
    context.stroke();
}

// draws a line from the last coordiantes in the path to the finishing
// coordinates and unbind any event handlers which need to be preceded
// by the mouse down event
function finishDrawing(mouseEvent, Canvas, context) {
    // draw the line to the finishing coordinates
    drawLine(mouseEvent, Canvas, context);

    context.closePath();

    // unbind any events which could draw
    $(Canvas).unbind("mousemove")
        .unbind("mouseup")
        .unbind("mouseout");
}