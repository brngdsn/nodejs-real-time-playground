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

log(`io @ http://${HOST}:${PORT}`);

io.on(`connection`, socket => {
  log(`on-connection`);
  socket.emit(`message`, [`client has connected`]);
});