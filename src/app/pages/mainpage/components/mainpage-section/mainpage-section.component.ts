import { Component, Input } from '@angular/core';
import { MainpageSection } from '../../types/mainpage-section';

@Component({
  selector: 'mdb-mainpage-section',
  templateUrl: './mainpage-section.component.html',
  styleUrls: ['./mainpage-section.component.scss'],
})
export class MainpageSectionComponent {
  @Input() public section?: MainpageSection;
}
