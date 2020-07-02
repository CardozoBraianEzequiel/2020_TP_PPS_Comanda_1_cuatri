import { Component, OnInit } from '@angular/core';
import { NavController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/staff/employees', title: 'Usuarios',  icon: 'https://image.flaticon.com/icons/svg/2786/2786245.svg', class: '', type: 'supervisor'},
  { path: '/staff/tables', title: 'Mesas',  icon: 'https://image.flaticon.com/icons/svg/2843/2843652.svg', class: '', type: 'metre'},
  { path: '/staff/tables', title: 'Mesas',  icon: 'https://image.flaticon.com/icons/svg/2843/2843652.svg', class: '', type: 'metre'},
  { path: '/staff/delivery', title: 'Delivery',  icon: 'https://image.flaticon.com/icons/svg/2786/2786408.svg', class: '', type: 'todos'},
  { path: '/staff/stats', title: 'Estadisticas',  icon: 'https://image.flaticon.com/icons/svg/2786/2786428.svg', class: '', type: 'supervisor'},
  { path: '/staff/orders', title: 'Pedidos',  icon: 'https://image.flaticon.com/icons/svg/2996/2996110.svg', class: '', type: 'mozo'},
  { path: '/staff/preparations', title: 'Platos',  icon: 'https://image.flaticon.com/icons/svg/3144/3144416.svg', class: '', type: 'cocinero'},
  { path: '/staff/preparations', title: 'Bebidas',  icon: 'https://image.flaticon.com/icons/svg/3141/3141900.svg', class: '', type: 'bartender'},
  { path: '', title: 'Salir',  icon: 'https://image.flaticon.com/icons/svg/875/875558.svg', class: '', type: 'todos'},
];


@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {

  isLoading = true;
  public user: User;  // = { imageUrl: 'assets/img/team-4-800x800.jpg', type: 'superviser'};
  public menuItems: any[];


  confirmaciones = [
    { titulo: 'Mesa 7',
      texto: 'Este es un texto de prueba'
    },
    { titulo: 'Mesa 3',
    texto: 'Este es un texto de prueba'
    },
    { titulo: 'Delivery Pedido #23',
    texto: 'Este es un texto de prueba'
    }
  ];

  constructor( public navCtrl: NavController,
               private authService: AuthService ) { }

  ngOnInit() {
    // this.isLoading = true;
    // Plugins.Storage.get({ key: 'user-bd' }).then(
    //   (userData) => {
    //     if (userData.value) {
    //       this.user = JSON.parse(userData.value);
    //       this.menuItems = ROUTES.filter(menuItem => menuItem.type === this.user.type || menuItem.type === 'todos');
    //       this.isLoading = false;
    //     }
    //     else {
    //       this.logout();
    //     }
    //   }, () => {
    //     this.logout();
    //   }
    // );
  }


  ionViewWillEnter() {
    this.isLoading = true;
    Plugins.Storage.get({ key: 'user-bd' }).then(
      (userData) => {
        if (userData.value) {
          this.user = JSON.parse(userData.value);
          this.menuItems = ROUTES.filter(menuItem => menuItem.type === this.user.type || menuItem.type === 'todos');
          this.isLoading = false;
        }
        else {
          this.logout();
        }
      }, () => {
        this.logout();
      }
    );
  }


  logout() {
    this.authService.logoutUser()
    .then(res => {
      // console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }


  gestionAction(menuItem) {
    if (menuItem.title === 'Salir') {
      this.logout();
    } else {
      this.navCtrl.navigateForward([menuItem.path]);
    }
  }



}
