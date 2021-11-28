import { LoadingController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public exit = new Subject<string>(); // Observable string sources
  exit$ = this.exit.asObservable(); // Observable string streams
  loading = this.loadingController.create({
    message: 'Please wait...',
    duration: 20000
  });
  constructor(private loadingController: LoadingController, private alertController: AlertController, private router: Router) { }

  async showLoading() {
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();
  }

  async alertError(url: string, backToParentPage = true) {
    const alert = await this.alertController.create({
      header: 'Ops\'s!',
      cssClass: 'error-alert',
      message: 'Có lỗi xảy ra, xin hãy thử lại sau!',
      buttons: [{
        text: 'OK',
        handler: () => {
          if(backToParentPage) {
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
