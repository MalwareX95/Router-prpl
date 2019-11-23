import {Router} from '@vaadin/router';
const router = new Router(document.getElementById('outlet'), {baseUrl: '/'});

router.setRoutes([
    {
        path: '/',
        component: 'home-view',
        action: () => { 
            import('./components/home')
        }
    },
    {
        path: '/contact',
        component: 'contact-view',
        action: () => { 
            import('./components/contact')
        }
    }
]);