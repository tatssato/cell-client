import { AppSignalCb, AppWebsocket, CellId } from "@holochain/conductor-api";
import { CellClient } from "./cell-client";
export declare class HolochainClient implements CellClient {
    protected appWebsocket: AppWebsocket;
    protected cellId: CellId;
    constructor(appWebsocket: AppWebsocket, cellId: CellId);
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
