import { CellClient } from "./cell-client";
import "@holo-host/comb";

//@ts-ignore
import { Connection } from "@holo-host/web-sdk";
import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";

export class HoloClient implements CellClient {
  constructor(
    protected connection: Connection,
    protected cellData: InstalledCell,
    protected branding: Branding
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    return this.connection.zomeCall(
      this.cellData.cell_nick,
      zomeName,
      fnName,
      payload
    );
  }

  addSignalHandler(signalHandler: AppSignalCb) {
    new Connection(this.connection.chaperone_url, signalHandler, this.branding);
  }
}
