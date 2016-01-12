Game.EntityModel = (function () {
  "use strict";

  var Mixin = Game.EntityMixin;

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
    mixins: [Mixin.Timekeeper, Mixin.Walker, Mixin.Chronicle, Mixin.ColourChanging]
  }));

  Model.register(new Model({
    id: "moss",
    chr: '%',
    fg: 'green',
    mixins: [Mixin.ColourChanging]
  }));

  return Model;
})();
