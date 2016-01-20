Game.Symbol = (function () {
  "use strict";

  function Symbol(attr) {
    this.chr = attr.chr || '*';
    // it's ok for these to be undefined, .draw() does the right thing
    this.fg = attr.fg;
    this.bg = attr.bg;
  }

  Symbol.prototype.getChr = function () {
    return this.chr;
  }
  Symbol.prototype.getFg = function () {
    return this.fg;
  }
  Symbol.prototype.getBg = function () {
    return this.bg;
  }

  Symbol.prototype.render = function (d, x,y, fg, bg) {
    d.draw(x,y, this.getChr(), fg || this.getFg(), bg || this.getBg());
  };

  return Symbol;
})();
