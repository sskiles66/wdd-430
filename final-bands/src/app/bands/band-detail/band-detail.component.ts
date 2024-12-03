import { Component, OnInit } from '@angular/core';
import { Band } from '../band.model';
import { BandService } from '../band.service';


@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrl: './band-detail.component.css'
})
export class BandDetailComponent implements OnInit{
  selectedBand: Band | null = null;
  mode: String = null;

  constructor(private bandService: BandService) {}

  ngOnInit() {
    this.bandService.selectedBand$.subscribe(band => {
      this.selectedBand = band;
      console.log('Selected band changed:', band);
      console.log('Selected band changed:', this.selectedBand);
    });
  }

  handleAddMode() {
    console.log("add mode")
    if (this.mode == "add"){
      this.mode = null;
    }else{
      this.mode = "add";
    }
  }

  handleEditMode() {
    console.log("edit mode")
    if (this.mode == "edit"){
      this.mode = null;
    }else{
      this.mode = "edit";
    }
  }

  handleDelete() {
    console.log("delete")
    this.selectedBand = null;
  }
}
