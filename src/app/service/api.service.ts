import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  signup(data: any) {
    return this.http.post(`${environment.url}/useManagement/signup`, data);
  }
  login(data: any) {
    return this.http.post(`${environment.url}/useManagement/loginUser`, data);
  }
  getProviderId(id: any) {
    return this.http.get(`${environment.url}/provider/getProviderId/${id}`);
  }
  createProvider(data: any) {
    return this.http.post(`${environment.url}/provider/createProvider`, {
      data,
    });
  }
  getAllProvider(id: any) {
    return this.http.get(`${environment.url}/provider/getAllProvider/${id}`);
  }

  getAllProviderById(id: any) {
    return this.http.get(
      `${environment.url}/provider/getAllProviderbyId/${id}`
    );
  }
  addMilkData(data: any) {
    return this.http.post(`${environment.url}/milk-collect/collectMilk`, {
      data,
    });
  }
  getCollectList(data: any) {
    return this.http.post(`${environment.url}/milk-collect/getCollectList`, {
      data,
    });
  }

  getMilkLitter(data: any) {
    return this.http.post(`${environment.url}/milk-collect/getMilkLitter`, {
      data,
    });
  }
  searchFunction(userId: any, searchTerm: string) {
    console.log(searchTerm, 'search term');
    return this.http.get(`${environment.url}/provider/searchProvider`, {
      params: { userId, search: searchTerm },
    });
  }
  sendSms(to: any, body: any) {
    return this.http.post(`${environment.url}/milk-collect/send`, {
      to,
      body,
    });
  }
}
