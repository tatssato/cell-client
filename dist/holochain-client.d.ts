import { AppSignalCb, AppWebsocket, CellId, InstalledCell } from "@holochain/conductor-api";
import { CellClient } from "./cell-client";
export declare class HolochainClient implements CellClient {
    protected appWebsocket: AppWebsocket;
    protected cellData: InstalledCell;
    constructor(appWebsocket: AppWebsocket, cellData: InstalledCell);
    get cellId(): CellId;
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
