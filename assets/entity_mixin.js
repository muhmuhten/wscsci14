Game.EntityMixin = (function () {
  "use strict";

  return {
    Walker: {
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

        // XXX still stupid inefficient, violates encapsulation
        for (var key in Game.state.entities.all) {
          if (!Game.state.entities.all.hasOwnProperty(key)) continue;

          var e = Game.state.entities.all[key];
          if (e.getX() === newX && e.getY() === newY) {
            return {what: "entity", info: e};
          }
        }

        this.move(x,y);
        this.hear("move", newX, newY);
      },
    },

    ColourChanging: {
      _meta: {
        init: function (attr) {
          this.listen("move", function () {
            this.getModel().fg = ROT.Color.toHex(
                ROT.Color.randomize(
                  ROT.Color.fromString(this.getModel().fg),
                  [20,20,20]));
          });
        },
      },
    },

    Chronicle: {
      _meta: {
        init: function (attr) {
          this.attr.Chronicle = attr.Chronicle || 0;

          this.listen("move", function () {
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
    },

    Invisible: {
      render: function () {},
    },
  };
})();
