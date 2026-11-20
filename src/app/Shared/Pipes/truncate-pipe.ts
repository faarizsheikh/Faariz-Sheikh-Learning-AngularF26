// TRUNCATE PIPE (truncate-pipe.ts):

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: unknown, maxLength = 160): string {
    if (typeof value !== 'string' || value.length === 0) {
      return '';
    }

    // Calculate max num of character length allowed.
    const limit =
      Number.isFinite(maxLength) && maxLength > 0 ? Math.max(1, Math.floor(maxLength)) : 160; // Checks if num is finite & greater than zero.

    if (value.length <= limit) {
      return value;
    }

    // Truncate based on limit num (defaulted to 60 as set above; otherwise uses given value where pipe used)
    return `${value.slice(0, limit).trimEnd()}…`; // Removes spaces before the ellipses.
  }
}
