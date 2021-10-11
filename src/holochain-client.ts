import {
  AppWebsocket,
  InstalledCell,
  AppSignalCb,
} from "@holochain/conductor-api";
import { CellClient } from "./cell-client";

export class HolochainClient implements CellClient {
  constructor(
    protected appWebsocket: AppWebsocket,
    protected cellData: InstalledCell
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  callZome(
    zomeName: string,
    fnName: string,
    payload: any,
    timeout = 15000
  ): Promise<any> {
    return this.appWebsocket.callZome(
      {
        cap: null as any,
        cell_id: this.cellId,
        zome_name: zomeName,
        fn_name: fnName,
        payload: payload,
        provenance: this.cellId[1],
      },
      timeout
    );
  }

  async addSignalHandler(signalHandler: AppSignalCb) {
    const appWs = await AppWebsocket.connect(
      this.appWebsocket.client.socket.url,
      15000,
      signalHandler
    );

    return {
      unsubscribe: () => {
        appWs.client.close();
      },
    };
  }
}
