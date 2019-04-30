var msgBox, messages, voiceSelect, muted;
var lastStep = 0;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//Uses Web Speech API for TTS and ASR:
//"https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API"

//Load all voices from the browser that can be used.
function onStart() {
  voiceSelect = document.getElementById('voice');

  function loadVoices() {
    var voices = speechSynthesis.getVoices();
    voices.forEach(function(voice, i) {
      var option = document.createElement('option');
      option.value = voice.name;
      option.innerHTML = voice.name;
      voiceSelect.appendChild(option);
    });
  }
  loadVoices();

  window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
  };


  lastStep = 0;
}

//On begin button press, start the conversation
function begin() {
  $("#beginButton").hide();
  msgBox = $("#chatbox textarea")
  $('textarea').val('')
  messages = $("#messages")
  setTimeout(say("Hello, I hope this chatbot finds you well"), 2000);
  setTimeout(say("Tell me, do you believe in God?"), 2000);
}

//mute the speaker (for next time)
function mute() {
  muted = !muted;
  if (muted) {
    $("#muteButton").val('Unmute Speaker')
  } else {
    $("#muteButton").val('Mute Speaker')
  }
}

//send the message via text
function sendMessage() {
  msgBox = $("#chatbox textarea")
  messages = $("#messages")
  response = msgBox.val()
  messages.append("<br />You: " + msgBox.val())
  $('textarea').val('')
  respond(response);
}

//figure out what they said, and send that to be responded too
function listen() {
  button = $("#button2")
  button.disabled = true;
  button.textContent = 'Test in progress';

  var speechResult;
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    speechResult = event.results[0][0].transcript.toLowerCase();
    console.log(speechResult)
    console.log('Confidence: ' + event.results[0][0].confidence);
    messages = $("#messages")
    messages.append("<br />You: " + speechResult)
    respond(speechResult);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    button.disabled = false;
    button.textContent = 'Start new test';
  }
}

//figure out how to respond
function respond(userResponse) {
  console.log("Userresponse: " + userResponse)
  if (lastStep == 0) {
    if (/\b(yes|yeah|sure|yep)\b/g.test(userResponse.toLowerCase())) {
      say("Great! How long have you believed for?");
      lastStep = 1;
    } else if (/\b(no|not)\b/g.test(userResponse.toLowerCase())) {
      say("Ok, have you thought about it much?");
      lastStep = 2;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 1) {
    if (/\b(forever|long time|years|childhood)\b/g.test(userResponse.toLowerCase())) {
      say("Excellent to hear! Have you been baptized?");
      lastStep = 3;
    } else if (/\b(recent|new|not long|days|months|weeks|yesterday|not long)\b/g.test(userResponse)) {
      say("That's awesome! How did you come to believe?");
      lastStep = 4;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 3) {
    if (/\b(yes|of course)\b/g.test(userResponse.toLowerCase())) {
      say("Fantastic! In what ways have you been growing in your faith? Have you been studying the Bible, looking into missions, staying in community, or none of these?");
      lastStep = 5;
    } else if (/\b(no|not|don't|didn't|haven't)\b/g.test(userResponse)) {
      say("Have you considered it?");
      lastStep = 6;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 5) {
    if (/\b(bible|studying|study|missions|mission trip|missions trips|community)\b/g.test(userResponse.toLowerCase())) {
      say("That's great! Keep striving to be more like Christ.");
      lastStep = 7;
    } else if (/\b(nothing|none|haven't|not|no)\b/g.test(userResponse.toLowerCase())) {
      say("I'd encourage you to try some of these things in order to understand more about what you believe, and to grow closer to Christ.");
      lastStep = 8;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 6) {
    if (/\b(yes)\b/g.test(userResponse.toLowerCase())) {
      say("Would you like to be baptized?");
      lastStep = 9;
    } else if (/\b(not|haven't|no|did't)\b/g.test(userResponse.toLowerCase())) {
      say("That's alright. I would encourage you to consider it and the deeper meaning behind it.");
      lastStep = 10;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 4) {
    if (/\b(friend|mother|mom|dad|father|brother|sister|grandmother|grandfather|relative|family|church|shared|hope|redeemed)\b/g.test(userResponse.toLowerCase())) {
      say("Thats really cool! Thanks for sharing. Does your family believe?");
      lastStep = 11;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 11) {
    if (/\b(yes)\b/g.test(userResponse.toLowerCase())) {
      say("That's great! I'm glad we had this talk.");
      lastStep = 12;
    } else if (/\b(no)\b/g.test(userResponse.toLowerCase())) {
      say("Be a blessing to them with how you live. Be a light in their lives by showing the Gospel with grace and by being a servant.");
      lastStep = 13;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 9) {
    if (/\b(yes|I do|I would|)\b/g.test(userResponse.toLowerCase())) {
      say("That's great! Go for it!");
      lastStep = 14;
    } else if (/\b(no|not|don't|can't)\b/g.test(userResponse.toLowerCase())) {
      say("I would encourage you to consider it. Take a look at 1st Peter 3:21, if you would like to think about it more. Thanks for talking with me!");
      lastStep = 15;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 2) {
    if (/\b(yes|I have|of course|certainly)\b/g.test(userResponse.toLowerCase())) {
      say("How would you describe what you believe?");
	  lastStep = 16;
    } else if (/\b(no|haven't|don't|not)\b/g.test(userResponse.toLowerCase())) {
      say("Do you believe that there is purpose in life?");
	  lastStep = 17;
    } else {
      say("I didn't understand, please try again")
    }
  } else if (lastStep == 16) {
	if (/\b(atheist|atheism|none)\b/g.test(userResponse.toLowerCase())) {
	  say("So, do you believe that there is real purpose in life?");
	  lastStep = 18;
	} else if (/\b(hindu|hinduism|polytheistic|many|multiple|more than one)\b/g.test(userResponse.toLowerCase())) {
	  say("What do you believe happens when we die?");
	  lastStep = 19;
	} else {
	  say("I didn't understand, please try again")
    }
  } else if (lastStep == 18) {
	if (/\b(yes|of course|certainly)\b/g.test(userResponse.toLowerCase())) {
	  say("What happens when we die?");
	  lastStep = 20;
	} else if (/\b(no|none|nothing|purposeless|empty|meaningless|accident|mistake)\b/g.test(userResponse.toLowerCase())) {
	  say("What happens when we die?");
	  lastStep = 21;
	} else {
	  say("I didn't understand, please try again")
    }
  } else if (lastStep == 20) {
	if (/\b(nothing|nothingness|emptiness|void|darkness|lack of consciousness|end of consciousness)\b/g.test(userResponse.toLowerCase())) {
	  say("If what I have at the end of life is nothingness, the end of consciousness, then I never had anything to lose. But, if at the end of life there is eternity and consciousness, I have everything to either gain or to lose.");
	  lastStep = 22;
	} else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 21) {
	if (/\b(nothing|nothingness|emptiness|void|darkness|lack of consciousness|end of consciousness)\b/g.test(userResponse.toLowerCase())) {
	  say("If what I have at the end of life is nothingness, the end of consciousness, then I never had anything to lose. But, if at the end of life there is eternity and consciousness, I have everything to either gain or to lose.");
	  lastStep = 23;
    } else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 19) {
	if (/\b(reincarnate|nothing|reincarnation|cycle)\b/g.test(userResponse.toLowerCase())) {
	  say("Do you believe that there is a purpose in life?");
	  lastStep = 24;
	} else if (/\b(nothing|nothingness|emptiness|void|darkness|lack of consciousness|end of consciousness)\b/g.test(userResponse.toLowerCase())) {
	  say("If what I have at the end of life is nothingness, the end of consciousness, then I never had anything to lose. But, if at the end of life there is eternity and consciousness, I have everything to either gain or to lose.");
	  lastStep = 25;
	} else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 24) {
	if (/\b(yes|certainly|of course|balance)\b/g.test(userResponse.toLowerCase())) {
	  say("Does that purpose fulfill you, or does it leave you with a continued need for satisfy you?");
	  lastStep = 26;
	} else if (/\b(no|not|none|nothing)\b/g.test(userResponse.toLowerCase())) {
	  say("I hope that you consider God. With God there isn't just purpose, but also hope for fully satisfied life after this one. Thanks for talking with me!");
	  lastStep = 27;
	 } else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 26) {
	if (/\b(yes|definitely|of course|certainly)\b/g.test(userResponse.toLowerCase())) {
	  say("I see. This has been an interesting conversation, and I would like to continue it another time. Thank you for speaking with me!");
	  lastStep = 28;
	} else if (/\b(no|not|doesn't|don't)\b/g.test(userResponse.toLowerCase())) {
	  say("I hope that you consider God. With God there isn't just purpose, but also hope for fully satisfied life after this one. Thanks for talking with me!");
	  lastStep = 29;
	} else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 17) {
	if (/\b(yes|of course|definitely|certainly)\b/g.test(userResponse.toLowerCase())) {
	  say("What happens when we die?");
	  lastStep = 30;
	} else if (/\b(no|none|nothing|purposeless|empty|meaningless|accident|mistake)\b/g.test(userResponse.toLowerCase())) {
	  say("What happens when we die?");
	  lastStep = 31;
	} else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 30) {
	if (/\b(nothing|nothingness|emptiness|void|darkness|lack of consciousness|end of consciousness)\b/g.test(userResponse.toLowerCase())) {
	  say("If what I have at the end of life is nothingness, the end of consciousness, then I never had anything to lose. But, if at the end of life there is eternity and consciousness, I have everything to either gain or to lose.");
	  lastStep = 32;
	} else if (/\b(heaven|eternal life)\b/g.test(userResponse.toLowerCase())) {
	  say("If you believe in Heaven, I would strongly consider the existence of God, seeing as it could not exist wihtout Him. This has been a great conversation. Thanks for talking with me!");
	  lastStep = 33;
	} else {
	  say("I didn't understand, please try again")
	}
  } else if (lastStep == 31) {
	if (/\b(nothing|nothingness|emptiness|void|darkness|lack of consciousness|end of consciousness)\b/g.test(userResponse.toLowerCase())) {
	  say("If what I have at the end of life is nothingness, the end of consciousness, then I never had anything to lose. But, if at the end of life there is eternity and consciousness, I have everything to either gain or to lose.");
	  lastStep = 34;
	} else if (/\b(heaven|eternal life)\b/g.test(userResponse.toLowerCase())) {
	  say("If you believe in Heaven, I would strongly consider the existence of God, seeing as it could not exist wihtout Him. This has been a great conversation. Thanks for talking with me!");
	  lastStep = 35;
	} else {
	  say("I didn't understand, please try again")
	}
  }
	  
		


function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  }
  while (d2 - d < ms);
}


//respond, on the page, including saying it back to them vocally.
function say(toSay) {
  var utterance = new SpeechSynthesisUtterance();
  utterance.text = toSay;

  if (voiceSelect.value) {
    utterance.voice = speechSynthesis.getVoices().filter(function(voice) {
      return voice.name == voiceSelect.value;
    })[0];
  }
  utterance.volume = 0.5;
  utterance.rate = .8;
  messages = $("#messages")
  wait(200)
  messages.append("<br />Evangelizer: " + utterance.text)

  // speak it!
  if (!muted) {
    speechSynthesis.speak(utterance)
  }
}
