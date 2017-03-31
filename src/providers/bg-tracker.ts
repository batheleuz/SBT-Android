import { Injectable, NgZone } from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/filter';
import { Auth } from './Auth';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';


@Injectable()
export class BgTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public vit: number = 0;
  public idBus:number ;
  public ligne:any ;
  public entreprise:any ;

  constructor( public zone: NgZone , public http: Http) { }

  sendToServer( values ){

    return new Promise((resolve, reject)=>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url =  "http://192.168.1.21/bus_travel_api/setPosition";

        this.http.post(url, JSON.stringify(values), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            console.log(data) ;
            resolve(data);
            resolve(res.json());
          }, (err) => {  reject(err);  });

    });

  }

  startTracking() {
      let config = {
       desiredAccuracy: 0,
       stationaryRadius: 20,
       distanceFilter: 10,
       debug: true,
       interval: 2000
      };

      BackgroundGeolocation.configure((location) => {

       // console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
       // let busPosition ={ latitude: this.lat, longitude: this.lng , vitesse : this.vit }
       // this.sendToServer(position);
       // Run update inside of Angular's zone
       this.zone.run(() => {
         this.lat = location.latitude;
         this.lng = location.longitude;
         this.vit = location.speed;
       });

      }, (err) => {

       console.log(err);

      }, config);

      // Turn ON the background-geolocation system.
      BackgroundGeolocation.start();

      // Foreground Tracking

      let options = {
       frequency: 30000,
       enableHighAccuracy: true
      };

      this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

       this.zone.run(() => {

         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
         this.vit = position.coords.speed;

         let busPosition ={
           latitude: this.lat,
           longitude: this.lng,
           vitesse: this.vit ,
           idBus: this.idBus,
           ligne : this.ligne,
           entreprise : this.entreprise
         }

         this.sendToServer(busPosition);

         console.log(busPosition);
       });

      });
  }

  stopTracking() {

    console.log('stopTracking');

    BackgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

}
