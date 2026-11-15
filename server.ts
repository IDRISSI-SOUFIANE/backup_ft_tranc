// <<<<<<< HEAD
// import "dotenv/config";
// import { createServer } from "http";
// import { parse } from "url";
// import next from "next";
// import { WebSocket, WebSocketServer } from "ws";
// // import CreateMsg from './src/services/chat.service';

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = parseInt(process.env.PORT || "3000", 10);

// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// // Map to keep track of online users and their active sockets
// const connectedClients = new Map<string, WebSocket>();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     try {
//       handler(req, res);
//     } catch (error) {
//       console.log("the faced error is :", error);
//       res.statusCode = 500;
//       res.end("Server Error Faced try yan imikan");
//     }
//   });

//   const wss = new WebSocketServer({ noServer: true });

//   wss.on("connection", (ws) => {
//     console.log("connection established :)");

//     // Track this specific user's ID so we can clean up the Map when they disconnect
//     let currentSessionId: string | null = null;

//     ws.on("message", async (msg) => {
//         console.log("Received message:", msg.toString());
//       const msgstr = msg.toString();
//       const ObjMsg = JSON.parse(msgstr);

//       console.log("Parsed message object:", ObjMsg);

//       // 1. REGISTER USER
//       if (ObjMsg.type == "register") {
//         currentSessionId = ObjMsg.sessionId;
//         connectedClients.set(ObjMsg.sessionId, ws);
//         console.log(`User ${ObjMsg.sessionId} registered.`);
//       }

//       // 2. NETWORK CONNECTIONS (New logic)
//       else if (ObjMsg.type === "connection_action") {
//         try {
//           const { senderId, receiverId, action, connectionData } = ObjMsg.payload;

//           // Look up the receiver in the Map of online users
//           const receiverSocket = connectedClients.get(receiverId);

//           // 1 means WebSocket.OPEN. If they are online, forward the data instantly
//           if (receiverSocket && receiverSocket.readyState === 1) {
//             receiverSocket.send(
//               JSON.stringify({
//                 type: "connection_update",
//                 payload: {
//                   action: action,
//                   data: connectionData,
//                 },
//               }),
//             );
//           }
//         } catch (error) {
//           console.log("Error handling connection socket:", error);
//         }
//       }
//     });

//     ws.on("close", () => {
//       console.log("client disconnected :(");
//       // Clean up the map when the user leaves the site to prevent memory leaks
//       if (currentSessionId) {
//         connectedClients.delete(currentSessionId);
//       }
//     });
//   });

//   // server.on("upgrade", (req, sock, head) => {
//   //   const { pathname } = parse(req.url || "");

//   //   if (pathname == "/_next/webpack-hmr") {
//   //     return;
//   //   } else if (pathname == "/ws") {
//   //     wss.handleUpgrade(req, sock, head, (ws) => {
//   //       wss.emit("connection", ws, req);
//   //     });
//   //   } else {
//   //     sock.destroy();
//   //   }
//   // });

// server.on('upgrade', (req, sock, head) => {
//         const { pathname } = parse(req.url || '');
        
//         // 1. Handle your custom network/chat WebSocket
//         console.log(pathname);
//         if (pathname === '/ws') {
//             wss.handleUpgrade(req, sock, head, (ws) => {
//                 wss.emit('connection', ws, req);
//             });
//         } 
//         // 2. Let Next.js handle ANY of its internal live-reload sockets
//         else if (pathname?.startsWith('/_next/')) {
//             return; 
//         } 
//         // 3. Destroy unknown connections for security
//         else {
//             sock.destroy();
//         }
//     });



//   server.listen(port, () => {
//     console.log(
//       `the server is running in port ${port}\nin http://${hostname}:${port}`,
//     );
//   });
// });
// =======
// import "dotenv/config";
// import { createServer } from 'http';
// import { parse } from 'url';
// import next from 'next';
// import { WebSocketServer } from 'ws';
// import { UserId } from "./app/page";
// import  { UpdateRead , CreateMsg } from "./services/chat.service";
// // import { connected } from "process";

// const dev = process.env.NODE_ENV !== 'production';
// const hostname = 'localhost';
// const port = parseInt(process.env.PORT || '3000', 10);

// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();
// const connectedClients = new Map<string, WebSocket>();
// app.prepare().then(() => {
//     const server = createServer((req, res) => {
//         try {

//             handler(req, res);

//         } catch (error) {
//             console.log('the faced error is :', error);
//             res.statusCode = 500;
//             res.end('Server Error Faced try yan imikan');
//         }
//     });
//     const wss = new WebSocketServer({ noServer : true });

//     wss.on('connection', (ws : any) => {
//         console.log("connection established :)");
//         ws.on('message', async (msg : any) => {
//             const msgstr = msg.toString();
//             const ObjMsg = JSON.parse(msgstr);

//             if (ObjMsg.type == "register")
//             {
//                 console.log("registred " , ObjMsg.sessionUserId);
//                 connectedClients.set(ObjMsg.sessionUserId, ws);
//             }
//             else if (ObjMsg.type == "Create msg")
//             {
//                 try {
//                     const {send_id , reciver_id, Msg} = ObjMsg.payload;
//                     const saveData = await CreateMsg(send_id, reciver_id , Msg);
//                     const recived = connectedClients.get(reciver_id);
//                     if (recived && recived.readyState === WebSocket.OPEN)
//                     {
//                         const datecr : any = saveData?.created_at;
//                         const datemsg =  new Date(datecr).toLocaleString("sv-SE" ,{timeZone: "Africa/Casablanca",year: "numeric",month: "2-digit",day: "2-digit",hour: "2-digit",minute: "2-digit",hour12: false});
//                         recived.send(JSON.stringify({type :"send Msg",  id: saveData?.id.toString() , "sender_id" : saveData?.sender_id , "message_text" : saveData?.message_text, "created_at" : datemsg}));
//                     }
    
                    
//                 } catch (error) {
//                     console.log(error);
//                     ws.send("faild to insert data ");
//                 }

//             }
//             else if (ObjMsg.type == 'update to read')
//             {
//                 try {
//                     const {send_id , reciver_id} = ObjMsg.payload;
//                     await UpdateRead(send_id, reciver_id);
//                     const recived = connectedClients.get(reciver_id);
//                     if (recived && recived.readyState === WebSocket.OPEN)
//                         recived.send(JSON.stringify({type :"read Msg"}));
//                 } catch (error) {
//                     console.log(error);
//                     ws.send("faild to insert data ");
//                 }
//             }
            
//         })
//         ws.on('close', () => {
//             console.log("client this connected :(");
//         })

//     });

//     server.on('upgrade', (req, sock , head) => {

//         const {pathname} = parse(req.url || '');
//         if (pathname == '/_next/webpack-hmr')
//             return;
//         else if (pathname == '/ws')
//         {
//             wss.handleUpgrade(req, sock, head, (ws)=>{
//                 wss.emit('connection', ws, req);
//             });
//         }
//         else
//             sock.destroy();
//     })

//     server.listen(port, () => {
//         console.log(`the server is running in port ${port}\nin http://${hostname}:${port}`);
//     })
// }
// )
// >>>>>>> origin/slimane-branch


// import "dotenv/config";
// import { createServer } from "http";
// import { parse } from "url";
// import next from "next";
// import { WebSocket, WebSocketServer } from "ws";
// import { UpdateRead, CreateMsg } from "./services/chat.service"

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = parseInt(process.env.PORT || "3000", 10);

// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();
// // const upgradeHandler = app.getUpgradeHandler(); // lets Next handle its own HMR sockets

// // Online users -> their active socket
// const connectedClients = new Map<string, WebSocket>();

// // Send only if the socket is open
// function safeSend(ws: WebSocket | undefined, data: unknown) {
//   if (ws && ws.readyState === WebSocket.OPEN) {
//     ws.send(typeof data === "string" ? data : JSON.stringify(data));
//   }
// }

// app.prepare().then(() => {
//   const upgradeHandler = app.getUpgradeHandler(); // lets Next handle its own HMR sockets
//   const server = createServer((req, res) => {
//     try {
//       handler(req, res);
//     } catch (error) {
//       console.log("the faced error is :", error);
//       res.statusCode = 500;
//       res.end("Server Error Faced try yan imikan");
//     }
//   });

//   const wss = new WebSocketServer({ noServer: true });

//   wss.on("connection", (ws) => {
//     console.log("connection established :)");

//     // Track this socket's user so we can clean up the Map on disconnect
//     let currentSessionId: string | null = null;

//     ws.on("message", async (msg) => {
//       let ObjMsg: any;
//       try {
//         ObjMsg = JSON.parse(msg.toString());
//       } catch {
//         console.log("Invalid JSON received");
//         return;
//       }

//       // 1. REGISTER USER (accepts both sessionId and sessionUserId)
//       if (ObjMsg.type === "register") {
//         const id = ObjMsg.sessionId ?? ObjMsg.sessionUserId;
//         if (!id) return;
//         currentSessionId = String(id);
//         connectedClients.set(currentSessionId, ws);
//         console.log(`User ${currentSessionId} registered.`);
//       }

//       // 2. NETWORK CONNECTIONS
//       else if (ObjMsg.type === "connection_action") {
//         try {
//           const { receiverId, action, connectionData } = ObjMsg.payload;
//           safeSend(connectedClients.get(String(receiverId)), {
//             type: "connection_update",
//             payload: { action, data: connectionData },
//           });
//         } catch (error) {
//           console.log("Error handling connection socket:", error);
//         }
//       }

//       // 3. CHAT: CREATE MESSAGE
//       else if (ObjMsg.type === "Create msg") {
//         try {
//           const { send_id, reciver_id, Msg } = ObjMsg.payload;
//           const saveData = await CreateMsg(send_id, reciver_id, Msg);

//           const datemsg = new Date(saveData?.created_at as any).toLocaleString(
//             "sv-SE",
//             {
//               timeZone: "Africa/Casablanca",
//               year: "numeric",
//               month: "2-digit",
//               day: "2-digit",
//               hour: "2-digit",
//               minute: "2-digit",
//               hour12: false,
//             },
//           );

//           safeSend(connectedClients.get(String(reciver_id)), {
//             type: "send Msg",
//             id: saveData?.id.toString(),
//             sender_id: saveData?.sender_id,
//             message_text: saveData?.message_text,
//             created_at: datemsg,
//           });
//         } catch (error) {
//           console.log(error);
//           safeSend(ws, "faild to insert data ");
//         }
//       }

//       // 4. CHAT: MARK AS READ
//       else if (ObjMsg.type === "update to read") {
//         try {
//           const { send_id, reciver_id } = ObjMsg.payload;
//           await UpdateRead(send_id, reciver_id);
//           safeSend(connectedClients.get(String(reciver_id)), {
//             type: "read Msg",
//           });
//         } catch (error) {
//           console.log(error);
//           safeSend(ws, "faild to update data ");
//         }
//       }
//     });

//     ws.on("close", (e) => {
//       console.log( " test : ->>> ", e);
//       console.log("client disconnected :(");
//       // Only remove if this socket is still the registered one
//       // (avoids deleting a newer connection from the same user)
//       if (currentSessionId && connectedClients.get(currentSessionId) === ws) {
//         connectedClients.delete(currentSessionId);
//       }
//     });
//   });

//   server.on("upgrade", (req, sock, head) => {
//     const { pathname } = parse(req.url || "");

//     if (pathname === "/ws") {
//       wss.handleUpgrade(req, sock, head, (ws) => {
//         wss.emit("connection", ws, req);
//       });
//     } else if (pathname?.startsWith("/_next/")) {
//       upgradeHandler(req, sock, head); // Next's HMR / live reload
//     } else {
//       sock.destroy();
//     }
//   });

//   server.listen(port, () => {
//     console.log(
//       `the server is running in port ${port}\nin http://${hostname}:${port}`,
//     );
//   });
// });





import "dotenv/config";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";
import { UpdateRead, CreateMsg } from "./services/chat.service";
import { createSession } from "./app/test/cookies";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// Online users -> their active socket
const connectedClients = new Map<string, WebSocket>();

// Send only if the socket is open
function safeSend(ws: WebSocket | undefined, data: unknown) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(typeof data === "string" ? data : JSON.stringify(data));
  }
}

app.prepare().then(() => {
  // Must be called AFTER prepare()
  const upgradeHandler = app.getUpgradeHandler();

  const server = createServer((req, res) => {
    try {
      handler(req, res);
    } catch (error) {
      console.log("the faced error is :", error);
      res.statusCode = 500;
      res.end("Server Error Faced try yan imikan");
    }
  });

  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", (ws) => {
    console.log("connection established :)");

    // Track this socket's user so we can clean up the Map on disconnect
    let currentSessionId: string | null = null;

    ws.on("message", async (msg : any) => {

      let ObjMsg: any;
      try {
        ObjMsg = JSON.parse(msg.toString());
      } catch {
        console.log("Invalid JSON received");
        return;
      }
      // 1. REGISTER USER (accepts both sessionId and sessionUserId)
      if (ObjMsg.type === "register") {
        const id = ObjMsg.sessionId;
        if (!id)
            return;
        currentSessionId = String(id);
        connectedClients.set(id, ws);
        console.log(`User ${id} registered.`);
      }

      // 2. NETWORK CONNECTIONS
      else if (ObjMsg.type === "connection_action") {
        try {
          const { receiverId, action, connectionData } = ObjMsg.payload;

          safeSend(connectedClients.get(String(receiverId)), {
            type: "connection_update",
            payload: { action, data: connectionData },
          });
        } catch (error) {
          console.log("Error handling connection socket:", error);
        }
      }

      // 3. CHAT: CREATE MESSAGE
      else if (ObjMsg.type === "Create msg") {
        try {
          const { send_id, reciver_id, Msg } = ObjMsg.payload;
          const saveData = await CreateMsg(send_id, reciver_id, Msg);

          const datemsg = new Date(saveData?.created_at as any).toLocaleString(
            "sv-SE",
            {
              timeZone: "Africa/Casablanca",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            },
          );

          safeSend(connectedClients.get(String(reciver_id)), {
            type: "send Msg",
            id: saveData?.id.toString(),
            sender_id: saveData?.sender_id,
            message_text: saveData?.message_text,
            created_at: datemsg,
          });
        } catch (error) {
          console.log(error);
          safeSend(ws, "faild to insert data ");
        }
      }

      // 4. CHAT: MARK AS READ
      else if (ObjMsg.type === "update to read") {
        try {
          const { send_id, reciver_id } = ObjMsg.payload;
          await UpdateRead(send_id, reciver_id);
          safeSend(connectedClients.get(String(reciver_id)), {
            type: "read Msg",
          });
        } catch (error) {
          console.log(error);
          safeSend(ws, "faild to update data ");
        }
      }
    });

    ws.on("close", () => {
      console.log("client disconnected :(");
      // Only remove if this socket is still the registered one
      // (avoids deleting a newer connection from the same user)
      if (currentSessionId && connectedClients.get(currentSessionId) === ws) {
        connectedClients.delete(currentSessionId);
      }
    });
  });

  server.on("upgrade", (req, sock, head) => {
    const { pathname } = parse(req.url || "");

    if (pathname === "/ws") {
      wss.handleUpgrade(req, sock, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    } else if (pathname?.startsWith("/_next/")) {
      upgradeHandler(req, sock, head); // Next's HMR / live reload
    } else {
      sock.destroy();
    }
  });

  server.listen(port, () => {
    console.log(
      `the server is running in port ${port}\nin http://${hostname}:${port}`,
    );
  });
});