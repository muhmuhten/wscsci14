Game.Symbol = (function () {
  "use strict";

  function Symbol(attr) {
    this.chr = attr.chr || '*';
    this.fg = attr.fg || Game.UIMode.DEFAULTS.FG;
    this.bg = attr.bg || Game.UIMode.DEFAULTS.BG;
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

  Symbol.prototype.render = function (d, x,y) {
    d.draw(x,y, this.getChr(), this.getFg(), this.getBg());
  };

  return Symbol;
})();
