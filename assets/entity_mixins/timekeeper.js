Game.EntityMixin.Timekeeper = (function () {
  "use strict";
  
  return {
    _meta: {
      init: function () {
        this.listen("move", function () {
          Game.state.entities.each(function (e) {
            e.hear("time");
          });
        });
      },
    },
  };
})();
