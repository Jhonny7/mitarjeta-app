import { AboutComponent } from './../home/about/about.component';
import { TranslateService } from '@ngx-translate/core';
import { FcmService } from './../../services/fcm.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { GenericService } from './../../services/generic.service';
import { SqlGenericService } from './../../services/sqlGenericService';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService } from './../../services/alert.service';
import { LoaderService } from './../../services/loading-service';
import { Router, NavigationExtras } from '@angular/router';
/* import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; */
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
//import firebase from 'firebase'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public visto: boolean = false;

  public data: any = {
    email: {
      error: false,
      value: ""
    },
    pass: {
      error: false,
      value: ""
    }
  };
  eye_icon = "eye-off-outline";

  constructor(
    private alertService: AlertService,
    private loadingService: LoaderService,
    public router: Router,
    //private afAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus,
    private sqlGenericService: SqlGenericService,
    private genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private menu: MenuController,
    private fcmService: FcmService,
    private translateService: TranslateService,
    private modalCtrl: ModalController
  ) {
    this.menu.enable(false);
    //this.loadingService.show();
    //Se limpia siempre sesión al ingresar a login
    this.localStorageEncryptService.clearProperty("userSessionConnectandem");
  }



  ngOnInit() {
    setTimeout(() => {
      let objDiv = document.getElementById("btn-scroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 500);
    //this.getCurrentState();
  }

  loginGoogle() {
  }


  change() {
    let id: any = document.getElementById("input-pass3");
    if (id.type == "text") {
      id.type = "password";
      this.eye_icon = "eye-off-outline";
    } else {
      id.type = "text";
      this.eye_icon = "eye-outline";
    }
  }

  login() {
    this.loadingService.show("Espere...");
    let sql: string = `SELECT * FROM usuario WHERE password = SHA2(MD5(UNHEX(SHA2('${this.data.pass.value}',512))),224) AND username = '${this.data.email.value}'`;
    this.sqlGenericService.excecuteQueryString(sql).subscribe((response: any) => {
      this.loadingService.hide();
      if (response.parameters.length > 0) {
        if (response.parameters[0].verificado == 1) {
          localStorage.setItem("userSessionConnectandem", JSON.stringify(response.parameters[0]));
          //this.menu.enable(true);
          this.fcmService.updateTokenUser();
          this.router.navigate(["/", "inicio"]);
        } else {
          this.alertService.warnAlert("Oops", this.translateService.instant("login.verify"));
        }
      } else {
        this.alertService.errorAlert("Oops", this.translateService.instant("login.password"));
      }
    }, (error: HttpErrorResponse) => {
      this.loadingService.hide();
      this.alertService.errorAlert("Oops", this.translateService.instant("login.password"));
    });
  }

  recuperar() {
    this.alertService.alertWithInputs((valor: any) => {
      //console.log(valor);
      this.confirmRecuperar(valor);
    }, this.translateService.instant("login.no-remember"), this.translateService.instant("login.email-recovery"), this.translateService.instant("login.recovery"));
  }

  confirmRecuperar(email: string) {
    let epoch = Date.now();

    //insertar en usuario contrasegnia

    let sqlSearch: string = `SELECT * FROM usuario WHERE username = '${email}'`;

    this.loadingService.show();

    this.sqlGenericService.excecuteQueryString(sqlSearch).subscribe((find: any) => {
      //console.log(find);

      if (find.parameters.length > 0) {
        let sqlDeleteBefore = `SELECT * FROM contrasegna_temporal WHERE id_usuario = ${find.parameters[0].id}`;
        let sqlCaducidad = `UPDATE contrasegna_temporal SET caducado = 1 WHERE id_usuario = ${find.parameters[0].id}`;
        this.sqlGenericService.excecuteQueryString(sqlDeleteBefore).subscribe((deleted: any) => {
          if (deleted.parameters.length <= 0) {
            let sql: string = `INSERT INTO contrasegna_temporal (pass_temporal, id_usuario) VALUES ('${String(epoch)}', ${find.parameters[0].id})`;
            this.sqlGenericService.excecuteQueryString(sql).subscribe((insert: any) => {
              //console.log(insert);

              let request: any = {
                asunto: this.translateService.instant("login.recovery-email"),
                from: "connectandem@institutofranklin.net",
                name: "connectandem@institutofranklin.net",
                to: email,
                cuerpo: `<section>
            <div style="background-color: #006b89;
            text-align: center;padding: 8px;">
              <p style="color: #fff;margin: 0;font-size: 20px;">${this.translateService.instant("login.attach-email")}</p>
            </div>
            <div style="padding: 10px;border: 1px solid #c8c8c8;">
              <p style="color: #000;">${this.translateService.instant("login.hi")} ${find.parameters[0].nombre}, ${this.translateService.instant("login.password-message")}</p>
              <p style="color: #000;">${this.translateService.instant("login.instructions")}</p>

              <p> <strong>${this.translateService.instant("login.code")}</strong> ${epoch}</p>
      
              <a href="https://${window.location.hostname}/recuperar/${insert.parameters}"><button style="color: #fff;
                background-color: #006b89;
                font-size: 16px;
                padding: 8px;
                border-radius: 8px;
                box-shadow: 1px 1px 1px #123;
                margin-bottom: 20px;
                min-width: 200px;
                cursor: pointer;" >${this.translateService.instant("login.recovery")}</button></a>
      
              <p style="color: #000;">${this.translateService.instant("university.link")}</p>
              <a href="https://${window.location.hostname}/recuperar/${insert.parameters}">https://${window.location.hostname}/recuperar/${insert.parameters}</a>
            </div>
          </section>`
              };
              this.genericService.sendPostRequest(environment.mail, request).subscribe((response: any) => {


                this.sqlGenericService.excecuteQueryString(sqlCaducidad).subscribe((response: any) => {
                }, (error: HttpErrorResponse) => {
                });

                this.loadingService.hide();
                this.alertService.successAlert(this.translateService.instant("alerts.success"), this.translateService.instant("login.spam"));
              }, (error: HttpErrorResponse) => {
                this.loadingService.hide();
                this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
              });
            }, (error: HttpErrorResponse) => {
              this.loadingService.hide();
              this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
            });
          } else {
            this.loadingService.hide();
            this.alertService.warnAlert("Oops!", this.translateService.instant("login.other-recovery"));
          }

        }, (error: HttpErrorResponse) => {
          this.loadingService.hide();
          this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
        });


      } else {
        this.alertService.warnAlert("Espera!", this.translateService.instant("login.no-user"));
      }
    }, (error: HttpErrorResponse) => {
      this.loadingService.hide();
      this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
    });


  }

  async terms() {
    let modal = await this.modalCtrl.create({
      component: AboutComponent,
      componentProps: {
        terms: true
      },
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    modal.present();
  }
}
