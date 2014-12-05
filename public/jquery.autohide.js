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

var a_h_t = a_h_t || {}

// Jquery hook
$.fn.autohide_timeout = function(options) {
  return this.each(function() {
    new a_h_t.init(this, options);
  });
};

a_h_t.init = function (el, options) {
  var
    that = this,
    $el  = $(el),
    // Default settings
    def = {
      $content: null,
      toggle_class_el: null,
      toggle_class: null,
      buttons_events: 'click',
      timeout: 3000,
      hide_on_start: false
    };

  $.extend(def, options);
  // Content
  def.$content = options['content'];
  if (typeof def.$content === 'function') {
    def.$content = def.$content($el);
  }
  // Element wich will tooggle class
  if (typeof def.toggle_class_el === 'function') {
    def.$toggle_class_el = def.toggle_class_el($el);
  } else {
    def.$toggle_class_el = def.$content;
  }
  // Content initially hidden?
  if (def.hide_on_start) {
    def.$content.hide();
  }
  // Clear timeout
  def.$content.ah_timeout = null;

  // Mouse events
  $el.on(def.buttons_events, function(e) {
    e.preventDefault();
    if (def.toggle_class) {
      $('.'+def.toggle_class).not(def.$toggle_class_el).removeClass(def.toggle_class);
      def.$toggle_class_el.toggleClass(def.toggle_class);
    } else {
      def.$toggle_class_el.fadeToggle(250, 'linear');
    }
    clearTimeout(def.$content.ah_timeout);
    def.$content.ah_timeout = setTimeout(function(){
      a_h_t.hideContent(def);
    }, def.timeout);
  });

  // Enter in the content div
  def.$content.on('mouseenter', function(e) {
    e.preventDefault();
    clearTimeout(def.$content.ah_timeout);
  });

  // Leave the content div
  def.$content.on('mouseleave', function(e) {
    e.preventDefault();
    def.$content.ah_timeout = setTimeout(function(){
      a_h_t.hideContent(def);
    }, def.timeout);
  });
};

// D.R.Y.
a_h_t.hideContent = function(def) {
  if (def.toggle_class) {
    def.$toggle_class_el.removeClass(def.toggle_class);
  } else {
    def.$toggle_class_el.fadeOut(250, 'linear');
  }
};

}(jQuery));
