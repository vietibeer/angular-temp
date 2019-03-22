import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router"


@Component({
  selector: 'app-imagecard',
  templateUrl: './imagecard.component.html',
  styleUrls: ['./imagecard.component.css']
})
export class ImagecardComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @Input() desc: string;
  @Input() footerTitle: string;
  @Input() position: string;
  @Input() image: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goDetail(id) {
    this.router.navigate(['/dashboard/rental/detail', id]);
  }
}
