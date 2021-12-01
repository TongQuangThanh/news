import { LoadingController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public appKey = 'thnvn-news';
  public expiredTime = 1 * 86400 * 1000;
  public exit = new Subject<string>(); // Observable string sources
  exit$ = this.exit.asObservable(); // Observable string streams
  private storage: Storage | null = null;
  constructor(private loadingController: LoadingController, private alertController: AlertController, private router: Router,
    private ionicStorage: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.ionicStorage.create();
  }

  public async setStorage(key: string, value: any) {
    return await this.storage?.set(this.appKey + '-' + key, value);
  }

  checkValidStoredData(data: { items: string[]; time: number }) {
    return data && new Date().getTime() - data.time < this.expiredTime;
  }

  async checkIsReadOnList(data: any) {
    let newData = data.items;
    const stored = await this.getStorage('data');
    if (this.checkValidStoredData(stored)) {
      newData = [];
      const allTitles = stored.items.map((it: any) => it.title);
      const read = stored.items.filter((it: any) => it.read).map((it: any) => it.title);
      data.items.forEach((it: any) => {
        if (read.includes(it.title)) {
          it.read = true;
        } else if (!allTitles.includes(it.title)) {
          newData.push(it);
        }
      });
    }
    this.storeData(stored, newData);
    return data;
  }

  async checkIsReadOnGroup(data: any) {
    const all = data.map(it => it.items).flat();
    let newData = all;
    const stored = await this.getStorage('data');
    if (this.checkValidStoredData(stored)) {
      newData = [];
      const allTitles = stored.items.map((it: any) => it.title);
      const read = stored.items.filter((it: any) => it.read).map((it: any) => it.title);
      all.forEach((it: any) => {
        if (read.includes(it.title)) {
          it.read = true;
        } else if (!allTitles.includes(it.title)) {
          newData.push(it);
        }
      });
    }
    this.storeData(stored, newData);
    return data;
  }

  updateStorage(title: string) {
    this.getStorage('data').then(
      stored => {
        for (const it of stored.items) {
          if (it.title === title) {
            it.read = true;
            break;
          }
        }
        this.setStorage('data', stored);
      }
    );
  }

  public async storeData(oldData: { items: any[]; time: number }, newData: any[]) {
    let data = oldData;
    if (!this.checkValidStoredData(data)) {
      this.clearStorage();
      data = { items: [], time: new Date().getTime() };
    }
    data.items = data.items.concat(newData);
    this.setStorage('data', data);
  }

  public async getStorage(key: string) {
    return await this.storage?.get(this.appKey + '-' + key);
  }

  public async clearStorage() {
    return await this.storage?.clear();
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    return loading.present();
  }

  hideLoading() {
    this.loadingController.dismiss();
  }

  async alertError(url: string, backToParentPage = true) {
    const alert = await this.alertController.create({
      header: 'Ops\'s!',
      cssClass: 'error-alert',
      message: 'Có lỗi xảy ra, xin hãy thử lại sau!',
      buttons: [{
        text: 'OK',
        handler: () => {
          if (backToParentPage) {
            this.router.navigateByUrl(url);
          }
        }
      }]
    });
    await alert.present();
  }

  exitApp() {
    this.exit.next();
  }
}
