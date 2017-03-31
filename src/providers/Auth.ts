import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  public url : any;
  public password :any ;
  public username : any ;

  constructor(public http: Http, public storage: Storage) {
    this.url =  "http://192.168.1.21/bus_travel_api/connexion";
  }

  checkAuthentication(){

       this.storage.get('username').then((value) => {
          this.username = value ;
       });
       this.storage.get('password').then((value) => {
          this.password = value ;
       });

      let credentials = {
          username: this.username,
          password: this.password
      };
      console.log (credentials);
      return this.login(credentials);
  }

  login(credentials){

    return new Promise((resolve, reject)=>{

        console.log (credentials);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.url, JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();

            this.username = data.username;
            this.password = data.password;

            this.storage.set('username', data.username);
            this.storage.set('password', data.password);
            this.storage.set('ligne' ,   data.ligne);
            this.storage.set('id_bus' ,  data.id_bus);
            this.storage.set('entreprise' , data.entreprise);

            resolve(data);
            resolve(res.json());
          }, (err) => {  reject(err);  });
    });
  }

  logout(){

    this.storage.set('username', '');

  }

}
