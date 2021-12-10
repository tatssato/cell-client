import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import WebSdk from "@holo-host/web-sdk";
const WebSdkConnection = WebSdk.Connection;

import { CellClient } from "./cell-client";
import { BaseClient } from "./base-client";

export class WebSdkClient extends BaseClient {
  connection: any;
  constructor(url: string, branding: any) {
    super();

    this.connection = new WebSdkConnection(
      url,
      (s: any) => this.handleSignal(s),
      branding
    );
  }
}

export class HoloClient implements CellClient {
  constructor(
    protected connection: WebSdkClient,
    protected cellData: InstalledCell
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  async callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    const result = await this.connection.connection.zomeCall(
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

  addSignalHandler(
    signalHandler: AppSignalCb
  ): Promise<{ unsubscribe: () => void }> {
    return this.connection.addSignalHandler(signalHandler);
  }
}
