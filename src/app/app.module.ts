import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { JwtOptionsService } from './core/services/jwt-options.service';
import { TokenService } from './core/services/token.service';
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';
import { MoviesComponent } from './movies/components/movies/movies.component';
import { LayoutComponent } from './layout/components/layout.component';
import { LoginComponent } from './login/components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { LoginService } from './login/services/login.service';
import { SingleMovieComponent } from './movies/components/single-movie/single-movie.component';
import { MovieService } from './movies/services/movie.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/components/register/register.component';
import { RegisterFormComponent } from './register/components/register-form/register-form.component';
import { RegisterService } from './register/services/register.service';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        LoginFormComponent,
        MoviesComponent,
        SingleMovieComponent,
        RegisterComponent,
        RegisterFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModalModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useClass: JwtOptionsService,
            },
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthInterceptor,
        TokenService,
        LoginService,
        MovieService,
        RegisterService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
