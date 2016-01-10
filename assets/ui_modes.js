Game.UIMode = (function () {
  "use strict";

  function checkLocalStorage() {
    if (window.localStorage) return true;
    Game.Message.warn("Local storage not available.");
    return false;
  }

  function noOp() {}

  function moveAvatar(x,y) {
    return function () {
      Game.state.entities.getAvatar().move(x,y);
    }
  }

  function keybindHandler(ty, ev) {
    Game.Message.decay();

    var code = ev.code;
    if (ev.shiftKey) {
      code = "Shift" + code;
    }
    if (ev.altKey) {
      code = "Alt" + code;
    }
    if (ev.ctrlKey) {
      code = "Control" + code;
    }

    var bound = this.keys[code];
    if (bound == null) {
      Game.Message.send("You pressed: " + code);
    }
    else if (typeof bound === "string") {
      Game.switchMode(bound);
    }
    else { // assume function, can expand
      bound(ty, ev);
    }
  }

  var UIMode = {
    STORE_KEY: "6b8b78f9bf0bec2540201010245841c71cd7c1b5297bf2a051fb0373",

    menu: {
      enter: noOp,
      exit: noOp,
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
      handleInput: keybindHandler,
      keys: {
        KeyN: "newGame",
        KeyL: "load",
        KeyS: "save",
      },
    },

    newGame: {
      enter: function () {
        var tiles = [];
        var gener = new ROT.Map.Cellular(800, 240);
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

        Game.newState({
          map: {tiles: tiles},
        });

        Game.state.entities.add(new Game.Entity({
          model: "avatar",
          x: 20,
          y: 10,
        }));

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

        var state = localStorage.getItem(UIMode.STORE_KEY);
        if (state == null) {
          Game.Message.warn("No saved game found.");
          Game.switchMode("newGame");
          return;
        }

        Game.newState(JSON.parse(state));
        Game.switchMode("play");
      },
      exit: noOp,
      handleInput: noOp,
    },
    save: {
      enter: function () {
        if (!checkLocalStorage()) {
          Game.switchMode("menu");
          return;
        }

        if (Game.state == null) {
          Game.Message.warn("No game to save.");
          Game.switchMode("menu");
          return;
        }

        localStorage.clear();
        localStorage.setItem(UIMode.STORE_KEY, JSON.stringify(Game.state));
        Game.switchMode("play");
      },
      exit: noOp,
      handleInput: noOp,
    },

    play: {
      enter: noOp,
      exit: noOp,
      render: {
        main: function (d) {
          Game.state.map.render(d);
          d.drawText(1,1, "Game play:");
          d.drawText(3,3, "Press [RET] to win.");
          d.drawText(3,4, "Press [ESC] to lose.");
          d.drawText(3,5, "Press [S] to access the persistence menu.");
        },
        avatar: function (d) {
          var avatar = Game.state.entities.getAvatar();
          d.drawText(1,2, "avatar x: " + avatar.getX());
          d.drawText(1,3, "avatar y: " + avatar.getY());
        },
      },
      handleInput: keybindHandler,
      keys: {
        Enter: "win",
        Escape: "lose",
        KeyS: "menu",

        Digit1: moveAvatar(-1,1),
        Digit2: moveAvatar(0,1),
        Digit3: moveAvatar(1,1),
        Digit4: moveAvatar(-1,0),
        Digit5: noOp,
        Digit6: moveAvatar(1,0),
        Digit7: moveAvatar(-1,-1),
        Digit8: moveAvatar(0,-1),
        Digit9: moveAvatar(1,-1),

        KeyH: moveAvatar(-1,0),
        KeyJ: moveAvatar(0,1),
        KeyK: moveAvatar(0,-1),
        KeyL: moveAvatar(1,0),
        KeyY: moveAvatar(-1,-1),
        KeyU: moveAvatar(1,-1),
        KeyB: moveAvatar(-1,1),
        KeyN: moveAvatar(1,1),
      },
    },

    win: {
      enter: noOp,
      exit: noOp,
      render: {
        main: function (d) {
          d.drawText(1,1, "CONGATULATION!!! YOU ARE SINNER!!!!");
        },
      }
    },

    lose: {
      enter: noOp,
      exit: noOp,
      render: {
        main: function (d) {
          d.drawText(1,1, "whoops you lost the game");
        },
      }
    },
  };

  return UIMode;
})();
