$(document).ready(function() {
  // La magia aquí!

  $('#single-bubble-button > a').autohide_timeout({
    buttons_events: 'click', // default is click
    content: $('#single-bubble-content'),
    hide_on_start: true, // hides target element on load, default is false
    timeout: 1000
  });

  $('#sample-menu > li > a').autohide_timeout({
    buttons_events: 'mouseenter', // default is click
    content: function(object) {
      return object.parent().find('ul.is-children');
    },
    toggle_class: 'submenu-opened', // Added / removed
    timeout: 1000
  });

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

});
