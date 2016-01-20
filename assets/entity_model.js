Game.EntityModel = (function () {
  "use strict";

  var Mx = Game.EntityMixin;

  function Model(attr) {
    Game.Symbol.call(this, attr);
    this.id = attr.id;
    this.name = attr.name;
    this.mixins = attr.mixins || [];
  }
  Model.extend(Game.Symbol);

  Model.prototype.getId = function () {
    return this.id;
  };
  Model.prototype.getName = function () {
    return this.name || this.id;
  };

  Model.db = {};
  Model.register = function (t) {
    this.db[t.getId()] = t;
  };

  Model.register(new Model({
    id: "nobody", // error?
    chr: '&'
  }));

  Model.register(new Model({
    id: "avatar",
    chr: '@',
    fg: "magenta",
    mixins: [
      Mx.Avatar,
      Mx.Chronicle,
      Mx.Duration,
      Mx.Inventory,
      Mx.Position,
      Mx.Solid,
      Mx.TouchToKill,
      Mx.Walker,
    ]
  }));

  Model.register(new Model({
    id: "moss",
    chr: '%',
    fg: "green",
    mixins: [
      Mx.Duration,
      Mx.Mortal,
      Mx.Position,
      Mx.Solid,
      Mx.TouchToKill,
      Mx.UpGoerFive,
      Mx.Walker,
    ]
  }));

  Model.register(new Model({
    id: "candy",
    name: "poisoned candy",
    chr: '!',
    fg: "red",
    mixins: [
      Mx.Item,
      Mx.Position,
    ]
  }));

  return Model;
})();
