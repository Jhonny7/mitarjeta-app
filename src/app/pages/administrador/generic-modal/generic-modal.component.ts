import { element } from 'protractor';
import { catalogoSabias } from './../../../../environments/environment.prod';

import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { idEmpresa, environment, pathSettlementsCity } from 'src/environments/environment.prod';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import * as classic from '@ckeditor/ckeditor5-build-classic';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

import { AlertService } from 'src/app/services/alert.service';
import { GenericService } from 'src/app/services/generic.service';
import { LoaderService } from 'src/app/services/loading-service';
import { SqlGenericService } from 'src/app/services/sqlGenericService';
@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {

  public img: any = environment.getImagenIndividual;
  public filesInfo: any = {};
  public temas: any[] = [];
  //public examenTemporal: any = [];

  public fileInfo: any[] = [];
  public files: any[] = [];
  public filesText: any[] = [];


  public Editor = DecoupledEditor;

  editorConfig = {
    mediaEmbed: {
      previewsInData: true
    }
  }

  public model = {
    editorData: `<p>Ingresa descripción de la cápsula</p>`,
    Editor: DecoupledEditor,

  };

  public s: any = {};



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parentDilogRef: MatDialogRef<any>,
    private alertService: AlertService,
    private domSanitizer: DomSanitizer,
    private sqlGenericService: SqlGenericService,
    private loadingService: LoaderService,
    private genericService: GenericService) {

  }

  ngOnInit(): void {

    /*
    pregunta: "",
          respuesta: "",
          id_tema: null,
          id: null
    */
    switch (this.data.id) {
      case 1:
        //this.data.idArchivo = this.data.current.url;
        break;
      case 2:
        break;
      case 3:
        this.data.usuario.penalizaciones_json = JSON.parse(this.data.usuario.penalizaciones_json);
        break;
      default:
        break;
    }
  }

  changeImg(evt: any) {
    //console.log("------------------------------------");

    let file: any = evt.target.files[0];
    if (file.size > 2000000) {
      this.alertService.warnAlert(
        "Ooops!",
        "Tu archivo debe ser de máximo 2MB de tamaño, Intenta nuevamente con otro archivo",
        () => {
          ////console.log("hola");
        }
      );
    } else if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg" &&
      file.type != "image/svg+xml"
    ) {
      this.alertService.warnAlert(
        "Ooops!",
        "Solo aceptamos archivos en formato png, jpg y svg",
        () => {
          ////console.log("hola");
        }
      );
    } else {

      this.filesInfo = {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        namer: "",
        descripcion: ""
      };

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.type == "image/svg+xml") {
          let img: any = new Image();
          img.src = reader.result;

          img.onload = () => {
            let canvas: any = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let context: any = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            let png: any = canvas.toDataURL("image/png");
            //console.log(png);
            switch (this.data.id) {
              case 1:
                this.data.current.b64 = png;
                this.data.current.url = null;
                break;

              default:
                break;
            }

          };

        } else {
          switch (this.data.id) {
            case 1:
              this.data.current.b64 = reader.result;
              this.data.current.url = null;
              break;
            case 7:
              this.data.current.b64 = reader.result;
              this.data.current.url = null;
              break;

            default:
              break;
          }
        }

      };
      reader.onerror = error => {
        ////console.log("Error: ", error);
      };
    }
  }

  add() {
    switch (this.data.id) {
      case 1:
        if (this.data.status) {
          this.editUniversidad();
        } else {
          this.createUniversidad();
        }
        break;
      case 2:
        if (this.data.status) {
          this.editRol();
        } else {
          this.createRol();
        }
        break;
      default:
        break;
    }
  }

  onConfirmClick() {
    this.parentDilogRef.close(false);
  }

  ///CREATES
  createUniversidad() {
    if (this.data.current.descripcion.length == 0) {
      this.alertService.warnAlert("Espera!", "El campo nombre es requerido");
    } else if (this.data.current.nombre.length == 0) {
      this.alertService.warnAlert("Espera!", "El campo correo es requerido");
    } else {

      if (this.data.current.b64.length > 0) {
        let fls: any[] = [];
        fls.push({ ...this.filesInfo, base64: this.data.current.b64 });

        let request = {
          files: fls,
          idAdjunto: this.data.idArchivo,
          idEmpresa: idEmpresa,
          tipo: 31,
          name: this.data.current.label,
          description: this.data.current.label,
          multi: true
        };

        this.loadingService.show("Agregando...");
        let sqlTema = `INSERT INTO catalogo (id_tipo_catalogo, id_empresa, descripcion, nombre) VALUES ('45', ${idEmpresa}, '${this.data.current.nombre}', '${this.data.current.descripcion}')`;
        //console.log(sqlTema);

        this.sqlGenericService.excecuteQueryString(sqlTema).subscribe((resp: any) => {
          let returnId: any = resp.parameters;
          if (this.data.current.b64 && this.data.current.b64.length > 0) {
            let requestFile: any = {
              b64: this.data.current.b64,
              id: returnId,
              extension: "png",
              table: "catalogo"
            };
            this.genericService.sendPostRequest(environment.loadFile, requestFile).subscribe((resp2: any) => {
              //Se registra correctamente nuevo usuario
              this.alertService.successAlert("Bien!", "Universidad generada exitosamente");
              this.parentDilogRef.close(false);
              this.loadingService.hide();
              //this.fcm.subscribeToTopic('myGymGlobal');//se suscribe a notificaciones globales de la app
              //this.listenNotifications();
            }, (err: HttpErrorResponse) => {
              this.loadingService.hide();
            });
          } else {
            this.alertService.successAlert("Bien!", "Universidad generada exitosamente");
            this.parentDilogRef.close(false);
            this.loadingService.hide();
          }

        }, (err: HttpErrorResponse) => {
          this.loadingService.hide();
        });
      } else {
        let sqlTema2 = `INSERT INTO catalogo (id_tipo_catalogo, id_empresa, descripcion, nombre) VALUES ('45', ${idEmpresa}, '${this.data.current.descripcion}', '${this.data.current.nombre}')`;

        this.sqlGenericService.excecuteQueryString(sqlTema2).subscribe((resp: any) => {
          //Se registra correctamente nuevo usuario
          this.alertService.successAlert("Bien!", "Universidad generada exitosamente");
          this.parentDilogRef.close(false);
          this.loadingService.hide();
          //this.fcm.subscribeToTopic('myGymGlobal');//se suscribe a notificaciones globales de la app
          //this.listenNotifications();
        }, (err: HttpErrorResponse) => {
          this.loadingService.hide();
        });
      }

    }
  }

  createRol() {
    if (this.data.current.descripcion.length == 0 || this.data.current.nombre.length == 0) {
      this.alertService.warnAlert("Espera!", "Todos los campos son requeridos");
    } else {
      let sqlTema2 = `INSERT INTO catalogo (id_tipo_catalogo, id_empresa, descripcion, nombre) VALUES ('41', ${idEmpresa}, '${this.data.current.descripcion}', '${this.data.current.nombre}')`;

      this.sqlGenericService.excecuteQueryString(sqlTema2).subscribe((resp: any) => {
        //Se registra correctamente nuevo usuario
        this.alertService.successAlert("Bien!", "Perfil generado exitosamente");
        this.parentDilogRef.close(false);
        this.loadingService.hide();
        //this.fcm.subscribeToTopic('myGymGlobal');//se suscribe a notificaciones globales de la app
        //this.listenNotifications();
      }, (err: HttpErrorResponse) => {
        this.loadingService.hide();
      });


    }
  }

  //EDITS
  editUniversidad() {
    if (this.data.current.nombre.length == 0) {
      this.alertService.warnAlert("Espera!", "El campo correo es requerido");
    } else if (this.data.current.descripcion.length == 0) {
      this.alertService.warnAlert("Espera!", "El campo nombre es requerido");
    } else {
      if (this.data.current.b64.length > 0) {
        let fls: any[] = [];
        fls.push({ ...this.filesInfo, base64: this.data.current.b64 });

        let request = {
          files: fls,
          idAdjunto: this.data.idArchivo,
          idEmpresa: idEmpresa,
          tipo: 31,
          name: this.data.current.label,
          description: this.data.current.label,
          multi: true
        };

        this.loadingService.show("Actualizando...");

        let sqlTema = `UPDATE catalogo SET descripcion = '${this.data.current.descripcion}', nombre = '${this.data.current.nombre}' WHERE id = ${this.data.current.id}`;
        //console.log(sqlTema);

        this.sqlGenericService.excecuteQueryString(sqlTema).subscribe((resp: any) => {
          let returnId: any = resp.parameters;
          if (this.data.current.b64 && this.data.current.b64.length > 0) {
            let requestFile: any = {
              b64: this.data.current.b64,
              id: this.data.current.id,
              extension: "png",
              table: "catalogo"
            };
            this.genericService.sendPostRequest(environment.loadFile, requestFile).subscribe((resp2: any) => {

              this.alertService.successAlert("Bien!", "Universidad actualizada exitosamente");
              this.parentDilogRef.close(false);
              this.loadingService.hide();

            }, (err: HttpErrorResponse) => {
              this.loadingService.hide();
            });
          } else {
            this.alertService.successAlert("Bien!", "Universidad actualizada exitosamente");
            this.parentDilogRef.close(false);
            this.loadingService.hide();
          }
        }, (err: HttpErrorResponse) => {
          this.loadingService.hide();
        });




      } else {
        let sqlTema = `UPDATE catalogo SET descripcion = '${this.data.current.descripcion}', nombre = '${this.data.current.nombre}' WHERE id = ${this.data.current.id}`;
        //console.log(sqlTema);

        this.sqlGenericService.excecuteQueryString(sqlTema).subscribe((resp: any) => {
          //Se registra correctamente nuevo usuario
          this.alertService.successAlert("Bien!", "Universidad actualizada exitosamente");
          this.parentDilogRef.close(false);
          this.loadingService.hide();
          //this.fcm.subscribeToTopic('myGymGlobal');//se suscribe a notificaciones globales de la app
          //this.listenNotifications();
        }, (err: HttpErrorResponse) => {
          this.loadingService.hide();
        });
      }
    }
  }

  editRol() {
    if (this.data.current.descripcion.length == 0 || this.data.current.nombre.length == 0) {
      this.alertService.warnAlert("Espera!", "Todos los campos son requeridos");
    } else {

      let sqlTema = `UPDATE catalogo SET descripcion = '${this.data.current.descripcion}', nombre = '${this.data.current.nombre}' WHERE id = ${this.data.current.id}`;
      //console.log(sqlTema);

      this.sqlGenericService.excecuteQueryString(sqlTema).subscribe((resp: any) => {
        //Se registra correctamente nuevo usuario
        this.alertService.successAlert("Bien!", "Rol actualizado exitosamente");
        this.parentDilogRef.close(false);
        this.loadingService.hide();
        //this.fcm.subscribeToTopic('myGymGlobal');//se suscribe a notificaciones globales de la app
        //this.listenNotifications();
      }, (err: HttpErrorResponse) => {
        this.loadingService.hide();
      });

    }
  }

  /**Combos */
  cargarUniversidades() {
    let sql: string = `SELECT id, descripcion as label FROM catalogo WHERE id_tipo_catalogo = 45 AND id_empresa = ${idEmpresa}`;

    this.sqlGenericService.excecuteQueryString(sql).subscribe((resp: any) => {
      //Se registra correctamente nuevo usuario
      this.temas = resp.parameters;
      this.temas.unshift({ id: null, label: "[--Selecciona--]" });
    }, (err: HttpErrorResponse) => {
      this.loadingService.hide();
    });
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  onDrop(ev, variable) {

    ev.preventDefault();

    if (this.s.files.length + this.s.elements.length > 5) {
      this.alertService.warnAlert("Espera!", "Máximo puedes almacenar 6 imágenes en esta sección");
    } else {
      if (ev.dataTransfer.items) {
        // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // Si los elementos arrastrados no son ficheros, rechazarlos
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile();
            //console.log(file);
            variable.filesInfo.push({
              lastModified: file.lastModified,
              lastModifiedDate: file.lastModifiedDate,
              name: file.name,
              size: file.size,
              type: file.type
            });

            variable.filesText.push({
              name: "",
              descripcion: ""
            });
            this.validateFile(file, variable, ev, true);
          }
        }
      } else {
        // Usar la interfaz DataTransfer para acceder a el/los archivos
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          //console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
      }
    }


  }

  onDragOver(event, s) {
    let id: any = document.getElementById(`drag-${s.id}`);
    //id.style.opacity = "0.7";

    event.stopPropagation();
    event.preventDefault();
  }

  onDropOver(event, s) {
    let id: any = document.getElementById(`drag-${s.id}`);
    id.style.opacity = "1";

    event.stopPropagation();
    event.preventDefault();
  }

  otherImg(evt: any, elemtn: any) {
    let file: any = evt.target.files[0];
    elemtn.fileTmp = file;
    if (file.size > 2000000) {
      this.alertService.warnAlert(
        "Ooops!",
        "Tu archivo debe ser de máximo 2MB de tamaño, Intenta nuevamente con otro archivo",
        () => {
          ////console.log("hola");
        }
      );
    } else if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg" &&
      file.type != "image/svg+xml"
    ) {
      this.alertService.warnAlert(
        "Ooops!",
        "Solo aceptamos archivos en formato png, jpg y svg",
        () => {
          ////console.log("hola");
        }
      );
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.type == "image/svg+xml") {
          let img: any = new Image();
          img.src = reader.result;

          img.onload = function () {
            let canvas: any = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let context: any = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            let png: any = canvas.toDataURL("image/png");
            //console.log(png);

            elemtn.b64 = png;
            elemtn.files = [];
            elemtn.files.push(
              {
                b64: png,
                b64Security: png
              }
            );
          };

        } else {
          elemtn.b64 = reader.result;
          elemtn.files = [];
          elemtn.files.push(
            {
              b64: reader.result,
              b64Security: reader.result
            }
          );
        }

      };
      reader.onerror = error => {
        ////console.log("Error: ", error);
      };
    }
  }

  fileChangeEvent(evt: any, variable: any) {
    //console.log(this.s);

    if (this.s.files.length + this.s.elements.length > 5) {
      this.alertService.warnAlert("Espera!", "Máximo puedes almacenar 6 imágenes en esta sección");
    } else {
      if (variable.files.length < variable.countFiles || variable.countFiles == -1) {
        let file: any = evt.target.files[0];
        variable.filesInfo.push({
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
          name: file.name,
          size: file.size,
          type: file.type,
          namer: "",
          descripcion: ""
        });
        this.validateFile(file, variable, evt);
      } else {
        this.alertService.warnAlert(
          "Ooops!",
          "Cantidad de archivos excedidos",
          () => {
            ////console.log("hola");
          }
        );
      }
    }

  }

  validateFile(file, variable: any, evt: any, fromDrop: boolean = false) {
    //console.log(file);

    if (file.size > 2000000) {
      this.alertService.warnAlert(
        "Ooops!",
        "Tu archivo debe ser de máximo 2MB de tamaño, Intenta nuevamente con otro archivo",
        () => {
          ////console.log("hola");
        }
      );
    } else if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg" &&
      file.type != "image/svg+xml"
    ) {
      this.alertService.warnAlert(
        "Ooops!",
        "Solo aceptamos archivos en formato png, jpg y svg",
        () => {
          ////console.log("hola");
        }
      );
    } else {
      this.getBase64(!fromDrop ? evt.target.files[0] : file, variable);
    }
  }

  getBase64(file, variable: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (file.type == "image/svg+xml") {
        let img: any = new Image();
        img.src = reader.result;

        img.onload = function () {
          let canvas: any = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          let context: any = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
          let png: any = canvas.toDataURL("image/png");
          //console.log(png);
          variable.files.push(
            {
              b64: png,
              b64Security: png
            }
          );
        };

      } else {
        variable.files.push(
          {
            b64: reader.result,
            b64Security: file.type == "image/svg+xml" ? this.domSanitizer.bypassSecurityTrustResourceUrl(String(reader.result)) : reader.result
          }
        );
      }

    };
    reader.onerror = error => {
      ////console.log("Error: ", error);
    };
  }

  getImageSecurity(i) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${environment.getImagenIndividual}${i}`);
  }

  upd(element: any) {
    //console.log(element);
    let fls: any = null;
    if (element.fileTmp) {
      fls = [];
      element.fileTmp.base64 = element.b64;
      fls.push(element.fileTmp);
    }

    let request = {
      files: fls,
      idEmpresa: idEmpresa,
      id: element.id,
      name: element.nombre,
      description: element.descripcion,
      multi: true,
      update: true,
      idAdjunto: element.id_archivo,
      tipo: "Inactive"
    };

    this.loadingService.show();
    this.genericService
      .sendPostRequest(environment.loadBlob, request)
      .subscribe(
        (response: any) => {
          ////console.log(response);
          //fileR.subido = true;
          this.loadingService.hide();
          element.id_archivo = response.parameters;
          delete element.fileTmp;
          delete element.b64;

          this.alertService.successAlert(
            "Bien!",
            `Hemos actualizado tu imagen`,
            () => {
              ////console.log("hola");
            }
          );
        },
        (error: HttpErrorResponse) => {
          this.loadingService.hide();
          this.alertService.errorAlert(
            "Ooops!",
            "Ha sucedido un error, intenta recargar nuevamente, si el error persiste contacta a un administrador",
            () => {
              ////console.log("hola");
            }
          );
        }
      );
  }

  deleteP(p, index){
    this.data.usuario.penalizaciones_json.splice(index, 1);
  }

  save(){
    let sql: string = `UPDATE usuario SET penalizaciones_json = '${JSON.stringify(this.data.usuario.penalizaciones_json)}' WHERE id = ${this.data.usuario.id}`;
    //console.log(sql);
    this.loadingService.show();
    this.sqlGenericService.excecuteQueryStringReference(sql, "updatePenalizacion").subscribe((resp: any) => {
      //Se registra correctamente nuevo usuario
      //console.log(resp);
      this.alertService.successAlert("Bien!", `Penalizaciones actualizadas para ${this.data.usuario.nombre} ${this.data.usuario.apellidos}`);
      this.parentDilogRef.close(false);
      this.loadingService.hide();
    }, (err: HttpErrorResponse) => {
      //console.log(err);

      this.loadingService.hide();
    });
  }
}
