// CLASSES
  class NodejsRealTimePlaygroundLogger {
    constructor () {
      return (l) => {
        process.stdout.write(`${chalk.gray.bold(`> `)}${l}\n`)
      };
    }
  }
//
const chalk = require(`chalk`);
const log = new NodejsRealTimePlaygroundLogger();
const HOST = process.env.HOSTNAME || `localhost`;
const PORT = process.env.PORT || 4500;
const io = require(`socket.io`)(PORT);
const rs = require(`crypto-random-string`);

log(`io @ http://${HOST}:${PORT}`);

let endpoints = [
  `/some-resource`,
  // `/some-more-resource`,
  // `/some-other-resource`
];

let things = endpoints.map(endpoint => {
  log(`making ${endpoint}`);
  return {
    endpoint: endpoint,
    namespace: io.of(`${endpoint}`)
  };
});

let connections = things.map(thing => {
  let slug = `${thing.namespace} ${thing.endpoint}`;
  log(`making ${slug} connection`);
  return thing.namespace.on(`connection`, socket => {
    log(`on-connection ${slug}`);
    let someTracker = `${slug} from ${socket.id}`;
    let s = rs(16);
    let i = setInterval(() => {
      console.log(`emit ${s} ${slug} ${someTracker}`);
      // goes to the connection on the socket
      // socket.emit(`message`, s);
      // goes to all connections on the socket
      thing.namespace.emit(`message`, JSON.stringify({
        s: s,
        slug: slug,
        someTracker: someTracker,
        tableData: [{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        },{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        },{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        },{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        },{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        },{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        },{
          id: rs(8),
          first_name: rs(32),
          last_name: rs(64),
          date: new Date()
        }]
      }));
    }, 500);
    socket.on(`disconnect`, () => {
      log(`on-disconnect ${someTracker}`);
      clearInterval(i);
    });
  })
});

// let someEndpoint = `/some-resource`;

// let someResourceNsp = io.of(`${someEndpoint}`);

// someResourceNsp.on(`connection`, socket => {

//   let someTracker = `${someEndpoint} from ${socket.id}`;

//   log(`on-connection ${someTracker}`);

//   let s = rs(16);

//   let i = setInterval(() => {
//     console.log(`emit ${s} ${someTracker}`);
//     // goes to the connection on the socket
//     socket.emit(`message`, s);
//     // goes to all connections on the socket
//     // someMoreResourceNsp.emit(`message`, s);
//   }, 500);

//   socket.on(`disconnect`, () => {
//     log(`on-disconnect ${someTracker}`);
//     clearInterval(i);
//   });
  
// });

// let someMoreEndpoint = `/some-more-resource`;

// let someMoreResourceNsp = io.of(`${someMoreEndpoint}`);

// someMoreResourceNsp.on(`connection`, socket => {

//   let someTracker = `${someMoreEndpoint} from ${socket.id}`;

//   log(`on-connection ${someTracker}`);

//   let s = rs(16);

//   let i = setInterval(() => {
//     console.log(`emit ${s} ${someTracker}`);
//     // goes to the connection on the socket
//     socket.emit(`message`, s);
//     // goes to all connections on the socket
//     // someMoreResourceNsp.emit(`message`, s);
//   }, 500);

//   socket.on(`disconnect`, () => {
//     log(`on-disconnect ${someTracker}`);
//     clearInterval(i);
//   });
  
// });

// io.on(`connection`, socket => {
//   log(`on-connection`);
//   let i = setInterval(() => {
//     let s = rs(16);
//     console.log(`emit ${s}`)
//     socket.emit(`message`, s);
//   }, 500);
//   socket.on(`disconnect`, () => {
//     clearInterval(i);
//   });
// });