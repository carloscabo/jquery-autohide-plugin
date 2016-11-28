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

(function ($) {

  function Constructor(el, options) {
    var
      that = this,
      $el = $(el),
      // Default settings
      def = {
        $source: null,
        $target: null,
        events: 'click',
        timeout: 3000,
        onEvents: null,
        onTimeout: null
      };

    $.extend(def, options);

  };

  // JQuery hook
  $.fn.autohide_timeoout = function (options) {
    return this.each(function () {
      var $this = $(this);
      if (!$this.data('autohide_timeoout')) {
        $this.data('autohide_timeoout', new Constructor(this, options));
      }
    });
  };


} (jQuery));
