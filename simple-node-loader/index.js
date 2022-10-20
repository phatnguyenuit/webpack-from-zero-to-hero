import path from 'path';
import data from './data.txt';

const getCurrentScriptPath = () => path.resolve(__dirname, __filename);

console.log('getCurrentScriptPath', `-> "${getCurrentScriptPath()}"`);
console.log('data', data);
