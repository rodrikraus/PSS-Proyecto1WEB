<template>
	<div class="flex justify-center items-center p-10">
		<div class="rounded-lg bg-gray-100 p-10 flex flex-col gap-4">
			<div class="flex gap-4">
				<div class="flex flex-col gap-4">
					<p class="font-bold text-lg">Datos Personales</p>
					<div class="flex flex-col gap-1">
						<label for="nombres">Nombres</label>
						<input type="text" id="nombres" class="input-text" v-model="formData.nombres">
					</div>
					<div class="flex flex-col gap-1">
						<label for="apellidos">Apellidos</label>
						<input type="text" id="apellidos" class="input-text" v-model="formData.apellidos">
					</div>
					<div class="flex flex-col gap-1">
						<label for="dni">DNI</label>
						<input type="text" id="dni" class="input-text" v-model="formData.dni">
					</div>
					<div class="flex flex-col gap-1">
						<label for="telefono">Número de teléfono</label>
						<input type="text" id="telefono" class="input-text" v-model="formData.telefono">
					</div>
					<div class="flex flex-col gap-1">
						<label for="domicilio">Domicilio</label>
						<input type="text" id="domicilio" class="input-text" v-model="formData.domicilio"> 
					</div>
					<div class="flex flex-col gap-1">
						<label for="nacimiento">Fecha de nacimiento</label>
						<input type="date" id="nacimiento" class="input-text" v-model="formData.nacimiento">
					</div>
					<div class="flex flex-col gap-1">
						<label>Sexo</label>
						<label><input type="radio" name="sexo" id="femenino" v-model="formData.sexo"> Femenino</label>
						<label><input type="radio" name="sexo" id="masculino" v-model="formData.sexo"> Masculino</label>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<p class="font-bold text-lg">Datos de Cuenta</p>
					<div class="flex flex-col gap-1">
						<label for="correo">Dirección de correo electrónico</label>
						<input type="text" id="correo" class="input-text" v-model="formData.correo">
					</div>
					<div class="flex flex-col gap-1">
						<label for="password">Contraseña</label>
						<input type="text" id="password" class="input-text" v-model="formData.password">
					</div>
					<div class="flex flex-col gap-1">
						<label for="password_confirmation">Repita su contraseña</label>
						<input type="text" id="password_confirmation" class="input-text" v-model="formData.password_confirmation">
					</div>
					<div class="flex flex-col gap-1">
						<label>Elegir Plan</label>
						<div class="flex flex-col gap-4">
							<div @click="planSeleccionado = 'Gold'" class="flex flex-col items-center gap-3 rounded-lg bg-white p-4 cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-blue-300">
								<p class="font-bold text-lg">Gold</p>
								<div class="flex items-center gap-4"> </div>
								<div class="flex items-center gap-4">
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 75,000</p>
										<p class="italic text-sm text-gray-400">21-35 años</p>
									</div>
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 96,000</p>
										<p class="italic text-sm text-gray-400">36-55 años</p>
									</div>
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 110,000</p>
										<p class="italic text-sm text-gray-400">56+ años</p>
									</div>
								</div>
							</div>
							<div @click="planSeleccionado = 'Silver'" class="flex flex-col items-center gap-3 rounded-lg p-4 cursor-pointer bg-gray-50 border-2 border-blue-300">
								<p class="font-bold text-lg">Silver</p>
								<div class="flex items-center gap-4"> </div>
								<div class="flex items-center gap-4">
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 65,000</p>
										<p class="italic text-sm text-gray-400">21-35 años</p>
									</div>
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 86,000</p>
										<p class="italic text-sm text-gray-400">36-55 años</p>
									</div>
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 100,000</p>
										<p class="italic text-sm text-gray-400">56+ años</p>
									</div>
								</div>
							</div>
							<div @click="planSeleccionado = 'Copper'" class="flex flex-col items-center gap-3 rounded-lg bg-white p-4 cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-blue-300">
								<p class="font-bold text-lg">Copper</p>
								<div @click="planSeleccionado = 'Copper'" class="flex items-center gap-4"> </div>
								<div class="flex items-center gap-4">
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 55,000</p>
										<p class="italic text-sm text-gray-400">21-35 años</p>
									</div>
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 76,000</p>
										<p class="italic text-sm text-gray-400">36-55 años</p>
									</div>
									<div class="flex flex-col items-center gap-1">
										<p class="font-semibold">$ 90,000</p>
										<p class="italic text-sm text-gray-400">56+ años</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button type="button" @click="enviarFormulario()" class="border rounded border-green-700 text-green-700 px-3 py-2">Registrarse</button>
			<RouterLink :to="{name: 'login'}" class="text-blue-600 text-center text-sm">¿Ya tiene una cuenta? Inicie sesión aquí.</RouterLink>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'; // Import ref to create a reactive variable
	import { supabase } from '../supabase.js';
	import { useRouter } from 'vue-router'; // Import useRouter

	const router = useRouter();

	let formData = {
		nombres: '',
		apellidos: '',
		dni: '',
		telefono: '',
		domicilio: '',
		nacimiento: '',
		sexo: '',
		correo: '',
		password: '',
		password_confirmation: '',
	};
	const planSeleccionado = ref('Silver'); // Initialize it as Silver plan

	async function enviarFormulario() {	
		if(formData.password != formData.password_confirmation) {
			alert("Confirmacion de password erronea.");		
			console.log(formData.password);
			console.log(formData.password_confirmation);
			return;
		}
		
		try {
			// Miro si existe el plan
			const { data: planesData, error: planesError } = await supabase
				.from('planes')
				.select('nombre')
				.eq('nombre', planSeleccionado.value);

			if (planesError || !planesData || planesData.length === 0) {
				alert('El plan seleccionado no existe.');
				return;
			} else {
				//Verifico que no exista otro cliente con el mismo mail
				const { data: dataCorreo, error: correoError } = await supabase
				.from('clientes')
				.select('email')
				.eq('email', formData.correo);

			if (!correoError || dataCorreo || dataCorreo.length > 0) {
				alert('El correo introducido ya pertenece a otro usuario registrado.');
				return;
			}

				// Prepare the data to be inserted
				const clientData = {
					nombres: formData.nombres,
					apellidos: formData.apellidos,
					dni: formData.dni,
					telefono: formData.telefono,
					domicilio: formData.domicilio,
					fecha_nacimiento: formData.nacimiento,
					sexo: formData.sexo,
					email: formData.correo,
					contrasena: formData.password,
					nombre_plan: planSeleccionado.value,
					// Add other fields as needed
				};

				// Log the data before inserting
				console.log('Data to be inserted:', clientData);

				// Insert data into the "clientes" table
				const { data, error } = await supabase.from('clientes').insert(clientData);

				if (error) {
					console.error('Error inserting data:', error);
				} else {
					console.log('Data inserted successfully:', data);
					alert("Usuario creado con éxito!");
					router.push('/');
				}
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}

	}

</script>