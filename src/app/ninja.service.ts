import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

import { Ninja } from './ninja';


@Injectable()
export class NinjaService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http:Http) { }
  
  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept','application/json');
    return headers;
  }

  getAll():Observable<Ninja[]>{
    
    console.log("Inside getAll method");
    // console.log(this.http.get('http://localhost:8080/ninjas',{headers:this.getHeaders()}).toPromise);
    // console.log(this.http.get('${this.baseUrl}/ninjas',{headers:this.getHeaders()}).map(this.extractData));
    //'http://localhost:8080/ninjas'
      return this.http.get(this.baseUrl+'/ninjas',{headers:this.getHeaders()})
      .map((res: Response) => {
        return res.json() as Ninja[];
      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body;

    try { 
      body = res.json().data;
    } catch(e) {
      body = res.json() || {};
    }
  }

  private mapNinjas(response:Response) : Ninja[]{

    console.log("Inside mapNinjas function");
    return response.json().results.map(this.toNinja);

}

private  toNinja(r:any) : Ninja{

   console.log("Inside toNinja function");
   let ninja = <Ninja>({
     name: r.name,
     belt: r.belt,
   });

   return ninja;
}

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

//function mapNinjas(response:Response) : Ninja[]{

 //   console.log("Inside mapNinjas function");
 //   return response.json().results.map(toNinja);

//}

//function toNinja(r:any) : Ninja{

  // console.log("Inside toNinja function");
   //let ninja = <Ninja>({
    // name: r.name,
     //belt: r.belt,
   //});

   //return ninja;
//}
