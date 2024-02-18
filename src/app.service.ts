import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!!!!!';
  }

  async getArticle(): Promise<string[]> {
    try {
      // Python 스크립트 실행
      const { stdout, stderr } = await execAsync(
        `python3 hello.py "https://library.gabia.com/"`,
        {
          maxBuffer: 1024 * 1024 * 10,
        },
      );
      if (stderr) {
        console.error('Error:', stderr);
        return Promise.reject(stderr);
      }
      return JSON.parse(stdout);
    } catch (err) {
      console.error('Execution error:', err);
      return Promise.reject(err);
    }
  }
}
