import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Band } from './band.model'; // Import the Band interface

@Injectable({
  providedIn: 'root'
})
export class BandService {
  private selectedBandSubject = new BehaviorSubject<Band | null>(null);
  selectedBand$ = this.selectedBandSubject.asObservable();

  // bands: Band[] = [];
  bandListChangedEvent = new Subject<Band[]>();

  testBands: Band[] = [
    { 
      id: "1",
      bandTitle: "Linkin Park",
      genre: "Rock",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTqjNfKGHfTf_dfdq97zKaRapU0dfbYgZIw&s"
     },
     { 
      id: "2",
      bandTitle: "Linkin Park2",
      genre: "Rock",
      imageUrl: "ahhah"
     },
     { 
      id: "3",
      bandTitle: "Linkin Par3",
      genre: "Rock",
      imageUrl: "ahhah"
     },
     { 
      id: "4",
      bandTitle: "Sleep Token",
      genre: "Metal",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKrfJWnvfp5TVLcFwIeia-f9zWwYZe_9dipg&s"
     },
  ];

  constructor() { }

  setSelectedBand(band: Band) {
    this.selectedBandSubject.next(band);
    // console.log(this.selectedBandSubject)
  }

  getBands() {
    // simulate fetching
    setTimeout(() => {
      this.bandListChangedEvent.next(this.testBands.slice());
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  }

  addNewBand(band: Band) {
    this.testBands.push(band);
    this.bandListChangedEvent.next(this.testBands.slice());
  }

  updateBand(updatedBand: Band) {
    const pos = this.testBands.findIndex((d) => d.id === updatedBand.id);
    if (pos < 0) {
      return;
    }
    this.testBands[pos] = updatedBand;

    //this updates selected contact with new updates
    this.selectedBandSubject.next(this.testBands[pos]);
    //this updates list of bands
    this.bandListChangedEvent.next(this.testBands.slice());
  }

  deleteBand(id: String) {
    const pos = this.testBands.findIndex((d) => d.id === id);
    if (pos < 0) {
      return;
    }
    this.testBands.splice(pos, 1);

    //this updates selected contact with new updates
    this.selectedBandSubject.next(null);
    //this updates list of bands
    this.bandListChangedEvent.next(this.testBands.slice());
  }
}
