import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuTypes, InitialData } from './MenuItems';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  label: string;
  public user: string;
  isMenuActive: Boolean;
  MenuItems: Array<MenuItem>;
  menuTypes = MenuTypes;
  constructor(private router: Router) {}

  ngOnInit() {
    this.isMenuActive = false;
    this.MenuItems = InitialData;
  }
  openMenu() {
    const root = document.getElementsByTagName('html')[0];
    this.isMenuActive = !this.isMenuActive;
    if (this.isMenuActive) {
      root.classList.add('clipped');
    } else {
      root.classList.remove('clipped');
    }
  }

  ngOnDestroy() {}

  ngAfterViewInit() {}
}
