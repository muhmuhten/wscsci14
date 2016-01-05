(function () {
  "use strict";

  window.Game = {
    init: function () {
      console.log("WSRL Live Initialization");

      this.eachDisplay(function (key, disp) {
        disp.obj = new ROT.Display(disp.frame);
      });

      this.renderAll();
    },

    eachDisplay: function (f) {
      for (var key in this._displays) {
        if (this._displays.hasOwnProperty(key)) {
          f.call(self, key, this._displays[key]);
        }
      }
    },

    renderAll: function () {
      var self = this;
      this.eachDisplay(function (key, disp) {
        disp.obj.clear();
        ((self._uiMode && self._uiMode.render && self._uiMode.render[key])
         || disp.defaultRender)(disp.obj);
      });
    },

    getDisplay: function (displayName) {
      return this._displays[displayName].obj;
    },

    handleEvent: function (ty, ev) {
      if (this._uiMode == null || this._uiMode.handleInput == null) return;
      this._uiMode.handleInput(ty, ev);
      this.renderAll();
    },

    switchMode: function (key) {
      var mode = Game.UIMode[key];
      if (mode == null) {
        Game.Message.send("%c{red}Switched to bad mode '" + key + "'");
      }
      this._switchMode(mode);
    },

    _switchMode: function (mode) {
      if (this._uiMode != null) this._uiMode.exit();
      this._uiMode = mode;
      if (this._uiMode != null) this._uiMode.enter();
      this.renderAll();
    },

    _displays: {
      main: {
        frame: { width: 80, height: 24 },
        defaultRender: function (disp) {
          disp.drawText(2,3, "Something unexpected happened. This is bad.");
        },
      },
      avatar: {
        frame: { width: 20, height: 24 },
        defaultRender: function (disp) {
        },
      },
      message: {
        frame: { width: 100, height: 6 },
        defaultRender: function (disp) {
          Game.Message.render(disp);
        },
      },
    },
  };

  window.onload = function() {
    console.log("starting WSRL - window loaded");

    if (!ROT.isSupported()) {
      alert("The rot.js library isn't supported by your browser.");
      return;
    }

    Game.init();

    ["avatar", "main", "message"].forEach(function (key) {
      var div = document.createElement("div");
      div.id = "wsrl-display-" + key;
      div.classList.add("wsrl-display");
      div.appendChild(Game.getDisplay(key).getContainer());
      document.body.appendChild(div);
    });

    ["keydown", "keypress", "keyup"].forEach(function (ty) {
      window.addEventListener(ty, function (ev) {
        Game.handleEvent(ty, ev);
      });
    });

    Game.switchMode("start");
  };
})();
