$(document).ready(function() {
  // La magia aquí!
  console.log('eo');

  $('#single-bubble-button > a').autohide_timeout({
    buttons_events: 'click', // default is click
    content: $('#single-bubble-content'),
    hide_on_start: true, // hides target element on load, default is true
    timeout: 3000
  });

  $('#sample-menu > li > a').autohide_timeout({
    buttons_events: 'mouseenter', // default is click
    content: function(object) {
      return object.parent().find('ul.is-children');
    },
    toggle_class: 'submenu-opened', // Added / removed
    hide_on_start: false, // hides target element on load, default is true
    timeout: 3000
  });

  /*$(this).parent().find('ul').autohide_timeout({
    buttons: $('ul#sample-menu > li > a'),
    buttons_events: 'mouseenter', // default is click
    hide_on_start: true, // hides target element on load, default is true
    timeout: 3000
  });*/
});
