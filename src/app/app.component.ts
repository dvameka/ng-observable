import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-observable';
  private results = [];
  
  searchForm  = new FormGroup(
    {
      term: new FormControl(''),
    }
  );

  constructor(private http: HttpClient) {}

  ngOnInit(){
    const termField = this.searchForm.get('term');
    let debounce = termField.valueChanges.pipe(
      debounceTime(1000), // delay 1000 msec
      distinctUntilChanged() // only for changed value
    );
    debounce.subscribe(changes => {
      console.log(changes);
      this.http.get(`https://swapi.co/api/people/?search=${changes}`)
      .subscribe((data: any) => {
        console.log(data);
        this.results = data.results;
      })
      
    });
  }
  
}
