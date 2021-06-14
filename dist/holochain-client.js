import { AppWebsocket, } from "@holochain/conductor-api";
export class HolochainClient {
    constructor(appWebsocket, cellData) {
        this.appWebsocket = appWebsocket;
        this.cellData = cellData;
    }
    get cellId() {
        return this.cellData.cell_id;
    }
    callZome(zomeName, fnName, payload) {
        return this.appWebsocket.callZome({
            cap: null,
            cell_id: this.cellId,
            zome_name: zomeName,
            fn_name: fnName,
            payload: payload,
            provenance: this.cellId[1],
        });
    }
    addSignalHandler(signalHandler) {
        AppWebsocket.connect(this.appWebsocket.client.socket.url, 15000, signalHandler);
    }
}
//# sourceMappingURL=holochain-client.js.map