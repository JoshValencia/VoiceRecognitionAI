const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const loadingAnimation = document.querySelector(".loading");
var d = new Date();

var replies = {
  Time: {
    current: formatAMPM(d),
    morning: "Good Morning! Have a Great Day!",
    afternoon: "Good Afternoon!",
    evening: "Good Evening!",
    night: "Good Night! and sleep well",
  },
  Greetings: ["Hello", "Hi", "What's up?", "What can i do for you?"],
  Facts: {
    creator: "I am created by J Valencia, a web programmer and developer",
    identity: "I am a simple voice recognition artificial intelligence application.",
    name: "I do not have a name yet."
  },
  Errors: [
    "Sorry, I cannot Understand",
    "I cannot hear you well",
    "Can you repeat your request?",
  ],
};

var possibleSpeech = {
    Greetings: [
        'hi', 'hello'
    ],
    Time: [
        'good morning', 'good afternoon', 'good evening', 'good night',
        'what time'
    ],
    Facts: [
      "creator", "created", "who are you", "what is your name"
    ]

}


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = "It's" + hours + " " + minutes + " " + ampm;
  return strTime;
}

function checkSpeech(message){
    for(let i = 0; i < possibleSpeech.Greetings.length; i++){
        if(message.includes(possibleSpeech.Greetings[i])){
            return true;
        }else{
            for(let x = 0; x < possibleSpeech.Time.length; x++){
                if(message.includes(possibleSpeech.Time[x])){
                    return true;
                }else{
                  for(let z = 0; z < possibleSpeech.Facts.length; z++){
                      return true;
                  }
                }
            }
        }

    }
    
}

function speechAnalyzer(message){
  var text = "";
    for(let i = 0; i < possibleSpeech.Greetings.length; i++){
        if(message.includes(possibleSpeech.Greetings[i])){
            text = replies.Greetings[Math.floor(Math.random() * replies.Greetings.length)];
            return text;
        }else{
            for(let x = 0; x < possibleSpeech.Time.length; x++){
                if(message.includes(possibleSpeech.Time[x])){
                    if(possibleSpeech.Time[x] === 'good morning'){
                        text = replies.Time.morning;
                        return text;
                    }
                    if(possibleSpeech.Time[x] === 'good afternoon'){
                        text = replies.Time.afternoon;
                        return text;
                    }
                    if(possibleSpeech.Time[x] === 'good evening'){
                        text = replies.Time.evening;
                        return text;    
                    }
                    if(possibleSpeech.Time[x] === 'good night'){
                        text = replies.Time.night;
                        return text;    
                    }
                    if(possibleSpeech.Time[x] === 'what time'){
                      text = replies.Time.current;
                      return text;    
                    }
                }else{
                  for(let z = 0; z < possibleSpeech.Facts.length; z++){
                    if(message.includes(possibleSpeech.Facts[x])){
                      if(possibleSpeech.Facts[x] === "creator" || possibleSpeech.Facts[x] === "created"){
                        text = replies.Facts.creator;
                        return text;    
                      }
                      if(possibleSpeech.Facts[x] === "who are you"){
                        text = replies.Facts.identity;
                        return text;    
                      }
                      if(possibleSpeech.Facts[x] === "what is your name"){
                        text = replies.Facts.name;
                        return text;    
                      }
                    }
                  }
            }
        }

    }
  }
}




const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("voice is activated");
};

recognition.continuous;

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  readOutLoud(transcript);
};

recognition.onspeechend = function () {
  loadingAnimation.style.display = "none";
}

btn.addEventListener("click", () => {
  recognition.start();
  loadingAnimation.style.display = "inline-block";
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();
  if (checkSpeech(message)) {
    const finalText =
      speechAnalyzer(message);
    speech.text = finalText;
  } else {
    const errorText =
      replies.Errors[Math.floor(Math.random() * replies.Errors.length)];
    speech.text = errorText;
  }
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
