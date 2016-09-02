import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent }  from './component/page-not-found/';
import { CategoryComponent }  from './component/category/';

/**
 * Routing configuration
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
const ROUTES: Routes = [
	{ 
  		path: '',
  		redirectTo: '/category',
  		pathMatch: 'full'
  	},
	{
		path: 'category',
        component: CategoryComponent,
        data: { 
            title: 'Cat\u00e9gorie',
            root: true
        }
        
//  		children: [
//  			{
//  				path: '',
//  				component: CategoryComponent,
//  				data: { 
//  					title: 'Cat\u00e9gorie',
//  					root: true
//				}
//			},
//			{
//				path:':id',
//				component: CategoryDetailComponent,
//				data: {
//					title: 'Modifier la  cat\u00e9gorie'
//				}
//			}
//		]
	},
	{ 
		path: '**', 
		component: PageNotFoundComponent, 
		data: { 
			title: 'Page non trouv\u00e9' 
		}
	}
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);