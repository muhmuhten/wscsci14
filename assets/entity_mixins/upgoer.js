Game.EntityMixin.UpGoerFive = (function () {
  "use strict";

  return {
    act: function () {
      this.walk(0,-1/4);
      this.delay(1);
    },
  };
})();
