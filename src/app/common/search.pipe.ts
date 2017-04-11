import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "search"
})
export class SearchPipe implements PipeTransform {
    transform(value:any, searchBy:any) {
        if (searchBy == null) {
            return value;
        }
        return value.filter((item:any) => {
            return item.Title.toLowerCase().includes(searchBy.toLowerCase()) || item.Year.includes(searchBy.toLowerCase());
        });
    }
}