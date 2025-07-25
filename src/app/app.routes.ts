import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game.component/game.component';
import { RulesComponent } from './rules.component/rules.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'game', component: GameComponent },
  { path: 'rules', component: RulesComponent },
  { path: '**', redirectTo: 'menu' }
];
;
