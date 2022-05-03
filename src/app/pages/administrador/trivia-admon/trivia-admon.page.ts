import { TranslateService } from '@ngx-translate/core';
import { catalogoSabias, remastered } from './../../../../environments/environment.prod';
import { AlertService } from './../../../services/alert.service';
import { environment, idEmpresa } from 'src/environments/environment.prod';
import { LoaderService } from './../../../services/loading-service';
import { SqlGenericService } from './../../../services/sqlGenericService';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-trivia-admon',
  templateUrl: './trivia-admon.page.html',
  styleUrls: ['./trivia-admon.page.scss'],
})
export class TriviaAdmonPage implements OnInit {

  public menus: any = [
    {
      title: "Universidades",
      icon: "school",
      id: 1
    }, {
      title: "Roles",
      icon: "admin_panel_settings",
      id: 2
    },
    {
      title: "Penalizaciones",
      icon: "feedback",
      id: 3
    },
  ];

  public menuActivo = 1;

  public universidades: any[] = [];
  public roles: any[] = [];
  public users: any[] = [];

  public img: any = environment.getImagenIndividual;

  constructor(
    private menu: MenuController,
    private sqlGenericService: SqlGenericService,
    private loadingService: LoaderService,
    private matDialog: MatDialog,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.menu.enable(false);
    this.cargarUniversidades();
  }

  open(menu) {
    this.menuActivo = menu.id;
    switch (this.menuActivo) {
      case 1:
        this.cargarUniversidades();
        break;
      case 2:
        this.cargarRoles();
        break;
      case 3:
        this.cargarPenalizados();
        break;
      default:
        break;
    }
  }

  cargarPenalizados() {
    let sql: string = `SELECT * FROM usuario WHERE penalizaciones_json IS NOT NULL AND LENGTH(penalizaciones_json) > 10 AND id_empresa = ${idEmpresa}`;
    //console.log(sql);

    this.sqlGenericService.excecuteQueryStringReference(sql, "getUsuariosPenalizados").subscribe((resp: any) => {
      //Se registra correctamente nuevo usuario
      //console.log(resp);

      this.loadingService.hide();
      this.users = resp.parameters;
    }, (err: HttpErrorResponse) => {
      //console.log(err);

      this.loadingService.hide();
    });
  }

  cargarUniversidades() {
    if (this.menuActivo != 3) {
      this.loadingService.show("Cargando universidades...");
    }
    let sql: string = `SELECT id, descripcion, nombre, id_archivo, url FROM catalogo WHERE id_tipo_catalogo = 45 AND id_empresa = ${idEmpresa}`;
    //console.log(sql);

    this.sqlGenericService.excecuteQueryStringReference(sql, "getUniversidades").subscribe((resp: any) => {
      //Se registra correctamente nuevo usuario
      //console.log(resp);

      this.loadingService.hide();
      this.universidades = resp.parameters;
    }, (err: HttpErrorResponse) => {
      //console.log(err);

      this.loadingService.hide();
    });
  }

  cargarRoles() {
    if (this.menuActivo != 3) {
      this.loadingService.show("Cargando roles...");
    }
    let sql: string = `SELECT id, descripcion, nombre, id_archivo, url FROM catalogo WHERE id_tipo_catalogo = 41 AND id_empresa = ${idEmpresa} AND id != 220`;
    //console.log(sql);

    this.sqlGenericService.excecuteQueryStringReference(sql, "getRoles").subscribe((resp: any) => {
      //Se registra correctamente nuevo usuario
      //console.log(resp);

      this.loadingService.hide();
      this.roles = resp.parameters;
    }, (err: HttpErrorResponse) => {
      //console.log(err);

      this.loadingService.hide();
    });
  }

  create() {
    let data: any = {};
    data.id = this.menuActivo;
    switch (this.menuActivo) {
      case 1:
        data.status = false;
        data.id = 1;
        data.current = {
          nombre: "",
          descripcion: "",
          b64: "",
          url: null,
          id: null
        };
        break;
      case 2:
        data.status = false;
        data.id = 2;
        data.current = {
          nombre: "",
          descripcion: "",
          id: null
        };
        break;
      default:
        break;
    }
    let matDialogConfig = { data: data, disableClose: true, panelClass: "modal-general" };
    let dialogRef = this.matDialog.open(GenericModalComponent, matDialogConfig);
    //dialogRef.
    dialogRef.beforeClosed().subscribe((r) => {
      switch (this.menuActivo) {
        case 1:
          this.cargarUniversidades();
          break;
        case 2:
          this.cargarRoles();
          break;
        default:
          break;
      }
    });
  }

  edit(item: any) {
    let data: any = {};
    data.id = this.menuActivo;
    switch (this.menuActivo) {
      case 1:
        let tema = item;
        data.status = true;
        data.current = {
          nombre: tema.nombre,
          descripcion: tema.descripcion,
          b64: "",
          url: tema.url,
          id: tema.id
        };
        break;
      case 2:
        let rol = item;
        data.status = true;
        data.current = {
          nombre: rol.nombre,
          descripcion: rol.descripcion,
          id: rol.id
        };
        break;
      case 3:
        data.usuario = item;
        break;
      default:
        break;
    }

    let matDialogConfig: MatDialogConfig = { data: data, disableClose: true, panelClass: "modal-general" };
    let dialogRef = this.matDialog.open(GenericModalComponent, matDialogConfig);
    //dialogRef.
    dialogRef.beforeClosed().subscribe((r) => {
      switch (this.menuActivo) {
        case 1:
          this.cargarUniversidades();
          break;
        case 2:
          this.cargarRoles();
          break;
        case 3:
          this.cargarPenalizados();
          break;
        default:
          break;
      }
    });
  }

  delete(item: any, other: any = null) {
    let sqlDelete: string = "";
    let data: any = {};
    switch (this.menuActivo) {
      case 1:
        let tema = item;
        sqlDelete = `DELETE FROM catalogo WHERE id = ${tema.id}`;
        data.sql = sqlDelete;
        data.msj = "Se eliminará la universidad permanentemente";
        break;
      case 2:
        let rol = item;
        sqlDelete = `DELETE FROM catalogo WHERE id = ${rol.id}`;
        data.sql = sqlDelete;
        data.msj = "Se eliminará el rol permanentemente";
        break;
      default:
        break;
    }

    this.confirm(data, other);

  }

  confirm(data, other: any = null) {
    this.alertService.confirmTrashAlert(() => {
      this.loadingService.show("Eliminando...");
      let msj: string = "";
      this.sqlGenericService.excecuteQueryString(data.sql).subscribe((response: any) => {
        this.loadingService.hide();

        switch (this.menuActivo) {
          case 1:
            this.cargarUniversidades();
            break;
          case 1:
            this.cargarRoles();
            break;
          default:
            break;
        }

      }, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        if (other) {
          this.alertService.warnAlert("Oops!", `${other} no puede ser eliminado, ya que está asignado`);
        } else {
          this.alertService.errorAlert("Oops!", this.translateService.instant("alerts.error"));
        }
      });
    }, "Confirmar", data.msj, "Aceptar");
  }

  logout() {

  }
}
