(function () {
  "use strict";

  window.Game = {
    init: function () {
      for (var key in this._displays) {
        if (!this._displays.hasOwnProperty(key)) continue;
        this._displays[key] = new ROT.Display(this._displays[key]);
      }
    },

    getDisplay: function (key) {
      return this._displays[key];
    },

    _displays: {
      main: { width: 100, height: 32 },
      avatar: { width: 28, height: 32 },
      message: { width: 128, height: 6 },
    },

    renderAll: function () {
      for (var key in this._displays) {
        if (!this._displays.hasOwnProperty(key)) continue;
        var disp = this.getDisplay(key);
        disp.clear();

        for (var i = 0; i < this._ui.length; i++) {
          var mode = Game.UIMode[this._ui[i]];
          if (mode.render && mode.render[key]) {
            mode.render[key].call(mode, disp);
          }
        }
      }
    },

    handleEvent: function (ty, ev) {
      for (var i = this._ui.length-1; i >= 0; i--) {
        var mode = Game.UIMode[this._ui[i]];
        if (mode.handleInput == null) continue;
        mode.handleInput(ty, ev);
        this.renderAll();
        return;
      }
    },

    pushMode: function (name) {
      var mode = Game.UIMode[name];
      if (mode == null) {
        Game.Message.warn("Pushed bad mode '" + name + "'");
      }

      this._ui.push(name);
      if (mode.enter) mode.enter();
      this.renderAll();
    },
    popMode: function () { 
      var name = this._ui.pop();
      var mode = Game.UIMode[name];
      if (mode && mode.exit) mode.exit();
      this.renderAll();
      return name;
    },
    replaceMode: function (name) {
      var last = this.popMode();
      this.pushMode(name);
      return last;
    },
    initMode: function (name) {
      while (this.popMode() != null);
      this._ui = [""];
      this.pushMode(name);
    },

    _ui: [],

    EntityMixin: {},
  };

  window.onload = function() {
    console.log("starting WSRL - window loaded");

    if (!ROT.isSupported()) {
      alert("The rot.js library isn't supported by your browser.");
      return;
    }

    Game.init();

    ["main", "avatar", "message"].forEach(function (key) {
      var div = document.createElement("div");
      div.id = "wsrl-display-" + key;
      div.classList.add("wsrl-display");
      div.appendChild(Game.getDisplay(key).getContainer());
      document.body.appendChild(div);
    });

    ["keydown", "keypress"].forEach(function (ty) {
      window.addEventListener(ty, function (ev) {
        Game.handleEvent(ty, ev);
      });
    });

    Game.initMode("menu");
  };
})();
