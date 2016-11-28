JQuery Autohide plugin
======================

Jquery plugin to show / hide / autohide elements, like shopping carts or help bubbles. That elements' visibility is triggered from another element... usually a button or so.

![Smaple snapshop](https://raw.github.com/carloscabo/jquery-autohide-plugin/master/sample-image.png)


## Usage

```javascript
$('#element-to-click').autohide_timeout({
  buttons_events: 'click', // default is click
  content: $('#element-to-show-hide'),
  hide_on_start: true, // hides target element on load, default is false
  timeout: 1000
});
```

`#element-to-show-hide` the element / container we want to show / hide.

`timeout` time until the element autohides in miliseconds.

`buttons_events` events used for the button element. Default is `click` event, but you can also use `mouseenter` or both (see sample below).

`hide_on_start` hides the target element on load, to be sure its initially hidden

You can provide several elements at once with JQuery syntax (comma separated values) this way:

```javascript
$('#element-to-click-1, #element-to-click-2').autohide_timeout({
  buttons_events: 'click', // default is click
  content: $('#element-to-show-hide'),
  hide_on_start: true, // hides target element on load, default is false
  timeout: 1000
});
```

You can also use JQuery _routes_ from the clickable element, in the following sample the _content_ element to be shown is calculated from the clickable element... and a aditional class is added to the _content_ element using: `toggle_class`.

```javascript
$('#sample-menu > li > a').autohide_timeout({
  buttons_events: 'mouseenter', // default is click
  content: function(object) {
    return object.parent().find('ul.is-children');
  },
  toggle_class: 'submenu-opened', // Added / removed
  timeout: 1000
});
```

One last scenario scenario where the `toggle_class` is asigned to an element relative to the clickable one:

```javascript
$('#another-sample-menu > li > a').autohide_timeout({
  buttons_events: 'mouseenter', // default is click
  content: function(obj) {
    return obj.parent().find('ul.is-children');
  },
  toggle_class: 'submenu-opened', // Added / removed
  toggle_class_el: function(obj) {
    return obj.parent();
  },
  timeout: 1000
});
```
