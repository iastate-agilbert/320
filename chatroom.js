var msgBox, messages, voiceSelect, lastStep;
function myFunction(){


   voiceSelect = document.getElementById('voice');
    // Create the utterance object
    // Fetch the list of voices and populate the voice options.
    function loadVoices() {
      // Fetch the available voices.
    	var voices = speechSynthesis.getVoices();

      // Loop through each of the voices.
    	voices.forEach(function(voice, i) {
        // Create a new option element.
    		var option = document.createElement('option');

        // Set the options value and text.
    		option.value = voice.name;
    		option.innerHTML = voice.name;

        // Add the option to the voice selector.
    		voiceSelect.appendChild(option);
    	});
    }
    loadVoices();

    window.speechSynthesis.onvoiceschanged = function(e) {
      loadVoices();
    };
    //change to make it not suck
    msgBox = $("#chatbox textarea")
    $('textarea').val('')
    messages = $("#messages")
    setTimeout(say("Hello, I hope this chatbot finds you well"), 2000);
    setTimeout(say("Tell me, do you believe in God?"), 2000);
    //messages.append($("<li>").text("Evangelizer: Hello, I hope this chatbot finds you well"))
    //setTimeout(timedQuestion, 2000);
  //  messages.append($("<li>").text("Evangelizer: Tell me, do you believe in God?"))

  lastStep = 0;
}


function sendMessage(){
 msgBox = $("#chatbox textarea")
 messages = $("#messages")
 response = msgBox.val()
 messages.append($("<li>").text("You: " + msgBox.val()))
 $('textarea').val('')
 respond(response)
}

//figure out what they said, show it, store it.
function listen(){

  messages = $("#messages")
  messages.append($("<li>").text("You: " + "Voice Demo"))
  respond("I said this");
}

//figure out how to respond
function respond(userResponse){
console.log("Userresponse: " + userResponse)
if(lastStep == 0){
  if(/\b(yes|yeah|sure|yep)\b/g.test(userResponse.toLowerCase())){
    say("Great! How long have you believed for?");
    lastStep = 1;
  }else if(/\b(no)\b/g.test(userResponse.toLowerCase())){
    say("Ok, have you thought about it much?");
    lastStep = 2;
  }else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 1){
  if(/\b(forever)\b/g.test(userResponse.toLowerCase())){
    say("Excellent to hear! Have you been baptized?");
    lastStep = 3;
  }else if(/\b(I lied)\b/g.test(userResponse)){
    say("Why did you do that?");
    lastStep = 4;
  }else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 3){
	if(/\b(yes)\b/g.test(userResponse.toLowerCase())){
		say("Fantastic! In what ways have you been growing in your faith? Have you been studying the Bible, looking into missions, staying in community, or none of these?");
		lastStep = 5;
	}else if(/\b(no)\b/g.test(userResponse)){
		say("Have you considered it?");
		lastStep = 6;
	}else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 5){
	if(/\b(bible|studying|study|missions|mission trip|missions trips|community)\b/g.test(userResponse.toLowerCase())){
		say("That's great! Keep striving to be more like Christ.");
		lastStep = 7;
	}else if(/\b(nothing|none|haven't|not|no)\b/g.test(userResponse.toLowerCase())){
		say("I'd encourage you to try some of these things in order to understand more about what you believe, and to grow closer to Christ.");
		lastStep = 8;
	}else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 6){
	if(/\b(yes)\b/g.test(userResponse.toLowerCase())){
		say("Would you like to be baptized?");
		lastStep = 9;
	}else if(/\b(not|haven't|no|did't)\b/g.test(userResponse.toLowerCase())){
		say("That's alright. I would encourage to consider it and the deeper meaning behind it.");
		lastStep = 10;
	}else{
    say("I didn't understand, please try again")
  }





}}

//respond, on the page, including saying it back to them.
function say(toSay){

  var utterance = new SpeechSynthesisUtterance();
  utterance.text = toSay;

  if (voiceSelect.value) {
		utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
  utterance.volume = 0.5;   // volume, from 0 to 1, default is 1
  utterance.rate = .8;     // speaking rate, default is 1
  messages = $("#messages")
  messages.append($("<li>").text("Evangelizer: " +utterance.text))

  // speak it!
  speechSynthesis.speak(utterance)
}