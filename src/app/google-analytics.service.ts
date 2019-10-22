import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatBottomSheet} from '@angular/material';
import {ConfirmationPopupComponent} from './confirmation-popup/confirmation-popup.component';

export const GOOGLE_ANALYTICS_ENABLED = 'GOOGLE_ANALYTICS_ENABLED';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  public readonly enabled = new BehaviorSubject<boolean>(false);

  public readonly neverAskAgain = new BehaviorSubject<boolean>(false);

  constructor() {
    const existingSetting = localStorage.getItem(GOOGLE_ANALYTICS_ENABLED);
    if (existingSetting) {
      this.neverAskAgain.next(true);
      this.enabled.next(Boolean(existingSetting));
    }
    this.neverAskAgain.subscribe(neverAskAgain => {
      if (neverAskAgain) {
        localStorage.setItem(GOOGLE_ANALYTICS_ENABLED, String(this.enabled.getValue()));
      } else {
        localStorage.removeItem(GOOGLE_ANALYTICS_ENABLED);
      }
    });
  }

  setEnabled(enabled: boolean, neverAskAgain: boolean) {
    this.enabled.next(enabled);
    this.neverAskAgain.next(neverAskAgain);
  }
}
