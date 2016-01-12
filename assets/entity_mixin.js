Game.EntityMixin = (function () {
  "use strict";

  return {
    Timekeeper: {
      _meta: {
        init: function () {
          this.listen("move", function () {
            Game.state.entities.each(function (e) {
              e.hear("time");
            });
          });
        },
      },
    },

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
      render: function (disp, x,y) {
        this.getModel().fg = ROT.Color.toHex(
            ROT.Color.randomize(
              ROT.Color.fromString(this.getModel().fg),
              [10,10,10]));
        this.getModel().render(disp, x,y);
      },
    },

    Chronicle: {
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
    },

    Invisible: {
      render: function () {},
    },
  };
})();
