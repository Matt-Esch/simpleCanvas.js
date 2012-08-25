(function (w) {

    var canvasOptions = {
            bufferSize: 0,
            bufferIncrement: 1,
            width: '320px',
            height: '240px',
            position: 'relative',
            margin: '0px',
            padding: '0px',
            border: 'none',
            overflow: 'hidden'
        },
        
        rectOptions = {
            anchorX: 'left',
            anchorY: 'top',
            angle: 0,
            borderTop: '',
            color: '',
            display: 'block',
            fontColor: '',
            fontFamily: '',
            fontSize: '0px',
            fontStyle: '',
            fontVariant: '',
            fontWeight: '',
            height: '0px',
            offsetX: 0,
            offsetY: 0,
            text: '',
            whiteSpace: 'normal',
            width: ''
        },
        
        textOptions = {
            anchorX: 'left',
            anchorY: 'top',
            angle: 0,
            borderTop: 'none',
            color: '',
            display: 'block',
            fontColor: '',
            fontFamily: '',
            fontSize: '',
            fontStyle: '',
            fontVariant: '',
            fontWeight: '',
            height: '',
            offsetX: 0,
            offsetY: 0,
            text: '',
            whiteSpace: 'normal',
            width: ''
        },

        imgOptions = {
            anchorX: 'left',
            anchorY: 'top',
            angle: 0,
            borderTop: '',
            display: 'block',
            fontColor: '',
            fontFamily: '',
            fontSize: '',
            fontStyle: '',
            fontVariant: '',
            fontWeight: '',
            offsetX: 0,
            offsetY: 0,
            height: '',
            text: '',
            whiteSpace: 'normal',
            width: ''
        },
        
        divElement = document.createElement('div'),
        imgElement = document.createElement('img'),
        
        divArgs = {},        
        
        textProperty;
    
    
    if ('textContent' in divElement) {
        textProperty = 'textContent';
    } else {
        textProperty = 'innerText';
    }
    
    w.simpleCanvas = initCanvas;

    // Initialise a new canvas
    function initCanvas(container, options) {
        var o = extend(divArgs, canvasOptions),
            canvas, c;

        if (typeof container === 'string') {
            container = document.getElementById(container);
        } else if (!container.appendChild) {
            container = null;
        }

        if (!container) {
            throw "Invalid container type";
        }
        
        if (options) {
            if (typeof options.bufferSize === 'number') {
                o.bufferSize = Math.max(0, options._bufferSize >> 0);
            }
            
            if (typeof options.bufferIncrement === 'number') {
                o.bufferIncrement = Math.max(1, options.bufferIncrement >> 0);
            }
            
            if (typeof options.width === 'number') {
                o.width = Math.floor(options.width) + 'px';
            }
            
            if (typeof options.height === 'number') {
                o.height = Math.max(0, options.height >> 0) + 'px';
            }
        }

        canvas = divElement.cloneNode('false');
        
        canvas.style.position = o.position;
        canvas.style.margin = o.margin;
        canvas.style.padding = o.padding;
        canvas.style.border = o.border;
        canvas.style.overflow = o.overflow;

        container.appendChild(canvas);

        c = {
            _buffer: [],
            _bufferIncrement: o.bufferIncrement,
            _canvas: canvas,
            _getDiv: getDiv,
            _pointer: -1,

            clear: clear,
            decreaseBuffer: decreaseBuffer,
            increaseBuffer: increaseBuffer,
            rect: rect,
            resize: resize,
            text: text
        };

        c.increaseBuffer(o.bufferSize);
        c.resize(o.width, o.height);

        return c;
    }

    function div(x, y, options) {
        var e = this._getDiv(),
            offsetX = 0,
            offsetY = 0;

        e.style.borderTop = options.borderTop;
        e.style.display = options.display;
        e.style.width = options.width;
        e.style.height = options.height;

        // Font options
        e.style.fontFamily = options.fontFamily;
        e.style.fontStyle = options.fontStyle;
        e.style.fontVariant = options.fontVariant;
        e.style.fontWeight = options.fontWeight;
        e.style.fontSize = options.fontSize;
        e.style.color = options.color;
        e.style.whiteSpace = options.whiteSpace;

        // Text content
        e[textProperty] = options.text;

        // Horizontal anchoring
        if (options.anchorX === 'left') {
            offsetX = 0;
        } else if (options.anchorX === 'middle') {
            offsetX = e.offsetWidth / 2;
        } else if (options.anchorX === 'right') {
            offsetX = e.offsetWidth;
        }

        // Vertical anchoring
        if (options.anchorY === 'top') {
            offsetY = 0;
        } else if (options.anchorY === 'middle') {
            offsetY = e.offsetHeight / 2;
        } else if (options.anchorY === 'bottom') {
            offsetY = e.offsetHeight;
        }

        e.style.left = (((x  || 0) - offsetX) >> 0) + 'px';
        e.style.top = (((y || 0) - offsetY) >> 0) + 'px';

        return e;
    }
  
    // Render text on the canvas
    function text(x, y, text, options) {

        var o = extend(divArgs, textOptions);
        
        o.text = text;
        
        if (options) {
            if (options.width) {
                if (typeof options.width === 'number') {
                    o.width = options.width + 'px';
                } else {
                    // Consider checking for px or %
                    o.width  = options.width;
                }
            }
            
            if (options.height) {
                if (typeof options.height === 'number') {
                    o.width = options.height + 'px';
                } else {
                    // Consider checking for px or %
                    o.width  = options.height;
                }
            }

            // Font options
            if (options.fontFamily) {
                o.fontFamily = options.fontFamily;
            }
            
            if (options.fontStyle) {
                o.fontStyle = options.fontStyle;
            }
            
            if (options.fontVariant) {
                o.fontVariant = options.fontVariant;
            }
            
            if (options.fontWeight) {
                o.fontWeight = options.fontWeight;
            }
            
            if (options.fontSize) {
                o.fontSize = options.fontSize;
            }
            
            if (options.color) {
                o.color = options.color;
            }

            // Text wrapping options
            if (typeof options.whiteSpace === 'string') {
                o.whiteSpace = options.whiteSpace;
            } else {
                o.whiteSpace = options.width ? 'normal' : 'nowrap';
            }
            
            // position and rotation
            if (options.angle) {
                o.angle = options.angle;
            }
            
            if (options.anchorX) {
                o.anchorX = options.anchorX;
            }
            
            if (options.anchorY) {
                o.anchorY = options.anchorY;
            }
            
            if (options.offsetX) {
                o.offsetX = options.offsetX;
            }
            
            if (options.offsetY) {
                o.offsetY = options.offsetY;
            }
        }
        
        div.call(this, x, y, o);
    }

    // Render a rectangle on the canvas
    function rect(x, y, width, height, color, options) {

        var o = extend(divArgs, rectOptions);

        o.borderTop = height + 'px solid ' + color;
        o.width = width + 'px';

        if (options) {
            if (options.angle) {
                o.angle = options.angle;
            }
            
            if (options.anchorX) {
                o.anchorX = options.anchorX;
            }
            
            if (options.anchorY) {
                o.anchorY = options.anchorY;
            }
            
            if (options.offsetX) {
                o.offsetX = options.offsetX;
            }
            
            if (options.offsetY) {
                o.offsetY = options.offsetY;
            }
        }

        div.call(this, x, y, o);
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
            e = divElement.cloneNode(false);
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

        if (this._buffer.length > pointer && pointer >= 0) {
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

    function extend(target) {
        var source,  name, i;

        for (i = 1; i < arguments.length; i += 1) {
            source = arguments[i];
            
            for (name in source) {
                if (source.hasOwnProperty(name)) {
                    target[name] = source[name];
                }
            }
        }

        return target;
    }

}(window))