Game.UIMode = (function () {
  "use strict";

  function checkLocalStorage() {
    if (window.localStorage) return localStorage;
    Game.Message.warn("Local storage not available.");
    return false;
  }

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
      };
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
    if (bound != null) return bound(ty, ev);
  }

  var UIMode = {
    STORE_KEY: "6b8b78f9bf0bec2540201010245841c71cd7c1b5297bf2a051fb0373",

    "": {
      render: {
        message: function (d) {
          Game.Message.render(d);
        },
      },
    },

    menu: {
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
        n: function () { Game.initMode("newGame"); },
        l: function () { Game.initMode("load"); },
        s: function () { Game.initMode("save"); },
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

        for (var i = 10; i--;) {
          Game.state.entities.add(new Game.Entity({
            model: "candy",
            Position: Game.state.map.chooseWalkableTile(),
          }));
        }

        Game.initMode("play");

        Game.initMode("play");
      },
    },
    load: {
      enter: function () {
        if (!checkLocalStorage()) {
          Game.initMode("newGame");
          return;
        }

        var state = localStorage.getItem(UIMode.STORE_KEY);
        if (state == null) {
          Game.Message.warn("No saved game found.");
          Game.initMode("newGame");
          return;
        }

        Game.state = new Game.StateWrapper(JSON.parse(state));
        Game.Message.send("Welcome back! Try not to die.");
        Game.initMode("play");
      },
    },
    save: {
      enter: function () {
        if (Game.state == null) {
          Game.Message.warn("No game to save.");
          Game.initMode("menu");
          return;
        }

        if (checkLocalStorage()) {
          localStorage.clear();
          localStorage.setItem(UIMode.STORE_KEY, JSON.stringify(Game.state));
        }

        Game.popMode();
      },
    },

    play: {
      loop: null,
      enter: function (d) {
        this.loop = setInterval(function () {
          Game.state.entities.spam("elapse", 1);
          Game.renderAll();
        }, 100);
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
          d.drawText(1,row++, "turns:    " + (avatar.getTurns()/10|0));
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
        '=': function () { Game.initMode("menu"); },
        Down27: function () { Game.initMode("lose"); },
        '<': function () {
          var avatar = Game.state.entities.getAvatar();
          var tile = Game.state.map.getTile(avatar.intX(), avatar.intY());
          if (tile.getId() === "exit") {
            Game.initMode("win");
          }
          else {
            Game.Message.send("You can't go up here.");
          }
        },

        1: moveAvatar(-1,1),
        2: moveAvatar(0,1),
        3: moveAvatar(1,1),
        4: moveAvatar(-1,0),
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

        g: function () { Game.pushMode("pickup"); },
      },
    },

    pickup: {
      items: null,
      enter: function () {
        var avatar = Game.state.entities.getAvatar();
        var items = this.items = [];
        Game.state.entities.spam("loot", items, avatar);

        this.keys = {
          Down13: function () {
            avatar.nextAction = function () {
              for (var i = 0; i < items.length; i++) {
                if (!items[i].want) continue;
                items[i].item.pickup(this);
                this.delay(1);
              }
            };
            Game.popMode();
          },
          Down27: function () {
            Game.popMode();
          },
        };

        for (var i = 1; i <= items.length; i++) {
          this.keys[i] = (function (j) {
            return function () {
              items[j].want = !items[j].want;
            };
          })(i-1);
        }
      },
      handleInput: keybindHandler,
      render: {
        main: function (d) {
          for (var i = 1; i <= this.items.length; i++) {
            var it = this.items[i-1];
            d.drawText(3,i, ""+i);
            d.drawText(6,i, it.want ? "+" : "-");
            d.drawText(8,i, it.item.getModel().getId());
          }
        },
      },
    },

    win: {
      lock: false,
      enter: function () {
        this.lock = true;
        setTimeout(function () { this.lock = false; }.bind(this), 1000);
      },
      handleInput: function (s) {
        if (this.lock) return;
        Game.initMode("menu");
      },
      render: {
        main: function (d) {
          d.drawText(1,1, "CONGATULATION!!! YOU ARE SINNER!!!!");
        },
      },
    },

    lose: {
      lock: false,
      enter: function () {
        this.lock = true;
        setTimeout(function () { this.lock = false; }.bind(this), 1000);
      },
      handleInput: function (s) {
        if (this.lock) return;
        Game.initMode("menu");
      },
      render: {
        main: function (d) {
          d.drawText(1,1, "whoops you lost the game");
        },
      },
    },
  };

  return UIMode;
})();
