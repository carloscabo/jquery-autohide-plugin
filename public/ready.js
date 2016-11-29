$(document).ready(function() {
  // La magia aquí!

  $('#single-bubble-button > a').autohide_timeout({
    events: 'click', // default is click
    $target: $('#single-bubble-content'),
    timeout: 1000
  });

  // $('#sample-menu > li > a').autohide_timeout({
  //   buttons_events: 'mouseenter', // default is click
  //   content: function(object) {
  //     return object.parent().find('ul.is-children');
  //   },
  //   toggle_class: 'submenu-opened', // Added / removed
  //   timeout: 1000
  // });

  // $('#another-sample-menu > li > a').autohide_timeout({
  //   buttons_events: 'mouseenter', // default is click
  //   content: function(obj) {
  //     return obj.parent().find('ul');
  //   },
  //   toggle_class: 'submenu-opened', // Added / removed
  //   toggle_class_el: function(obj) {
  //     return obj.parent();
  //   },
  //   timeout: 1000
  // });

  $('#sample-megadrop').autohide_timeout({
    events: 'mouseenter', // default is click
    timeout: 1500,
    // Children elements inside the parent element
    // for instance menú options inside a navigation menu
    $source: function( $el ) {
      return $el.find('li:not(.exclude) a');
    },
    // Target element that will be shown when event is trigged
    // on source element(s)
    $target: function( $el ) {
      var
        md_id = $el.attr('href').replace('#', '');
      return $('.megadrop#md-'+md_id);
    },
    onEvents: function( $el, event ) {
      event.preventDefault();
      // console.log( $el );
      $el.closest('ul').find('.active').removeClass('active');
      $el.parent('li').addClass('active');
      $('.megadrop').hide();
    },
    onTimeout: function( $el, event ) {
      // console.log( $el );
      $el.parent('li').removeClass('active');
      $('.megadrop').hide();
    }
  });


});
