(function (w) {

    w.simpleCanvas = initCanvas;

    // Initialise a new canvas
    function initCanvas(container, options) {
        var canvas, bufferSize, bufferIncrement, width, height;

        options = options || {};


        if (typeof container === 'string') {
            container = document.getElementById(container);
        } else if (!container.appendChild) {
            container = null;
        }

        if (!container) {
            console.log("Invalid container type");
            return;
        }

        if (typeof options.bufferSize === 'number') {
            bufferSize = Math.max(0, Math.floor(options._bufferSize));
        } else {
            bufferSize = 300; // Default the buffer to 300
        }

        if (typeof options.bufferIncrement === 'number') {
            bufferIncrement = Math.max(1, Math.floor(options.bufferIncrement));
        } else {
            bufferIncrement = 30;   // Default buffer increment
        }

        if (typeof options.width === 'number') {
            width = options.width + 'px';
        } else {
            width = '320px';
        }

        if (typeof options.height === 'number') {
            height = options.height + 'px';
        } else {
            height = '240px';
        }

        canvas = document.createElement('div');
        canvas.style.position = 'relative';
        canvas.style.margin = '0px';
        canvas.style.padding = '0px';
        canvas.style.border = 'none';
        canvas.style.overflow = 'hidden';

        container.appendChild(canvas);

        c = {
            _buffer: [],
            _bufferIncrement: bufferIncrement,
            _canvas: canvas,
            _getDiv: getDiv,
            _pointer: -1,

            clear: clear,
            decreaseBuffer: decreaseBuffer,            
            increaseBuffer: increaseBuffer,            
            rectangle: rectangle,
            resize: resize,
            text: text
        };

        c.increaseBuffer(bufferSize);
        c.resize(width, height);

        return c;
    }    

    // Render text on the canvas
    function text(x, y, text, options) {
        var e = this._getDiv();

        options = options || {};

        e.style.borderTop = '';
        e.style.display = 'block';
        e.style.width = options.width ? options.width + 'px' : '';
        e.style.height = options.height ? options.height + 'px' : '';
        e.style.left = (x  || 0) + 'px';
        e.style.top = (y || 0) + 'px';

        // font options
        e.style.fontFamily = options.fontFamily || '';
        e.style.fontStyle = options.fontStyle || '';
        e.style.fontVariant = options.fontVariant || '';
        e.style.fontWeight = options.fontWeight || '';
        e.style.fontSize = options.fontSize || '';
        e.style.color = options.color || '';

        // Text wrapping options
        if (typeof options.whiteSpace === 'string') {
            e.style.whiteSpace = options.whiteSpace;
        } else {
            e.style.whiteSpace = 'nowrap';
        }

        if (typeof e.textContent !== 'undefined') {
            e.textContent = text || '';
        } else {
            e.innerText = text || '';
        }

        return e;
    }

    // Render a rectangle on the canvas
    function rectangle(x, y, width, height, color, options) {
        var e = this._getDiv(), 
            offset = 0;

        e.style.borderTop = height + 'px solid ' + color;
        e.style.display = 'block';
        e.style.height = '0px';
        e.style.fontSize = '0px';
        e.style.width = width + 'px';
        
        e.style.left = (x || 0) + 'px';
        e.style.top = (y || 0)  + 'px';

        if (e.textContent) {
            e.textContent = '';
        } else {
            e.innerText = '';
        }

        return e;
    }

    // Replace all rendered divs back in the buffer
    function clear() {
        var buffer = this._buffer,
            pointer = this._pointer,
            i, e;

        for (i = 0; i < pointer; i++) {
            e = buffer[i];
            e.style.display = 'none';
        }
        this._pointer = buffer.length > 0 ? 0 : -1;
    }

    // Increases the number of divs in the div buffer
    function increaseBuffer(count) {
        var buffer = this._buffer,
            canvas = this._canvas,
            e, i;

        if (!count) {
            count = this._bufferIncrement;
        } else if (count < 1) {
            return;
        }

        for (i = 0; i < count; i++) {
            e = document.createElement('div');
            e.style.display = 'none';
            e.style.position = 'absolute';
            e.style.margin = '0px';
            e.style.padding = '0px';
            buffer.push(e);
            canvas.appendChild(e);
        }

        if (this._pointer === -1 && buffer.length > 0) {
            this._pointer = 0;
        }
    }

    // Reduces the number of divs in the div buffer
    function decreaseBuffer(count) {
        var buffer = this._buffer,
            canvas = this._canvas,
            reduction, e, i;

        if (!count) {
            count = this._bufferIncrement;
        } else if (count < 1) {
            return;
        }

        reduction = Math.max(0, Math.min(count, buffer.length - this._pointer));

        for (i = 0; i < reduction; i++) {
            e = buffer.pop(e);
            canvas.removeChild(e);
            e = null;
        }
    }

    // Returns a new div from the div buffer
    function getDiv() {
        var e, pointer;
        pointer = this._pointer;

        if (this._buffer.length > pointer) {
            e = this._buffer[pointer];            
        } else {
            this.increaseBuffer();
            e = this._buffer[pointer];            
        }
        this._pointer += 1;

        return e;
    }

    // Resize the canvas area
    function resize(width, height) {
        if (typeof width === 'number') {
            this._canvas.style.width = width + 'px';
        } else if (width) {
            this._canvas.style.width = width;
        }

        if (typeof height === 'number') {
            this._canvas.style.height = height + 'px';
        } else if (height) {
            this._canvas.style.height = height;
        }
    }

}(window))
