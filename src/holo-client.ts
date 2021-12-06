import { CellClient } from "./cell-client";

import { InstalledCell } from "@holochain/conductor-api";
import { BaseClient } from "./base-client";

export class HoloClient extends BaseClient implements CellClient {
  constructor(
    protected connection: any,
    protected cellData: InstalledCell,
    protected branding: any
  ) {
    super();
    this.handlers.push(this.connection.signalCb);
    this.connection.signalCb = (s: any) => this.handleSignal(s);
  }

  get cellId() {
    return this.cellData.cell_id;
  }

  async callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    const result = await this.connection.zomeCall(
      this.cellData.role_id,
      zomeName,
      fnName,
      payload
    );

    if (result && result.type === "error") {
      throw new Error(result.payload.message);
    }
    return result;
  }
}
