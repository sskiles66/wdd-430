import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Band } from './band.model'; // Import the Band interface

@Injectable({
  providedIn: 'root'
})
export class BandService {
  private selectedBandSubject = new BehaviorSubject<Band | null>(null);
  selectedBand$ = this.selectedBandSubject.asObservable();

  constructor() { }

  setSelectedBand(band: Band) {
    this.selectedBandSubject.next(band);
    // console.log(this.selectedBandSubject)
  }
}
