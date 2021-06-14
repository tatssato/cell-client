import "@holo-host/comb";
//@ts-ignore
import { Connection } from "@holo-host/web-sdk";
export class HoloClient {
    constructor(connection, cellNick) {
        this.connection = connection;
        this.cellNick = cellNick;
    }
    callZome(zomeName, fnName, payload) {
        return this.connection.zomeCall(this.cellNick, zomeName, fnName, payload);
    }
    addSignalHandler(signalHandler) {
        new Connection(this.connection.chaperone_url, signalHandler);
    }
}
//# sourceMappingURL=holo-client.js.map