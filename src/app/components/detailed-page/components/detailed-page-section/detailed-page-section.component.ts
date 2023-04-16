import { Component, Input } from '@angular/core';
import { MediaItem } from 'src/app/types/media-item';

@Component({
  selector: 'mdb-detailed-page-section',
  templateUrl: './detailed-page-section.component.html',
  styleUrls: ['./detailed-page-section.component.scss'],
})
export class DetailedPageSectionComponent {
  @Input() public title = '';
  @Input() public gridData?: MediaItem[];
}
