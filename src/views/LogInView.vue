<template>
	<div class="flex justify-center items-center h-full">
	  <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-4">
		<div class="flex flex-col gap-1">
		  <label for="email">Correo electrónico</label>
		  <input v-model="email" type="email" id="email" class="input-text" v-on:input="verifyMail()">
		</div>
		<div class="flex flex-col gap-1">
		  <label for="password">Contraseña</label>
		  <input v-model="password" type="password" id="password" class="input-text">
		</div>
		<button v-bind:disabled="loginButtonDisabled" @click="login" type="button" class="border rounded border-green-700 text-green-700 px-3 py-2 disabled:opacity-25">
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
  import { ref, computed } from 'vue';
  import { supabase } from '../supabase.js';
  import { useRouter } from 'vue-router'; // Import useRouter
  import { credenciales, isEmployeeLoggedIn, isClientLoggedIn, isAdminLoggedIn } from '../router/index.js';



  const email = ref('');
  const password = ref('');
  const authMessage = ref('');
  const router = useRouter(); // Get the router instance-
  const isAuthSuccess = ref(false);
  const validEmail = ref(false); 

  function verifyMail(){
	validEmail.value = /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
  };

  let loginButtonDisabled = computed( () => {
	return (password.value.length == 0 || !validEmail.value);
  });

  const login = async () => {
//busco en la tabla de empleados
	const { data: adminData } = await supabase
	.from('administradores')
	.select('*')
	.eq('email', email.value)
	.eq('contrasena', password.value);
	if ( adminData.length > 0) {
		isAdminLoggedIn.value = true;
		router.push('/admin');	
	} else if (true) {
		//busco en la tabla de empleados
		const { data: empleadoData } = await supabase
		.from('empleados')
		.select('*')
		.eq('email', email.value)
		.eq('contrasena', password.value);
		if ( empleadoData.length > 0) {
			isEmployeeLoggedIn.value = true;
			router.push('/employee');
			
		} else if (true) {
			//busco en la tabla de clientes
			const { data: userData } = await supabase
			.from('clientes')
			.select('*')
			.eq('email', email.value)
			.eq('contrasena', password.value);
			if (userData.length > 0) {
				router.push('/client');
				isClientLoggedIn.value = true;
				credenciales.value = {
					"nombre":userData[0].nombres,
					"apellido":userData[0].apellidos,
					"nroAfiliado":userData[0].nro_afiliado,
					"plan":{
						"nombre":userData[0].nombre_plan,
						"vencimiento":"20/10/23"
					},
					"coTitulares": [		//Ver como obtener todos los cotitulares
						{
							"nombre":"Jane",
							"apellido":"Doe",
							"relacion":"conyuge",
							"plan":{
								"nombre":"Silver",
								"vencimiento":"20/10/23"
							},
						},
						{
							"nombre":"Joanne",
							"apellido":"Doe",
							"relacion":"hijo/a",
							"plan":{
								"nombre":"Copper",
								"vencimiento":"20/10/23"
							},
						},
						{
							"nombre":"Joe",
							"apellido":"Doe",
							"relacion":"hijo/a",
							"plan":{
								"nombre":"Copper",
								"vencimiento":"16/10/24"
							},
						}
					]
				}
			}
		} else {
			authMessage.value = 'Credenciales incorrectas';
		}
	 }
	

	

	
  };
  </script>
  
 
 