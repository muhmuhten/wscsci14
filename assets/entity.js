Game.Entity = (function () {
  "use strict";

  function Entity(attr) {
    this.attr = this.attr || {};
    this.attr.model = attr.model || "nobody";
    this.attr.x = attr.x || 0;
    this.attr.y = attr.y || 0;

    var mixins = Game.EntityModel.db[this.attr.model].mixins;
    console.dir(Game.EntityModel.db);
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
  Entity.prototype.move = function (x,y) {
    this.setX(this.getX() + x);
    this.setY(this.getY() + y);
  };

  return Entity;
})();
