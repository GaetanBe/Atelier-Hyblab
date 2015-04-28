(function($, window){
  'use strict';

  function getRandomColor(){
    var letters = '0123456789ABC'.split('');
    var color = '#';
    for(var i = 0 ; i < 6 ; i++){
      color += letters[Math.floor(Math.random() * 12)];
    }

    return color;
  }

  function ChartViewModel(model){
    var self = this;

    self.model = model;
    self.$canvas = $('#chart');
    self.$legend = $('#chartlegend');

    self.$canvas.on('click', self.onChartClick.bind(self));

    self.render();
  }

  ChartViewModel.prototype.render = function(){
    var self = this;
    var ctx = self.$canvas.get(0).getContext('2d');

    delete self.chart;
    self.data = self.mapDataForChart(self.model.table);
    self.chart = new Chart(ctx).Doughnut(self.data, {});
    self.$legend.html(self.chart.generateLegend());
  };

  ChartViewModel.prototype.mapDataForChart = function(categories){
    return categories.map(function(category){
      var value = 0;
      category.activities.forEach(function(activity){
        value += parseInt(activity.hours);
      });

      return {
        label: category.label,
        color: getRandomColor(),
        value: value
      };
    });
  };

  ChartViewModel.prototype.onChartClick = function(e){
    var self = this;
    var clickedSegment = self.chart.getSegmentsAtEvent(e)[0];
    if(clickedSegment){
      self.model.table.forEach(function(activite, index){
        if(clickedSegment.label === activite.label){
          self.model.emit('timetable:selected', { index: index });
        }
      });
    }
  };

  var app = window.app = window.app || {};
  app.ChartViewModel = ChartViewModel;
})(jQuery, window);