import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BandListComponent } from './bands/band-list/band-list.component';
import { BandItemComponent } from './bands/band-item/band-item.component';
import { BandDetailComponent } from './bands/band-detail/band-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BandListComponent,
    BandItemComponent,
    BandDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
