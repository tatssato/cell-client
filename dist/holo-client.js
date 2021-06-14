import "@holo-host/comb";
//@ts-ignore
import { Connection } from "@holo-host/web-sdk";
export class HoloClient {
    constructor(connection, cellData, branding) {
        this.connection = connection;
        this.cellData = cellData;
        this.branding = branding;
    }
    get cellId() {
        return this.cellData.cell_id;
    }
    callZome(zomeName, fnName, payload) {
        return this.connection.zomeCall(this.cellData.cell_nick, zomeName, fnName, payload);
    }
    addSignalHandler(signalHandler) {
        new Connection(this.connection.chaperone_url, signalHandler, this.branding);
    }
}
//# sourceMappingURL=holo-client.js.map