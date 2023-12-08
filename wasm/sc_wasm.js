import SCModule from "./scsynth.mjs";

//import initModule from "./scsynth.js";
//const foo = require("./scsynth.js");

var Module = {
    preRun: [],
    postRun: [],
    print: (function() {
      //var element = document.getElementById('output');
      //cif (element) element.value = ''; // clear browser cache
      return function(text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        // These replacements are necessary if you render to raw HTML
        //text = text.replace(/&/g, "&amp;");
        //text = text.replace(/</g, "&lt;");
        //text = text.replace(/>/g, "&gt;");
        //text = text.replace('\n', '<br>', 'g');
        console.log(text);
        //if (element) {
        //  element.value += text + "\n";
        //  element.scrollTop = element.scrollHeight; // focus on bottom
        //}
      };
    })(),
    printErr: function(text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      console.error(text);
    },
    setStatus: function(text) {
      if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
      if (text === Module.setStatus.last.text) return;
      var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
      var now = Date.now();
      if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
      Module.setStatus.last.time = now;
      Module.setStatus.last.text = text;
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
      this.totalDependencies = Math.max(this.totalDependencies, left);
      Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    },
    onRuntimeInitialized: function() {
      //bootElement.disabled = false;
      Module.print("For sound examples, after booting open the console (ctrl-shift-J in Chrome)."); 
      Module.print("Try d_bubbles() followed by s_bubbles()."); 
      Module.print("When using microphone (Inputs = 2), try d_pitch() followed by s_pitch().");
      Module.print("cmdPeriod() to free");
    }
  }

  var Md;

async function init(){
  Md = await SCModule(Module);
}

export { Module, init};


