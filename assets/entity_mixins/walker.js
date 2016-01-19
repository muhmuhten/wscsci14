Game.EntityMixin.Walker = (function () {
  "use strict";

  return {
    _meta: {
      init: function () {
      },
    },

    walk: function (x,y) {
      var newX = this.getX() + x;
      var newY = this.getY() + y;

      if (!Game.state.map.getTile(newX, newY).canWalk()) {
        return {what: "wall"};
      }

      var ent = Game.state.entities.spam("collision", newX, newY);
      if (ent) {
        return {what: "entity", info: ent};
      }

      this.move(x,y);
      this.hear("move", newX, newY);
    },
  };
})();
