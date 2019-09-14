import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { MoviesComponent } from './movies/components/movies/movies.component';
import { LoginComponent } from './login/components/login/login.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/components/layout.component';

const routes: Routes = [
    { path: '', redirectTo: 'movies', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: 'movies', component: MoviesComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
