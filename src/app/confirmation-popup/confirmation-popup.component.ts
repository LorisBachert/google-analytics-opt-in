import {Component, OnInit} from '@angular/core';
import {GoogleAnalyticsService} from '../google-analytics.service';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  intiallyEnabled: boolean;

  enabled: boolean;

  neverAskAgain: boolean;

  constructor(private sheetRef: MatBottomSheetRef<ConfirmationPopupComponent>,
              private googleAnalyticsService: GoogleAnalyticsService) {
    this.enabled = googleAnalyticsService.enabled.getValue();
    this.intiallyEnabled = googleAnalyticsService.enabled.getValue();
    this.neverAskAgain = googleAnalyticsService.neverAskAgain.getValue();
  }

  ngOnInit() {
  }

  accept() {
    this.googleAnalyticsService.setEnabled(this.enabled, this.neverAskAgain);
    this.sheetRef.dismiss(this.enabled);
    if (! this.enabled && this.intiallyEnabled) {
      window.location.reload();
    }
  }
}
