import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { MenuController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers:[
    NavParams
  ]
})
export class AboutComponent implements OnInit {
  name: any;
  versionCode: any;
  versionNumber: any;
  date: any;
  terms: boolean = false;
  public version: boolean = true;

  constructor(
    private appVersion: AppVersion,
    private menu: MenuController,
    private navParams: NavParams,
  ) {
    this.menu.enable(true);
    try {
      this.terms = this.navParams.get("terms");
    } catch (error) {

    }
    console.log(this.terms);
    this.version = !this.terms;

  }

  ngOnInit() {
    this.appVersion.getAppName().then((response: any) => {
      this.name = response;
    }).catch((err: any) => {
      this.name = 'ConnecTandem';
    });

    this.appVersion.getVersionCode().then((response: any) => {
      this.versionCode = response;
    }).catch((err: any) => {
      this.versionCode = '1.2.3';
    });

    this.appVersion.getVersionNumber().then((response: any) => {
      this.versionNumber = response;
    }).catch((err: any) => {
      this.versionNumber = '1.2.3';
    })

    this.date = new Date().getFullYear();

  }

}
