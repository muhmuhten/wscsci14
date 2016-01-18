Game.Entity = (function () {
  "use strict";

  function Entity(attr) {
    Game.Mixin.call(this);

    this.attr = this.attr || {};
    this.attr.model = attr.model || "nobody";
    this.mixins(Game.EntityModel.db[this.attr.model].mixins, attr);

    if (attr.pos) {
      this.attr.x = attr.pos[0];
      this.attr.y = attr.pos[1];
    }
    else {
      this.attr.x = attr.x || 0;
      this.attr.y = attr.y || 0;
    }
  }
  Entity.extend(Game.Mixin);

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

  return Entity;
})();
