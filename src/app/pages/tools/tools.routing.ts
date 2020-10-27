import { RouterModule, Routes } from '@angular/router';
import { ToolsListComponent, ToolsDetailsComponent } from './components';


const routes: Routes = [
    { path: 'details/:id', component: ToolsDetailsComponent },
    { path: 'details/:selector/:id/:name', component: ToolsDetailsComponent },
    { path: 'list', component: ToolsListComponent },
    { path: 'list/:filter', component: ToolsListComponent },
    {
        path: '',
        redirectTo: 'list',
    },
];

export const routing = RouterModule.forChild(routes);
