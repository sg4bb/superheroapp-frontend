
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/Auth/Login.vue') },
      { path: 'register', component: () => import('pages/Auth/Register.vue') },
      { path: 'hero/mod', component: () => import('pages/SuperHero/ModHero.vue') }, // Consultar Todos los superheroes
      { path: 'hero/consult', component: () => import('pages/SuperHero/ConsultHero.vue') }, // Consultar Todos los superheroes
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
