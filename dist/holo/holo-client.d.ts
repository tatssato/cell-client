import { CellClient } from "../cell-client";
import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import { Branding } from "../types";
import { Connection } from "./connection";
export declare class HoloClient implements CellClient {
    protected connection: Connection;
    protected cellData: InstalledCell;
    protected branding: Branding;
    constructor(connection: Connection, cellData: InstalledCell, branding: Branding);
    get cellId(): import("@holochain/conductor-api").CellId;
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
