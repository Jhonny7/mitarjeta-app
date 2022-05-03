import { AdDirective } from './directives/ad.directive';
import { Overlay } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';
//import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Camera } from '@ionic-native/camera/ngx';


//import { FCM } from '@ionic-native/fcm/ngx';
@NgModule({
  providers: [
      Overlay,
      GooglePlus,
      Device,
      AppVersion, 
      AndroidPermissions,
      Diagnostic,
      StatusBar,
      HeaderColor,
      Camera,
      AndroidPermissions,
      //FCM
  ]
})
export class ProvidersModule {}
