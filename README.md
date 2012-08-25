## simpleCanvas

An efficient JavaScript library for rendering content using divs, images and css.

This project evolved from the need to be able to render barcharts efficiently in IE8 and below. The current implementation buffers a number if hidden divs inside a container and sets the styles accordingly. The buffer size dynamically grows according to the number of elements that are required, and allows for this to be preset according to likely usage. Elements are reused where possible, and internally no div elements are destroyed. The API allows for a reduction in the buffer size, and thus the destruction of div elements, if explicitly requested. Div borders are used to draw the rectangles to ensure that the resulting image can be printed without changing browser settings to allow background printing.

### Examples

See simpleCanvas.html for an example. API docs and further examples will be developed later.

### Todo

  - ~~Rectangle rendering capability~~
  - ~~Text rendering capability~~
  - Image rendering capability
  - Rotation capability
  - ~~Element position anchoring~~
  - Line rendering capability (rotated rectangle drawing sugar)
  ~~ Single element updating and removal ~~ **Not implementing this feature, the canvas will behave like a rasterised canvas**

  - **Unit tests**
  - **API docs**

### Limitations
  - No complex objects such as arbitrary polygons or circles
  - No stroke styles or other styles, it's simply rectangles, lines and images, but it's fast. Stroke can be constructed manually if required.
  - Text is placed as normal text elements inside a div. The raises concerns about printing because light colours become dark on printing. The simplest solution is to use dark text on light backgrounds to facilitate printing. Could consider writing a bitmap/png font rendering system from images, but it seems unnecessary.

### Licence

simpleCanvas is licensed under the **"Modified BSD" 3-clause licence**. Essentially this software is open source and
free to use in commercial and non-commercial products. The 3-clause portion of the license ensures that the
copyright notices are retained and that the names of contributors are not used for endorsement purposes
without prior written consent. The 3-clause BSD licence **is compatible with the GPL**.

See LICENCE for more details