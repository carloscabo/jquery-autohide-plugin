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

  var
    def = {
      $el: null,
      $source: null,
      $target: null,
      events: 'click',

      timeout: 3000,
      onEvents: null,
      onTimeout: null,

      timeout_obj: null
    };

  function Constructor( el, options ) {
    var
      that = this;
    def.$el = $(el);

    // Default settings
    $.extend( def, options );
    console.log( def );

    if ( typeof def.$source === 'function' ) {
      def.$source = def.$source( def.$el );
    } else if ( def.$source === null) {
      def.$source = def.$el;
    }

    if ( def.onTimeout === null ) {
      def.onTimeout = function() {
        def.$target.hide();
      }
    }

    def.$source.on( def.events, function(e) {
      clearTimeout(def.$el.timeout_obj);

      var
        source_e = e,
        $source_e_target = $(source_e.target);

      if (def.onEvents !== null) {
        def.onEvents( $source_e_target, source_e );
      }

      var
        $target = null;
      if (typeof def.$target === 'function') {
        $target = def.$target( $source_e_target, source_e );
      } else {
        $target = def.$target;
      }
      $target.show();

      $target.on('mouseenter', function(e){
        clearTimeout(def.$el.timeout_obj);
      }).on('mouseleave', function(e){
        def.$el.timeout_obj = setTimeout(function () {
          def.onTimeout( $source_e_target, source_e);
          clearTimeout(def.$el.timeout_obj);
        }, def.timeout);
      });

    }).on( 'mouseleave', function( e ) {

      def.$el.timeout_obj = setTimeout(function(){
        def.onTimeout( $(e.target), e );
        clearTimeout(def.$el.timeout_obj);
      }, def.timeout);

    });

  };

  // JQuery hook
  $.fn.autohide_timeout = function (options) {
    return this.each(function () {
      var $this = $(this);
      if (!$this.data('autohide_timeout')) {
        $this.data('autohide_timeout', new Constructor(this, options));
      }
    });
  };


} (jQuery));
