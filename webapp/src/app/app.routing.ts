import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent }  from './component/page-not-found/page-not-found.component';
import { CategoryComponent }  from './component/category/category.component';

/**
 * Routing configuration
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
const ROUTES: Routes = [
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: 'category', component: CategoryComponent },
  { path: '**', component: PageNotFoundComponent }
];
export const APP_ROUTING = RouterModule.forRoot(ROUTES);