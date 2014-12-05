/*
JQuery Autohide by Carlos Cabo
https://github.com/carloscabo/jquery-autohide-plugin
2014 / 12 / 05

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
        $content: null,
        toggle_class: null,
        buttons_events: 'click',
        timeout: 3000,
        hide_on_start: true
      };

    $.extend(def, options);
    def.$content = options['content'];
    // If we pass a function
    if (typeof def.$content === 'function') {
      def.$content = def.$content($el);
    }
    // Initially hidden?
    def.$content.ah_timeout = null;
    if (def.hide_on_start) {
      def.$content.hide();
    }

    $el.on(def.buttons_events, function(e) {
      e.preventDefault();
      if (def.toggle_class) {
        $('.'+def.toggle_class).not(def.$content).removeClass(def.toggle_class);
        def.$content.toggleClass(def.toggle_class);
      } else {
        def.$content.fadeToggle(250, 'linear');
      }
      clearTimeout(def.$content.ah_timeout);
      def.$content.ah_timeout = setTimeout(function(){
        if (def.toggle_class) {
          def.$content.removeClass(def.toggle_class);
        } else {
          def.$content.fadeOut(250, 'linear');
        }
      }, def.timeout);
    });

    def.$content.on('mouseenter', function(e) {
      e.preventDefault();
      clearTimeout(def.$content.ah_timeout);
    });

    def.$content.on('mouseleave', function(e) {
      e.preventDefault();
      def.$content.ah_timeout = setTimeout(function(){
        if (def.toggle_class) {
          def.$content.removeClass(def.toggle_class);
        } else {
          def.$content.fadeOut(250, 'linear');
        }
      }, def.timeout);
    });
  }
};

$.fn.aht_hide = function(el) {
  $(this).fadeOut('fast');
  clearTimeout($(this).ah_timeout);
};

}(jQuery));
