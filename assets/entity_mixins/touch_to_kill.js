Game.EntityMixin.TouchToKill = (function () {
  "use strict";

  return {
    _meta: {
      events: {
        touch: function (by) {
          this.kill(by);
        },
      },
    },
  };
})();
