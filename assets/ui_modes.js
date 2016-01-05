(function (Game) {
  "use strict";

  var DEFAULTS = {
    FG: '#fff',
    BG: '#000',
  };

  function writeTo(d, x,y, msg, fg, bg) {
    return d.drawText(x,y, msg, fg || DEFAULTS.FG, bg || DEFAULTS.bg);
  }

  Game.UIMode = {
    DEFAULTS: DEFAULTS,

    start: {
      enter: function () {
        console.log("start enter");
      },
      exit: function () {
        console.log("start exit");
      },
      render: {
        main: function (d) {
          writeTo(d, 1,1, "game start");
          writeTo(d, 1,3, "press any key to play");
        },
      },
      handleInput: function (ty, ev) {
        if (ev.charCode === 0) return;
        Game.switchMode("play");
      },
    },

    play: {
      enter: function () {
        console.log("play enter");
      },
      exit: function () {
        console.log("play exit");
      },
      render: {
        main: function (d) {
          writeTo(d, 1,1, "Game play:");
          writeTo(d, 3,3, "Press [RET] to win.");
          writeTo(d, 3,4, "Press [ESC] to lose.");
        },
      },
      handleInput: function (ty, ev) {
        Game.Message.send("You pressed: " + String.fromCharCode(ev.charCode));
        if (ty === "keypress" && ev.code === "Enter") {
          Game.switchMode("win");
        }
        else if (ty == "keydown" && ev.keyCode == 27) {
          Game.switchMode("lose");
        }
      }
    },

    win: {
      enter: function () {
        console.log("winning");
      },
      exit: function () {
        console.log("done winning");
      },
      render: {
        main: function (d) {
          writeTo(d, 1,1, "CONGATULATION!!! YOU ARE SINNER!!!!");
        },
      }
    },

    lose: {
      enter: function () {
        console.log("losing");
      },
      exit: function () {
        console.log("done losing");
      },
      render: {
        main: function (d) {
          writeTo(d, 1,1, "whoops you lost the game");
        },
      }
    },
  };
})(window.Game)
