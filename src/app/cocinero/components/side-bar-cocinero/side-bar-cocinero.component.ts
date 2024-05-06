import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar-cocinero',
  templateUrl: './side-bar-cocinero.component.html',
  styleUrls: ['./side-bar-cocinero.component.scss']
})
export class SideBarCocineroComponent {
    sidebarVisible: boolean = false;

    logout(){
        localStorage.removeItem('Rol_User');
    }
}
