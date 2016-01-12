Game.EntityMixin.TouchToKill = (function () {
  "use strict";

  return {
    _meta: {
      init: function (attr) {
        this.listen("touch", function (by) {
          if (by.getModel().getId() === "avatar") {
            this.kill();
          }
        });
      },
    },
  };
})();
