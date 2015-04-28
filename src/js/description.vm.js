(function($, window){
  'use strict';
  var app = window.app = window.app || {};

  function DescriptionViewModel(model){
    var self = this;
    var srcTplDescription = app.templates['description'];
    var srcTplActivity = app.templates['activity'];

    self.model = model;
    self.currentIndex = null;
    self.templateDescription = Handlebars.compile(srcTplDescription);
    self.templateActivity = Handlebars.compile(srcTplActivity);
    self.$view = $('#description');

    self.model.on('timetable:selected', self.render.bind(self));
    self.model.on('timetable:newactivity', self.renderActivity.bind(self));
  }

  DescriptionViewModel.prototype.render = function(data){
    var self = this;
    var index = data.index;
    if(self.currentIndex === index) return false;
    self.currentIndex = index;

    var current = self.model.table[index];
    var binding = {
      title: current.label,
      description: current.description,
      activities: current.activities
    };

    var html = self.templateDescription(binding);
    self.$view
      .hide()
      .html(html)
      .fadeIn();

    self.$activityList = $('#activity-list');
    self.$newActivityText = $('#description-new-activity-text');
    self.$newActivityHours = $('#description-new-activity-hours');
    self.$newActivityText.on('keyup', self.onKeyup.bind(self));
    self.$newActivityHours.on('keyup', self.onKeyup.bind(self));
  };

  DescriptionViewModel.prototype.renderActivity = function(newActivity){
    var self = this;
    var html = self.templateActivity(newActivity);
    self.$activityList
      .append(html)
      .children(':last')
      .hide()
      .fadeIn();
  };

  DescriptionViewModel.prototype.onKeyup = function(e){
    var self = this;
    if(e.keyCode === 13){
      self.model.addActivity(self.currentIndex,
      {
        activity: self.$newActivityText.val(),
        hours: self.$newActivityHours.val()
      });
    }
  };

  app.DescriptionViewModel = DescriptionViewModel;
})(jQuery, window);