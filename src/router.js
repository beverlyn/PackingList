import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/Home.vue'),
        },
        {
            path: '/lists/:id',
            component: () => import('./pages/CreateList.vue'),
            // props: true,
          },
    ]
});
