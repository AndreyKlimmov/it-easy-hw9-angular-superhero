import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-header',
  templateUrl: './button-header.component.html',
  styleUrls: ['./button-header.component.scss']
})
export class ButtonHeaderComponent implements OnInit {
  @Input() buttonText = '';
  @Input() buttonClass = '';

  constructor() { }

  ngOnInit(): void {
  }

}
