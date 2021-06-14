import { AppSignalCb } from "@holochain/conductor-api";
export interface CellClient {
    callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
    addSignalHandler(signalHandler: AppSignalCb): void;
}
