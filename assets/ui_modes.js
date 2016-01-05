(function (Game) {
  "use strict";

  var DEFAULTS = {
    FG: '#fff',
    BG: '#000',
  };

  Game.UIMode = {
    DEFAULTS: DEFAULTS,

    gameStart: {
      enter: function () {
        console.log("gameStart enter");
      },
      exit: function () {
        console.log("gameStart exit");
      },
      render: {
        main: function (display) {
          display.drawText(1,1, "game start",
              DEFAULTS.FG, DEFAULTS.BG);
          display.drawText(1,3, "press any key to play",
              DEFAULTS.FG, DEFAULTS.BG);
        },
      },
      handleInput: function (ty, ev) {
        console.log("gameStart event, type=" + ty);
        console.dir(ev);
      },
    },
  };
})(window.Game)
