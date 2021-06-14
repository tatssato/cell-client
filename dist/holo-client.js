import "@holo-host/comb";
import { Connection } from "@holo-host/web-sdk";
export class HoloClient {
    constructor(connection, cellNick, branding) {
        this.connection = connection;
        this.cellNick = cellNick;
        this.branding = branding;
    }
    callZome(zomeName, fnName, payload) {
        return this.connection.zomeCall(this.cellNick, zomeName, fnName, payload);
    }
    addSignalHandler(signalHandler) {
        new Connection(this.connection.chaperone_url, signalHandler, this.branding);
    }
}
//# sourceMappingURL=holo-client.js.map