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

  Timetable.prototype.addActivity = function(categoryIndex, data){
    var self = this;
    if(self.table[categoryIndex]){
      var dataToSend = data;
      dataToSend.index = categoryIndex;

      self.post(dataToSend)
      .success(function(){
        self.table[categoryIndex].activities.push({
          label: data.activity,
          hours: data.hours
        });

        self.emit('timetable:newactivity', {
          indexCategory: categoryIndex,
          label: data.activity,
          hours: data.hours
        });
      });
    }
  };

  var app = window.app = window.app || {};
  app.Timetable = Timetable;
})(window);