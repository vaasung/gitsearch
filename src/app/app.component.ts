import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private Meta:Meta ){}
  ngOnInit() {
    this.Meta.addTag({ name: 'Hello', content: 'Where r u?' });    
  }

  
}
