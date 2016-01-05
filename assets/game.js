console.log("hello console");

var Game = {
  init: function () {
    console.log("WSRL Live Initialization");

    this.eachDisplay(function (key, disp) {
      disp.obj = new ROT.Display(disp.frame);
    });

    this.renderAll();
  },

  eachDisplay: function (f) {
    for (var key in this.DISPLAYS) {
      if (this.DISPLAYS.hasOwnProperty(key)) {
        f(key, this.DISPLAYS[key]);
      }
    }
  },

  renderAll: function () {
    this.eachDisplay(function (key, disp) {
      disp.render();
    });
  },

  getDisplay: function (displayName) {
    return this.DISPLAYS[displayName].obj;
  },

  DISPLAYS: {
    main: {
      frame: { width: 80, height: 24 },
      render: function () {
        for (var i = 0; i < 5; i++) {
          this.obj.drawText(2,3+i, "main display");
        }
      },
    },
    avatar: {
      frame: { width: 20, height: 24 },
      render: function () {
        this.obj.drawText(2,3, "avatar display");
      },
    },
    message: {
      frame: { width: 100, height: 6 },
      render: function () {
        this.obj.drawText(2,3, "message display");
      },
    },
  },
};

window.onload = function() {
  console.log("starting WSRL - window loaded");
  // Check if rot.js can work on this browser
  if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
    return;
  }

  // Initialize the game
  Game.init();

  ["avatar", "main", "message"].forEach(function (key) {
    var div = document.createElement("div");
    div.id = "wsrl-display-" + key;
    div.classList.add("wsrl-display");
    div.appendChild(Game.getDisplay(key).getContainer());
    document.body.appendChild(div);
  });

  // Add the containers to our HTML page
  document.getElementById('wsrl-display-main').appendChild(Game.getDisplay('main').getContainer());
};
