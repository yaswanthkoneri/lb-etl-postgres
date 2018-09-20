import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LandingModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: LandingModule,
        providers: []
    };
}
}
