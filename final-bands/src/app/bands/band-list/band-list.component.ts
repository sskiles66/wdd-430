import { Component } from '@angular/core';
import { Band } from '../band.model';
import { BandService } from '../band.service';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.css'
})
export class BandListComponent {
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

  constructor(private bandService: BandService) {}

  selectBand(band: Band) {
    this.bandService.setSelectedBand(band);
  }
}
