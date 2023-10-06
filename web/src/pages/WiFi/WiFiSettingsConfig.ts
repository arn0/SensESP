import { immerable } from "immer";

export class WiFiSettingsConfig {
  apSettings: APSettingsConfig;
  clientSettings: ClientSettingsConfig;

  constructor() {
    this.apSettings = new APSettingsConfig();
    this.clientSettings = new ClientSettingsConfig();
  }
}

export class APSettingsConfig {
  enabled: boolean;
  name: string;
  password: string;
  channel: string;
  hidden: boolean;

  constructor() {
    this.enabled = false;
    this.name = "";
    this.password = "";
    this.channel = "Auto";
    this.hidden = false;
  }
}

export class ClientSettingsConfig {
  enabled: boolean;
  singleClientConfigs: SingleClientConfig[]; // expected length of 3

  constructor() {
    this.enabled = false;
    this.singleClientConfigs = [
      new SingleClientConfig(),
      new SingleClientConfig(),
      new SingleClientConfig(),
    ];
  }
}

export class SingleClientConfig {
  [immerable] = true;
  name: string;
  password: string;
  useDHCP: boolean;
  ipAddress: string;
  netmask: string;
  gateway: string;
  dnsServer: string;

  constructor() {
    this.name = "";
    this.password = "";
    this.useDHCP = true;
    this.ipAddress = "";
    this.netmask = "";
    this.gateway = "";
    this.dnsServer = "";
  }
}
