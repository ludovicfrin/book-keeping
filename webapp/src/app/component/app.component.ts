import {Component} from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Main template component
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
	title: string = '';
}
