import io from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(url) {
    if (!this.socket) {
      this.socket = io(url);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export default new SocketService();
