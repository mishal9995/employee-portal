import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // first argument should be the item which have to be transformed
  // second argument is the value which is used to transform the item
  transform(allEmployee:any[], searchKey:string): any[] {
    const result:any = []

    if(!allEmployee || searchKey===""){
      return allEmployee
    }
    allEmployee.forEach((item:any)=>{
      // include returns boolean value 
      if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item);
      }
    })
    return result;
  }

}


