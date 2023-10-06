import { app_config } from "app_config";

/**
 * Represents the configuration data.
 */
export interface ConfigData {
  /**
   * The configuration data.
   */
  config: Record<string, any>;
  /**
   * The schema of the configuration data.
   */
  schema: Record<string, any>;
  /**
   * The description of the configuration data.
   */
  description: string;
}

/**
 * Fetches the configuration data from the server.
 * @param path - The path of the configuration data.
 * @returns A promise that resolves to the configuration data.
 * @throws An error if there is an issue fetching the configuration data.
 */
export async function fetchConfigData(path: string): Promise<ConfigData> {
  try {
    const response = await fetch(app_config.config_path + path);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (e) {
    throw new Error("Error getting config data from server");
  }
}

/**
 * Saves the configuration data to the server.
 * @param path - The path of the configuration data.
 * @param data - The configuration data to be saved.
 * @throws An error if there is an issue saving the configuration data.
 */
export async function saveConfigData(
  path: string,
  data: any,
  errorHandler: (e: string) => void,
): Promise<void> {
  try {
    const response = await fetch(app_config.config_path + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      errorHandler(`HTTP Error ${response.status} ${response.statusText}`);
    }
  } catch (e) {
    errorHandler("Error saving config data to server: " + e.message);
  }
}
