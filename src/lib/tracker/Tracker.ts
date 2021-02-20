import appRoot from 'app-root-path';
import io from 'axios';
import dayjs from 'dayjs';
import * as fs from 'fs-extra';

class Tracker {
  static dir = appRoot.resolve('data/tracker.json');
  private list: string[] = [];
  async init() {
    this.loadStore();
    if (this.list.length) return;
    await this.fetchTracker();
  }
  getList() {
    return [...this.list];
  }
  private async fetchTracker() {
    const { data } = await io.get('https://trackerslist.com/best.txt');
    this.list = data.split('\n\n');
    this.writeStore();
  }
  private loadStore() {
    const data = fs.readJsonSync(Tracker.dir, {
      throws: false,
    });
    if (data) {
      const { list, updatedAt } = data;
      const now = dayjs();
      const needUpdate = now.isAfter(updatedAt, 'day');
      if (!needUpdate) {
        this.list = list;
      }
    }
  }
  private writeStore() {
    const now = dayjs().format('YYYY/MM/DD');
    fs.writeJsonSync(
      Tracker.dir,
      {
        list: this.list,
        updatedAt: now,
      },
      {
        spaces: 4,
      }
    );
  }
}
export const tracker = new Tracker();
