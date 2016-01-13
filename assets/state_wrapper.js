Game.StateWrapper = (function () {
  "use strict";

  function State(attr) {
    if (attr.rng != null) {
      ROT.RNG.setState(attr.rng);
    }
    this.msq = attr.msq;
    this.map = new Game.Map(attr.map);
    this.entities = new Game.EntityStore(attr.entities || {});
  }

  State.prototype.toJSON = function () {
    var out = {
      rng: ROT.RNG.getState(),
    };
    for (var key in this) {
      if (!this.hasOwnProperty(key)) continue;
      out[key] = this[key].attr || this[key];
    }
    return out;
  }

  return State;
})();
