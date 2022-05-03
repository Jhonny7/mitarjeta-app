import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet'
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit {
  public dataAdicional: any = {
    lat: 19.1986,
    long: -103.7583,
  }
  map: any;
  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cargaMapa();
    }, 1000);
  }
  cargaMapa() {
    //this.loadingService.show();
   //console.log("Se inicia la carga de mapa");
    var greenIcon = leaflet.icon({ iconUrl: 'assets/css/images/marker-icon-2x.png' })
    if (!this.dataAdicional.lat || this.dataAdicional.lat.length <= 0) {
      this.dataAdicional.lat = 22.28519;
      this.dataAdicional.long = -97.87777;

    }
    this.map = leaflet.map('map').setView([this.dataAdicional.lat, this.dataAdicional.long], 15);

    let a: any = document.getElementsByClassName("leaflet-control-attribution");
    setTimeout(() => {
      a[0].children[0].style.display = "none";
    }, 500);
    // set map tiles source

    let osmLayer = new leaflet.TileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {

      maxZoom: 19,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Mapa de Connectandem &copy; <a href="https://www.google.com/">Connectandem</a>',
    });

    this.map.addLayer(osmLayer);

    // add marker to the map
    let marker = leaflet.marker([this.dataAdicional.lat, this.dataAdicional.long], { draggable: true, icon: greenIcon }).addTo(this.map);
    marker.on('drag', function (e) {
     //console.log('marker drag event');
    });
    marker.on('dragstart', function (e) {
    });
    marker.on('dragend', (e) => {
      var marker = e.target;
      var position = marker.getLatLng();
      this.dataAdicional.lat = position.lat;
      this.dataAdicional.long = position.lng;
     //console.log(position);
      marker.setLatLng(position, { draggable: 'true' }).bindPopup(position).update();
    });

    this.loadingService.hide();
  }
}
