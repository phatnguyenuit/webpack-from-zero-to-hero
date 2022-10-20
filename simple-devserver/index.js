(() => {
  const print = (severity, ...args) => {
    console.log(`[${severity}]`, 'Print with args');
    console.log(`[${severity}]`, ...args);
    console.log('=== DONE ===');
  };

  print('INFO', 1, 2, 3, 5, 'OK?');
})();
