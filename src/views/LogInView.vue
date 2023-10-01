<template>
	<div class="flex justify-center items-center h-full">
	  <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-4">
		<div class="flex flex-col gap-1">
		  <label for="email">Correo electrónico</label>
		  <input v-model="email" type="email" id="email" class="input-text">
		</div>
		<div class="flex flex-col gap-1">
		  <label for="password">Contraseña</label>
		  <input v-model="password" type="password" id="password" class="input-text">
		</div>
		<button @click="login" type="button" class="border rounded border-green-700 text-green-700 px-3 py-2">
		  Ingresar
		</button>
		<div v-if="authMessage" :class="{ 'text-green-700': isAuthSuccess, 'text-red-700': !isAuthSuccess }">
		  {{ authMessage }}
		</div>
		<RouterLink :to="{name: 'signup'}" class="text-blue-600 text-center text-sm">¿No tiene una cuenta? Regístrese aquí.</RouterLink>
		<RouterLink :to="{name: 'password.recover'}" class="text-blue-600 text-center text-sm">¿Olvidó su contraseña? Recupérela aquí.</RouterLink>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { supabase } from '../supabase.js';
  import { useRouter } from 'vue-router'; // Import useRouter
  import { isLoggedIn } from '../router/index.js'; // Import isLoggedIn from the global state



  const email = ref('');
  const password = ref('');
  const authMessage = ref('');
  
  const router = useRouter(); // Get the router instance

  const login = async () => {
	const { data: userData, error: authError } = await supabase
	  .from('clientes')
	  .select('*')
	  .eq('email', email.value)
	  .eq('contraseña', password.value);
  
	if (authError) {
	  authMessage.value = 'Error al iniciar sesión';
	} else if (userData.length > 0) {
	  authMessage.value = 'Inicio de sesión correcto';
	  //Se setea la variable isLoggedIn en true y se redirige al home
	  isLoggedIn.value = true;
	  router.push('/');
	} else {
	  authMessage.value = 'Credenciales incorrectas';
	}
  };
  </script>
  
  