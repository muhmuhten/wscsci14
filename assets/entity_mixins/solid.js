Game.EntityMixin.Solid = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        collision: function (p, q) {
          var s = this.getPos();
          if (q.x === s.x && q.x === s.x) return; // same entity

          var d = Math.pow(p.x-s.x, 2) + Math.pow(p.y-s.y, 2);
          if (d < 1) return this;
        },
      },
    },
  };
})();
