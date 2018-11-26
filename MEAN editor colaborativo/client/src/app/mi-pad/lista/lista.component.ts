import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @Input() link: any;
  @Input() link2:any;
  @Input() ready:any;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
