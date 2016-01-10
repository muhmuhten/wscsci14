Game.StateWrapper = (function () {
  "use strict";

  function State(attr) {
    if (attr.rng != null) {
      ROT.RNG.setState(attr.rng);
    }
    this.map = new Game.Map(attr.map);
  }

  State.prototype.toJSON = function () {
    var out = {
      rng: ROT.RNG.getState(),
    };
    for (var key in this) {
      if (!this.hasOwnProperty(key)) continue;
      out[key] = this[key].attr;
    }
    return out;
  }

  return State;
})();
