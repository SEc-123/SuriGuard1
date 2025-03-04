import { watch } from 'fs';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { processLogEvent } from './logProcessor';

export class LogWatcher {
  private filePath: string;
  private currentPosition: number;
  
  constructor(filePath: string) {
    this.filePath = filePath;
    this.currentPosition = 0;
  }

  async start() {
    // 开始监控文件变化
    watch(this.filePath, (eventType) => {
      if (eventType === 'change') {
        this.processNewLogs();
      }
    });

    // 初始处理现有日志
    await this.processNewLogs();
  }

  private async processNewLogs() {
    const stream = createReadStream(this.filePath, {
      start: this.currentPosition
    });

    const rl = createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      try {
        const event = JSON.parse(line);
        await processLogEvent(event);
        this.currentPosition += Buffer.byteLength(line) + 1; // +1 for newline
      } catch (error) {
        console.error('Error processing log line:', error);
      }
    }
  }
}