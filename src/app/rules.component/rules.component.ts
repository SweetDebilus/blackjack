import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules.component',
  imports: [],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {

  constructor(private router: Router) {}

  async goBack() {
    this.router.navigate(['/menu']);
  }

  async playGame() {
    this.router.navigate(['/game']);
  }

}
