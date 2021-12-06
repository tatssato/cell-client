import { CellClient } from "./cell-client";

import { AppSignalCb, InstalledCell } from "@holochain/conductor-api";

export abstract class BaseClient {
  protected handlers: Array<AppSignalCb> = [];

  async addSignalHandler(signalHandler: AppSignalCb) {
    this.handlers.push(signalHandler);

    return {
      unsubscribe: () => {
        const index = this.handlers.findIndex((h) => h === signalHandler);
        this.handlers.splice(index, 1);
      },
    };
  }

  protected handleSignal(signal: any) {
    for (const handler of this.handlers) {
      handler(signal);
    }
  }
}
