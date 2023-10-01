import {createRouter, createWebHistory} from 'vue-router'
import { ref } from 'vue';
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'
import PlanIndexView from '../views/plans/PlanIndexView.vue'
import ClientHomeView from '../views/home/ClientHomeView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import EmployeeHomeView from '../views/home/EmployeeHomeView.vue'
import RecoverPasswordView from '../views/RecoverPasswordView.vue'
import ProfileIndexView from '@/views/profile/ProfileIndexView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ClientHomeView
        },
        {
            path: '/employee',
            name: 'employee',
            component: EmployeeHomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/plans',
            name: 'plans',
            component: PlanIndexView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileIndexView
        },
        {
            path: '/password/recover',
            name: 'password.recover',
            component: RecoverPasswordView
        },
        {
            path: '/password/change',
            name: 'password.change',
            component: ChangePasswordView
        },
    ]
})

export const credenciales = ref('');
// Agrega un guardia de navegación global para verificar isLoggedIn
export const isLoggedIn = ref(false);
router.beforeEach((to, from, next) => {
  
    if (to.name !== 'login' &&  to.name !== 'signup' && !isLoggedIn.value) { //(se usa value porque es una variable global)
      // Si no estás en la página de inicio de sesión y no estás autenticado, redirige a la página de inicio de sesión
      next({ name: 'login' });
    } else {
      // Si estás autenticado o en la página de inicio de sesión, permite la navegación
      next();
    }
  });

export default router
