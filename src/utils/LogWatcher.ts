import * as fs from 'fs';
import { readYAMLConfig } from '../config/core.config';

export class LogWatcher {
  private watcher: fs.FSWatcher | null = null;
  private lastPosition: number = 0;
  private callback: ((log: string) => void) | null = null;

  async start(): Promise<void> {
    try {
      const config = readYAMLConfig();
      const evePath = config['outputs']['eve-log']['filename'] || '/var/log/suricata/eve.json';

      // Get initial file size
      const stats = fs.statSync(evePath);
      this.lastPosition = stats.size;

      // Watch for changes
      this.watcher = fs.watch(evePath, async (eventType) => {
        if (eventType === 'change') {
          await this.readNewLogs(evePath);
        }
      });

      console.log('Log watcher started');
    } catch (error) {
      console.error('Failed to start log watcher:', error);
      throw error;
    }
  }

  onNewLog(callback: (log: string) => void): void {
    this.callback = callback;
  }

  private async readNewLogs(filePath: string): Promise<void> {
    try {
      const stats = fs.statSync(filePath);
      const newSize = stats.size;

      if (newSize < this.lastPosition) {
        // File was truncated, reset position
        this.lastPosition = 0;
      }

      if (newSize > this.lastPosition) {
        // Read only new content
        const buffer = Buffer.alloc(newSize - this.lastPosition);
        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, buffer.length, this.lastPosition);
        fs.closeSync(fd);

        const newContent = buffer.toString();
        const lines = newContent.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (this.callback) {
            this.callback(line);
          }
        }

        this.lastPosition = newSize;
      }
    } catch (error) {
      console.error('Error reading new logs:', error);
    }
  }

  stop(): void {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  }
}