Game.UIMode = (function () {
  "use strict";

  function checkLocalStorage() {
    if (window.localStorage) return true;
    Game.Message.send("%c{yellow}Local storage not available.");
    return false;
  }

  function noOp() {}

  var UIMode = {
    STORE_KEY: "6b8b78f9bf0bec2540201010245841c71cd7c1b5297bf2a051fb0373",

    menu: {
      enter: function () {
        console.log("menu enter");
      },
      exit: function () {
        console.log("menu exit");
      },
      render: {
        main: function (d) {
          d.drawText(1,1, "Press:");
          d.drawText(3,3, "[N] Start a new game");

          if (checkLocalStorage()) {
            d.drawText(3,4, "[L] Load the saved game");
            d.drawText(3,5, "[S] Save the current game");
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
        var tiles = [];
        var gener = new ROT.Map.Cellular(80, 24);
        gener.randomize(0.5);

        for (var i = 3; i >= 0; i--) {
          gener.create();
        }

        gener.create(function (x,y,v) {
          if (tiles[x] == null) tiles[x] = [];

          if (v === 0) {
            tiles[x][y] = "wall";
          }
          else {
            tiles[x][y] = "floor";
          }
        });

        // XXX this is a weird place to put state
        Game._state = {
          map: new Game.Map({tiles: tiles}),
        };

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

        var store = localStorage.getItem(UIMode.STORE_KEY);
        if (store == null) {
          Game.Message.send("%c{yellow}No saved game found.");
          Game.switchMode("newGame");
          return;
        }

        var state = JSON.parse(store);
        Game._state = {
          map: new Game.Map(state.map),
        }
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
          map: Game._state.map.attr,
        };
        localStorage.setItem(UIMode.STORE_KEY, JSON.stringify(state));
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
          Game._state.map.render(d);
          d.drawText(1,1, "Game play:");
          d.drawText(3,3, "Press [RET] to win.");
          d.drawText(3,4, "Press [ESC] to lose.");
          d.drawText(3,4, "Press [S] to access the persistence menu.");
        },
      },
      handleInput: function (ty, ev) {
        Game.Message.send("You pressed: " + ev.code);

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
          d.drawText(1,1, "CONGATULATION!!! YOU ARE SINNER!!!!");
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
          d.drawText(1,1, "whoops you lost the game");
        },
      }
    },
  };

  return UIMode;
})();