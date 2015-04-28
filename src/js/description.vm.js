(function($, window){
  'use strict';
  var app = window.app = window.app || {};

  function DescriptionViewModel(model){
    var self = this;

    self.model = model;
    self.$view = $('#description');
  }

  app.DescriptionViewModel = DescriptionViewModel;
})(jQuery, window);