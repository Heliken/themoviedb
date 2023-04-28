import { Pipe, PipeTransform } from '@angular/core';

export enum PaginationProgress {
  start = 'start',
  default = 'default',
  end = 'end',
}

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  private pagesToShow = 7; // amount of elements to show
  private paginationStart = 1;
  private edgePageThreshold = 3; // number that determines edge states of pagination current page

  // populate array of passed size starting with pased
  getFilledArray(start: number, size: number) {
    return [...Array(size).keys()].map(i => i + start);
  }

  getPaginationPattern(
    paginationProgress: PaginationProgress,
    current: number,
    total: number
  ) {
    switch (paginationProgress) {
      case PaginationProgress.start:
        return [
          this.paginationStart,
          ...this.getFilledArray(
            this.paginationStart + 1,
            this.edgePageThreshold + 1
          ),
          undefined,
          total,
        ];
      case PaginationProgress.end:
        return [
          this.paginationStart,
          undefined,
          ...this.getFilledArray(
            total - this.edgePageThreshold - 1,
            this.edgePageThreshold + 1
          ),
          total,
        ];
      default:
        return [
          this.paginationStart,
          undefined,
          ...this.getFilledArray(current - 1, this.edgePageThreshold),
          undefined,
          total,
        ];
    }
  }

  transform(
    totalPages: number,
    currentPage: number
  ): Array<number | undefined> {
    const startEdgePage = this.pagesToShow - this.edgePageThreshold;
    const endEdgePage = totalPages - this.edgePageThreshold;

    // low amount of pages
    if (totalPages <= this.pagesToShow) {
      return this.getFilledArray(1, totalPages);
    }

    // active at the start of pagination
    if (currentPage <= startEdgePage) {
      return this.getPaginationPattern(
        PaginationProgress.start,
        currentPage,
        totalPages
      );
    }

    // active at the end of pagination
    if (currentPage >= endEdgePage) {
      return this.getPaginationPattern(
        PaginationProgress.end,
        currentPage,
        totalPages
      );
    }

    // active in the middle of pagination
    return this.getPaginationPattern(
      PaginationProgress.default,
      currentPage,
      totalPages
    );
  }
}
