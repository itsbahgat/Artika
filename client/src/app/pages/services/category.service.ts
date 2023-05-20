import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private readonly BASE_URL = `${environment.baseUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/`);
  }
}
