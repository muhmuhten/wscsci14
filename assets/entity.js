Game.Entity = (function () {
  "use strict";

  function Entity(attr) {
    Game.Mixin.call(this);

    this.attr = this.attr || {};
    this.attr.model = attr.model || "nobody";
    this.mixins(Game.EntityModel.db[this.attr.model].mixins, attr);
  }
  Entity.extend(Game.Mixin);

  Entity.prototype.getModel = function () {
    return Game.EntityModel.db[this.attr.model || "nobody"];
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
