// CLASSES
  class NodejsSocketPlaygroundLogger {
    constructor () {
      return (l) => {
        process.stdout.write(`${chalk.gray.bold(`> `)}${l}\n`)
      };
    }
  }
//
const chalk = require(`chalk`);
const log = new NodejsSocketPlaygroundLogger();
const HOST = process.env.HOSTNAME || `localhost`;
const PORT = process.env.PORT || 4500;
const io = require(`socket.io`)(PORT);
const rs = require(`crypto-random-string`);

log(`io @ http://${HOST}:${PORT}`);

io.on(`connection`, socket => {
  log(`on-connection`);
  let i = setInterval(() => {
    let s = rs(16);
    console.log(`emit ${s}`)
    socket.emit(`message`, s);
  }, 500);
  socket.on(`disconnect`, () => {
    clearInterval(i);
  });
});