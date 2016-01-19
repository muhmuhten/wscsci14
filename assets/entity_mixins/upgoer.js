Game.EntityMixin.UpGoerFive = (function () {
  "use strict";

  return {
    act: function () {
      this.walk(0,-1);
      this.delay(5);
    },
  };
})();
