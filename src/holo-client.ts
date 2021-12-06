import { InstalledCell } from "@holochain/conductor-api";
import WebSdk from "@holo-host/web-sdk";
const WebSdkConnection = WebSdk.Connection;

import { CellClient } from "./cell-client";
import { BaseClient } from "./base-client";

export class HoloClient extends BaseClient implements CellClient {
  constructor(
    protected connection: any,
    protected cellData: InstalledCell,
    protected branding: any
  ) {
    super();
    new WebSdkConnection(
      this.connection.chaperone_url,
      (s: any) => this.handleSignal(s),
      branding
    );
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
