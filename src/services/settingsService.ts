import { apiClient } from "@/lib/apiClient";

export interface SettingsAPI {
  settings_phone: string;
  settings_email: string;
  settings_address: string;
  settings_facebook: string;
  settings_linkedin: string;
  settings_mayelia_url?: string;
}

export const fetchSettings = (): Promise<SettingsAPI> =>
  apiClient.get<{ data: SettingsAPI }>("/page-sections/settings").then((r) => r.data);
