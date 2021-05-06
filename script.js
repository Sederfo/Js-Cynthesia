const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    console.log(key.dataset.note);

    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play();

    key.classList.add("active");
    noteAudio.addEventListener("ended", () => {
      key.classList.remove("active");
    });
  });
});

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);

  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;
}

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values())
    input.onmidimessage = getMIDIMessage;
}

function getMIDIMessage(message) {
  var command = message.data[0];
  var note = message.data[1];
  var velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

  switch (command) {
    case 144: // noteOn
      if (velocity > 0) {
        console.log("note on ", note, velocity);
      } else {
        console.log("note on ", note, velocity);
      }
      break;
    case 128: // noteOff
      noteOff(note);
      break;
    // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
  }
}
