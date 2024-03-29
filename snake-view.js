(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.setup();
  };

  View.prototype.setup = function() {
    this.board = new Snakes.Board();
    this.scaffold();
    this.render();
    this.buildListener.call(this);
    var view = this;
    this.nextDir = null;
    // move queue stuff
    this.queuedDir = null;
    // tweak this to change game speed
    this.interval = setInterval(this.step.bind(view), 100);
  };

  View.prototype.scaffold = function () {
    for (var i = 0; i < 20; i++) {
      var row = $("<li id='row" + i + "'>");
      for (var c = 0; c < 20; c++) {
        row.append($("<div id='col" + c + "'>"));
      }
      $("ul").append(row);
    }
  };

  View.prototype.render = function () {
    var art = (this.board.render());
    var arr = art.split("\n");
    for (var i = 0; i < 20; i++) {
      var row = arr[i].split("");
      for (var c = 0; c < 20; c++) {
        $("#row" + i + " #col" + c).removeClass().addClass(row[c]);
      }
    }
  };

  View.prototype.buildListener = function () {
    $('body').on("keydown", this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function (event) {
    var dir = this.board.snake.dir;
    console.log();
    if (this.nextDir == null) {
      this.nextDir = chooseDir(event, dir, this.nextDir);
      // if we set a nextDir, the queue is invalid
      this.queuedDir = null;
    } else {
      this.queuedDir = chooseDir(event, this.nextDir, this.queuedDir);
    }
  };

  function chooseDir(event, moving, oldDir) {
    switch (event.keyCode) {
      case 37:
      case 65:
        if (moving !== "E") return "W";
        break;
      case 38:
      case 87:
        if (moving !== "S") return "N";
        break;
      case 39:
      case 68:
        if (moving !== "W") return "E";
        break;
      case 40:
      case 83:
        if (moving !== "N") return "S";
        break;
    }
    return oldDir;
  }

  View.prototype.reset = function (event) {
    clearInterval(this.interval);
    $("ul").empty();
    $("body").off("keydown");
    this.setup();
  };

  View.prototype.step = function () {
    if (this.nextDir) {
      this.board.snake.turn(this.nextDir);
      this.nextDir = null;
    } else if (this.queuedDir) {
      this.board.snake.turn(this.queuedDir);
      this.queuedDir = null;
    }

    if (this.board.lost) {
      $('body').off("keydown");
      $('body').on("keydown", this.reset.bind(this));
    } else {
      this.board.snake.move();
    }
    this.render();
  };
})();
