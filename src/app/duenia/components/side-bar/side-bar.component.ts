import { Component } from '@angular/core';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

    sidebarVisible: boolean = false;

    logout(){
        localStorage.removeItem('Rol_User');
    }

}
