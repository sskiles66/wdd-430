import { Component, OnInit } from '@angular/core';
import { Band } from '../band.model';
import { BandService } from '../band.service';
import { NgForm } from '@angular/forms';


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
    // this.selectedBand = null;
    this.bandService.deleteBand(this.selectedBand.id);
  }

  onAddSubmit(form: NgForm) {
    let value = form.value;
    // Band is prepended to object when consoled logged, no issues for now
    let newBand = new Band(
      "5",
      value.name,
      value.genre,
      value.imageUrl
    );
    this.bandService.addNewBand(newBand);
  }

  onEditSubmit(form: NgForm) {
    let value = form.value;
    // Band is prepended to object when consoled logged, no issues for now
    let newBand = new Band(
      this.selectedBand.id,
      value.name,
      value.genre,
      value.imageUrl
    );
    this.bandService.updateBand(newBand);
  }
}
