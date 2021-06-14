import { CellClient } from "./cell-client";
import "@holo-host/comb";
import { Connection } from "@holo-host/web-sdk";
import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
export declare class HoloClient implements CellClient {
    protected connection: Connection;
    protected cellData: InstalledCell;
    protected branding: Branding;
    constructor(connection: Connection, cellData: InstalledCell, branding: Branding);
    get cellId(): import("@holochain/conductor-api").CellId;
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
