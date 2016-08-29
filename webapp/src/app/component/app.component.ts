import {Component} from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * App template component
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
@Component({
  moduleId: module.id,
  selector: 'bk-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  viewProviders: [Title]
})

export class AppComponent {
    title: string = '';
    
    /**
     * Constructor
     * 
     * @param titleService Service to inject title in the head section
     */
    public constructor(private titleService: Title ) { }
    
    /**
     * Title setter
     * Change title in the head section and in the toolbar
     * 
     * @param title Title
     */
    public setTitle( title: string) {
        this.titleService.setTitle( "Book-keeping - " + title );
        this.title = title;
    }    
}
