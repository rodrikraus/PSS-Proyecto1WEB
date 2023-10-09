import {createRouter, createWebHistory} from 'vue-router'
import { ref } from 'vue';
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'
import PlanIndexView from '../views/plans/PlanIndexView.vue'
import PlanInfoView from '../views/plans/PlanInfoView.vue'
import EmpleadosIndexView from '../views/empleados/EmpleadosIndexView.vue'
import ClientHomeView from '../views/home/ClientHomeView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import EmployeeHomeView from '../views/home/EmployeeHomeView.vue'
import RecoverPasswordView from '../views/RecoverPasswordView.vue'
import ProfileIndexView from '../views/profile/ProfileIndexView.vue'
import HomeDefaultView from '../views/home/HomeDefaultView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeDefaultView
        },
        {
            path: '/client',
            name: 'client',
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
            path: '/plansInfo',
            name: 'plansInfo',
            component: PlanInfoView
        },
        {
            path: '/empleados',
            name: 'empleados',
            component: EmpleadosIndexView
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
// Agrega un guardia de navegación global para verificar quien esta logeado
export const isAdminLoggedIn = ref(false);
export const isEmployeeLoggedIn = ref(false);
export const isClientLoggedIn = ref(false);


//Solo se puede ir a /login o /signup si no hay nadie logeado
router.beforeEach((to, from, next) => {
    if ((to.name !== 'login' && to.name !== 'signup') &&
      (!isAdminLoggedIn.value && !isEmployeeLoggedIn.value && !isClientLoggedIn.value)) {
      next({ name: 'login' }); //te redirije al login
    } else {
      // Allow navigation for other routes
      next();
    }
  });
  

export default router
