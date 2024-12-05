import { Component, OnInit } from '@angular/core';
import { Band } from '../band.model';
import { BandService } from '../band.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent implements OnInit {
  testBands: Band[] = [];

  subscription: Subscription;

  constructor(private bandService: BandService) {}

  ngOnInit(): void {
    this.bandService.getBands();
    this.subscription = this.bandService.bandListChangedEvent.subscribe((bandList: Band[]) => {
      console.log(bandList)
      this.testBands = bandList;
    })
  }

  selectBand(band: Band) {
    this.bandService.setSelectedBand(band);
  }
}
