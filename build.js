const path = require('path');
const { exec } = require('child_process');

/**
 * Run command
 * @param {string} command
 */
const runCommand = (command) => {
  exec(command, (err, stdout, stderr) => {
    console.log('[INFO] Running command:\n', command);
    if (err) {
      console.error(err);
      process.exit(1);
    }

    if (stdout) {
      console.log(stdout.toString());
    }

    if (stderr) {
      console.error(stderr.toString());
    }
  });
};

(function () {
  const args = process.argv.slice(2);

  if (!args.length) {
    console.error(
      'Should provide at least one argument to specify the folder to run build.'
    );
    console.log('\nExample: yarn build simple-node');
    process.exit(1);
  }

  const [pathStr, env = 'development'] = args;
  const configFile = path.resolve(pathStr, 'webpack.config.js');

  runCommand(`npx webpack -c ${configFile} --env ${env}`);
})();
