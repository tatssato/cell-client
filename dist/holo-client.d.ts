import { CellClient } from "./cell-client";
import "@holo-host/comb";
import { Connection, Branding } from "@holo-host/web-sdk";
import { AppSignalCb } from "@holochain/conductor-api";
export declare class HoloClient implements CellClient {
    protected connection: Connection;
    protected cellNick: string;
    protected branding: Branding;
    constructor(connection: Connection, cellNick: string, branding: Branding);
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
