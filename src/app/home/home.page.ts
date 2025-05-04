import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonLabel,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { SpeechService } from '../speech.service';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,             
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonLabel,
    IonItem,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,         
    TranslateModule
  ]
})
export class HomePage {
  targetLang = 'es'; 
  translatedText = ''; 

  constructor(
    private speechService: SpeechService,
    private translationService: TranslationService
  ) {}

  async startTranslation() {
    try {
      const spokenText = await this.speechService.startListening();
      console.log('Spoken Text:', spokenText); 
      this.translationService.translate(spokenText, this.targetLang)
        .subscribe({
          next: (res) => {
            console.log('Translation Result:', res); 
            this.translatedText = res.translatedText || res.data?.translations?.[0]?.translatedText || '';
          },
          error: (err) => {
            console.error('Translation error:', err); 
          }
        });
    } catch (error) {
      console.error('Speech Error:', error); 
    }
  }
}
