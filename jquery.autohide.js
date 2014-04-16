/*
JQuery Autohide by Carlos Cabo
https://github.com/carloscabo/jquery-autohide-plugin

// Usage
$('.element-to-hide-show').autohide_timeout({
  buttons: '.button-1',
  buttons_events: 'click', // default is click
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
      $btn = $(options['buttons']),
      btn_events = 'click',
      ms  = options['timeout'];

    $el.ah_timeout = null;
    if (options['buttons_events'] !== undefined) {
      btn_events = options['buttons_events'];
    }

    $el.hide();

    $btn.on(btn_events, function(e) {
      e.preventDefault();
      $el.fadeToggle('fast', 'linear');
      clearTimeout($el.ah_timeout);
      $el.ah_timeout = setTimeout(function(){
        $el.aht_hide();
      }, ms);
    });

    $el.on('mouseenter', function(e) {
      e.preventDefault();
      clearTimeout($el.ah_timeout);
    });

    $el.on('mouseleave', function(e) {
      e.preventDefault();
      $el.ah_timeout = setTimeout(function(){
        $el.aht_hide();
      }, 400);
    });
  }
};

$.fn.aht_hide = function(el) {
  $(this).fadeOut('fast');
  clearTimeout($(this).ah_timeout);
};

}(jQuery));
