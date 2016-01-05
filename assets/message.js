(function (Game) {
  "use strict";

  Game.Message = {
    QUEUE_SIZE: Game._displays.message.frame.height, // XXX
    _qix: 0,
    _que: [],

    clear: function () {
      this._que = [];
      this._qix = 0;
    },

    send: function (msg) {
      this._que[this._qix] = msg;
      this._qix += 1;
      this._qix %= this.QUEUE_SIZE;
    },

    render: function (disp) {
      for (var i = 0; i < this.QUEUE_SIZE; i++) {
        var j = (this._qix + i) % this.QUEUE_SIZE;
        var m = this._que[j] || "";
        disp.drawText(1,i, m);
      }
    }
  };
})(window.Game)
