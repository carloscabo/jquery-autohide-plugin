/*
JQuery Autohide by Carlos Cabo
V 2.1 beta
https://github.com/carloscabo/jquery-autohide-plugin
2017 / 10 / 27

// Usage
$('.element-to-hide-show').autohide_timeout({
  buttons: '.button-1',
  buttons_events: 'click', // default is click
  hide_on_start: true, // hides target element on load, default is true
  timeout: 3000
});
*/

(function ($) {

  function Constructor( el, options ) {
    var
      that = this,
      DEBUG = false,

      // Default options
      def = {
        $el: $(el),
        $source: null,
        $target: null,
        events: 'click',

        timeout: 1500,
        onEvents: null,
        onTimeout: null,

        // Internal methods
        fn: {

          // Evaluates if target is a proper element or is a functions thst must be executed
          getTarget: function( el ) {
            var
              $el_source = $(el),
              $target = null;
            if (typeof this.$target === 'function') {
              $target = this.$target( $el_source );
            } else {
              $target = this.$target;
            }
            return $target;
          }
        }
      };


    // Default settings
    $.extend( def, options );

    // If there are no $source elements in options
    // the source of events is the elment itself
    if ( typeof def.$source === 'function' ) {
      def.$source = def.$source( def.$el );
    } else if ( def.$source === null) {
      def.$source = def.$el;
    }

    // If there isn't a custum onTimeout functionallity
    // whe hide the target element by default.
    if ( def.onTimeout === null ) {
      def.onTimeout = function( el ) {
        ( def.fn.getTarget.call( this, el ) ).hide();
      }
    }

    // If there is no custom functionallity we show
    // the target element by default
    if (def.onEvents === null) {
      def.onEvents = function( el ) {
        /* debugger; */
        ( def.fn.getTarget.call( this, el ) ).show();
      }
    }

    // Events in the source elements
    def.$source.on( def.events, function( e ) {
      clearTimeout(def.$el[0].timeout_obj);

      var
        source_e = e,
        $el_source = $(e.target),
        $target = def.fn.getTarget.call( def, $el_source );

      // If there is no custom functionallity we show
      // the target element by default
      def.onEvents( $el_source, $target, source_e );

      $target.off('mouseenter').on('mouseenter', function(e){
        clearTimeout(def.$el[0].timeout_obj);
      }).off('mouseleave').on('mouseleave', function(e){
        def.$el[0].timeout_obj = setTimeout(function(){
          def.onTimeout( $el_source, $target, source_e);
          clearTimeout(def.$el[0].timeout_obj);
        }, def.timeout);
      });

    }).on( 'mouseleave', function( e ) {

      var
        source_e = e,
        $el_source = $(e.target);

      var
        $target = null;
      if (typeof def.$target === 'function') {
        $target = def.$target( $el_source );
      } else {
        $target = def.$target;
      }

      def.$el[0].timeout_obj = setTimeout(function(){
        def.onTimeout( $el_source, $target, e );
        clearTimeout(def.$el[0].timeout_obj);
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
