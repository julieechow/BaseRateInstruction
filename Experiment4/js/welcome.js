var welcome = {};

// --------------  things that vary from task to task --------------

welcome.task = {};
// welcome.task.blurb = '<b>"Making Predictions"</b> is a short psychological study investigating how people learn about stimuli and make predictions.';
welcome.task.blurb = 'This is a short psychological study investigating how people learn about cause and effect and make predictions.';
welcome.task.time = '5 minutes';
welcome.task.pay = 'US$1.00';

// --------------  things that vary between ethics approvals --------------

welcome.ethics = {};
welcome.ethics.approval = '2017/839';
welcome.ethics.name = 'Contingency Learning in a Medical Context';
welcome.ethics.selection = 'You are invited to participate in a study of how humans learn and reason.  We hope to learn what information people find most useful in guiding their judgments about the world. You were selected as a possible participant in this study because you accepted our HIT on Amazon Mechanical Turk.';
welcome.ethics.description = 'If you decide to participate, we will present you with some stimuli and you will be asked to make predictions about whether those stimuli cause outcomes. Detailed instructions will be provided once the task begins. The task should take approximately ' + welcome.task.time + ' to complete including reading time.';


// ----------------------- function to start the task ------------------
welcome.run = function() {
    document.getElementById("welcome").innerHTML =
        welcome.section.header +
        welcome.section.start +
        welcome.section.consent +
        welcome.section.demographics;
}

// ------------- actions to take at the end of each click ----------------
welcome.click = {};
welcome.click.start = function() {
    welcome.helpers.setDisplay('start', 'none');
    welcome.helpers.setDisplay('consent', '');
    welcome.helpers.setHeader(' ');
}
welcome.click.consent = function() {
    welcome.helpers.setDisplay('consent', 'none');
    welcome.helpers.setDisplay('demographics', '');
    welcome.helpers.setHeader(' ');
}
welcome.click.demographics = function() {
    welcome.helpers.setDisplay('demographics', 'none');
    welcome.helpers.setDisplay('header', 'none');
    jsPsych.data.addProperties({  // record the condition assignment in the jsPsych data
        gender: welcome.helpers.getRadioButton("gender"),
        age: document.getElementById("age").value,
        language: document.getElementById("language").value,
        country: document.getElementById("country").value
    });
    startExperiment(); // start the jsPsych experiment
}


// ------------- html for the various sections ----------------
welcome.section = {};
welcome.section.header =
    '<!-- ####################### Heading ####################### -->' +
    '<a name="top"></a>' +
    '<h1 style="text-align:center; width:1200px" id="header" class="header">' +
    '   &nbsp; University of Sydney, Brain and Behaviour Lab</h1>';

welcome.section.start =
    '<!-- ####################### Start page ####################### -->' +
    '<div class="start" style="width: 1000px">' +
    '<div class="start" style="text-align:left; border:0px solid; padding:10px;' +
    '                          width:800px; float:right; font-size:90%">' +
    '<p>Thanks for accepting the HIT. ' + welcome.task.blurb + ' It involves the following steps:</p>' +
    '<ol>' +
    '<li> We ask for demographic information (not connected to your Amazon ID)<br></li>' +
    '<li> Because this is a University research project, we ask for your informed consent.<br></li>' +
    '<li> The study then explains how to do the task in detail. You will need to pass a short ' +
    '     test to check that you understand how the study works.<br></li>' +
    '<li> Next comes the experiment itself.<br></li>' +
    '<li> At the end, we will give you the completion code you need to get paid for the HIT.</li>' +
    '</ol>' +
    '<p>The total time taken should be about ' + welcome.task.time + '. </p>' +
    '<p>Please <b>do not</b> use the "back" ' +
    '   button on your browser or close the window until you reach the end and receive your completion ' +
    '   code. This is very likely to break the experiment and may make it difficult for you to get paid. </p>' +
    '<p>It is also important that you complete the task in <b>one</b> sitting on a <b>computer</b>.' +
    '   If you attempt to complete the experiment on another device (e.g. ipad, phone), then ' +
    '   you may not be able to complete the experiment and it will also be difficult for you to get paid.</p>' +
    '<p>However, if something does go wrong, please contact us! When you are ready to begin, click on' +
    '   the "Start" button below.</p>' +
    '<!-- Next button for the splash page -->' +
    '<p align="center"> <input type="button" id="splashButton" class="start jspsych-btn" ' +
    'value="Start!" onclick="welcome.click.start()"> </p>' +
    '</div>' +
    '</div>';

welcome.section.consent =
    '	<!-- ####################### Consent ####################### -->' +
    '	<div class="consent" style="display:none; width:1000px">' +
    '		<!-- Text box for the splash page -->' +
    '		<div class="consent" style="text-align:left; border:0px solid; padding:10px;  width:800px; font-size:90%; float:right">' +
    '			<p align="right">Approval No ' + welcome.ethics.approval + '</p>' +
    '			<p align="center"><b>THE UNIVERSITY OF SYDNEY<br>' +
    '			PARTICIPANT INFORMATION STATEMENT</b><br><br>' + welcome.ethics.name + '</p>' +

    '			<p><b>(1) What is this study about?</b></p>' +
    '			<p>You are invited to take part in a research study investigating how people learn about cues and outcomes in a medically relevant context.</p>' +
    '			<p>You have been invited to participate in this study because you have expressed interest through the first-year participant pool (SONA), Amazon’s Mechanical Turk, Careers Hub, Survey Sampling International (SSI) or through the Brain and Behaviour Lab webpage.  This Participant Information Statement tells you about the research study. Knowing what is involved will help you decide if you want to take part in the research. </p>' +
    '			<p>Please read this sheet carefully and ask questions about anything that you don’t understand or want to know more about. </p>' +
    '			<p>Participation in this research study is voluntary. </p>' +
    '			<p>By giving your consent to take part in this study you are telling us that you:</p>' +
    '			<p>•	Understand what you have read.</p>' +
    '			<p>•	Agree to take part in the research study as outlined below.</p>' +
    '			<p>•	Agree to the use of your personal information as described.</p>' +
    '			<p>You will be given a copy of this Participant Information Statement to keep.</p>' +

    '			<p><b>(2)	Who is running the study?</b></p>' +
    '			<p>The study is being carried out by the following researchers:</p>' +
    '			<p>•	Dr. Evan Livesey, Chief Investigator / Senior Lecturer</p>' +
    '			<p>•	Julie Chow, PhD Student</p>' +
    '			<p>Julie Chow is conducting this study as the basis for the Doctor of Philosophy in Psychology at The University of Sydney. This will take place under the supervision of Dr. Evan Livesey.</p>' +

    '			<p><b>(3)	What will the study involve for me?</b></p>' +
    '			<p>You will be asked to complete a computerised task that may take up to 60 minutes.  In the beginning of the study, you will be asked to participate in a prediction task, where you will be introduced to a drug and asked to make a prediction about the outcome of administering the drug.</p>'+
    '			<p>You will then be presented with trials in which the drug is either administered or not administered to the patients, and you are required to make a prediction about the outcome by clicking on the scale provided.  Once a prediction has been made, feedback will be provided with the actual outcome on the trial.  You will then be presented with a new trial in which the process then repeats itself. At the end of all the trials, you will be asked to make a causal judgment about the effectiveness of the drug in treating the disease.</p>'+

    '     <p><b>(4)	How much of my time will the study take?</b></p>' +
    '			<p>The study may take up to 60 minutes to complete.  However this version of the task should take '+ welcome.task.time + '.</p>' +

    '     <p><b>(5)	Who can take part in the study?</b></p>' +
    '			<p>The study is open to all who may be interested.</p>' +

    '     <p><b>(6)	Do I have to be in the study? Can I withdraw from the study once I have started?</b></p>' +
    '			<p>Being in this study is completely voluntary and you do not have to take part. Your decision whether to participate will not affect your current or future relationship with the researchers or anyone else at the University of Sydney.</p>' +
    '			<p>If you decide to take part in the study and then change your mind later, you are free to withdraw at any time. You can do this by exiting the computer program and/or informing the researcher. Submitting your final response is taken as an indication of your consent to participate in the study.</p>' +
    '			<p>If you decide to withdraw from the study, we will not collect any more information from you. Please let us know at the time when you withdraw what you would like us to do with the information we have collected about you up to that point. If you wish your information will be removed from our study records and will not be included in the study results, up to the point that we have analysed and published the results.</p>' +

    '     <p><b>(7)	Are there any risks or costs associated with being in the study?</b></p>' +
    '			<p>Aside from giving up your time, we do not expect that there will be any risks or costs associated with taking part in this study.</p>' +

    '     <p><b>(8)	Are there any benefits associated with being in the study?</b></p>' +
    '			<p>Participants recruited via Amazon Mechanical Turk will be paid '+ welcome.task.pay +' for this study.</p>' +

    '     <p><b>(9)	What will happen to information about me that is collected during the study?</b></p>' +
    '			<p>By providing your consent, you are agreeing to us collecting information about your responses in the experiment for the purposes of this research study. Your information will only be used for the purposes outlined in this Participant Information Statement, unless you consent otherwise.</p>' +
    '			<p>Your information will be stored securely and your identity/information will be kept strictly confidential, except as required by law. Study findings may be published, but you will not be individually identifiable in these publications. Results will be presented in aggregate form. The spreadsheet containing individual participant names and their code will not be disseminated with the research results.</p>' +
    '			<p>Information will be kept in de-identified format after the experiment is complete and you have been assigned the relevant course credit.  A non-identifiable participant code will be assigned to each participant and data will be stored on a university-owned server for five years and then it will be deleted.</p>' +
    '			<p>We will keep the information we collect for this study, and we may use it in future projects. By providing your consent you are allowing us to use your information in future projects. We don’t know at this stage what these other projects will involve. We will seek ethical approval before using the information in these future projects.</p>' +

    '     <p><b>(10)	Can I tell other people about the study?	</b></p>' +
    '			<p>Please keep the content of the study to yourself to prevent response bias if they were to participate in this research study at a later date. </p>' +

    '     <p><b>(11)	What if I would like further information about the study?	</b></p>' +
    '			<p>You can contact the researcher, Julie Chow at julie.chow@sydney.edu.au if you require further information about the study.</p>' +

    '     <p><b>(12)	Will I be told the results of the study?	</b></p>' +
    '			<p>You have a right to receive feedback about the overall results of this study. You can tell us that you wish to receive feedback by contacting the relevant researcher stated above.  This feedback will be in the form of a brief written summary and a captioned figure. You will receive this feedback after the study is finished.</p>' +

    '     <p><b>(13) What if I have a complaint or any concerns about the study?</b></p>' +
    '			<p>Research involving humans in Australia is reviewed by an independent group of people called a Human Research Ethics Committee (HREC). The ethical aspects of this study have been approved by the HREC of the University of Sydney (protocol number '+ welcome.ethics.approval +').  As part of this process, we have agreed to carry out the study according to the National Statement on Ethical Conduct in Human Research (2007). This statement has been developed to protect people who agree to take part in research studies.</p>' +
    '			<p>If you are concerned about the way this study is being conducted or you wish to make a complaint to someone independent from the study, please contact the university using the details outlined below. Please quote the study title and protocol number. </p>' +
    '			<p>The Manager, Ethics Administration, University of Sydney:</p>' +
    '			<p>T•	Telephone: +61 2 8627 8176</p>' +
    '			<p>T•	Email: ro.humanethics@sydney.edu.au</p>' +
    '			<p>T•	Fax: +61 2 8627 8177 (Facsimile)</p>' +

    '			<p align="center"><b>PARTICIPANT CONSENT</b></p>' +
    '			By continuing, you are making a decision whether or not to participate.  Clicking the button below indicates that, having read the information provided on the participant information sheet, you have decided to participate.' +
    '			<br>' +
    '			<p align="center">' +
    '           <input type="button" id="consentButton" class="consent jspsych-btn" value="I agree" onclick="welcome.click.consent()" >' +
    '			</p>' +
    '			<p>To withdraw your consent, simply close the browser tab and return the HIT. Your data will be deleted from our records.</p>' +
    '		</div><br><br></div>';

welcome.section.demographics =
 '	<!-- ####################### Demographics ####################### -->' +
    '	<div class="demographics" style="display:none; align:center; width: 1000px">' +
    '		<div class="demographics" style="text-align:left; border:0px solid; padding:10px;  width:800px; font-size:90%; float:right">' +
    '			<!-- Explanatory text -->' +
    '            <p font-size:110%><b>Demographic information:</b></p>' +
    '			<p>We need this information for our records, but it is kept completely separate from'  +
    '                information about your Amazon ID. As long as you finish the experiment you will get ' +
    '                paid no matter what you put here, so please be honest.</p><br>' +
    '			<!-- Gender -->' +
    '           <label for="gender"><b>Gender: &nbsp;</b></label>' +
    '           <input type="radio" name="gender" value="male" /> Male &nbsp; ' +
    '           <input type="radio" name="gender" value="female" /> Female &nbsp;' +
    '           <input type="radio" name="gender" value="other" /> Other<br /><br />' +
    '			<!-- Age -->' +
    '           <label for="age"><b>Age: &nbsp;</b></label><input id="age" name="age" /><br /><br />' +
    '			<!-- Language -->' +
    '           <label for="language"><b>Native Language(s): &nbsp;</b></label>' +
    '            <input id="language" name="language" /><br /><br />' +
    '			<!-- Country -->' +
    '			<label for="country"><b>Country you live in: &nbsp;</b></label>  ' +
    '           <select name="country" id="country" class="drop-menu">' +
    '<option>Afghanistan</option><option>&Aring;land Islands</option><option>Albania</option><option>Algeria</option><option>American Samoa</option><option>Andorra</option><option>Angola</option><option>Anguilla</option><option>Antarctica</option><option>Antigua and Barbuda</option><option>Argentina</option><option>Armenia</option><option>Aruba</option><option>Australia</option><option>Austria</option><option>Azerbaijan</option><option>Bahamas</option><option>Bahrain</option><option>Bangladesh</option><option>Barbados</option><option>Belarus</option><option>Belgium</option><option>Belize</option><option>Benin</option><option>Bermuda</option><option>Bhutan</option><option>Bolivia</option><option>Bosnia and Herzegovina</option><option>Botswana</option><option>Bouvet Island</option><option>Brazil</option><option>British Indian Ocean territory</option><option>Brunei Darussalam</option><option>Bulgaria</option><option>Burkina Faso</option><option>Burundi</option><option>Cambodia</option><option>Cameroon</option><option>Canada</option><option>Cape Verde</option><option>Cayman Islands</option><option>Central African Republic</option><option>Chad</option><option>Chile</option><option>China</option><option>Christmas Island</option><option>Cocos (Keeling) Islands</option><option>Colombia</option><option>Comoros</option><option>Congo</option><option>Congo, Democratic Republic</option><option>Cook Islands</option><option>Costa Rica</option><option>C&ocirc;te d&#8217;Ivoire (Ivory Coast)</option><option>Croatia (Hrvatska)</option><option>Cuba</option><option>Cyprus</option><option>Czech Republic</option><option>Denmark</option><option>Djibouti</option><option>Dominica</option><option>Dominican Republic</option><option>East Timor</option><option>Ecuador</option><option>Egypt</option><option>El Salvador</option><option>Equatorial Guinea</option><option>Eritrea</option><option>Estonia</option><option>Ethiopia</option><option>Falkland Islands</option><option>Faroe Islands</option><option>Fiji</option><option>Finland</option><option>France</option><option>French Guiana</option><option>French Polynesia</option><option>French Southern Territories</option><option>Gabon</option><option>Gambia</option><option>Georgia</option><option>Germany</option><option>Ghana</option><option>Gibraltar</option><option>Greece</option><option>Greenland</option><option>Grenada</option><option>Guadeloupe</option><option>Guam</option><option>Guatemala</option><option>Guinea</option><option>Guinea-Bissau</option><option>Guyana</option><option>Haiti</option><option>Heard and McDonald Islands</option><option>Honduras</option><option>Hong Kong</option><option>Hungary</option><option>Iceland</option><option>India</option><option>Indonesia</option><option>Iran</option><option>Iraq</option><option>Ireland</option><option>Israel</option><option>Italy</option><option>Jamaica</option><option>Japan</option><option>Jordan</option><option>Kazakhstan</option><option>Kenya</option><option>Kiribati</option><option>Korea (north)</option><option>Korea (south)</option><option>Kuwait</option><option>Kyrgyzstan</option><option>Lao People&#8217;s Democratic Republic</option><option>Latvia</option><option>Lebanon</option><option>Lesotho</option><option>Liberia</option><option>Libyan Arab Jamahiriya</option><option>Liechtenstein</option><option>Lithuania</option><option>Luxembourg</option><option>Macao</option><option>Macedonia, Former Yugoslav Republic Of</option><option>Madagascar</option><option>Malawi</option><option>Malaysia</option><option>Maldives</option><option>Mali</option><option>Malta</option><option>Marshall Islands</option><option>Martinique</option><option>Mauritania</option><option>Mauritius</option><option>Mayotte</option><option>Mexico</option><option>Micronesia</option><option>Moldova</option><option>Monaco</option><option>Mongolia</option><option>Montenegro</option><option>Montserrat</option><option>Morocco</option><option>Mozambique</option><option>Myanmar</option><option>Namibia</option><option>Nauru</option><option>Nepal</option><option>Netherlands</option><option>Netherlands Antilles</option><option>New Caledonia</option><option>New Zealand</option><option>Nicaragua</option><option>Niger</option><option>Nigeria</option><option>Niue</option><option>Norfolk Island</option><option>Northern Mariana Islands</option><option>Norway</option><option>Oman</option><option>Pakistan</option><option>Palau</option><option>Palestinian Territories</option><option>Panama</option><option>Papua New Guinea</option><option>Paraguay</option><option>Peru</option><option>Philippines</option><option>Pitcairn</option><option>Poland</option><option>Portugal</option><option>Puerto Rico</option><option>Qatar</option><option>R&eacute;union</option><option>Romania</option><option>Russian Federation</option><option>Rwanda</option><option>Saint Helena</option><option>Saint Kitts and Nevis</option><option>Saint Lucia</option><option>Saint Pierre and Miquelon</option><option>Saint Vincent and the Grenadines</option><option>Samoa</option><option>San Marino</option><option>Sao Tome and Principe</option><option>Saudi Arabia</option><option>Senegal</option><option>Serbia</option><option>Seychelles</option><option>Sierra Leone</option><option>Singapore</option><option>Slovakia</option><option>Slovenia</option><option>Solomon Islands</option><option>Somalia</option><option>South Africa</option><option>South Georgia and the South Sandwich Islands</option><option>Spain</option><option>Sri Lanka</option><option>Sudan</option><option>Suriname</option><option>Svalbard and Jan Mayen Islands</option><option>Swaziland</option><option>Sweden</option><option>Switzerland</option><option>Syria</option><option>Taiwan</option><option>Tajikistan</option><option>Tanzania</option><option>Thailand</option><option>Togo</option><option>Tokelau</option><option>Tonga</option><option>Trinidad and Tobago</option><option>Tunisia</option><option>Turkey</option><option>Turkmenistan</option><option>Turks and Caicos Islands</option><option>Tuvalu</option><option>Uganda</option><option>Ukraine</option><option>United Arab Emirates</option><option>United Kingdom</option><option selected="selected">United States of America</option><option>Uruguay</option><option>Uzbekistan</option><option>Vanuatu</option><option>Vatican City</option><option>Venezuela</option><option>Vietnam</option><option>Virgin Islands (British)</option><option>Virgin Islands (US)</option><option>Wallis and Futuna Islands</option><option>Western Sahara</option><option>Yemen</option><option>Zaire</option><option>Zambia</option><option>Zimbabwe</option></select>' +
    '		<br><br>' +
    '		<!-- Demographics  button -->' +
    '        <p align="center">' +
    '                <input type="button" class="demographics jspsych-btn"' +
    '                        id="demographicsButton" value="Next >"' +
    '                       onclick="welcome.click.demographics()">' +
    '       </p></div>';



// ----------------------- helper functions ------------------

welcome.helpers = {};
welcome.helpers.getRadioButton = function(name) { // get the value of a radio button
    var i, radios = document.getElementsByName(name);
    for (i = 0; i < radios.length; i = i + 1) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
    return ("NA");
}
welcome.helpers.setDisplay = function(theClass, theValue) { // toggle display status
    var i, classElements = document.getElementsByClassName(theClass);
    for (i = 0; i < classElements.length; i = i + 1) {
        classElements[i].style.display = theValue;
    }
}
welcome.helpers.setVisibility = function(theClass, theValue) { // toggle visibility
    var i, classElements = document.getElementsByClassName(theClass);
    for (i = 0; i < classElements.length; i = i + 1) {
        classElements[i].style.visibility = theValue;
    }
}
welcome.helpers.setHeader = function(theValue) { // alter the header
    document.getElementById("header").innerText = theValue;
}
