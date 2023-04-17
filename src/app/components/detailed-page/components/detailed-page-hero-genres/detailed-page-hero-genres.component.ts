import { Component, Input } from '@angular/core';
import { Genre } from 'src/app/types/genre';

@Component({
  selector: 'mdb-detailed-page-hero-genres',
  templateUrl: './detailed-page-hero-genres.component.html',
  styleUrls: ['./detailed-page-hero-genres.component.scss'],
})
export class DetailedPageHeroGenresComponent {
  @Input() public title = 'Genres:';
  @Input() public genres?: Genre[];
}
