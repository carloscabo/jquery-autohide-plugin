JQuery Autohide plugin
======================

Jquery plugin to show / hide / autohide elements, like shopping carts or help bubbles, megadrop menus. That elements' visibility is triggered from another element... usually a button, menu item, etc.

<h3>[View demo]()<h3>

![Smaple snapshop](https://raw.github.com/carloscabo/jquery-autohide-plugin/master/sample-image.png)

## 1. Concepts / naming

`$source` element(s) originating the events. Usually button, menu items, etc.

`$target` elements **to be shown when the event is triggerered** from a `$source` element. Usually a menu / information overlay... etc.

`timeout` time (in miliseconds) until the `$target` element autohides.

## 2. Usage

### 2.1 Easiest sample

We have a `$souce` element ( `#element-to-click` ), that when the default event is trigged on it ( click ), toggles visibility on `$target` element ( `$('#single-bubble-content')` ).

`$target` element will autohide with a timeout ( default is 1500ms ).

```javascript
$('#element-to-be-clicked').autohide_timeout({
  // timeout: 1500, // Default
  $target: $('#conten-to-be-shown')
});
```

### 2.2 A complex / complete example

```javascript

  // We chache the jQuery selector
  var $element = $('#sample-megadrop');

  $element.autohide_timeout({

     // Events to be triggered, default is 'click'
    events: 'mouseenter',

    // Timeout until the 'onTimeout' function is launched
    // Default is 1500
    timeout: 2000,

    // $source is used to have several interactive children
    // elements inside the parent $element, for instance
    // menú options <li> inside a navigation menu
    $source: function( $el ) {
      // $el is $('#sample-megadrop') here, we can set the
      // children elements relative to it
      return $el.find('li:not(.exclude) a');
    },

    // Target elements that will be shown when event is trigged
    // on $source element(s). The $target element can be relative
    // to the $source element, as you can see below.
    $target: function( $source ) {
      return $source.next('ul.is-children');
    },

    // What is done when the event is triggered on source element
    // We have access to the $source and the $target elements
    // And the original $source event.
    onEvents: function( $source, $target, event ) {
      event.preventDefault();
      // console.log( $source );
      // console.log( $target );
      // console.log( event );
      $source.closest('ul').find('.active').removeClass('active');
      $source.parent('li').addClass('active');
      $('.megadrop').hide();
      $target.show();
    },

    // What to do when is timeout is triggered
    // onTimeout is triggered when cursor is outside the $sorce
    // and $target elements.
    onTimeout: function( $source, $target, event ) {
      // console.log( event );
      // console.log( $source );
      // console.log( $source );
      $source.parent('li').removeClass('active');
      $('.megadrop').hide();
    }
  });

```

## 3. Other methods

### 3. Hidding $target element from JS

You can force the closing event from JS using:

```javascript
$(element).data('plugin_autohide_timeout').settings.onTimeout();
```
