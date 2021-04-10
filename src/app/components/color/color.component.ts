import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  filterText: string;
  constructor(private colorService: ColorService,  private router: Router,) {}

  ngOnInit(): void {
    this.getColors();
  }

  goToDetail(colorId: number) {
    this.router.navigate(['./colordetail', colorId]);
  }

  goToAdd(){
    this.router.navigate(['./coloradd']);
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
