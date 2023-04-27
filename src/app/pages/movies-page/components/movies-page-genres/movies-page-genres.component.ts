import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MoviesPageApiService } from '../../movies-page-api.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import {
  GenresFormControl,
  GenresQueryParam,
} from '../../../../types/ui-types/genres-form-control';

@Component({
  selector: 'mdb-movies-page-genres',
  templateUrl: './movies-page-genres.component.html',
  styleUrls: ['./movies-page-genres.component.scss'],
})
export class MoviesPageGenresComponent implements OnInit, OnDestroy {
  constructor(private moviesApiService: MoviesPageApiService) {}

  @Input() public genresFormControl?: GenresFormControl;
  @Output() public genresChanged = new EventEmitter<GenresQueryParam>();

  public selectionDebounceTime = 400;
  public genres$ = this.moviesApiService.requestGenres();

  public genresFormControlSubscription?: Subscription;

  public selectedGenres$ = new Subject<number[]>();

  public ngOnInit(): void {
    this.genresFormControlSubscription = this.genresFormControl?.valueChanges
      .pipe(debounceTime(this.selectionDebounceTime))
      .subscribe(val => {
        this.genresChanged.emit(val);
      });
  }

  public toggleGenre(id: number) {
    if (this.genresFormControl) {
      const currentActiveGenres = this.genresFormControl.value;

      if (currentActiveGenres) {
        const valuesSet = new Set(currentActiveGenres);

        valuesSet.has(id) ? valuesSet.delete(id) : valuesSet.add(id);

        this.genresFormControl.setValue(Array.from(valuesSet));
      } else {
        this.genresFormControl.setValue([id]);
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.genresFormControlSubscription) {
      this.genresFormControlSubscription.unsubscribe();
    }
  }
}
