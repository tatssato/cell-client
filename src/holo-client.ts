import { CellClient } from "./cell-client";
import "@holo-host/comb";

import { Connection, Branding } from "@holo-host/web-sdk";
import { AppSignalCb } from "@holochain/conductor-api";

export class HoloClient implements CellClient {
  constructor(
    protected connection: Connection,
    protected cellNick: string,
    protected branding: Branding
  ) {}

  callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    return this.connection.zomeCall(this.cellNick, zomeName, fnName, payload);
  }

  addSignalHandler(signalHandler: AppSignalCb) {
    new Connection(this.connection.chaperone_url, signalHandler, this.branding);
  }
}
