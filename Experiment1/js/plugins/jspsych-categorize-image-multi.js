/**
 * jspsych plugin for categorization trials with feedback
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 **/


jsPsych.plugins['categorize-image-multi'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('categorize-image-multi', 'stimulus', 'image');

  plugin.info = {
    name: 'categorize-image-multi',
    description: '',
    parameters: {
      stimulus_centre: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus Centre',
        default: undefined,
        description: 'The image content to be displayed in centre.'
      },
      stimulus_left: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus Left',
        default: undefined,
        description: 'The image content to be displayed on left.'
      },
      stimulus_right: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus Right',
        default: undefined,
        description: 'The image content to be displayed on right.'
      },
      outcome_choice_1: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Outcome Choice 1',
        default: undefined,
        description: 'The image content to be displayed for 1st outcome.'
      },
      outcome_choice_2: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Outcome Choice 2',
        default: undefined,
        description: 'The image content to be displayed for 2nd outcome.'
      },
      outcome_choice_3: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Outcome Choice 3',
        default: undefined,
        description: 'The image content to be displayed for 3rd outcome.'
      },
      outcome_choice_4: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Outcome Choice 4',
        default: undefined,
        description: 'The image content to be displayed for 4th outcome.'
      },
      outcome_choice_1_prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choice 1 key prompt',
        default: null,
        description: 'Prompt for key to choose Outcome 1.'
      },
      outcome_choice_2_prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choice 2 key prompt',
        default: null,
        description: 'Prompt for key to choose Outcome 2.'
      },
      outcome_choice_3_prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choice 3 key prompt',
        default: null,
        description: 'Prompt for key to choose Outcome 3.'
      },
      outcome_choice_4_prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Choice 4 key prompt',
        default: null,
        description: 'Prompt for key to choose Outcome 4.'
      },
      key_answer: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key answer',
        default: undefined,
        description: 'The key to indicate the correct response.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        array: true,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
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
        description: 'String to show when correct answer is given.'
      },
      incorrect_text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Incorrect text',
        default: "<p class='feedback'>Incorrect</p>",
        description: 'String to show when incorrect answer is given.'
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
        default: 2500,
        description: 'How long to show feedback.'
      },
      stagger_elements_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stagger visual elements duration',
        default: 500,
        description: 'How long to delay staggered visual info.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<center>' +
    '<img id="jspsych-categorize-image-multi-stimulus_left" class="jspsych-categorize-image-multi-stimulus" src="'+trial.stimulus_left+'"></img>'+
    '<img id="jspsych-categorize-image-multi-stimulus_centre" class="jspsych-categorize-image-multi-stimulus" src="'+trial.stimulus_centre+'"></img>'+
    '<img id="jspsych-categorize-image-multi-stimulus_right" class="jspsych-categorize-image-multi-stimulus" src="'+trial.stimulus_right+'"></img>'+
    '</center>';

    // hide image after time if the timing parameter is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-categorize-image-multi-stimulus_left').style.visibility = 'hidden';
        display_element.querySelector('#jspsych-categorize-image-multi-stimulus_centre').style.visibility = 'hidden';
        display_element.querySelector('#jspsych-categorize-image-multi-stimulus_right').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }


    // stagger onset of choices after cues are presented
    if (trial.stagger_elements_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        // if prompt is set, show prompt
        if (trial.prompt !== null) {
          display_element.innerHTML += trial.prompt;
        }
        display_element.innerHTML += '<center> ' + trial.outcome_choice_1_prompt + '    </center>' + '<center><img id="jspsych-categorize-image-multi-outcome_choice_1" class="jspsych-categorize-image-multi-outcome_choice_1" src="'+trial.outcome_choice_1+'"></img></center>';
        display_element.innerHTML += '<center> ' + trial.outcome_choice_2_prompt + '    </center>' + '<center><img id="jspsych-categorize-image-multi-outcome_choice_2" class="jspsych-categorize-image-multi-outcome_choice_2" src="'+trial.outcome_choice_2+'"></img></center>';
        display_element.innerHTML += '<center> ' + trial.outcome_choice_3_prompt + '    </center>' + '<center><img id="jspsych-categorize-image-multi-outcome_choice_3" class="jspsych-categorize-image-multi-outcome_choice_3" src="'+trial.outcome_choice_3+'"></img></center>';
        display_element.innerHTML += '<center> ' + trial.outcome_choice_4_prompt + '    </center>' + '<center><img id="jspsych-categorize-image-multi-outcome_choice_4" class="jspsych-categorize-image-multi-outcome_choice_4" src="'+trial.outcome_choice_4+'"></img></center>';
      }, trial.stagger_elements_duration);
    }


    var trial_data = {};

    // create response function
    var after_response = function(info) {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // clear keyboard listener
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      var correct = false;
      if (trial.key_answer == info.key) {
        correct = true;
      }

      // save data
      trial_data = {
        "rt": info.rt,
        "correct": correct,
        "left stimulus": trial.stimulus_left,
        "centre stimulus": trial.stimulus_centre,
        "right stimulus": trial.stimulus_right,
        "key_press": info.key
      };

      display_element.innerHTML = '';

      var timeout = info.rt == null;
      doFeedback(correct, timeout);
    }

    jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
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

    function doFeedback(correct, timeout) {

      if (timeout && !trial.show_feedback_on_timeout) {
        display_element.innerHTML += trial.timeout_message;
      } else {
        // show image during feedback if flag is set
        if (trial.show_stim_with_feedback) {
          display_element.innerHTML = '<center>' +
          '<img id="jspsych-categorize-image-multi-stimulus_left" class="jspsych-categorize-image-multi-stimulus" src="'+trial.stimulus_left+'"></img>'+
          '<img id="jspsych-categorize-image-multi-stimulus_centre" class="jspsych-categorize-image-multi-stimulus" src="'+trial.stimulus_centre+'"></img>'+
          '<img id="jspsych-categorize-image-multi-stimulus_right" class="jspsych-categorize-image-multi-stimulus" src="'+trial.stimulus_right+'"></img>'+
          '</center>';
        }

        // substitute answer in feedback string.
        // now doing by image of correct outcome
        var atext = "";
        // if (correct) {
        //   atext = trial.correct_text.replace("%ANS%", trial.text_answer);
        // } else {
        //   atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
        // }
        if (correct) {
          atext = trial.correct_text;
        } else {
          atext = trial.incorrect_text;
        }

        jsPsych.pluginAPI.setTimeout(function() {
        // show the feedback
        display_element.innerHTML += atext;
        display_element.innerHTML += '<center><img id="jspsych-categorize-image-multi-outcome_correct_O" class="jspsych-categorize-image-multi-outcome_correct_O" src="'+trial.text_answer+'"></img></center>';
      }, trial.stagger_elements_duration);
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

  };

  return plugin;
})();
