import { Component, Input } from '@angular/core';
import { GroupedValues } from 'src/app/pipes/group-array-by/group-array-by.pipe';
import { KnownForAsCredits } from 'src/app/types/person';
import { FindFunc } from 'src/app/pipes/find/find.pipe';
import { FilterFunc } from 'src/app/pipes/filter/filter.pipe';
import { SortFunc } from 'src/app/pipes/sort/sort.pipe';
@Component({
  selector: 'mdb-detailed-page-roles',
  templateUrl: './detailed-page-roles.component.html',
  styleUrls: ['./detailed-page-roles.component.scss'],
})
export class DetailedPageRolesComponent {
  @Input() public title?: string;
  @Input() public rolesList: KnownForAsCredits[] = [];
  @Input() public mainKnownFor = '';

  public mainKnownForFindFunc(
    mainKnownFor: string
  ): FindFunc<GroupedValues<KnownForAsCredits>> {
    return (item: GroupedValues<KnownForAsCredits>) =>
      item.key === mainKnownFor;
  }

  public notMainKnownForFilterFunc(
    mainKnownFor: string
  ): FilterFunc<GroupedValues<KnownForAsCredits>> {
    return (item: GroupedValues<KnownForAsCredits>) =>
      item.key !== mainKnownFor;
  }

  public groupByAmountSortFunc: SortFunc<GroupedValues<KnownForAsCredits>> = (
    a,
    b
  ) => {
    return b.value.length - a.value.length;
  };

  public rolesByDateSortFunc: SortFunc<KnownForAsCredits> = (a, b) => {
    const aDate = new Date(a.releaseDate);
    const bDate = new Date(b.releaseDate);

    // move movies/tv-shows with empty string as date to the top, as on themoviedb
    return isNaN(aDate.getTime())
      ? -1
      : isNaN(bDate.getTime())
      ? 1
      : bDate.getTime() - aDate.getTime();
  };
}
