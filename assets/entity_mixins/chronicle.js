Game.EntityMixin.Chronicle = (function () {
  "use strict";

  return {
    _meta: {
      init: function (attr) {
        this.attr.Chronicle = attr.Chronicle || 0;
      },
      events: {
        elapse: function (d) {
          this.setTurns(this.getTurns() + d);
        },
      },
    },
    getTurns: function () {
      return this.attr.Chronicle;
    },
    setTurns: function (t) {
      this.attr.Chronicle = t;
    }
  };
})();
