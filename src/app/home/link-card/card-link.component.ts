import { Component, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'card-link',
  template: `<a [href]="href">
  <div class="link-card ripple">
   <img [src]="imgSrc" [alt]="imgAlt">
  </div>

</a>` ,
  styleUrls: ['./card-link.component.scss']
})
export class LinkCardComponent implements OnInit {
  @Input() href!: string;
  @Input() imgSrc!: string;
  @Input() imgAlt!: string;
  constructor(  ) { }

  ngOnInit(): void {
    
  }

 

}
