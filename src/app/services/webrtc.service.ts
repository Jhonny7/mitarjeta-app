import { Injectable } from "@angular/core";
import Peer from 'peerjs';
@Injectable({
    providedIn: "root"
})
export class WebRTCProvider {
    stun: string = 'stuthis.n.l.google.com:19302';
    peer: Peer;

    myStream: MediaStream;
    myEl: HTMLMediaElement;
    partnerEl: HTMLMediaElement;

    stunServer: RTCIceServer = {
        urls: 'stun:' + this.stun,
    };
    mediaConnection: any;
    options: any;
    n: any;

    constructor() {
       //console.log(navigator);
        this.n = <any>navigator;
        this.n.getUserMedia = this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia;
        this.options = {
            key: 'cd1ft79ro8g833di',
            debug: 3
        }
        let p: any = Peer;
    }

    getMedia(myEl: HTMLMediaElement) {
        this.n.getUserMedia({ audio: true, video: true }, (stream) => {
           //console.log(stream);
            
            this.myStream = stream;
            this.myEl = myEl;
            myEl.srcObject = this.myStream;
        }, (error) => {
            console.error('[getMedia] cannot get user media');
        });
    }

    init(userId: string, myEl: HTMLMediaElement) {
        this.getMedia(myEl);
        this.createPeer(userId);
    }

    createPeer(userId: string) {
        this.peer = new Peer(userId);
       //console.log(this.peer);
        
        this.peer.on('open', () => {
           //console.log("------------open..............");
            
            this.wait();
        });
    }

    call(partnerId: string) {
        this.mediaConnection = this.peer.call(partnerId, this.myStream);
    }

    wait() {
        this.peer.on('call', (call) => {
           //console.log(call);
            
            call.on('stream', (stream) => {
               //console.log(stream);
                
                this.partnerEl.src = URL.createObjectURL(stream);
            });
        });
    }
}