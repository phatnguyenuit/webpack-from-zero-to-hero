import 'vendor-a';
// import 'vendors/vendor-a';

(() => {
  const print = (severity, ...args) => {
    console.log(`[${severity}]`, 'Print with args');
    console.log(`[${severity}]`, ...args);
  };

  print('INFO', 1, 2, 3, 5, 'OK?');
})();
