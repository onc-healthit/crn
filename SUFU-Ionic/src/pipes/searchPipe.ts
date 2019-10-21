import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class FilterByContacts implements PipeTransform {
  public transform(items: any[], searchText: any, isFrom?: any): any[] {
    if(!items) return [];
    if(!searchText) return items;
    // if(isFrom == 'currencyType') {
      return items.filter( it => {
        var searchedObject = it['id']+it['patientname'] + it['title']
        if(searchedObject.toLowerCase().includes(searchText.toLowerCase())) {
            return it;
        }
        // if(it.command && it.commandName) {
        //   return it.command.toLowerCase().includes(searchText.toLowerCase())
        //     || it.commandName.toLowerCase().includes(searchText.toLowerCase());
        // }
            
    });

  }

}
