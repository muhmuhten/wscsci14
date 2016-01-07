(function (Game) {
  "use strict";

  var DEFAULTS = {
    FG: '#fff',
    BG: '#000',
  };

  function noOp() {}
  function writeTo(d, x,y, msg, fg, bg) {
    return d.drawText(x,y, msg, fg || DEFAULTS.FG, bg || DEFAULTS.bg);
  }

  Game.UIMode = {
    DEFAULTS: DEFAULTS,

    menu: {
      enter: function () {
        console.log("menu enter");
      },
      exit: function () {
        console.log("menu exit");
      },
      render: {
        main: function (d) {
          writeTo(d, 1,1, "Press:")
          writeTo(d, 3,3, "[N] Start a new game");
          writeTo(d, 3,4, "[L] Load the saved game");
          writeTo(d, 3,5, "[S] Save the current game");
        },
      },
      handleInput: function (ty, ev) {
        var last = this._lastInvalid;
        this._lastInvalid = null;

        if (ev.code == "KeyN") {
          Game.switchMode("play");
          return;
        }
        if (ev.code == "KeyL") {
          Game.switchMode("load");
          return;
        }
        if (ev.code == "KeyS") {
          Game.switchMode("save");
          return;
        }

        if (ev.code !== last) {
          this._lastInvalid = ev.code;
          Game.Message.send("Invalid choice: " + ev.code);
        }
      },
    },

    load: {
      enter: function () {
        Game.switchMode("play");
      },
      exit: noOp,
      handleInput: noOp,
    },
    save: {
      enter: function () {
        Game.switchMode("play");
      },
      exit: noOp,
      handleInput: noOp,
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
