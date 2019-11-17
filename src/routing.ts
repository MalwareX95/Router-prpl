import {Router} from '@vaadin/router';
const router = new Router(document.getElementById('outlet'));

router.setRoutes([
    {
        path: '/',
        component: 'my-app',
        action: () => { 
            import('./my-app')
        }
    },
    {
        path: '/use',
        component: 'page1-component',
        action: () => { 
            import('./page1')
        }
    }
]);