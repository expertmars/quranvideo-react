import openSocket from "socket.io-client";

let socket;

const io = {
  connectIO: () => {
    socket = openSocket("http://localhost:3050", { transports: ["websocket"] });
    return socket;
  },
  get: () => {
    if (socket) {
      return socket;
    } else {
      throw new Error("Cannot find a connected socket");
    }
  },
};

export default io;
