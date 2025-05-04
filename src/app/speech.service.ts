import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  constructor(
    private speechRecognition: SpeechRecognition,
    private platform: Platform
  ) {}

  startListening(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const isWeb = !this.platform.is('cordova');

      if (isWeb && 'webkitSpeechRecognition' in window) {
        const SpeechRecognitionClass = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognitionClass();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          resolve(transcript);
        };

        recognition.onerror = (event: any) => reject(event.error);
        recognition.onnomatch = () => reject('No match found');
        recognition.start();
      }

      else if (this.platform.is('cordova')) {
        try {
          const hasPermission = await this.speechRecognition.hasPermission();
          if (!hasPermission) {
            await this.speechRecognition.requestPermission();
          }

          this.speechRecognition.startListening().subscribe(
            (matches: string[]) => resolve(matches[0]),
            (error) => reject(error)
          );
        } catch (err) {
          reject(err);
        }
      }

      else {
        reject('Speech recognition not supported on this platform.');
      }
    });
  }
}
