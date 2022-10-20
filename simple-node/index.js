import path from 'path';

const getCurrentScriptPath = () => path.resolve(__dirname, __filename);

console.log('getCurrentScriptPath', `-> "${getCurrentScriptPath()}"`);
