import React from 'react'

const Console = () => {
  return (
    <div>Console</div>
  )
}

export default Console

// #console-output {
//     width: 100%;
//     height: 200px;
//     margin: 0 auto;
//     margin-top: 10px;
//     border-left: 0px;
//     border-right: 0px;
//     padding-left: 0px;
//     padding-right: 0px;
//     display: block;
//     background-color: black;
//     color: white;
//     font-family: 'Lucida Console', Monaco, monospace;
//     outline: none;
//   }

// (function() {
//     var element = document.getElementById('console-output');
//     if (element) element.value = ''; // clear browser cache
//     return function(text) {
//       if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
//       console.log(text);
//       if (element) {
//         element.value += text + "\n";
//         element.scrollTop = element.scrollHeight; // focus on bottom
//       }
//     };
//   })()
  
//   const EmscriptenConsole = () => {
//     return (
//         <textarea id="console-output" rows="8"></textarea>
//     )
//   }
  
//   export default EmscriptenConsole

export {}