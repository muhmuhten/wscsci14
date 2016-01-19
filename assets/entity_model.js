Game.EntityModel = (function () {
  "use strict";

  var Mx = Game.EntityMixin;

  function Model(attr) {
    Game.Symbol.call(this, attr);
    this.id = attr.id;
    this.mixins = attr.mixins || [];
  }
  Model.extend(Game.Symbol);

  Model.prototype.getId = function () {
    return this.id;
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
    mixins: [Mx.Position, Mx.Solid, Mx.Walker, Mx.Chronicle, Mx.Duration, Mx.Walker, Mx.Avatar]
  }));

  Model.register(new Model({
    id: "moss",
    chr: '%',
    fg: 'green',
    mixins: [Mx.Position, Mx.Solid, Mx.Mortal, Mx.TouchToKill, Mx.Duration, Mx.Walker, Mx.UpGoerFive]
  }));

  return Model;
})();
