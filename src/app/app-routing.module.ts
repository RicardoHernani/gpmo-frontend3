import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'referencias',
    loadChildren: () => import('./pages/referencias/referencias.module').then( m => m.ReferenciasPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'cirurgias-inserir',
    loadChildren: () => import('./pages/cirurgias-inserir/cirurgias-inserir.module').then( m => m.CirurgiasInserirPageModule)
  },
  {
    path: 'procedimentos-inserir',
    loadChildren: () => import('./pages/procedimentos-inserir/procedimentos-inserir.module').then( m => m.ProcedimentosInserirPageModule)
  },
  {
    path: 'cirurgias-apagar',
    loadChildren: () => import('./pages/cirurgias-apagar/cirurgias-apagar.module').then( m => m.CirurgiasApagarPageModule)
  },
  {
    path: 'procedimentos-buscar-inserir',
    loadChildren: () => import('./pages/procedimentos-buscar-inserir/procedimentos-buscar-inserir.module').
      then( m => m.ProcedimentosBuscarInserirPageModule)
  },
  {
    path: 'procedimentos-apagar',
    loadChildren: () => import('./pages/procedimentos-apagar/procedimentos-apagar.module').then( m => m.ProcedimentosApagarPageModule)
  },
  {
    path: 'relatorios-producao',
    loadChildren: () => import('./pages/relatorios-producao/relatorios-producao.module').then( m => m.RelatoriosProducaoPageModule)
  },
  {
    path: 'relatorios-producao-exibir',
    loadChildren: () => import('./pages/relatorios-producao-exibir/relatorios-producao-exibir.module').
      then( m => m.RelatoriosProducaoExibirPageModule)
  },
  {
    path: 'collector',
    loadChildren: () => import('./pages/collector/collector.module').then( m => m.CollectorPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
