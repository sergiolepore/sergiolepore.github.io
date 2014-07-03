jQuery.fn.selectText = function(){
  var doc = document
  , element = this[0]
  , range, selection
  ;
  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

$(function() {
  if (! $('html').hasClass('desktop'))
    return;

  var $terminalLines = $('.terminal-line');
  var textOnSelected = 'Presiona CTRL+C para copiar';
  var textOnNotSelected = 'Haz clic para seleccionar este comando';

  $terminalLines.powerTip({
    placement: 'n',
    manual: true
  });

  $terminalLines.data('powertip', textOnSelected);

  // $terminalLines.click(function() {
  //   var $line = $(this);
  //   var alreadySelected = $line.hasClass('selected');
  //   var text = '';

  //   resetTooltips();

  //   if (alreadySelected) {
  //     text = textOnNotSelected;
  //   } else {
  //     $line.addClass('selected');
  //     text = textOnSelected;
  //   }

  //   clearAllSelections();
  //   $line.selectText();
  //   $line.data('powertip', text);
  //   showTooltip($line);
  // });

  $terminalLines.hover(function mouseEnter(e) {
    var $line = $(this);
    $line.selectText();
    showTooltip($line);
  }, function mouseLeave(e) {
    var $line = $(this);

    clearAllSelections();
    resetTooltips();
  });

  function showTooltip(element) {
    $.powerTip.show(element);
  }

  function hideTooltip() {
    $.powerTip.hide();
  }

  function resetTooltips() {
    hideTooltip();
    $terminalLines.removeClass('selected');
    // $terminalLines.data('powertip', textOnNotSelected);
  }

  function clearAllSelections() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
  }
});