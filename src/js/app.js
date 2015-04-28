$(function(){

  function Polyblab(){};

  Polyblab.prototype.loadTemplates = function(){
    var self = this;
    window.app.templates = {};

    var pDescription = $.get('partials/description.template.html')
    .success(function(tpl){
      window.app.templates['description'] = tpl;
    });

    var pActivity = $.get('partials/activity.template.html')
    .success(function(tpl){
      window.app.templates['activity'] = tpl;
      window.Handlebars.registerPartial('activity', tpl);
    });

    return $.when(pDescription, pActivity);
  };

  Polyblab.prototype.loadModels = function(){
    var self = this;
    self.timetable = new window.app.Timetable;

    var pTimetable = self.timetable.get();

    return $.when(pTimetable);
  };

  Polyblab.prototype.bootstrap = function(){
    var self = this;

    self.chartViewModel = new window.app.ChartViewModel(self.timetable);
    self.descriptionViewModel = new window.app.DescriptionViewModel(self.timetable);
    self.timetable.emit('timetable:selected', { index: 0 });
  };

  var polyblab = new Polyblab;
  polyblab
  .loadTemplates()
  .then(function(){
    return polyblab.loadModels();
  })
  .then(function(){
    polyblab.bootstrap();
  });
});