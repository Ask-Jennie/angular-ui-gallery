import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, Observer } from 'rxjs';

declare var XLSX;
@Injectable({
  providedIn: 'root'
})
export class UploadexcelService {

  constructor() { }

  parseExcel(file) {
    let obs = new Observable(
      (observer: Observer<Object>) => {
        var tables = [];
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          let sheet = workbook.SheetNames[0];
          var jsonObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); 
          for(let i=0; i<jsonObject.length; i++) {
            jsonObject[i]["uploaded"] = false;
          }
          observer.next(jsonObject);
          observer.complete();
        };
        reader.onerror = function(ex) {
          console.log(ex);
          observer.error(ex);
        };

        reader.readAsBinaryString(file);
      }
    );

    return obs;
  }
}
