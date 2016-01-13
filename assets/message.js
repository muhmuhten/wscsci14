Game.Message = (function () {
  "use strict";

  return {
    QUEUE_SIZE: 20,
    COLOUR_SCHEME: {
      "new": "%c{yellow}",
      "old": "%c{grey}",
      "warning": "%c{red}"
    },

    clear: function () {
      delete Game.state.msq;
    },

    warn: function (msg) {
      this.send(msg, "warning");
    },

    send: function (msg, age) {
      var msq = Game.state.msq = Game.state.msq || [];

      if (msq[0] && msq[0].msg === msg) {
        msq[0].num++;
      }
      else {
        msq.unshift({msg: msg, num: 1});
      }
      msq[0].age = age || "new";

      while (msq.length > this.QUEUE_SIZE) {
        msq.pop();
      }
    },

    decay: function (n) {
      var msq = Game.state.msq || [];

      for (n = n || 0; n < msq.length; n++) {
        msq[n].age = "old";
      }
    },
    
    render: function (disp) {
      var msq = Game.state.msq || [];
      var max = disp.getOptions().height - 1;

      for (var i = max; i >= 0; i--) {
        if (!msq[i]) continue;
        var accum = [];
        accum.push(this.COLOUR_SCHEME[msq[i].age] || msq[i].age);
        accum.push(msq[i].msg);
        if (msq[i].num != 1) {
          accum.push(" (x", msq[i].num, ")");
        }

        disp.drawText(1,max-i, accum.join(""));
      }
    }
  };
})();
