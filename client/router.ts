import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Home/HomePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/account', name: 'Account', component: AccountPage },
  { path: '*', name: 'Not Found', component: NotFound }
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name !== 'Home' && !router.app.$store.state.username) {
      next({ name: 'Home' }); // Go to Home page if user navigates to any other page and are not signed in
      return;
    }
  }

  next();
});

export default router;
