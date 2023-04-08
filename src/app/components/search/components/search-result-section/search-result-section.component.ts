import { Component, Input } from '@angular/core';
import { SearchResponseSection } from '../../types/search-response';

@Component({
  selector: 'mdb-search-result-section',
  templateUrl: './search-result-section.component.html',
  styleUrls: ['./search-result-section.component.scss'],
})
export class SearchResultSectionComponent {
  @Input() public searchResultSection?: SearchResponseSection;
}
