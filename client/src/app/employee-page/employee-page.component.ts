import { Component, Input, OnInit } from '@angular/core';

import { EmployeeComponent } from '../employee/employee.component'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {

  @Input() pk: number

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.pk = params['pk']
        })
  }

}
