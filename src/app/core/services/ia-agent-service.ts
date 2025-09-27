import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IaAgentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/csrf/', { withCredentials: true });
  }

  sendMessage(message: string): Observable<any> {
    return this.http.post<string>( this.apiUrl + 'chat', { user_message: message}, { withCredentials: true });
  }
}
