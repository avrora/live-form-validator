# Validate form fields in real time with Meteor and Semantic UI

This package is here to give you the possibility to make live validation individually in all fields on your forms.

* Semantic UI to display and validate forms
* User gets live validation feedback as he types
* Data is automatically saved if it passes validation and user stopped typing

Take a look on [Semantic UI Form Validation](http://semantic-ui.com/modules/form.html).


## How to install

`meteor add alvaromrinf:live-form-validator`


## How to use

First, you need to create a form template like this:

```
<!--myTemplate.html-->
<template name="myForm">
  <div class="ui form segment myForm">
    <div class="field">
      <label>My text</label>
      <div class="ui left labeled input">
        <input placeholder="Insert some text..." name="my_text_input" type="text">
        <div class="ui corner label">
          <i class="icon asterisk"></i>
        </div>
      </div>
    </div>
    <div class="ui submit button">Send</div>
  </div>
</template>
```

Then add some validation to it when it's rendered:

```sh
// myForm.js
var myForm;

Template.myForm.rendered = function () {
  if (!this._rendered) {
    this._rendered = true;
    myForm = $('.ui.form.myForm');

    // Validation rules
    myForm
      .form({
        my_text_input: {
          identifier: 'my_text_input',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter some text'
            },
            {
              type: 'length[10]',
              prompt: 'Your text must be at least 10 characters'
            }
          ]
        }
      },
      {
        inline: true,
        on: 'blur',
        transition: 'slide down',
        onSuccess: function () {
          // Save your data here
        }
      })
    ;
  }
};
```

And you should only call LiveFormValidator in keyup listener like this:

```sh
Template.myForm.events({
  'keyup input': function (event) {
    e.preventDefault();
    LiveFormValidator.validateFieldOnKeyUp({event: event, currentForm: myForm, save: true});
  }
});
```

The parameters that we are sending in the example are:
* event       ->  Event object
* currentForm ->  Semantic UI form element
* save        ->  Boolean to define if the form should be saved automatically


### Some options

You can set certain options to customize the package.

```sh
LiveFormValidator.config({
  timeWaitingForTyping: 2000,   // Number value in milliseconds
  timeShowingSuccess: 5000      // Number value in milliseconds
});
```

When we set *timeWaitingForTyping* value we are editing the delay between the moment the last key is typed and the
execution of the save method, default value is 2000. I don't recommend you set it to 0 if you are saving data on live
because it will result in too many unnecessary writes to the database.

If we set *timeShowingSuccess* value we are setting for how long success state should be displayed to the user before
disappearing, default value is 5000. If you set it to 0, the state won't be removed from the field until the user
starts typing again.


### Packages used

* standard-app-packages
* jquery
* underscore
* handlebar-helpers
* semantic-ui


## License
This package has an MIT License, see the LICENSE.md for more information.
