Game.EntityMixin.Walker = (function () {
  "use strict";

  return {
    _meta: {
      init: function () {
      },
    },

    walk: function (x,y) {
      var nux = this.getX() + x;
      var nuy = this.getY() + y;

      var fx = Math.floor(nux), cx = Math.ceil(nux);
      var fy = Math.floor(nuy), cy = Math.ceil(nuy);

      if (!Game.state.map.getTile(fx, fy).canWalk()
          || !Game.state.map.getTile(fx, cy).canWalk()
          || !Game.state.map.getTile(cx, fy).canWalk()
          || !Game.state.map.getTile(cx, cy).canWalk()) {
        return {what: "wall"};
      }

      var ent = Game.state.entities.spam("collision", this, nux, nuy);
      if (ent) {
        return {what: "entity", info: ent};
      }

      this.move(x,y);
    },
  };
})();
