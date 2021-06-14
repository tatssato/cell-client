import { CellClient } from "../cell-client";

import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import { Branding } from "../types";
import { Connection } from "./connection";

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
    new Connection(
      this.connection.chaperone_url,
      signalHandler,
      this.branding
    );
  }
}
