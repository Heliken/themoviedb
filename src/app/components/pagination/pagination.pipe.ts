import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  private pagesToShow = 7;

  getFilledArray(start: number, size: number) {
    return [...Array(size).keys()].map(i => i + start);
  }

  transform(
    totalPages: number,
    currentPage: number
  ): Array<number | undefined> {
    if (totalPages <= this.pagesToShow) {
      return this.getFilledArray(1, totalPages);
    }

    if (currentPage <= this.pagesToShow - 4) {
      return [1, ...this.getFilledArray(2, 4), undefined, totalPages];
    }

    if (currentPage > totalPages - 4) {
      return [
        1,
        undefined,
        ...this.getFilledArray(totalPages - 4, 4),
        totalPages,
      ];
    }

    return [
      1,
      undefined,
      ...this.getFilledArray(currentPage - 1, 3),
      undefined,
      totalPages,
    ];
  }
}
