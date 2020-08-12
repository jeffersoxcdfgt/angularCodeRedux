import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-log-user',
  template: `
    <router-outlet></router-outlet>`,
  styleUrls: ['./log-user.component.sass']
})
export class LogUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
