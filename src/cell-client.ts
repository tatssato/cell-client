import { AppSignalCb, CellId } from "@holochain/client";

export interface CellClient {
  cellId: CellId;

  callZome(
    zomeName: string,
    fnName: string,
    payload: any,
    timeout?: number
  ): Promise<any>;

  addSignalHandler(
    signalHandler: AppSignalCb
  ): Promise<{ unsubscribe: () => void }>;
}
