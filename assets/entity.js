Game.Entity = (function () {
  "use strict";

  function Entity(attr) {
    this.attr = this.attr || {};
    this.attr.model = attr.model || "nobody";

    if (attr.pos) {
      this.attr.x = attr.pos[0];
      this.attr.y = attr.pos[1];
    }
    else {
      this.attr.x = attr.x || 0;
      this.attr.y = attr.y || 0;
    }

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

  for (var key in Game.Symbol.prototype) {
    if (!Game.Symbol.prototype.hasOwnProperty(key)) continue;
    Entity.prototype[key] = (function (k) {
      return function () {
        var model = this.getModel();
        return model[k].apply(model, arguments);
      }
    })(key);
  }

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
