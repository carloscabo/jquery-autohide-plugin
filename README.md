JQuery Autohide plugin
======================

Jquery plugin to show / hide / autohide elements, like shopping carts or help bubbles. That elements' visibility is triggered from another element... usually a button or so.

![Smaple snapshop](https://raw.github.com/carloscabo/jquery-autohide-plugin/master/sample-image.png)


## Usage

    $('.element-to-hide-show').autohide_timeout({
      buttons: '.button-1',
      buttons_events: 'click', // default is click
      timeout: 3000
    });

`.element.to-hide-show` the element / container we want to show / hide.

`timeout` time until the element autohides in miliseconds.

`buttons_events` events used for the button element. Default is `click` event, but you can also use `mouseenter` or both (see sample below).

`buttons` the element that acts as trigger of the visibility... usually a button. You can provide several elements at once with JQuery syntax (comma separated values) this way:

    $('.element-to-hide-show').autohide_timeout({
      buttons: '.button-1, .button-2, .button-3',
      buttons_events: 'click mouseenter',
      timeout: 3000
    });
