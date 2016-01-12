Game.EntityMixin.Chronicle = (function () {
  "use strict";

  return {
    _meta: {
      init: function (attr) {
        this.attr.Chronicle = attr.Chronicle || 0;

        this.listen("time", function () {
          this.trackTurn();
        });
      },
    },
    getTurns: function () {
      return this.attr.Chronicle;
    },
    trackTurn: function () {
      this.attr.Chronicle++;
    },
  };
})();
