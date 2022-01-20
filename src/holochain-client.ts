import { AppWebsocket, InstalledCell } from "@holochain/client";
import { BaseClient } from "./base-client";
import { CellClient } from "./cell-client";

export class HolochainClient extends BaseClient implements CellClient {
  constructor(
    protected appWebsocket: AppWebsocket,
    protected cellData: InstalledCell
  ) {
    super();
    AppWebsocket.connect(this.appWebsocket.client.socket.url, 15000, (s) =>
      this.handleSignal(s)
    );
  }

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
        cap_secret: null,
        cell_id: this.cellId,
        zome_name: zomeName,
        fn_name: fnName,
        payload: payload,
        provenance: this.cellId[1],
      },
      timeout
    );
  }
}
