Game.UIMode = (function () {
  "use strict";

  function checkLocalStorage() {
    if (window.localStorage) return true;
    Game.Message.warn("Local storage not available.");
    return false;
  }

  function noOp() {}

  function chooseRoomTile(room) {
    return {
      x: ROT.RNG.getUniformInt(room.getLeft(), room.getRight()),
      y: ROT.RNG.getUniformInt(room.getTop(), room.getBottom()),
    };
  }

  function moveAvatar(x,y) {
    return function() {
      Game.state.entities.getAvatar().nextAction = function () {
        var res = this.walk(x,y);

        switch (res && res.what) {
          case "wall":
          case "entity":
            break;

          default:
            this.delay(1);
            break;
        }
      }
    }
  }

  var lastKey = ' ';
  function keybindHandler(ty, ev) {
    Game.Message.decay();

    var code = ev.charCode || ev.which || ev.keyCode;
    switch (ty) {
      case "keydown":
        code = "Down" + code;
        if (ev.shiftKey) {
          code = "Shift" + code;
        }
        break;

      case "keypress":
        code = String.fromCharCode(code);
        break;
    }
    lastKey = code;

    var bound = this.keys[code];
    if (bound == null) {
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
        n: "newGame",
        l: "load",
        s: "save",
      },
    },

    newGame: {
      enter: function () {
        var tiles = [];
        var gener = new ROT.Map.Digger(80, 24);
        gener.create(function (x,y,v) {
          if (tiles[x] == null) tiles[x] = [];

          if (v === 0) {
            tiles[x][y] = "floor";
          }
          else {
            tiles[x][y] = "floor";
            tiles[x][y] = ROT.RNG.getUniformInt(0,3) ? "crystal" : "wall";
          }
        });
        var rooms = gener.getRooms();
        var exit = chooseRoomTile(rooms[rooms.length-1]);
        tiles[exit.x][exit.y] = "exit";

        Game.state = new Game.StateWrapper({
          map: {tiles: tiles},
        });

        Game.Message.send("New game! Try not to die.");

        Game.state.entities.add(new Game.Entity({
          model: "avatar",
          Position: chooseRoomTile(rooms[0]),
        }));

        for (var i = 10; i--;) {
          Game.state.entities.add(new Game.Entity({
            model: "moss",
            Position: Game.state.map.chooseWalkableTile(),
          }));
        }

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

        Game.state = new Game.StateWrapper(JSON.parse(state));
        Game.Message.send("Welcome back! Try not to die.");
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
      loop: null,
      enter: function (d) {
        this.loop = setInterval(function () {
          Game.state.entities.spam("elapse", 1);
          Game.renderAll();
        }, 50);
      },
      exit: function () {
        clearInterval(this.loop);
      },
      render: {
        main: function (d) {
          Game.state.map.render(d);
        },
        avatar: function (d) {
          var avatar = Game.state.entities.getAvatar();
          var row = 0;

          row++;
          d.drawText(1,row++, "avatar x: " + avatar.getX());
          d.drawText(1,row++, "avatar y: " + avatar.getY());
          d.drawText(1,row++, "turns:    " + (avatar.getTurns()/20|0));
          d.drawText(1,row++, "last key: " + lastKey);
          row++;
          d.drawText(1,row++, "Controls:");
          d.drawText(1,row++, "[<] win, if on <");
          d.drawText(1,row++, "[S] Back to menu");
          row++;
          d.drawText(1,row++, "Directions:");
          row++;
          d.drawText(5,row++, "789   yku");
          d.drawText(5,row++, "4 6   h l");
          d.drawText(5,row++, "123   bjn");
        },
      },
      handleInput: keybindHandler,
      keys: {
        Down27: "lose",
        s: "menu",

        '<': function () {
          var avatar = Game.state.entities.getAvatar();
          var tile = Game.state.map.getTile(avatar.intX(), avatar.intY());
          if (tile.getId() === "exit") {
            Game.switchMode("win");
          }
          else {
            Game.Message.send("You can't go up here.");
          }
        },

        1: moveAvatar(-1,1),
        2: moveAvatar(0,1),
        3: moveAvatar(1,1),
        4: moveAvatar(-1,0),
        5: noOp,
        6: moveAvatar(1,0),
        7: moveAvatar(-1,-1),
        8: moveAvatar(0,-1),
        9: moveAvatar(1,-1),

        h: moveAvatar(-1,0),
        j: moveAvatar(0,1),
        k: moveAvatar(0,-1),
        l: moveAvatar(1,0),
        y: moveAvatar(-1,-1),
        u: moveAvatar(1,-1),
        b: moveAvatar(-1,1),
        n: moveAvatar(1,1),
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
