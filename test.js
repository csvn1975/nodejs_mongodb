function save_current_side() {
    var result;
    var a= 3;
    a.b({
      callback: function (a) {
        result = a;
      }
    });
    return result;
  }

  var n = save_current_side()