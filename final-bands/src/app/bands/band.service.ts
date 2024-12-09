import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Band } from './band.model'; 
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  private selectedBandSubject = new BehaviorSubject<Band | null>(null);
  selectedBand$ = this.selectedBandSubject.asObservable();

  bands: Band[] = [];
  bandListChangedEvent = new Subject<Band[]>();

  constructor() { }

  setSelectedBand(band: Band) {
    this.selectedBandSubject.next(band);
    // console.log(this.selectedBandSubject)
  }

  getBands() {
    axios.get('http://localhost:3000/bands')
    .then(response => {
      this.bands = response.data;
      this.bandListChangedEvent.next(this.bands.slice());
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }

  addNewBand(band: Band) {
    axios.post('http://localhost:3000/bands', band)
      .then(response => {
        // replace _id with actual _id in db
        band._id = response.data.band._id;
        this.bands.push(band);
        this.bandListChangedEvent.next(this.bands.slice());
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  }

  updateBand(updatedBand: Band) {
    axios.put(`http://localhost:3000/bands/${updatedBand._id}`, updatedBand)
    .then(response => {
      const pos = this.bands.findIndex((d) => d._id === updatedBand._id);
      if (pos < 0) {
        return;
      }
      this.bands[pos] = updatedBand;
  
      //this updates selected contact with new updates
      this.selectedBandSubject.next(this.bands[pos]);
      //this updates list of bands
      this.bandListChangedEvent.next(this.bands.slice());
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  }

  deleteBand(_id: String) {
    axios.delete(`http://localhost:3000/bands/${_id}`)
    .then(response => {
      const pos = this.bands.findIndex((d) => d._id === _id);
      if (pos < 0) {
        return;
      }
      this.bands.splice(pos, 1);
  
      //this updates selected contact with new updates
      this.selectedBandSubject.next(null);
      //this updates list of bands
      this.bandListChangedEvent.next(this.bands.slice());
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
  }
}
