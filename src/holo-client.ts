import { CellClient } from "./cell-client";

import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";
import HoloSdk from "@holo-host/web-sdk";

export class HoloClient implements CellClient {
  #handlers: Array<AppSignalCb> = [];

  constructor(
    protected connection: any,
    protected cellData: InstalledCell,
    protected branding: any
  ) {
    this.#handlers.push(this.connection.signalCb);
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
