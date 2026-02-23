import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path:'',
        component:Login
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'admin',
        loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),  
        canActivate: [authGuard]      
    },

];
