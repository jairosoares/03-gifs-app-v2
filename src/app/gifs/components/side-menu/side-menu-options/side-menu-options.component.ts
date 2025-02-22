import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  sublabel: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  templateUrl: './side-menu-options.component.html',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
})
export class SideMenuOptionsComponent {

  menuOption: MenuOption[] = [
    {
      icon: 'assured_workload',
      label: 'Trending',
      sublabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'search',
      label: 'Buscador',
      sublabel: 'Buscar gifs',
      route: '/dashboard/search'
    },
  ]

}
