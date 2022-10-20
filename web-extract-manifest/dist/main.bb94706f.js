(async () => {
  await new Promise((o) => {
    setTimeout(o, 2e3);
  }),
    console.log('Hello World!');
})(),
  console.log('print.js');
