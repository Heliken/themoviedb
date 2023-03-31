import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MainpageModule } from './pages/mainpage/mainpage.module';
import { ApiConfigurationService } from './services/api-configuration-service';

@NgModule({
  declarations: [AppComponent],
  imports: [MainpageModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    ApiConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (apiConfigService: ApiConfigurationService) => () =>
        apiConfigService.loadConfig(),
      deps: [ApiConfigurationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
