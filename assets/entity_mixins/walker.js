Game.EntityMixin.Walker = (function () {
  "use strict";

  return {
    _meta: {
      init: function () {
      },
    },

    walk: function (x,y) {
      var q = this.getPos();
      var p = {x: q.x+x, y: q.y+y};

      var fx = Math.floor(p.x), cx = Math.ceil(p.x);
      var fy = Math.floor(p.y), cy = Math.ceil(p.y);

      if (!Game.state.map.getTile(fx, fy).canWalk()
          || !Game.state.map.getTile(fx, cy).canWalk()
          || !Game.state.map.getTile(cx, fy).canWalk()
          || !Game.state.map.getTile(cx, cy).canWalk()) {
        return {what: "wall"};
      }

      var ent = Game.state.entities.spam("collision", p, q);
      if (ent) {
        return {what: "entity", info: ent};
      }

      this.move(x,y);
    },
  };
})();
