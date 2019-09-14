import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { JwtOptionsService } from './core/services/jwt-options.service';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AuthService } from './core/auth/services/auth.service';
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

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent,
        LoginFormComponent,
        MoviesComponent,
        SingleMovieComponent,
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
        AuthGuard,
        AuthInterceptor,
        AuthService,
        TokenService,
        LoginService,
        MovieService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
