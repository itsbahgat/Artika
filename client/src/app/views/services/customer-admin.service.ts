import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerAdminService {

  constructor(private http: HttpClient) {



  }
  gettAllCutomers() {
    return this.http.get('http://localhost:3005/all')
  }

  deleteCustomerById(id:any) {
    return this.http.delete('http://localhost:3005/all/' + id);
  }


}
