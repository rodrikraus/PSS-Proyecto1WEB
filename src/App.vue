<template>
	<header class="bg-blue-800 text-white px-6 py-4">
	  <div class="flex justify-between items-center gap-3">
		<p>OSPIFAK</p>
		<nav class="flex items-center gap-5">
		  <RouterLink v-if="!isClientLoggedIn && !isEmployeeLoggedIn && !isAdminLoggedIn" :to="{ name: 'login' }">Iniciar sesión</RouterLink>
          <RouterLink v-if="isClientLoggedIn" :to="{ name: 'home' }">Home</RouterLink>
		  <RouterLink v-if="isClientLoggedIn" to="#">Reintegros y Prestaciones</RouterLink>
		  <RouterLink v-if="isEmployeeLoggedIn" to="#">Reintegros y Prestaciones</RouterLink>
		  <RouterLink v-if="isAdminLoggedIn" :to="{name: 'services'}">Prestaciones</RouterLink>
		  <RouterLink v-if="isClientLoggedIn" :to="{ name: 'plansInfo' }">Planes</RouterLink>
		  <RouterLink v-if="isAdminLoggedIn" :to="{ name: 'plans' }">Planes</RouterLink>
		  <RouterLink v-if="isAdminLoggedIn" :to="{ name: 'empleados' }">Empleados</RouterLink>
		  <RouterLink v-if="isClientLoggedIn" :to="{ name: 'profile' }">Mi Perfil</RouterLink>
		  <!--<RouterLink :to="{name: 'employees'}">Empleados</RouterLink>-->
		  <!--<RouterLink :to="{name: 'profile'}">Mi Perfil</RouterLink>-->
		  <RouterLink v-if="isEmployeeLoggedIn" :to="{name: 'profile.employee'}">Mi Perfil</RouterLink>
		  <a v-if="isClientLoggedIn || isAdminLoggedIn || isEmployeeLoggedIn" @click="logout" href="#">Salir</a>
		</nav>
	  </div>
	</header>
	<main class="flex-grow p-6 overflow-y-auto">
	  <RouterView/>
	</main>
	<footer class="bg-blue-200 px-10 py-6">
	  <p class="text-xl">OSPIFAK</p>
	</footer>
  </template>
  
  <script setup>
  import { RouterLink, useRouter } from 'vue-router';
  import { userInfo, isAdminLoggedIn, isEmployeeLoggedIn, isClientLoggedIn } from './router/index.js';

  const router = useRouter();
  
  const logout = () => {
	isAdminLoggedIn.value = false;
	isEmployeeLoggedIn.value = false;
	isClientLoggedIn.value = false;

	router.push({ name: 'login' });
  };
  </script>
  