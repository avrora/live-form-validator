LiveFormValidator = {
  keyUpTimer: [],
  timeWaitingForTyping: 2000,
  timeShowingSuccess: 5000,
  /**
   * Configure package options
   * @param options: {timeWaitingForTyping: xxx, timeShowingSuccess: xxx}
   */
  config: function(options) {
    var timeWaitingForTyping = parseInt(options.timeWaitingForTyping);
    var timeShowingSuccess = parseInt(options.timeShowingSuccess);

    if(timeWaitingForTyping != undefined && timeWaitingForTyping >= 0) {
      this.timeWaitingForTyping = timeWaitingForTyping;
    }
    if(timeShowingSuccess != undefined && timeShowingSuccess >= 0) {
      this.timeShowingSuccess = timeShowingSuccess;
    }
  },
  /**
   * Validate Semantic UI form fiels on live
   * @param options: {event: xxx, currentForm: xxx, save: xxx}
   * event is mandatory
   * currentForm is mandatory
   */
  validateFieldOnKeyUp: function (options) {
    var currentInput = $(options.event.currentTarget);
    var currentForm = options.currentForm;
    var save = options.save;

    var corner = currentInput.siblings(".corner");
    var icon = corner.find('.icon');

    // Config params
    var timeWaitingForTyping = this.timeWaitingForTyping;
    var timeShowingSuccess = this.timeShowingSuccess;

    if(currentForm.hasClass('success')) {
      currentForm.removeClass('success');
    }

    if(!icon.hasClass('loading') && !currentInput.parent().parent().hasClass('error')) {
      icon.removeClass('checkmark');
      icon.removeClass('asterisk');
      corner.addClass('blue');
      icon.addClass('loading');
    }

    if (this.keyUpTimer[currentInput.attr('name')]) {
      clearTimeout(this.keyUpTimer[currentInput.attr('name')]);
    }
    this.keyUpTimer[currentInput.attr('name')] = setTimeout(function () {
      // Validate current field
      if (currentForm.form('validate field', currentForm.form('get validation rules', currentInput))) {
        corner.removeClass('blue');
        icon.removeClass('loading');
        icon.removeClass('asterisk');

        corner.addClass('green');
        icon.addClass('checkmark');

        if(timeShowingSuccess != 0) {
          setTimeout(function () {
            corner.removeClass('green');
            icon.removeClass('checkmark');
            icon.addClass('asterisk');
          }, timeShowingSuccess);
        }
      }
      else {
        // Remove positive check
        corner.removeClass('green');
        corner.removeClass('blue');
        icon.removeClass('loading');
        icon.removeClass('checkmark');
        icon.addClass('asterisk');
      }

      // Submit form
      if(save) {
        currentForm.form('submit');
      }
    }, timeWaitingForTyping);
  }
};