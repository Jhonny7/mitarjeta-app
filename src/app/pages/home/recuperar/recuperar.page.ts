import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';
import { GenericService } from 'src/app/services/generic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoaderService } from 'src/app/services/loading-service';
import { SqlGenericService } from 'src/app/services/sqlGenericService';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  public id: number = 0;
  public data: any = null;

  public dataRecuperar: any = {
    clave: "",
    pass: "",
    confirmPass: ""
  }

  constructor(
    private alertService: AlertService,
    private sqlGenericService: SqlGenericService,
    private loadingService: LoaderService,
    private route: ActivatedRoute,
    private genericService: GenericService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params.id);
    let sqlSearch: string = `SELECT * FROM contrasegna_temporal WHERE id = ${this.id} AND caducado = 0`;
    this.sqlGenericService.excecuteQueryString(sqlSearch).subscribe((resp: any) => {
      if (resp.parameters.length <= 0) {
        this.alertService.warnAlert("Espera!", "Estás intentanto recuperar una contraseña inexistente ó el link ha caducado");
        setTimeout(() => {
          window.history.back();
        }, 1500);
      } else {
        this.data = resp.parameters[0];
      }
    }, (error: HttpErrorResponse) => {
      this.loadingService.hide();
      this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
    });
  }

  recuperar() {
    if (this.dataRecuperar.clave.length <= 0 ||
      this.dataRecuperar.pass.length <= 0 ||
      this.dataRecuperar.confirmPass.length <= 0) {
      this.alertService.warnAlert(this.translateService.instant("alerts.wait"), this.translateService.instant("alerts.required"));
    } else if (this.dataRecuperar.pass != this.dataRecuperar.confirmPass) {
      this.alertService.warnAlert(this.translateService.instant("alerts.wait"), this.translateService.instant("password.no-match"));
    } else {
      let sqlSearch: string = `SELECT * FROM contrasegna_temporal WHERE pass_temporal = '${this.dataRecuperar.clave}'`;
      //let sqlDelete: string = `DELETE FROM contrasegna_temporal WHERE id = ${this.id}`;
      let sqlUpdate: string = `UPDATE usuario SET password = SHA2(MD5(UNHEX(SHA2('${this.dataRecuperar.pass}',512))),224) WHERE id = ${this.data.id_usuario}`;
      this.loadingService.show();
      this.sqlGenericService.excecuteQueryString(sqlSearch).subscribe((search: any) => {
        if (search.parameters.length > 0) {
          this.sqlGenericService.excecuteQueryString(sqlUpdate).subscribe((update: any) => {
            this.genericService.sendPostRequest(environment.deleteTemporal, { id: this.id }).subscribe((deleted: any) => {
              this.loadingService.hide();
              this.alertService.successAlert(this.translateService.instant("alerts.success"), this.translateService.instant("password.update"));
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
          this.alertService.warnAlert(this.translateService.instant("alerts.wait"), this.translateService.instant("password.code"));
        }

      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
      });
    }
  }

}
