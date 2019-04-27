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
  }else if(/\b(no|not)\b/g.test(userResponse.toLowerCase())){
    say("Ok, have you thought about it much?");
    lastStep = 2;
  }else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 1){
  if(/\b(forever|long time|years|childhood)\b/g.test(userResponse.toLowerCase())){
    say("Excellent to hear! Have you been baptized?");
    lastStep = 3;
  }else if(/\b(recent|new|not long|days|months|weeks|yesterday)\b/g.test(userResponse)){
    say("That's awesome! How did you come to believe?");
    lastStep = 4;
  }else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 3){
	if(/\b(yes|of course)\b/g.test(userResponse.toLowerCase())){
		say("Fantastic! In what ways have you been growing in your faith? Have you been studying the Bible, looking into missions, staying in community, or none of these?");
		lastStep = 5;
	}else if(/\b(no|not|don't|didn't|haven't)\b/g.test(userResponse)){
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
		say("That's alright. I would encourage you to consider it and the deeper meaning behind it.");
		lastStep = 10;
	}else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 4){
	if(/\b(friend|mother|mom|dad|father|brother|sister|grandmother|grandfather|relative|family|church|shared|hope|redeemed)\b/g.test(userResponse.toLowerCase())){
		say("Thats really cool! Thanks for sharing. Does your family believe?");
		lastStep = 11;
	}else{
    say("I didn't understand, please try again")
  }
}else if(lastStep == 11){
	if(/\b(yes)\b/g.test(userResponse.toLowerCase())){
		say("That's great! I'm glad we had this talk.");
		lastStep = 12;
	if(/\b(no)\b/g.test(userResponse.toLowerCase())){
		say("Be a blessing to them with how you live. Be a light in their lives by showing the Gospel with grace and by being a servant.");
		lastStep = 13;
	}else{
	say("I didn't understand, please try again")
  }
}else if(lastStep == 9){
	if(/\b(yes|I do|I would|)\b/g.test(userResponse.toLowerCase())){
		say("That's great! Go for it!");
		lastStep = 14;
	if(/\b(no|not|don't|can't)\b/g.test(userResponse.toLowerCase())){
		say("I would encourage you to consider it. Thanks for talking with me!");
		lastStep = 15;
	}else{
	say("I didn't understand, please try again")
	}
}else if(lastStep == 2){
	if(/\b(yes|I have|of course|certainly)\b/g.test(userResponse.toLowerCase())){
		say("I would encourage you to keep thinking about the existence of God. I think that you can find hope that way, whether you think you need it now or not. Thank you for speaking with me!");
	if(/\b(no|haven't|don't|not)\b/g.test(userResponse.toLowerCase())){
		say("I'd encourage you to think about it. It's not up to me to prove his existence to anyone, but I think that everyone needs hope at some point. Thank you for speaking with me!");
	
	}else{
	say("I didn't understand, please try again")
	}
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