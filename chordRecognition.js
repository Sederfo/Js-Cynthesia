const Tonal = require("@tonaljs/tonal");

const keys = document.querySelectorAll(".key");

var active_keys = [];
keys.forEach((key) => {
  if (key.classList.contains("active")) {
    active_keys.push(key);
  }
});

active_keys.forEach((key) => {
  console.log(key.dataset.note);
});
