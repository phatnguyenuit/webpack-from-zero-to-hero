(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  console.log('Hello World!');
})();
