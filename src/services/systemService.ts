interface ServerStatus {
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  networkLoad: number;
}

export const getServerStatus = async (): Promise<ServerStatus> => {
  try {
    const response = await fetch('/api/system/status');
    if (!response.ok) throw new Error('Failed to fetch server status');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch server status:', error);
    throw error;
  }
};