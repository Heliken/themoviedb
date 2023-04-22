import { Component, Input } from '@angular/core';
import { GridMediaItem } from 'src/app/types/ui-types/grid-media-item';

@Component({
  selector: 'mdb-detailed-page-hero-known-for',
  templateUrl: './detailed-page-hero-known-for.component.html',
  styleUrls: ['./detailed-page-hero-known-for.component.scss'],
})
export class DetailedPageHeroKnownForComponent {
  @Input() public title = 'Known for:';
  @Input() public knownForList: GridMediaItem[] = [];
}
