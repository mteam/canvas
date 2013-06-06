var is = require('helpers').is;

// --- factories ---

Canvas.fromSelector = function(selector) {
  var el = document.querySelector(selector);
  return el ? Canvas.element(el) : null;
};

Canvas.fromSize = function(width, height) {
  if (is.number(width) && is.number(height)) {
    var el = document.createElement('canvas');

    el.width = width;
    el.height = height;

    return new Canvas(el);
  } else {
    return null;
  }
};

Canvas.fromElement = function(el) {
  return is.canvas(el) ? new Canvas(el) : null;
};

Canvas.clone = function(canvas) {
  if (canvas instanceof Canvas) {
    return Canvas.fromSize(canvas.width(), canvas.height());
  } else {
    return null;
  }
};

// --- implementation ---

function Canvas(element) {
  this.el = element;
  this.ctx = element.getContext('2d');
}

Canvas.prototype = {

  width: function() {
    return this.el.width;
  },

  height: function() {
    return this.el.height;
  },

  fillParent: function() {
    var parent = this.el.parentNode;
    
    this.el.width = parent.clientWidth;
    this.el.height = parent.clientHeight;
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width(), this.height());
  },

  draw: function(ctx, x, y) {
    ctx.drawImage(this.el, x, y);
  }

};

module.exports = Canvas;
