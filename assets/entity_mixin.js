Game.EntityMixin = (function () {
  "use strict";

  return {
    Walker: {
      _meta: {},
      walk: function (x,y) {
        this.move(x,y);
      },
    },
  };
})();
