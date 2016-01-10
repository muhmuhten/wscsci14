Game.Entity = (function () {
  "use strict";

  function Entity(attr) {
    this.attr = this.attr || {};
    this.attr.model = attr.model || "nobody";
    this.attr.x = attr.x || 0;
    this.attr.y = attr.y || 0;
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

  return Entity;
})();
