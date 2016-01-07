(function (Game) {
  "use strict";

  var DEFAULTS = {
    FG: '#fff',
    BG: '#000',
    STORE_KEY: "6b8b78f9bf0bec2540201010245841c71cd7c1b5297bf2a051fb0373"
  };

  function checkLocalStorage() {
    if (window.localStorage) return true;
    Game.Message.send("%c{yellow}Local storage not available.");
    return false;
  }

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
          writeTo(d, 1,1, "Press:");
          writeTo(d, 3,3, "[N] Start a new game");

          if (checkLocalStorage()) {
            writeTo(d, 3,4, "[L] Load the saved game");
            writeTo(d, 3,5, "[S] Save the current game");
          }
        },
      },
      handleInput: function (ty, ev) {
        var last = this._lastInvalid;
        this._lastInvalid = null;

        if (ev.code === "KeyN") {
          Game.switchMode("newGame");
          return;
        }
        if (ev.code === "KeyL") {
          Game.switchMode("load");
          return;
        }
        if (ev.code === "KeyS") {
          Game.switchMode("save");
          return;
        }

        if (ev.code !== last) {
          this._lastInvalid = ev.code;
          Game.Message.send("Invalid choice: " + ev.code);
        }
      },
    },

    newGame: {
      enter: function () {
        Game.switchMode("play");
      },
      exit: noOp,
      handleInput: noOp,
    },
    load: {
      enter: function () {
        if (!checkLocalStorage()) {
          Game.switchMode("newGame");
          return;
        }

        var store = localStorage.getItem(DEFAULTS.STORE_KEY);
        if (store == null) {
          Game.Message.send("%c{yellow}No saved game found.");
          Game.switchMode("newGame");
          return;
        }

        var state = JSON.parse(store);
        ROT.RNG.setState(state.rng);
        Game.switchMode("play");
      },
      exit: noOp,
      handleInput: noOp,
    },
    save: {
      enter: function () {
        if (!checkLocalStorage()) {
          Game.switchMode("play");
          return;
        }

        var state = {
          rng: ROT.RNG.getState(),
        };
        localStorage.setItem(DEFAULTS.STORE_KEY, JSON.stringify(state));
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
          writeTo(d, 3,4, "Press [S] to access the persistence menu.");
        },
      },
      handleInput: function (ty, ev) {
        Game.Message.send("You pressed: " + String.fromCharCode(ev.charCode));

        if (ev.code === "Enter") {
          Game.switchMode("win");
          return;
        }
        if (ev.code === "Escape") {
          Game.switchMode("lose");
          return;
        }
        if (ev.code === "KeyS") {
          Game.switchMode("menu");
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
