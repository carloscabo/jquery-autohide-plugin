$(document).ready(function() {
  // La magia aquí!


  $('#single-bubble-button > a').autohide_timeout({
    timeout: 1000,
    $target: $('#single-bubble-content')
  });


  var $block_1 = $('#sample-menu');
  $block_1.autohide_timeout({
    events: 'mouseenter',
    timeout: 1000,
    $source: function( $el ) {
      return $el.find('> li > a');
    },
    $target: function( $source ) {
      return $source.next('ul.is-children');
    },
    onEvents: function( $source, $target, event ) {
      $block_1.find('.submenu-opened').removeClass('submenu-opened');
      $target.addClass('submenu-opened');
    },
    onTimeout: function( $source, $target, event ) {
      // console.log( $target );
      $block_1.find('.submenu-opened').removeClass('submenu-opened');
    }
  });


  var $block_2 = $('#another-sample-menu');
  $('#another-sample-menu').autohide_timeout({
    events: 'mouseenter', // default is click
    timeout: 1000,
    $source: function( $el ) {
      return $el.find(' > li > a');
    },
    $target: function( $source ) {
      return $source.next('ul');
    },
    onEvents: function( $source, $target, event ) {
      $block_2.find('.submenu-opened').removeClass('submenu-opened');
      $target.parent('li').addClass('submenu-opened');
    },
    onTimeout: function( $source, $target, event ) {
      console.log( $target );
      $block_2.find('.submenu-opened').removeClass('submenu-opened');
    }
  });


  var $block_3 = $('#sample-megadrop');
  $block_3.autohide_timeout({
    events: 'mouseenter', // default is click
    timeout: 2000,
    // Children elements inside the parent element
    // for instance menú options inside a navigation menu
    $source: function( $el ) {
      return $el.find('li:not(.exclude) a');
    },
    // Target element that will be shown when event is trigged
    // on source element(s)
    $target: function( $source ) {
      // console.log( $source );
      var
        md_id = $source.attr('href').replace('#', '');
      return $('.megadrop#md-'+md_id);
    },
    // What is done when the event is triggered on source element
    onEvents: function( $source, $target, event ) {
      event.preventDefault();
      // console.log( $source );
      // console.log( $target );
      $source.closest('ul').find('.active').removeClass('active');
      $source.parent('li').addClass('active');
      $('.megadrop').hide();
      $target.show();
    },
    // What to do when is timeout is triggered
    onTimeout: function( $source, $target, event ) {
      // console.log( $source );
      $source.parent('li').removeClass('active');
      $('.megadrop').hide();
    }
  });


});
