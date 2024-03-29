/**
 * jspsych-image-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['image-slider-response'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('image-slider-response', 'stimulus', 'image');

  plugin.info = {
    name: 'image-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
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
        default: [],
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
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '<center><div id="jspsych-image-slider-response-wrapper" style="margin: 100px 0px;">';  // modified by JL, centered
    html += '<div id="jspsych-image-slider-response-stimulus"><img src="' + trial.stimulus + '"></div>';
    html += '<div class="jspsych-image-slider-response-container" style="position:relative;">';
    html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 50%;" id="jspsych-image-slider-response-response"></input>'; // modified by JL, original width 100%
    html += '<div>'
    for(var j=0; j < trial.labels.length; j++){
      var width = 100/(trial.labels.length-1);
      //var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      var left_offset = (j * (50 /(trial.labels.length - 1))) - (width/4); // Modified by JL
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">'; //modified by JL, scale and text centered
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }
    html += '</div>';
    html += '</div>';
    html += '</div></center>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<center><button id="jspsych-image-slider-response-next" class="jspsych-btn">'+trial.button_label+'</button></center>'; // modified by JL, centered

    display_element.innerHTML = html;

    document.getElementById('jspsych-image-slider-response-next').style.visibility='hidden'; // hide submit button

    var response = {
      rt: null,
      response: null
    };

    // show continue button once initial response made (added by JL)
    display_element.querySelector('#jspsych-image-slider-response-response').addEventListener('click', function() {

      curResponse = display_element.querySelector('#jspsych-image-slider-response-response').value;

      var html = '<center><div id="jspsych-image-slider-response-wrapper" style="margin: 100px 0px;">';  // modified by JL, centered
      html += '<div id="jspsych-image-slider-response-stimulus"><img src="' + trial.stimulus + '"></div>';
      html += '<div class="jspsych-image-slider-response-container" style="position:relative;">';
      html += '<input type="range" value="'+curResponse+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 50%;" id="jspsych-image-slider-response-response"></input>'; // modified by JL, original width 100%
      html += '<div>'
      for(var j=0; j < trial.labels.length; j++){
        var width = 100/(trial.labels.length-1);
        //var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
        var left_offset = (j * (50 /(trial.labels.length - 1))) - (width/4); // Modified by JL
        html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">'; //modified by JL, scale and text centered
        html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
        html += '</div>'
      }
      html += '</div>';
      html += '</div>';
      html += '</div></center>';

      if (trial.prompt !== null){
        html += trial.prompt;
      }

      html += '<center><button id="jspsych-image-slider-response-next" class="jspsych-btn">'+trial.button_label+'</button></center>';

      display_element.innerHTML = html;

      // when 'continue' button clicked
      display_element.querySelector('#jspsych-image-slider-response-next').addEventListener('click', function() {

        // measure response time
        var endTime = (new Date()).getTime();
        response.rt = endTime - startTime;
        response.response = display_element.querySelector('#jspsych-image-slider-response-response').value;

        if(trial.response_ends_trial){
          end_trial();
        } else {
          display_element.querySelector('#jspsych-image-slider-response-next').disabled = true;
        }

      });

    });

    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "response": response.response
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-image-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
