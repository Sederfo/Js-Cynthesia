const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("click", () => {
    console.log(key.dataset.note);

    //const noteAudio = document.getElementById(key.dataset.note);
    //noteAudio.currentTime = 0;
    //noteAudio.play();

    //key.classList.add("active");
    //noteAudio.addEventListener("ended", () => {
    //key.classList.remove("active");
    //});
  });
});

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

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

  //determine note name and octave
  note_name = notes[note % 12];
  octave = Math.floor(note / 12) - 1;
  note_name = note_name + octave;

  switch (command) {
    case 144: // noteOn
      if (velocity > 0) {
        console.log("note on ", note_name, velocity);
        //illuminate key

        //loop through keys array and use dataset.note to identify correct key in page
        keys.forEach((key) => {
          if (key.dataset.note == note_name) key.classList.add("active");
        });
      } else {
        console.log("note off ", note_name, velocity);
        //loop through keys array and use dataset.note to identify correct key in page
        keys.forEach((key) => {
          if (key.dataset.note == note_name) key.classList.remove("active");
        });
      }
      break;
    case 128: // noteOff
      console.log("note off ", note, velocity);
      break;
  }
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("settings-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
