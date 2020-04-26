import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import {firebase} from '@firebase/app';
import { NotificationsService } from './notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationsService: NotificationsService
  ) {

    this.initializeApp();
  }

  async ngOnInit() {
    firebase.initializeApp(environment.firebase);
    await this.notificationsService.init();
}


ngAfterViewInit() {
  this.platform.ready().then(async () => {
     await this.notificationsService.requestPermission();
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
