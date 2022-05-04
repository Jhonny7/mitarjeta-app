import { ThemeService } from 'src/app/services/theme.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { FCM } from '@ionic-native/fcm/ngx';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from 'src/app/services/event.service';
import { remastered } from './../environments/environment.prod';
import { FcmService } from './services/fcm.service';
import { LoaderService } from './services/loading-service';
import { LocalStorageEncryptService } from './services/local-storage-encrypt.service';
import { SqlGenericService } from './services/sqlGenericService';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public menus: any[] = [{
    path: "sabias",
    icon: "assets/imgs/cards/admin.png",
    id: 0,
    name: "Administración"
  }, {
    path: "trivia",
    icon: "assets/imgs/cards/search.png",
    id: 1,
    notNeedSubject: true,
    name: "Glosario"
  }, {
    path: "capsula",
    icon: "assets/imgs/cards/pay.png",
    //isTab: true,
    id: 2,
    name: "Precios"
  }, {
    path: "directorio",
    icon: "assets/imgs/cards/faqs.png",
    id: 3,
    notNeedSubject: true,
    name: "Preguntas"
  }, {
    path: "preguntas",
    icon: "assets/imgs/cards/about.png",
    //isTab: true,
    id: 4,
    name: "Acerca de"
  },
  ];

  public user: any = null;

  constructor(
    private localStorageEncryptService: LocalStorageEncryptService,
    private translateService: TranslateService,
    private router: Router,
    private menu: MenuController,
    //private fcm: FCM,
    private androidPermissions: AndroidPermissions,
    private loadingService: LoaderService,
    private sqlGenericService: SqlGenericService,
    private fcmService: FcmService,
    private eventService: EventService,
    private statusBar: StatusBar,
    private headerColor: HeaderColor,
    private diagnostic: Diagnostic,
    public themeService: ThemeService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSessionConnectandem");

    if (remastered) {
      this.menus.push({
        path: "examen",
        icon: "assets/imgs/home/examenes.png",
        id: 5,
        notNeedSubject: true,
        name: "Exámenes"
      });
    }

  }

  ngOnInit() {
    setTimeout(() => {
      this.getPermissions();
    }, 5000);
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#006f8e');
    this.headerColor.tint('#29b9e1');

    this.cargaIdioma();
    this.cargarTema();

    /* if (!emulado) {
      this.registerToken();
    } else {
      this.registerTokenFake();
    } */

    let user:any = this.localStorageEncryptService.getFromLocalStorage("userSessionConnectandem");

    if(user){
      this.fcmService.updateTokenUser();
    }
  }

  getPermissions() {
   //console.log("get permisos");

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result =>//console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO]);



    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(result => {
      if (!result.hasPermission) {
        this.diagnostic.getMicrophoneAuthorizationStatus().then((r) => {
         //console.log(r);

        });
      }
    }, err => {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then((data: any) => {
        if (data.hasPermission) {
         //console.log("have record audio permission");
        }
      });
    }
    );
  }

  registerToken() {
    let registerToken: any = this.localStorageEncryptService.getFromLocalStorage("token-ConecTandem");
    if (!registerToken) {
      this.fcmService.initPush();
    } else {
      //this.listenNotifications();
      this.fcmService.initPush();
    }
  }

  registerTokenFake() {
    let registerToken: any = this.localStorageEncryptService.getFromLocalStorage("token-ConecTandem");
    if (!registerToken) {
      //token is token of device
      let uuid: any = "fakeUuidConecTandem";
      let token: string = "fakeTokenConecTandem";
      let sql: string = `INSERT INTO usuario (uuid, token) VALUES ('${uuid}', '${token}')`;
      let sqlChecking: string = `SELECT * FROM usuario WHERE uuid = '${uuid}'`;

      this.loadingService.show();

      //consultar uuid en base de datos antes de registrar nuevo token 
      //Si encuentra el uuid se actualizará el token pero no creará nuevo usuario

      this.sqlGenericService.excecuteQueryString(sqlChecking).subscribe((resp: any) => {
        //console.log(resp);

        if (resp.parameters.length <= 0) {
          this.sqlGenericService.excecuteQueryString(sql, 3).subscribe((resp: any) => {
            //Se registra correctamente nuevo usuario
            this.loadingService.hide();
            this.localStorageEncryptService.setToLocalStorage("token-ConecTandem", token);
            //this.fcm.subscribeToTopic('myGymGlobal');//se suscribe a notificaciones globales de la app
            //this.listenNotifications();
          }, (err: HttpErrorResponse) => {
            this.loadingService.hide();
          });
        } else {
          this.loadingService.hide();
        }
      }, (err: HttpErrorResponse) => {
        this.loadingService.hide();
      });
    } else {
      //this.listenNotifications();
    }
  }

  listenNotifications() {
    /* this.fcm.onNotification().subscribe(data => {
     //console.log(data);
      if(data.wasTapped){
       //console.log("Received in background");
      } else {
       //console.log("Received in foreground");
      };
    }); */
  }

  cargarTema() {
    let t: any = this.localStorageEncryptService.getFromLocalStorage("theme");
    if (!t) {
      /* this.localStorageEncryptService.setToLocalStorage("theme", "#FFFFFF");
      this.localStorageEncryptService.setToLocalStorage("color-font", "#fff");
      this.localStorageEncryptService.setToLocalStorage("themeClass", "primary"); */
      //this.localStorageEncryptService.setToLocalStorage("primary", "#232323");
    }
  }

  cargaIdioma() {
    let l: any = this.localStorageEncryptService.getFromLocalStorage("language");
    if (l) {
      this.translateService.setDefaultLang(l);
      this.translateService.use(l);
    } else {
      this.localStorageEncryptService.setToLocalStorage("language", "en");
      this.translateService.setDefaultLang("en");
      this.translateService.use("en");
    }
  }

  openPage(itm: any) {
    this.eventService.send("menu", itm);
  }

  close() {
    this.localStorageEncryptService.clearProperty("userSessionConnectandem");
    this.router.navigate(["/", "login"]);
  }
}