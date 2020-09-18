import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'keyValue',
})
export class EnumKeyValueListPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        const items: any[] = [];
     
        // tslint:disable-next-line:forin
        for (const key in value) {
            const isValueProperty = parseInt(key, 10) >= 0;
            // tslint:disable-next-line:curly
            if (!isValueProperty) continue;
            items.push({ key, value: value[key] });
        }
        return items;
    }
}
