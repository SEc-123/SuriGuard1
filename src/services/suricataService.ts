interface RestartResult {
  success: boolean;
  error?: string;
}

export const getSuricataConfig = async () => {
  // TODO: Implement API call to get Suricata config
  const response = await fetch('/api/settings/suricata');
  if (!response.ok) throw new Error('Failed to fetch Suricata config');
  return response.json();
};

export const updateSuricataConfig = async (content: string) => {
  // TODO: Implement API call to update Suricata config
  const response = await fetch('/api/settings/suricata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  if (!response.ok) throw new Error('Failed to update Suricata config');
  return response.json();
};

export const restartSuricata = async (): Promise<RestartResult> => {
  // TODO: Implement API call to restart Suricata
  const response = await fetch('/api/settings/suricata/restart', {
    method: 'POST'
  });
  if (!response.ok) throw new Error('Failed to restart Suricata');
  return response.json();
};