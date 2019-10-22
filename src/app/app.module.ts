import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {ConfirmationPopupComponent} from './confirmation-popup/confirmation-popup.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule, MatCheckboxModule, MatListModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationPopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationPopupComponent
  ]
})
export class AppModule {
}
