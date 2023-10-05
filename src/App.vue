<template>
	<header class="bg-blue-800 text-white px-6 py-4">
	  <div class="flex justify-between items-center gap-3">
		<p>OSPIFAK</p>
		<nav class="flex items-center gap-5">
		  <RouterLink v-if="!isLoggedIn" :to="{ name: 'login' }">Iniciar sesión</RouterLink>
          <RouterLink v-if="isLoggedIn && credenciales.rol!=='admin'" :to="{ name: 'home' }">Home</RouterLink>
		  <RouterLink v-if="credenciales.rol==='cliente'" to="#">Reintegros y Prestaciones</RouterLink>
		  <RouterLink v-if="credenciales.rol==='empleado'" to="#">Reintegros y Prestaciones</RouterLink>
		  <RouterLink v-if="credenciales.rol==='cliente'" :to="{ name: 'plansInfo' }">Planes</RouterLink>
		  <RouterLink v-if="credenciales.rol==='admin'" :to="{ name: 'plans' }">Planes</RouterLink>
		  <RouterLink v-if="credenciales.rol==='admin'" :to="{ name: 'empleados' }">Empleados</RouterLink>
		  <RouterLink v-if="isLoggedIn && credenciales.rol!=='admin'" :to="{ name: 'profile' }">Mi Perfil</RouterLink>
		  <a v-if="isLoggedIn" @click="logout" href="#">Salir</a>
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
  import { credenciales, isLoggedIn } from './router/index.js'; // Import isLoggedIn from the global state

  const router = useRouter();
  
  const logout = () => {
	isLoggedIn.value = false;
	router.push({ name: 'login' });
  };
  </script>
  