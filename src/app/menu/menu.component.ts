import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {

  constructor(private router: Router) {}

  async playGame() {
    this.router.navigate(['/game']);
  }

  async goToRules() {
    this.router.navigate(['/rules']);
  }

}
