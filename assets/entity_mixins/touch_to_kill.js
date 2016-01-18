Game.EntityMixin.TouchToKill = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        touch: function (by) {
          if (by.getModel().getId() === "avatar") {
            this.kill();
          }
        },
      },
    },
  };
})();
