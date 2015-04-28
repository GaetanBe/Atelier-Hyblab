(function(window){
  'use strict';
  var endpoint = 'api/timetable';

  function Timetable(){
    var self = this;
    EventEmitter.call(self);
    self.table = [];
  }

  Timetable.prototype = new EventEmitter;

  Timetable.prototype.get = function(){
    var self = this;
    return $.get(endpoint)
      .success(function(data){
        self.table = data;
      });
  };

  Timetable.prototype.post = function(data){
    return $.ajax({
      url: endpoint,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    });
  };

  var app = window.app = window.app || {};
  app.Timetable = Timetable;
})(window);