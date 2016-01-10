Game.Message = (function () {
  "use strict";

  return {
    QUEUE_SIZE: 20,
    OLD_COLORS: "%c{grey}",
    NEW_COLORS: "%c{yellow}",
    WARNING_COLORS: "%c{red}",

    _queue: [],

    clear: function () {
      this._queue = [];
    },

    warn: function (msg) {
      this.send(msg, this.WARNING_COLORS);
    },

    send: function (msg, colors) {
      colors = colors || this.NEW_COLORS;

      if (this._queue[0] && msg === this._queue[0][1]) {
        if (this._queue[0][2] == null) {
          this._queue[0].push(" (x", 1, ")");
        }

        this._queue[0][3]++;
        this._queue[0][0] = colors;
      }
      else {
        this._queue.unshift([colors, msg]);
      }

      while (this._queue.length > this.QUEUE_SIZE) {
        this._queue.pop();
      }
    },

    decay: function (n) {
      for (var i = n || 0; i < this._queue.length; i++) {
        this._queue[i][0] = this.OLD_COLORS;
      }
    },

    render: function (disp) {
      var max = disp.getOptions().height - 1;
      for (var i = max; i >= 0; i--) {
        var msg = this._queue[i];
        if (!msg) continue;
        disp.drawText(1,max-i, this._queue[i].join(""));
      }
    }
  };
})();
