import { CellClient } from "./cell-client";

import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import HoloSdk from "@holo-host/web-sdk";

export class HoloClient implements CellClient {
  connection: any;

  #handlers: Array<AppSignalCb> = [];

  private constructor(
    protected url: string,
    protected cellData: InstalledCell,
    protected branding: any
  ) {
    this.connection = new HoloSdk.Connection(
      this.connection.chaperone_url.origin,
      (s: any) => this.handleSignal(s),
      this.branding
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

  async addSignalHandler(signalHandler: AppSignalCb) {
    this.#handlers.push(signalHandler);

    return {
      unsubscribe: () => {
        const index = this.#handlers.findIndex((h) => h === signalHandler);
        this.#handlers.splice(index, 1);
      },
    };
  }

  private handleSignal(signal: any) {
    for (const handler of this.#handlers) {
      handler(signal);
    }
  }
}
