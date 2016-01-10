Game.Message = (function () {
  "use strict";

  return {
    QUEUE_SIZE: 20,
    OLD_COLORS: "%c{#666}",
    NEW_COLORS: "%c{#ff0}",

    _queue: [],
    _fresh: 0,

    clear: function () {
      this._queue = [];
    },

    send: function (msg, colors) {
      this._queue.unshift([colors || this.NEW_COLORS, msg]);
      delete this._queue[this.QUEUE_SIZE]; // size limit
    },

    render: function (disp) {
      var i = disp.getOptions().height;
      for (i--; i >= 0; i--) {
        var msg = this._queue[i];
        if (!msg) continue;
        disp.drawText(1,i, this._queue[i].join(""));
      }
    }
  };
})();
