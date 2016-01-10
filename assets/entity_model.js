Game.EntityModel = (function () {
  "use strict";

  function Model(attr) {
    Game.Symbol.call(this, attr);
    this.id = attr.id;
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
    chr: '@'
  }));

  return Model;
})();
