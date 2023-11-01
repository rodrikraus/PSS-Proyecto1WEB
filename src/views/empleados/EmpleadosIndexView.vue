<template>
	<div id="add-employee-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
		<div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
			<div class="flex justify-between items-center gap-3">
				<p class="text-xl font-semibold">Agregar un empleado</p>
				<button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full" @click.stop="closeModal('add-employee-modal')">
					<i class="fa-solid fa-times text-lg"></i>
				</button>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex flex-col gap-1">
					<label for="name">Nombres</label>
					<input type="text" v-model="names" id="name" class="input-text">
				</div>
				<div class="flex flex-col gap-1">
					<label for="lastname">Apellidos</label>
					<input type="text" id="lastname" v-model="lastnames" class="input-text">
				</div>
				<div class="flex flex-col gap-1">
					<label for="email">Correo electrónico</label>
					<input type="email" id="email" v-model="email" class="input-text">
				</div>
				<div class="flex flex-col gap-1">
					<label for="phone">Teléfono</label>
					<input type="tel" id="phone" v-model="phone" class="input-text">
				</div>
				<div class="flex flex-col gap-1 md:col-span-2">
					<label for="address">Domicilio</label>
					<input type="text" id="address" v-model="address" class="input-text">
				</div>
				<div class="flex flex-col gap-1">
					<label for="password">Contraseña</label>
					<input type="password" id="password" v-model="password" class="input-text">
				</div>
				<div class="flex flex-col gap-1">
					<label for="password-confirmation">Repetir contraseña</label>
					<input type="password" id="password-confirmation" v-model="passwordConfirmation" class="input-text">
				</div>
			</div>
			<div v-if="validationMessage" :class="'text-red-700'">
				<div v-html="validationMessage"></div>
			</div>
			<button type="button" class="btn border-green-700 text-green-700" @click="validateAndSave">
				Guardar
			</button>
		</div>
	</div>
	<div class="container mx-auto flex gap-10">
		<div class="flex-grow flex flex-col gap-3">
			<div class="flex justify-between items-center gap-3 px-3">
				<p class="text-blue-800 text-3xl">Empleados</p>
				<button type="button" class="btn border-green-700 text-green-700" @click="showModal('add-employee-modal')">Agregar</button>
			</div>
			<div class="flex flex-col divide-y">
				<div class="flex items-center gap-3 px-3 py-2">
					<p class="flex-grow font-semibold text-lg">Jack Deer</p>
				</div>
				<div class="flex items-center gap-3 px-3 py-2">
					<p class="flex-grow font-semibold text-lg">Joshua Buck</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {showModal,closeModal,closeAllModals} from '@/helpers'
import { supabase } from '../../supabase';
import { ref } from 'vue';

const names = ref('');
const lastnames = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const validationMessage = ref('');
const isValid = ref(false);

function validateAndSave(){
	validateData();

	if(isValid.value){
		createEmployee();
		closeModal('add-employee-modal');
		eraseProperties();
	}
}

function validateData(){
	isValid.value = names.value.length > 0 && lastnames.value.length > 0
		&& /^[^@]+@\w+(\.\w+)+\w$/.test(email.value) && phone.value.length > 0
		&& phone.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im) 
		&& address.value.length > 0 
		&& password.value.length > 0
		&& password.value.valueOf() == passwordConfirmation.value.valueOf();

	if(!isValid.value){
		validationMessage.value = "<section>Credenciales inválidas: <lu>";

		if(names.value.length == 0){
			validationMessage.value += "<li>El campo 'Nombres' no puede ser vacío</li>";
		}
		if(lastnames.value.length == 0){
			validationMessage.value += "<li>El campo 'Apellidos' no puede ser vacío</li>";
		}
		if(!email.value.match(/^[^@]+@\w+(\.\w+)+\w$/)){
			validationMessage.value += "<li>El mail es inválido</li>";
		}
		if(!phone.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
			validationMessage.value += "<li>Formato de número telefónico inválido</li>";
		}
		if(address.value.length == 0){
			validationMessage.value += "<li>El campo 'Domicilio' no puede ser vacío</li>";
		}
		if(password.value.length == 0){
			validationMessage.value += "<li>La contraseña no puede ser vacía</li>"
		}
		if(password.value.valueOf() != passwordConfirmation.value.valueOf()){
			validationMessage.value += "<li>Las contraseñas no coinciden</li>"
		}
		validationMessage.value += "</lu></section>";
	}
}

const createEmployee = async () => {
	const {error} = await supabase
		.from('empleados')
		.insert({
			email: email.value,
			contrasena: password.value,
			nombre: names.value,
			apellido: lastnames.value
		});
}

function eraseProperties(){
	names.value = '';
	lastnames.value = '';
	email.value = '';
	phone.value = '';
	address.value = '';
	password.value = '';
	passwordConfirmation.value = '';
}

</script>