var is = require('helpers').is;

// --- factories ---

Canvas.qs = function(selector) {
  var el = document.querySelector(selector);
  return Canvas.element(el);
};

Canvas.dimensions = function(width, height) {
  if (is.number(width) && is.number(height)) {
    var el = document.createElement('canvas');

    el.width = width;
    el.height = height;

    return new Canvas(el);
  } else {
    return null;
  }
};

Canvas.element = function(el) {
  if (is.canvas(el)) {
    return new Canvas(el);
  } else {
    return null;
  }
};

Canvas.clone = function(canvas) {
  if (canvas instanceof Canvas) {
    return Canvas.dimensions(canvas.getWidth(), canvas.getHeight());
  } else {
    return null;
  }
};

// --- implementation ---

function Canvas(element) {
  this.element = element;
  this.context = element.getContext('2d');
}

Canvas.prototype = {

  getWidth: function() {
    return this.element.width;
  },

  getHeight: function() {
    return this.element.height;
  },

  fillParent: function() {
    var parent = this.element.parentNode;
    
    this.element.width = parent.clientWidth;
    this.element.height = parent.clientHeight;
  },

  // --- drawing ---

  draw: function(ctx, x, y) {
    ctx.drawImage(this.element, x, y);
  },

  drawRect: function(ctx, rect, x, y) {
    ctx.drawImage(
      this.element,
      rect.left, rect.top, rect.width, rect.height,
      x, y, rect.width, rect.height
    );
  }

};

module.exports = Canvas;
