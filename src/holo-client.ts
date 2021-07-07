import { CellClient } from "./cell-client";

import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import { Connection, Branding } from "@holo-host/web-sdk";

export class HoloClient implements CellClient {
  constructor(
    protected connection: any,
    protected cellData: InstalledCell,
    protected branding: Branding
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  async callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    const result = await this.connection.zomeCall(
      this.cellData.cell_nick,
      zomeName,
      fnName,
      payload
    );

    if (result.type === "error") {
      throw new Error(result.payload);
    }
    return result;
  }

  addSignalHandler(signalHandler: AppSignalCb) {
    new Connection(
      this.connection.chaperone_url.origin,
      signalHandler,
      this.branding
    );
  }
}
