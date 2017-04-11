import { Pipe, PipeTransform  } from "@angular/core";

@Pipe({
  name: "orderByDateTime"
})
export class OrderByPipe implements PipeTransform{
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.TimeOfSearch < b.TimeOfSearch) {
        return 1;
      } else if (a.TimeOfSearch > b.TimeOfSearch) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}