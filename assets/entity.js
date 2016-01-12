Game.Entity = (function () {
  "use strict";

  function Entity(attr) {
    this.attr = this.attr || {};
    this.attr.model = attr.model || "nobody";
    this.attr.x = attr.x || 0;
    this.attr.y = attr.y || 0;

    this._events = {}

    var mixins = Game.EntityModel.db[this.attr.model].mixins;
    for (var i in mixins) {
      var mix = mixins[i];

      for (var key in mix) {
        if (!mix.hasOwnProperty(key)) continue;
        if (key === "_meta") continue;
        this[key] = mix[key];
      }

      if (mix._meta && mix._meta.init) {
        mix._meta.init.call(this, attr);
      }
    }
  }

  Entity.prototype.getModel = function () {
    return Game.EntityModel.db[this.attr.model || "nobody"];
  };

  Entity.prototype.getX = function () {
    return this.attr.x;
  };
  Entity.prototype.setX = function (x) {
    this.attr.x = x;
  };
  Entity.prototype.getY = function () {
    return this.attr.y;
  };
  Entity.prototype.setY = function (y) {
    this.attr.y = y;
  };
  Entity.prototype.setPos = function (x,y) {
    if (x != null) this.setX(x);
    if (y != null) this.setY(y);
  };
  Entity.prototype.move = function (x,y) {
    this.setX(this.getX() + x);
    this.setY(this.getY() + y);
  };

  Entity.prototype.render = function (disp, x,y) {
    this.getModel().render(disp, x,y);
  };

  Entity.prototype.listen = function (ty, f) {
    this._events[ty] = this._events[ty] || [];
    this._events[ty].push(f);
  };
  Entity.prototype.hear = function (ty) {
    if (this._events[ty]) {
      for (var key in this._events[ty]) {
        this._events[ty][key].apply(this,
            Array.prototype.slice.call(arguments, 1));
      }
    }
  };

  return Entity;
})();
