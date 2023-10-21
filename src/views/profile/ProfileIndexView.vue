<template>
	<div id="delete-relative-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
		<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
			<div class="flex justify-between items-center gap-3">
				<p class="text-xl font-semibold">Eliminar cotitular «Jane Doe»</p>
				<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal" @click.stop="closeModal('delete-relative-modal')">
					<i class="fa-solid fa-times text-lg"></i>
				</button>
			</div>
			<div class="flex flex-col gap-3">
				<p>¿Está seguro que desea eliminar su cotitular «Jane Doe»? Esta acción no se puede deshacer.</p>
				<div class="flex justify-end">
					<button type="button" class="btn border-red-700 text-red-700">Eliminar</button>
				</div>
			</div>
		</div>
	</div>
	<form @submit.prevent="crearCotitular">
		<div id="add-relative-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
			<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
				<div class="flex justify-between items-center gap-3">
					<p class="text-xl font-semibold">Agregar un cotitular</p>
					<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal" @click.stop="closeModal('add-relative-modal')">
						<i class="fa-solid fa-times text-lg"></i>
					</button>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="flex flex-col gap-1">
						<label for="name">Nombres</label>
						<input type="text" id="name" class="input-text" v-model="formData.nombre" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="lastname">Apellidos</label>
						<input type="text" id="lastname" class="input-text" v-model="formData.apellido" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="relationship">Parentesco</label>
						<select id="relationship" v-model="formData.relacion_con_titular" required>
							<option value="conyuge">Cónyuge</option>
							<option value="hijo/a">Hijo/a</option>
						</select>
					</div>
					<div class="flex flex-col gap-1">
						<label for="id_card">DNI</label>
						<input type="tel" id="id_card" name="id_card" class="input-text" v-model="formData.dni" pattern="^\d{7,8}$" title="El DNI debe tener 7 u 8 digitos." required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="birthdate">Fecha de nacimiento</label>
						<input type="date" id="birthdate" class="input-text" v-model="formData.fecha_nacimiento" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="phone">Teléfono</label>
						<input type="tel" id="phone" class="input-text" v-model="formData.telefono" pattern="^\d{10}$" title="El numero de telefono debe tener 10 digitos." required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="address">Domicilio</label>
						<input type="text" id="address" class="input-text" v-model="formData.domicilio" required>
					</div>
					<div class="flex flex-col gap-1">
						<label>Sexo</label>
						<div class="flex items-center gap-3">
							<label><input type="radio" id="femenino" value="femenino" v-model="formData.sexo" required> Femenino</label>
							<label><input type="radio" id="masculino" value="masculino" v-model="formData.sexo" required> Masculino</label>
						</div>
					</div>
				</div>
				<button type="submit" class="btn border-green-700 text-green-700">Guardar</button>
			</div>
		</div>
	</form>
	<div id="edit-relative-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
		<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
			<div class="flex justify-between items-center gap-3">
				<p class="text-xl font-semibold">Modificar datos personales de cotitular «Jane Doe»</p>
				<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal" @click.stop="closeModal('edit-relative-modal')">
					<i class="fa-solid fa-times text-lg"></i>
				</button>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label for="name">Nombres</label>
					<input type="text" id="name" class="input-text" value="Jane">
				</div>
				<div class="flex flex-col gap-1">
					<label for="lastname">Apellidos</label>
					<input type="text" id="lastname" class="input-text" value="Doe">
				</div>
				<div class="flex flex-col gap-1">
					<label for="birthdate">Fecha de nacimiento</label>
					<input type="date" id="birthdate" class="input-text" value="1965-08-16">
				</div>
				<div class="flex flex-col gap-1">
					<label for="phone">Teléfono</label>
					<input type="tel" id="phone" class="input-text" value="+1 517 978-1234">
				</div>
				<div class="flex flex-col gap-1">
					<label for="address">Domicilio</label>
					<input type="text" id="address" class="input-text" value="461 Robinson St, Lansing, MI">
				</div>
			</div>
			<button type="button" class="btn border-green-700 text-green-700">Guardar</button>
		</div>
	</div>
	<div id="edit-profile-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
		<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
			<div class="flex justify-between items-center gap-3">
				<p class="text-xl font-semibold">Modificar datos personales</p>
				<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal" @click.stop="closeModal('edit-profile-modal')">
					<i class="fa-solid fa-times text-lg"></i>
				</button>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label for="name">Nombres <span class="text-red-700">*</span></label>
					<input type="text" id="name" class="input-text" value="John">
				</div>
				<div class="flex flex-col gap-1">
					<label for="lastname">Apellidos <span class="text-red-700">*</span></label>
					<input type="text" id="lastname" class="input-text" value="Doe">
				</div>
				<div class="flex flex-col gap-1">
					<label for="email">Correo electrónico <span class="text-red-700">*</span></label>
					<input type="email" id="email" class="input-text" value="johndoe@appleseed.com">
				</div>
				<div class="flex flex-col gap-1">
					<label for="phone">Teléfono <span class="text-red-700">*</span></label>
					<input type="tel" id="phone" class="input-text" value="+1 517 978-1234">
				</div>
				<div class="flex flex-col gap-1 md:col-span-2">
					<label for="address">Domicilio <span class="text-red-700">*</span></label>
					<input type="text" id="address" class="input-text" value="461 Robinson St, Lansing, MI">
				</div>
				<div class="flex flex-col gap-1">
					<label for="password">Contraseña</label>
					<input type="password" id="password" class="input-text">
				</div>
				<div class="flex flex-col gap-1">
					<label for="password-confirmation">Repetir contraseña</label>
					<input type="password" id="password-confirmation" class="input-text">
				</div>
			</div>
			<button type="button" class="btn border-green-700 text-green-700">Guardar</button>
		</div>
	</div>
	<div class="container mx-auto flex gap-10">
		<div class="flex-grow flex flex-col gap-3">
			<div class="flex justify-between items-center gap-3 px-3">
				<p class="text-blue-800 text-3xl">Mi Perfil</p>
				<p class="text-gray-400">Afiliado #{{ userInfo.nroAfiliado }}</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-3">
				<div class="flex flex-col gap-1">
					<label>Nombres</label>
					<p>{{userInfo.nombre}}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>Apellidos</label>
					<p>{{ userInfo.apellido }}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>DNI</label>
					<p>{{ userInfo.dni }}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>Correo electrónico</label>
					<p>{{ userInfo.email }}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>Fecha de nacimiento</label>
					<p>{{ (new Date(userInfo.fecha_nacimiento)).toLocaleDateString("es-AR") }}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>Teléfono</label>
					<p>{{ userInfo.telefono }}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>Domicilio</label>
					<p>{{ userInfo.domicilio }}</p>
				</div>
				<div class="flex flex-col gap-1">
					<label>Sexo</label>
					<p>{{ userInfo.sexo }}</p>
				</div>
				<div class="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:col-span-2 xl:col-span-4">
					<button type="button" class="btn border-blue-700 text-blue-700" @click="showModal('edit-profile-modal')">Modificar datos personales</button>
				</div>
			</div>
			<div class="flex justify-between items-center gap-3 px-3">
				<p class="text-blue-800 text-3xl">Cotitulares</p>
				<button type="button" class="btn border-green-700 text-green-700" @click="showModal('add-relative-modal')">Agregar</button>
			</div>
			<div class="rounded-lg bg-gray-100 flex flex-col gap-3 p-5" v-for="cotitular in userInfo.cotitulares">
				<div class="flex justify-between items-center gap-3">
					<p class="text-lg font-bold">{{ cotitular.relacion_con_titular }}</p>
					<p class="text-gray-400">Afiliado #{{ cotitular.id_cotitular }}</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
					<div class="flex flex-col gap-1">
						<label>Nombres</label>
						<p>{{ cotitular.nombre }}</p>
					</div>
					<div class="flex flex-col gap-1">
						<label>Apellidos</label>
						<p>{{ cotitular.apellido }}</p>
					</div>
					<div class="flex flex-col gap-1">
						<label>DNI</label>
						<p>{{ cotitular.dni }}</p>
					</div>
					<div class="flex flex-col gap-1">
						<label>Fecha de nacimiento</label>
						<p>{{ (new Date(cotitular.fecha_nacimiento)).toLocaleDateString("es-AR") }}</p>
					</div>
					<div class="flex flex-col gap-1">
						<label>Teléfono</label>
						<p>{{ cotitular.telefono }}</p>
					</div>
					<div class="flex flex-col gap-1">
						<label>Domicilio</label>
						<p>{{ cotitular.domicilio }}</p>
					</div>
					<div class="flex flex-col gap-1">
						<label>Sexo</label>
						<p>{{ cotitular.sexo }}</p>
					</div>
					<div class="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:col-span-2 xl:col-span-4">
						<button type="button" class="btn border-blue-700 text-blue-700" @click="showModal('edit-relative-modal')">Modificar datos personales</button>
						<button type="button" class="btn border-red-700 text-red-700" @click="showModal('delete-relative-modal')">Eliminar cotitular</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {showModal,closeModal,closeAllModals} from '@/helpers'
import { userInfo } from '@/router/index.js';
import { supabase } from '../../supabase.js';
import { isAfter, subYears } from 'date-fns';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


let formData = {
		nombre: '',
		apellido: '',
		relacion_con_titular: '',
		dni: '',
		fecha_nacimiento: '',
		telefono: '',
		domicilio: '',
		sexo: ''
	};

function validarFechaNacimiento(fechaNacimiento) {
	const fechaNacimientoDate = new Date(fechaNacimiento);
	const fechaHace18Anios = subYears(new Date(), 18);

	if (isAfter(fechaNacimientoDate, fechaHace18Anios)) {
		alert('El cotitular debe tener mas de 18 años.');
		return false;
	}

	return true;
}

async function crearCotitular(){
	
	if(!validarFechaNacimiento(formData.fecha_nacimiento))
		return;

	const {data: cotitulares, error: cotitularesError} = await supabase.from('cotitulares').select('dni').eq('dni',formData.dni)
	if(cotitulares.length>0){
		alert('El Cotitular a registrar ya existe.');
		return;
	} else if (cotitularesError){
		alert('Hubo un error en la base de datos.');
		console.error(cotitularesError);
		return;
	}

	const cotitularData = {
		nombre: formData.nombre,
		apellido: formData.apellido,
		relacion_con_titular: formData.relacion_con_titular,
		dni: formData.dni,
		fecha_nacimiento: formData.fecha_nacimiento,
		telefono: formData.telefono,
		domicilio: formData.domicilio,
		sexo: formData.sexo,
		nro_afiliado: userInfo.value.nroAfiliado,
		nombre_plan: userInfo.value.plan.nombre
	};
	const { data, error: errorInsertar } = await supabase.from('cotitulares').insert(cotitularData);
	if(errorInsertar){
		alert('Hubo un error al intentar registrar al cotitular, verifique que todos los campos sean validos.');
		console.error(errorInsertar);
	}
	else {
		alert('Cotitular creado con exito.');	//Actualizamos los cotitulares
		const { data: nuevosCotitulares } = await supabase
			.from('cotitulares')
			.select('*')
			.eq('nro_afiliado', userInfo.value.nroAfiliado);
		userInfo.value.cotitulares = nuevosCotitulares;
		closeModal('add-relative-modal');
	}
}


</script>

