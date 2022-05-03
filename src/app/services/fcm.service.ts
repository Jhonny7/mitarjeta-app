import { AlertService } from './alert.service';
import { emulado } from './../../environments/environment.prod';
import { LocalStorageEncryptService } from './local-storage-encrypt.service';
import { LoaderService } from './loading-service';
import { SqlGenericService } from './sqlGenericService';
import { Injectable } from '@angular/core';
import {
    Plugins,
} from '@capacitor/core';

import { Router } from '@angular/router';

import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
    PushNotificationToken,
    PushNotification,
} from '@capacitor/push-notifications';

import { HttpErrorResponse } from '@angular/common/http';

import { FCM } from '@capacitor-community/fcm';
import { Device } from '@capacitor/device';

export interface FCMJson {
    to: string;
    notification: FCMNotification;
    data: FCMData;
    priority: string;
}

export interface FCMNotification {
    body: string;
    title: string;
    click_action: string;
    image: string;
    color: string;
    "content-available": boolean;
}

export interface FCMData {
    body: string;
    title: string;
    view: number;
    otherData?: any;
}
@Injectable({
    providedIn: 'root'
})
export class FcmService {

    constructor(
        private router: Router,
        private sqlGenericService: SqlGenericService,
        private loadingService: LoaderService,
        private localStorageEncryptService: LocalStorageEncryptService,
        private alertService: AlertService
    ) { }

    initPush() {
        //console.log("init pushes");

        /*  if (!emulado) {
             this.registerPush();
         } */
    }

    private async registerPush() {
        await PushNotifications.requestPermissions();


        await PushNotifications.register().then((t: any) => {
            //console.log("register tokokok");
            //console.log(t);

            FCM.getToken()
                .then((r) => {
                    //console.log("***TOKEN***");
                    //console.log(r.token);
                    FCM.subscribeTo({ topic: 'connecTandem' });
                    /** */
                })
                .catch((err) => {
                    //console.log(err)
                });
        });

        const info = await Device.getId();

        PushNotifications.addListener('registration', (data) => {
            // alert(JSON.stringify(data));
            //console.log("Disque register");

            //console.log(data);

            let token: any = this.localStorageEncryptService.getFromLocalStorage("token-ConecTandem");
            if (!token) {
                let token: string = data.value;

                //Se registra correctamente nuevo usuario
                this.loadingService.hide();
                this.localStorageEncryptService.setToLocalStorage("token-ConecTandem", token);
                FCM.subscribeTo({ topic: 'connecTandem' });//se suscribe a notificaciones globales de la app
            }
            //PushNotifications.


        });

        this.listenNotifications();

        // Get FCM token instead the APN one returned by Capacitor


        PushNotifications.addListener('registrationError', (error: any) => {
            //console.log('Error: ' + JSON.stringify(error));
        });

        //this.listenNotifications();


    }


    public listenNotifications() {
        /* PushNotifications.addListener(
            'pushNotificationReceived',
            async (notification: PushNotificationSchema) => {
               //console.log('Push received: ' + JSON.stringify(notification));
            }
        ); */

        PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotificationSchema) => {
                //console.log('notification ' + JSON.stringify(notification));
                //console.log(notification);
                this.alertService.successAlert(notification.title, notification.body);
            }
        );
        PushNotifications.requestPermissions().then((response) => {
            //console.log(`reeeee`);
            //console.log(response);

            PushNotifications.register().then((res: any) => {
                //console.log(`registered for push`);
                //console.log(res);

            })
        }

        );


        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            async (notification: ActionPerformed) => {
                const data = notification.notification.data;
                //console.log('Action performed: ' + JSON.stringify(notification.notification));

                switch (notification?.notification?.data?.view) {
                    case 1:
                        //hay que abrir la reunion que empieza
                        this.router.navigate(["meet", notification?.notification?.data?.otherData?.reunion]);
                        break;

                    default:
                        break;
                }
                if (data.detailsId) {
                    //this.router.navigateByUrl(`/home/${data.detailsId}`);
                }
            }
        );
    }

    public updateTokenUser() {
        let user: any = this.localStorageEncryptService.getFromLocalStorage("userSessionConnectandem");
        let token: any = this.localStorageEncryptService.getFromLocalStorage("token-ConecTandem");

        let tz: any = Intl.DateTimeFormat().resolvedOptions();

        let sqlUpdate: string = `UPDATE usuario SET token = '${token}', last_session = now(), tz = '${tz.timeZone}' WHERE id = ${user.id}`;

        if (user) {
            this.sqlGenericService.excecuteQueryStringReference(sqlUpdate, "updateUserToken").subscribe((response: any) => {
                this.registerPush();
            }, (error: HttpErrorResponse) => {

            });
        }
    }

    subscribeTo(topic: string) {
        PushNotifications.register()
            .then((_) => {
                FCM.subscribeTo({ topic: topic })
                    .then((r) => {
                        alert(`subscribed to topic topic`);
                    })
                    .catch((err) => {

                    });
            })
            .catch((err) => alert(JSON.stringify(err)));
    }
}