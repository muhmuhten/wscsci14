Game.EntityMixin.Timekeeper = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        move: function () {
          Game.state.entities.each(function (e) {
            e.hear("time");
          });
        },
      },
    },
  };
})();
