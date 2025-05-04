import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private apiKey = 'AIzaSyAWR74a8UA2wWf8_WCIoFv_V_PtNqtge0w';
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  translate(text: string, targetLang: string): Observable<any> {
    const body = {
      q: text,
      target: targetLang,
      format: 'text'
    };

    const url = `${this.apiUrl}?key=${this.apiKey}`;

    return this.http.post(url, body);
  }
}
