import { Component, Input } from '@angular/core';
import { Band } from '../band.model';


@Component({
  selector: 'app-band-item',
  templateUrl: './band-item.component.html',
  styleUrl: './band-item.component.css'
})
export class BandItemComponent {
  @Input() band: Band;
}
