declare module "@holo-host/web-sdk" {
  import type { AppInfoResponse, AppSignalCb } from "@holochain/conductor-api";

  type Branding = {
    app_name: string;
    logo_url?: string;
    info_link?: string;
    publisher_name?: string;
  };

  class Connection {
    chaperone_url: string;
    constructor(url: string, signalHandler: AppSignalCb, branding: Branding);
    ready(): Promise<void>;
    signIn(): Promise<void>;
    zomeCall(
      dna_handle: string,
      zome_name: string,
      fn_name: string,
      args: any
    ): Promise<any>;
    appInfo(installed_app_id: string): Promise<AppInfoResponse>;
  }
  export { Connection, Branding };
}
