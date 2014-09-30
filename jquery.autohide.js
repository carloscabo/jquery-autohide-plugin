/*
JQuery Autohide by Carlos Cabo
https://github.com/carloscabo/jquery-autohide-plugin
2014 / 09 / 30

// Usage
$('.element-to-hide-show').autohide_timeout({
  buttons: '.button-1',
  buttons_events: 'click', // default is click
  hide_on_start: true, // hides target element on load, default is true
  timeout: 3000
});
*/

(function($) {

$.fn.autohide_timeout = function(options) {

  return this.each(function() {
    new aht_init(this, options);
  });

  function aht_init(el, options){
    var
      $el  = $(el),
      // Default settings
      def = {
        $buttons: null,
        buttons_events: 'click',
        timeout: 3000,
        hide_on_start: true
      };

    $.extend(def, options);
    def.$buttons = $(options['buttons']);
    $el.ah_timeout = null;

    if (def.hide_on_start) {
      $el.hide();
    }

    def.$buttons.on(def.buttons_events, function(e) {
      e.preventDefault();
      $el.fadeToggle('fast', 'linear');
      clearTimeout($el.ah_timeout);
      $el.ah_timeout = setTimeout(function(){
        $el.aht_hide();
      }, def.timeout);
    });

    $el.on('mouseenter', function(e) {
      e.preventDefault();
      clearTimeout($el.ah_timeout);
    });

    $el.on('mouseleave', function(e) {
      e.preventDefault();
      $el.ah_timeout = setTimeout(function(){
        $el.aht_hide();
      }, def.timeout);
    });
  }
};

$.fn.aht_hide = function(el) {
  $(this).fadeOut('fast');
  clearTimeout($(this).ah_timeout);
};

}(jQuery));
