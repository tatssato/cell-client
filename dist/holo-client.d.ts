import { CellClient } from "./cell-client";
import "@holo-host/comb";
import { Connection } from "@holo-host/web-sdk";
import { AppSignalCb } from "@holochain/conductor-api";
export declare class HoloClient implements CellClient {
    protected connection: Connection;
    protected cellNick: string;
    constructor(connection: Connection, cellNick: string);
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
