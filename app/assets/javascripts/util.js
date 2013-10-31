(function(){

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  // Add our own utility functions to underscore
  _.mixin({
    getTemplate: function (name) {
      return _.template( $('#templates .' + name).html() );
    },
    
    formToJSON: function (formEl) {
      var result = {};
      _.each( $(formEl).serializeArray(), function (dataPoint) {
        result[dataPoint.name] = dataPoint.value;
      });
      return result;
    }
  });

})();