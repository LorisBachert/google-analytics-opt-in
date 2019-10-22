import {AfterViewInit, Component, ElementRef, Inject} from '@angular/core';
import {GoogleAnalyticsService} from './google-analytics.service';
import {ConfirmationPopupComponent} from './confirmation-popup/confirmation-popup.component';
import {MatBottomSheet} from '@angular/material';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  googleAnalyticsService: GoogleAnalyticsService;

  constructor(private bottomSheet: MatBottomSheet,
              googleAnalyticsService: GoogleAnalyticsService,
              @Inject(DOCUMENT) private doc, private elementRef: ElementRef) {
    this.googleAnalyticsService = googleAnalyticsService;
  }

  ngAfterViewInit(): void {
    this.openPopup(true);
    this.googleAnalyticsService.enabled.subscribe(enabled => {
      if (enabled) {
        this.addScript();
      }
    });
  }

  private addScript() {
    const script = this.createScript();
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-49802232-2';
    script.onload = () => {
      this.addExecutionScript();
    };
    this.elementRef.nativeElement.appendChild(script);
  }

  private addExecutionScript() {
    const script = this.createScript();
    script.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-49802232-2');
    `;
    this.elementRef.nativeElement.appendChild(script);
  }

  private createScript() {
    const script = this.doc.createElement('script');
    script.type = 'application/javascript';
    return script;
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
