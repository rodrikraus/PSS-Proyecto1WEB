<template>
	<div id="delete-relative-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
		<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
			<div class="flex justify-between items-center gap-3">
				<p class="text-xl font-semibold">Eliminar cotitular «{{ selectedCotitular.nombre }} {{ selectedCotitular.apellido }}»</p>
				<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal" @click.stop="closeModal('delete-relative-modal')">
					<i class="fa-solid fa-times text-lg"></i>
				</button>
			</div>
			<div class="flex flex-col gap-3">
				<p>¿Está seguro que desea eliminar su cotitular «{{ selectedCotitular.nombre }} {{ selectedCotitular.apellido }}»? Esta acción no se puede deshacer.</p>
				<div class="flex justify-end">
					<button type="button" @click="deleteCotitular" class="btn border-red-700 text-red-700">Eliminar</button>
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
						<input type="text" id="name" class="input-text" v-model="selectedCotitular.nombre" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="lastname">Apellidos</label>
						<input type="text" id="lastname" class="input-text" v-model="selectedCotitular.apellido" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="relationship">Parentesco</label>
						<select id="relationship" v-model="selectedCotitular.relacion_con_titular" required>
							<option value="conyuge">Cónyuge</option>
							<option value="hijo/a">Hijo/a</option>
						</select>
					</div>
					<div class="flex flex-col gap-1">
						<label for="id_card">DNI</label>
						<input type="tel" id="id_cardCreate" class="input-text" v-model="selectedCotitular.dni" pattern="^\d{7,8}$" title="El DNI debe tener 7 u 8 digitos." required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="birthdate">Fecha de nacimiento</label>
						<input type="date" id="birthdateCreate" class="input-text" v-model="selectedCotitular.fecha_nacimiento" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="phone">Teléfono</label>
						<input type="tel" id="phoneCreate" class="input-text" v-model="selectedCotitular.telefono" pattern="^\d{10}$" title="El numero de telefono debe tener 10 digitos." required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="address">Domicilio</label>
						<input type="text" id="addressCreate" class="input-text" v-model="selectedCotitular.domicilio" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="email">E-mail</label>
						<input type="email" id="emailCreate" class="input-text" v-model="selectedCotitular.email" required>
					</div>
					<div class="flex flex-col gap-1">
						<label>Sexo</label>
						<div class="flex items-center gap-3">
							<label><input type="radio" id="femenino" value="femenino" v-model="selectedCotitular.sexo" required> Femenino</label>
							<label><input type="radio" id="masculino" value="masculino" v-model="selectedCotitular.sexo" required> Masculino</label>
						</div>
					</div>
				</div>
				<button type="submit" class="btn border-green-700 text-green-700">Guardar</button>
			</div>
		</div>
	</form>
	<form @submit.prevent="modificarCotitular">
		<div id="edit-relative-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
			<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
				<div class="flex justify-between items-center gap-3">
					<p class="text-xl font-semibold">Modificar datos personales de cotitular «{{ selectedCotitular.nombre }} {{ selectedCotitular.apellido }}»</p>
					<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal" @click.stop="closeModal('edit-relative-modal')">
						<i class="fa-solid fa-times text-lg"></i>
					</button>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="flex flex-col gap-1">
						<label for="name">Nombres</label>
						<input type="text" id="nameEdit" class="input-text" v-model="selectedCotitular.nombre" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="lastname">Apellidos</label>
						<input type="text" id="lastnameEdit" class="input-text" v-model="selectedCotitular.apellido" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="birthdate">Fecha de nacimiento</label>
						<input type="date" id="birthdateEdit" class="input-text" v-model="selectedCotitular.fecha_nacimiento" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="phone">Teléfono</label>
						<input type="tel" id="phoneEdit" class="input-text" pattern="^\d{10}$" title="El numero de telefono debe tener 10 digitos." v-model="selectedCotitular.telefono" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="address">Domicilio</label>
						<input type="text" id="addressEdit" class="input-text" v-model="selectedCotitular.domicilio" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="email">E-mail</label>
						<input type="email" id="emailEdit" class="input-text" v-model="selectedCotitular.email" required>
					</div>
				</div>
				<button type="submit" class="btn border-green-700 text-green-700">Guardar</button>
			</div>
		</div>
	</form>
	<form @submit.prevent="modificarPerfil">
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
						<label for="name">Nombres </label>
						<input type="text" id="namePerf" class="input-text" v-model="newUserInfo.nombre" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="lastname">Apellidos </label>
						<input type="text" id="lastnamePerf" class="input-text" v-model="newUserInfo.apellido" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="email">Correo electrónico </label>
						<input type="email" id="emailPerf" class="input-text" v-model="newUserInfo.email" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="phone">Teléfono </label>
						<input type="tel" id="phonePerf" class="input-text" v-model="newUserInfo.telefono" pattern="^\d{10}$" title="El numero de telefono debe tener 10 digitos." required>
					</div>
					<div class="flex flex-col gap-1 md:col-span-2">
						<label for="address">Domicilio </label>
						<input type="text" id="addressPerf" class="input-text" v-model="newUserInfo.domicilio" required>
					</div>
					<div class="flex flex-col gap-1">
						<label for="password">Contraseña</label>
						<input type="password" id="passwordPerf" class="input-text" v-model="newUserInfo.password">
					</div>
					<div v-if="newUserInfo.password" class="flex flex-col gap-1">
						<label for="password-confirmation">Repetir contraseña</label>
						<input type="password" id="password-confirmationPerf" class="input-text" v-model="newUserInfo.passwordConfirm" required>
					</div>
				</div>
				<button type="submit" class="btn border-green-700 text-green-700">Guardar</button>
			</div>
		</div>
	</form>
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
					<div class="flex flex-col gap-1">
						<label>E-mail</label>
						<p>{{ cotitular.email }}</p>
					</div>
					<div class="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:col-span-2 xl:col-span-4">
						<button type="button" class="btn border-blue-700 text-blue-700" @click="showModal('edit-relative-modal', cotitular)">Modificar datos personales</button>
						<button type="button" class="btn border-red-700 text-red-700" @click="showModal('delete-relative-modal', cotitular)">Eliminar cotitular</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {closeModal,closeAllModals} from '@/helpers'
import { userInfo } from '@/router/index.js';
import { supabase } from '../../supabase.js';
import { isAfter, subYears } from 'date-fns';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const selectedCotitular = ref([]);
const newUserInfo = ref([]);


async function modificarPerfil(){
	if(newUserInfo.value.password !== newUserInfo.value.passwordConfirm){
		alert('La contraseña no coincide con la confirmacion.');
		return;
	}
	let userData;
	if(newUserInfo.value.password){
		userData = {
			nombres: newUserInfo.value.nombre,
			apellidos: newUserInfo.value.apellido,
			telefono: newUserInfo.value.telefono,
			domicilio: newUserInfo.value.domicilio,
			email: newUserInfo.value.email,
			contrasena: newUserInfo.value.password,
		};
	} else {
		userData = {
			nombres: newUserInfo.value.nombre,
			apellidos: newUserInfo.value.apellido,
			telefono: newUserInfo.value.telefono,
			domicilio: newUserInfo.value.domicilio,
			email: newUserInfo.value.email,
		};
	}
	const { data, error: errorInsertar } = await supabase
		.from('clientes')
		.update(userData)
		.eq('nro_afiliado',userInfo.value.nroAfiliado)
	if(errorInsertar){
		alert('Hubo un error al intentar modificar los datos, verifique que todos los campos sean validos.');
		console.error(errorInsertar);
	}
	else {
		alert('Datos modificados con exito.');
		actualizarDatosPersonales();
		closeModal('edit-profile-modal');
	}
}

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
	if(!validarFechaNacimiento(selectedCotitular.value.fecha_nacimiento))
		return;

	const {data: cotitulares, error: cotitularesError} = await supabase.from('cotitulares').select('dni').eq('dni',selectedCotitular.value.dni)
	if(cotitulares.length>0){
		alert('El Cotitular a registrar ya existe.');
		return;
	} else if (cotitularesError){
		alert('Hubo un error en la base de datos.');
		console.error(cotitularesError);
		return;
	}

	const cotitularData = {
		nombre: selectedCotitular.value.nombre,
		apellido: selectedCotitular.value.apellido,
		relacion_con_titular: selectedCotitular.value.relacion_con_titular,
		dni: selectedCotitular.value.dni,
		fecha_nacimiento: selectedCotitular.value.fecha_nacimiento,
		telefono: selectedCotitular.value.telefono,
		domicilio: selectedCotitular.value.domicilio,
		sexo: selectedCotitular.value.sexo,
		email: selectedCotitular.value.email,
		nro_afiliado: userInfo.value.nroAfiliado,
		nombre_plan: userInfo.value.plan.nombre
	};
	const { data, error: errorInsertar } = await supabase.from('cotitulares').insert(cotitularData);
	if(errorInsertar){
		alert('Hubo un error al intentar registrar al cotitular, verifique que todos los campos sean validos.');
		console.error(errorInsertar);
	}
	else {
		alert('Cotitular creado con exito.');
		actualizarCotitulares();
		closeModal('add-relative-modal');
	}
}

const showModal = function (id, cotitular=null){
		if(cotitular)
			selectedCotitular.value = cotitular;
		else {
			selectedCotitular.value = [];
			newUserInfo.value = userInfo.value;
		}
		const modal = document.getElementById(id)
		if(modal && modal.classList.contains('hidden')){
			modal.classList.add('flex')
			modal.classList.remove('hidden')
		}
	}

async function deleteCotitular(){
	if(selectedCotitular){
		const { data, error: deleteError} = await supabase
			.from('cotitulares')
			.delete()
			.eq('dni', selectedCotitular.value.dni);
		if(deleteError){
			alert('Hubo un error al intentar eliminar al cotitular.');
			console.error(deleteError);
		} else {
			alert('Cotitular eliminado correctamente');
			actualizarCotitulares();
		}
	}
	closeModal('delete-relative-modal');
}

async function modificarCotitular(){
	if(!validarFechaNacimiento(selectedCotitular.value.fecha_nacimiento))
		return;

	const cotitularData = {
		nombre: selectedCotitular.value.nombre,
		apellido: selectedCotitular.value.apellido,
		fecha_nacimiento: selectedCotitular.value.fecha_nacimiento,
		telefono: selectedCotitular.value.telefono,
		domicilio: selectedCotitular.value.domicilio,
		email: selectedCotitular.value.email,
	};
	const { data, error: errorInsertar } = await supabase
		.from('cotitulares')
		.update(cotitularData)
		.eq('dni',selectedCotitular.value.dni)
	if(errorInsertar){
		alert('Hubo un error al intentar modificar al cotitular, verifique que todos los campos sean validos.');
		console.error(errorInsertar);
	}
	else {
		alert('Cotitular modificado con exito.');
		actualizarCotitulares();
		closeModal('edit-relative-modal');
	}
}

async function actualizarCotitulares(){
	const { data: nuevosCotitulares, error: updateError } = await supabase
		.from('cotitulares')
		.select('*')
		.eq('nro_afiliado', userInfo.value.nroAfiliado);
	if(updateError){
		alert('Error al actualizar los cotitulares.');
		console.error(updateError);
	} else
		userInfo.value.cotitulares = nuevosCotitulares;
}

async function actualizarDatosPersonales(){
	const { data: newUserData, error: updateDataError } = await supabase
		.from('clientes')
		.select('*')
		.eq('nro_afiliado', userInfo.value.nroAfiliado);
	if(updateDataError){
		alert('Error al actualizar los datos personales.');
		console.error(updateDataError);
	} else {
		userInfo.value.nombre = newUserData[0].nombres;
		userInfo.value.apellido = newUserData[0].apellidos;
		userInfo.value.telefono = newUserData[0].telefono;
		userInfo.value.domicilio = newUserData[0].domicilio;
		userInfo.value.dni = newUserData[0].dni;
		userInfo.value.email = newUserData[0].email;
	}

}
</script>

