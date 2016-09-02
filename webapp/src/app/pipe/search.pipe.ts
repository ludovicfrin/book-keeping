import { Pipe, PipeTransform } from '@angular/core';

/**
 * Search pipe
 * Use to make a filter search on the lists
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {

    /**
     * Filter application
     * 
     * @param items Items list
     * @param filters List of fields
     * @param search Search request
     */
    transform(items: any[], filters: string[], search: string): any {
        if (!search)
            return items;    

        let results: any[];        
        search = search.toLowerCase();
        
        for (let filter of filters) {
            results = items.filter(item => item[filter].toLowerCase().indexOf(search) != -1);
            let resultsSet = new Set(results);
            items =  items.filter(function(x) { return !resultsSet.has(x); });
        }
        return results;
    }
}
