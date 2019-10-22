import {AfterViewInit, Component} from '@angular/core';
import {GoogleAnalyticsService} from './google-analytics.service';
import {ConfirmationPopupComponent} from './confirmation-popup/confirmation-popup.component';
import {MatBottomSheet} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  googleAnalyticsService: GoogleAnalyticsService;

  constructor(private bottomSheet: MatBottomSheet,
              googleAnalyticsService: GoogleAnalyticsService) {
    this.googleAnalyticsService = googleAnalyticsService;
  }

  ngAfterViewInit(): void {
    this.openPopup(true);
  }

  refresh() {
    window.location.reload();
  }

  openPopup(initial?: boolean) {
    if (! initial || ! this.googleAnalyticsService.neverAskAgain.getValue()) {
      this.bottomSheet.open(ConfirmationPopupComponent);
    }
  }
}
