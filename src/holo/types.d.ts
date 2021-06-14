declare module "@holo-host/web-sdk" {
  import type { AppSignalCb } from "@holochain/conductor-api";
  class Connection {
    chaperone_url: string;
    constructor(url: string, signalHandler: AppSignalCb, branding: any);

    zomeCall(
      dna_handle: string,
      zome_name: string,
      fn_name: string,
      payload: any
    ): Promise<any>;
  }
  export { Connection };
}
