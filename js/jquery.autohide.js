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

;( function ( $, window, document, undefined ) {

  "use strict";

  // Create the defaults once
  var
    plugin_name = "autohide_timeout",
    defaults = {
      $el:     null,
      $source: null,
      $target: null,
      events: 'click', // Will be renamed to click.ahto on init

      timeout:   1500,
      onEvents:  null,
      onTimeout: null
    };

  // Constructor
  function Ahto( el, options ) {
    this.$el = $(el);
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = plugin_name;
    this.init();
  }

  // Default settings
  $.extend( Ahto.prototype, {
    init: function() {

      var
        _t = this;

      // We subfix the events with namespace ahto
      _t.settings.events = _t.settings.events.replace(/\b(\w)+\b/gim, '$&.'+_t._name);

      // If there are no $source elements in options
      // the source of events is the element itself
      if ( typeof _t.settings.$source === 'function' ) {
        _t.settings.$source = _t.settings.$source( _t.$el );
      } else if ( _t.settings.$source === null) {
        _t.settings.$source = _t.$el;
      }

      // If there isn't a custum onTimeout functionallity
      // whe hide the target element by default.
      if ( _t.settings.onTimeout === null ) {
        _t.settings.onTimeout = function( el ) {
          ( _t.getTarget( el ) ).hide();
          clearTimeout(_t.$el[0].timeout_obj);
        }
      }

      // If there is no custom functionallity we show
      // the target element by default
      if ( _t.settings.onEvents === null) {
        _t.settings.onEvents = function( el ) {
          ( _t.getTarget( el ) ).show();
        }
      }

      // Attaching events
      // Events in the source elements
      _t.settings.$source.on( _t.settings.events, function( e ) {
        clearTimeout(_t.$el[0].timeout_obj);

        var
          source_e = e,
          $el_source = $(e.target),
          $target = _t.getTarget( $el_source );

        // If there is no custom functionallity we show
        // the target element by default
        _t.settings.onEvents( $el_source, $target, source_e );

        $target.off('mouseenter.'+_t._name).on('mouseenter.'+_t._name, function(e){
          clearTimeout(_t.$el[0].timeout_obj);
        }).off('mouseleave.'+_t._name).on('mouseleave.'+_t._name, function(e){
          _t.$el[0].timeout_obj = setTimeout( function(){
            clearTimeout( _t.$el[0].timeout_obj );
            _t.settings.onTimeout( $el_source, $target, source_e);
          }, _t.settings.timeout);
        });

      }).on( 'mouseleave.'+_t._name, function( e ) {

        var
          source_e = e,
          $el_source = $(e.target),
          $target = _t.getTarget.call( _t, $el_source );

        _t.$el[0].timeout_obj = setTimeout(function(){
          clearTimeout( _t.$el[0].timeout_obj );
          _t.settings.onTimeout( $el_source, $target, source_e );
        }, _t.settings.timeout);

      });

    }, // init

    getTarget: function( el ) {
      var
        $el_source = $(el),
        $target = null;
      if (typeof this.settings.$target === 'function') {
        $target = this.settings.$target( $el_source );
      } else {
        $target = this.settings.$target;
      }
      return $target;
    }, // getTarget

    destroy: function() {
      // To do
    } // destroy

  } );

  // JQuery hook
  $.fn[ plugin_name ] = function (options) {
    return this.each(function () {
      var $this = $(this);
      if (!$this.data('plugin_'+ plugin_name )) {
        $this.data('plugin_'+ plugin_name, new Ahto( this, options ));
      }
    });
  };


} )( jQuery, window, document );
