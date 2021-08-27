import { Connection } from '@holo-host/web-sdk';
import * as ConductorApi from '@holochain/conductor-api';

class HoloClient {
    constructor(connection, cellData, branding) {
        this.connection = connection;
        this.cellData = cellData;
        this.branding = branding;
    }
    get cellId() {
        return this.cellData.cell_id;
    }
    async callZome(zomeName, fnName, payload) {
        const result = await this.connection.zomeCall(this.cellData.cell_nick, zomeName, fnName, payload);
        if (result && result.type === "error") {
            throw new Error(result.payload.message);
        }
        return result;
    }
    async addSignalHandler(signalHandler) {
        new Connection(this.connection.chaperone_url.origin, signalHandler, this.branding);
        return {
            unsubscribe: () => {
                // TODO: disconnect connection
            },
        };
    }
}

class HolochainClient {
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
    async addSignalHandler(signalHandler) {
        const appWs = await ConductorApi.AppWebsocket.connect(this.appWebsocket.client.socket.url, 15000, signalHandler);
        return {
            unsubscribe: () => {
                appWs.client.close();
            },
        };
    }
}

export { HoloClient, HolochainClient };
//# sourceMappingURL=index.js.map
