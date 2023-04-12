import { Component, Input } from '@angular/core';
import { MediaItem } from 'src/app/types/media-item';

@Component({
  selector: 'mdb-search-result-section',
  templateUrl: './search-result-section.component.html',
  styleUrls: ['./search-result-section.component.scss'],
})
export class SearchResultSectionComponent {
  @Input() public results?: MediaItem[];
  @Input() public title = '';
}
