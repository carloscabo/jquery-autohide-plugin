$(document).ready(function() {

  // La magia aquí!

  // ----------------------------------
  // Smaple #1
  $('#single-bubble-button-a > a').autohide_timeout({
    timeout: 1000,
    $target: $('#single-bubble-content-a')
  });

  $('#single-bubble-button-b > a').autohide_timeout({
    timeout: 9999,
    events: 'click mouseenter',
    $target: $('#single-bubble-content-b')
  });

  $('#close-both-bubbles').on('click', function(e){
    $('.single-bubble > a').each(function( idx, el ){
      $(el).data('plugin_autohide_timeout').settings.onTimeout();
    })
  });

  // ----------------------------------
  // Smaple #2
  var $sm_2 = $('#sample-menu-2');
  $sm_2.autohide_timeout({
    events: 'mouseenter',
    timeout: 1000,
    $source: function( $el ) {
      return $el.find('> li > a');
    },
    $target: function( $source ) {
      return $source.next('ul.is-children');
    },
    onEvents: function( $source, $target, event ) {
      $sm_2.find('.submenu-opened').removeClass('submenu-opened');
      $target.addClass('submenu-opened');
    },
    onTimeout: function( $source, $target, event ) {
      // console.log( $target );
      $sm_2.find('.submenu-opened').removeClass('submenu-opened');
    }
  });

  // ----------------------------------
  // Sample #3

  var $sm_3 = $('#sample-menu-3');
  $sm_3.autohide_timeout({
    events: 'mouseenter', // default is click
    timeout: 1000,
    $source: function( $el ) {
      return $el.find(' > li > a');
    },
    $target: function( $source ) {
      return $source.next('ul');
    },
    onEvents: function( $source, $target, event ) {
      $sm_3.find('.submenu-opened').removeClass('submenu-opened');
      $target.parent('li').addClass('submenu-opened');
    },
    onTimeout: function( $source, $target, event ) {
      // console.log( $target );
      $sm_3.find('.submenu-opened').removeClass('submenu-opened');
    }
  });

  // ----------------------------------
  // Sample #4. Megadrop

  var $sm_4 = $('#sample-4-megadrop');
  $sm_4.autohide_timeout({
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
      $('.megadrop-wrapper-4 .megadrop').hide();
      $target.show();
    },
    // What to do when is timeout is triggered
    onTimeout: function( $source, $target, event ) {
      // console.log( $source );
      $source.parent('li').removeClass('active');
      $('.megadrop-wrapper-4 .megadrop').hide();
    }
  });

  // ----------------------------------
  // Sample #4. Megadrop

  var $sm_5 = $('#sample-5-megadrop');
  $sm_5.autohide_timeout({
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
      $('.megadrop-wrapper-5 .megadrop').not($target).stop().fadeOut();
      $target.stop().slideDown();
    },
    // What to do when is timeout is triggered
    onTimeout: function( $source, $target, event ) {
      // console.log( $source );
      $source.parent('li').removeClass('active');
      $('.megadrop-wrapper-5 .megadrop').stop().slideUp();
    }
  });

});
