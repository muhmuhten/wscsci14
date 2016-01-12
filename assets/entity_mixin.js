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

        // XXX probably stupid inefficient
        var overlap = Game.state.entities.any(function (e) {
          return e.getX() === newX && e.getY() === newY;
        });
        if (overlap) {
          return {what: "entity", info: overlap};
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
