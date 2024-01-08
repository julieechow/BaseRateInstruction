/**
 * jspsych plugin to run trial with a choice, a slider, then feedback
 *
 *
 * documentation: docs.jspsych.org
 **/


jsPsych.plugins['categorize-cuechoice'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'categorize-cuechoice',
    description: '',
    parameters: {
      stimulus_choice: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus choice',
        default: undefined,
        description: 'The HTML content to be displayed.'
      },
      stimulus1: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML content to be displayed.'
      },
      stimulus2: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML content to be displayed.'
      },
      key_answer: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key answer',
        default: 71,
        description: 'The key to indicate the correct response.'
      },
      cue_answer: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key answer',
        default: undefined,
        description: 'The key to indicate the correct response.'
      },
      cue_choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        array: true,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      cue_choice_options:{
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choice options',
        default: null,
        description: 'Choice options placed here will be displayed below the stimulus.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        array: true,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      choice_options:{
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choice options',
        default: null,
        description: 'Choice options placed here will be displayed below the stimulus.'
      },
      text_answer: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Text answer',
        default: null,
        description: 'Label that is associated with the correct answer.'
      },
      correct_text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Correct text',
        default: "<p class='feedback'>Correct</p>",
        description: 'String to show when correct answer is given.',
      },
      incorrect_text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Incorrect text',
        default: "<p class='feedback'>Incorrect</p>",
        description: 'String to show when incorrect answer is given.',
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      force_correct_button_press: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Force correct button press',
        default: false,
        description: 'If set to true, then the subject must press the correct response key after feedback in order to advance to next trial.'
      },
      show_stim_with_feedback: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: true,
        no_function: false,
        description: ''
      },
      show_feedback_on_timeout: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Show feedback on timeout',
        default: false,
        description: 'If true, stimulus will be shown during feedback. If false, only the text feedback will be displayed during feedback.'
      },
      timeout_message: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Timeout message',
        default: "<p>Please respond faster.</p>",
        description: 'The message displayed on a timeout non-response.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial'
      },
      feedback_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback duration',
        default: 2000,
        description: 'How long to show feedback.'
      },
      stagger_elements_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stagger visual elements duration',
        default: 500,
        description: 'How long to delay staggered visual info.'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Slider starting value',
				default: 50,
				description: 'Sets the starting value of the slider',
			},
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name:'Labels',
        default: ['Very unlikely','Very likely'],
        array: true,
        description: 'Labels of the slider.',
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: 'Rate the chances that this patient will recover.',
        description: 'Any content here will be displayed below the slider.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<div id="jspsych-categorize-cuechoice" class="jspsych-categorize-cuechoice">'+trial.stimulus_choice+'</div>';
    display_element.innerHTML += trial.cue_choice_options;

    // // hide image after time if the timing parameter is set
    // if (trial.stimulus_duration !== null) {
    //   jsPsych.pluginAPI.setTimeout(function() {
    //     display_element.querySelector('#jspsych-categorize-cuechoice').style.visibility = 'hidden';
    //   }, trial.stimulus_duration);
    // }

    // if prompt is set, show prompt
    // if (trial.prompt !== null) {
    //   display_element.innerHTML += trial.prompt;
    // }

    var trial_data = {};

    // create response function
    var after_response = function(info) {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // clear keyboard listener
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      var cue_selected = false;
      if (trial.cue_answer == info.key) {
        cue_selected = true;
      }

      if (cue_selected) {
        var html = '<div id="jspsych-categorize-cuechoice-stimulus" class="jspsych-categorize-cuechoice-stimulus">'+trial.stimulus1+'</div>';
      } else {
        var html = '<div id="jspsych-categorize-cuechoice-stimulus" class="jspsych-categorize-cuechoice-stimulus">'+trial.stimulus2+'</div>';
      }
      // the Slider
      html += '<div class="jspsych-image-slider-response-container" style="position:relative;">';
      html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-image-slider-response-response"></input>';
      html += '<div>'
      for(var j=0; j < trial.labels.length; j++){
        var width = 100/(trial.labels.length-1);
        var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
        html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
        html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
        html += '</div>'
      }
      html += '</div>';
      html += '</div>';
      // add prompt
      if (trial.prompt !== null){
        html += trial.prompt;
      }
      // add submit button
      html += '<button id="jspsych-image-slider-response-next" class="jspsych-btn">'+trial.button_label+'</button>';

      display_element.innerHTML = html;

      var rating_response = {
        rt: null,
        response: null
      };

      display_element.querySelector('#jspsych-image-slider-response-next').addEventListener('click', function() {
        // measure response time
        var endTime = (new Date()).getTime();
        rating_response.rt = endTime - startTime;
        rating_response.response = display_element.querySelector('#jspsych-image-slider-response-response').value;


          display_element.querySelector('#jspsych-image-slider-response-next').disabled = true;
          // save data
          trial_data = {
            "rt": info.rt,
            "stimulus": trial.stimulus,
            "key_press": info.key,
            "rating_rt": rating_response.rt,
            "rating_value": rating_response.response,
            "cue_selected": cue_selected
          };

          display_element.innerHTML = '';

          var timeout = info.rt == null;
          doFeedback(cue_selected, timeout);
      });
    }

    jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.cue_choices,
      rt_method: 'date',
      persist: false,
      allow_held_key: false
    });

    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        after_response({
          key: null,
          rt: null
        });
      }, trial.trial_duration);
    }

    function doFeedback(cue_selected,timeout) {

      if (timeout && !trial.show_feedback_on_timeout) {
        display_element.innerHTML += trial.timeout_message;
      } else {
        // show image during feedback if flag is set
        if (trial.show_stim_with_feedback) {
          if (cue_selected) {
            display_element.innerHTML = '<div id="jspsych-categorize-cuechoice" class="jspsych-categorize-cuechoice">'+trial.stimulus1+'</div>';
          } else {
            display_element.innerHTML = '<div id="jspsych-categorize-cuechoice" class="jspsych-categorize-cuechoice">'+trial.stimulus2+'</div>';
          }
        }

        // substitute answer in feedback string.
        var atext = "";
        if (trial.data.outcome) {
          atext = trial.correct_text.replace("%ANS%", trial.text_answer);
          // display_element.innerHTML += '<div class="OPresent_text"; '+atext+'</div>';
        } else {
          atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
          // display_element.innerHTML += '<div class="OAbsent_text"; '+atext+'</div>';
        }

        display_element.innerHTML += atext;

        //jsPsych.pluginAPI.setTimeout(function() {
        // show the feedback

            //}, trial.stagger_elements_duration);
      }
      // check if force correct button press is set
      if (trial.force_correct_button_press && correct === false && ((timeout && trial.show_feedback_on_timeout) || !timeout)) {

        var after_forced_response = function(info) {
          endTrial();
        }

        jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_forced_response,
          valid_responses: [trial.key_answer],
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });

      } else {
        jsPsych.pluginAPI.setTimeout(function() {
          endTrial();
        }, trial.feedback_duration);
      }

    }

    function endTrial() {
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
