(()=>{var e={87:()=>{console.log("[vendor-a] this is vendor a!")}},r={};function o(t){var n=r[t];if(void 0!==n)return n.exports;var s=r[t]={exports:{}};return e[t](s,s.exports,o),s.exports}o.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return o.d(r,{a:r}),r},o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";o(87),((e,...r)=>{console.log(`[${e}]`,"Print with args"),console.log(`[${e}]`,...r)})("INFO",1,2,3,5,"OK?")})()})();