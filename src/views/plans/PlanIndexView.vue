<template>
	<EditPlanModal :selectedPlan="selectedPlan" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert"
		@close="closeModal" @save="editPlan" />
	<AddPlanModal :selectedPlan="selectedPlan" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert"
		@close="closeModal" @save="addPlan" />
	<DeletePlanModal :selectedPlan="selectedPlan" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert"
		@close="closeModal" @delete="deletePlan" />

	<div class="container mx-auto flex gap-10">
		<div class="flex-grow flex flex-col gap-3">
			<div class="flex justify-between items-center gap-3 px-3">
				<p class="text-blue-800 text-3xl">Planes</p>
				<button type="button" class="btn border-green-700 text-green-700"
					@click="addPlanModal('add-plan-modal')">Agregar</button>
			</div>
			<div class="flex flex-col divide-y">
				<div v-for="plan in plans" class="flex items-center gap-3 px-3 py-2">
					<div class="flex-grow flex flex-col">
						<p class="font-semibold text-lg">{{ plan.nombre }}</p>
						<p class="text-gray-400 italic text-sm">132 clientes</p>
					</div>
					<button type="button" class="btn border-blue-700 text-blue-700"
						@click="editPlanModal('edit-plan-modal', plan)">Editar</button>
					<button type="button" class="btn border-red-700 text-red-700"
						@click="deletePlanModal('delete-plan-modal', plan)">Eliminar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase.js';
import EditPlanModal from './EditPlanModal.vue';
import AddPlanModal from './AddPlanModal.vue';
import DeletePlanModal from './DeletePlanModal.vue';

const plans = ref([]);
const prestaciones = ref([]);
const selectedPlan = ref([]);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

const selectedPrestaciones = ref([]);

const fetchPrestaciones = async () => {
	const { data: data, error: error } = await supabase
		.from('prestaciones')
		.select('*')
	if (error) {
		errorMessage.value = 'Error al cargar las prestaciones';
	} else if (data.length > 0) {
		prestaciones.value = data;
	}
};

const fetchPlans = async () => {
	const { data: data, error: error } = await supabase
		.from('planes')
		.select('*')
	if (error) {
		errorMessage.value = 'Error al cargar los planes';
	} else if (data.length > 0) {
		plans.value = data;
	}
};

const fetchSelectedPrestaciones = async () => {
	const { data: data, error: error } = await supabase
		.from('prestaciones')
		.select('*')
		.eq('id', selectedPlan.value.id)
	if (error) {
		errorMessage.value = 'Error al cargar los planes';
	} else if (data.length > 0) {
		selectedPrestaciones.value = data;
	}
};

// Función para mover una prestación a "prestaciones disponibles"
const moveToAvailable = () => {
	if (selectedPrestaciones.value.length > 0) {
		const prestacion = selectedPrestaciones.value.pop();
		availablePrestaciones.value.push(prestacion);
	}
};

// Función para mover una prestación a "prestaciones seleccionadas"
const moveToSelected = () => {
	if (availablePrestaciones.value.length > 0) {
		const prestacion = availablePrestaciones.value.pop();
		selectedPrestaciones.value.push(prestacion);
	}
};

const addPlanModal = function (id) {
	showSuccessAlert.value = false;
	showErrorAlert.value = false;
	selectedPlan.value = [];
	const modal = document.getElementById(id)
	if (modal.classList.contains('hidden')) {
		modal.classList.add('flex')
		modal.classList.remove('hidden')
	}
};

const addPlan = async () => {
	try {
		const { data, error } = await supabase
			.from('planes')
			.insert([{
				nombre: selectedPlan.value.nombre,
				descripcion: selectedPlan.value.descripcion,
				precio_menor_21: selectedPlan.value.precio_menor_21,
				precio_21_35: selectedPlan.value.precio_21_35,
				precio_35_55: selectedPlan.value.precio_35_55,
				precio_mayor_55: selectedPlan.value.precio_mayor_55,
			}
			]);

		if (error) {
			showErrorAlert.value = true;
			console.error(error);
		} else {
			fetchPlans();
			showSuccessAlert.value = true;
		}
	} catch (e) {
		console.error(e);
	}
};

const deletePlanModal = function (id, plan = null) {
	showSuccessAlert.value = false;
	showErrorAlert.value = false;
	if (plan) {
		const modal = document.getElementById(id)
		selectedPlan.value = plan
		if (modal.classList.contains('hidden')) {
			modal.classList.add('flex')
			modal.classList.remove('hidden')
		}
	}
};

const deletePlan = async () => {
	if (selectedPlan.value) {
		const { data: data, error: error } = await supabase
			.from('planes')
			.delete()
			.eq('id', selectedPlan.value.id)
		if (error) {
			errorMessage.value = 'Error al cargar los planes';
		} else {
			fetchPlans();
			showSuccessAlert.value = true;
		}
	}
};

const editPlanModal = function (id, plan = null) {
	showSuccessAlert.value = false;
	showErrorAlert.value = false;
	if (plan) {
		const modal = document.getElementById(id)
		selectedPlan.value = plan
		if (modal.classList.contains('hidden')) {
			modal.classList.add('flex')
			modal.classList.remove('hidden')
		}
	}
};

const editPlan = async () => {
	if (selectedPlan.value) {
		if (!selectedPlan.value.nombre || !selectedPlan.value.precio_menor_21 || !selectedPlan.value.precio_21_35 || !selectedPlan.value.precio_35_55 || !selectedPlan.value.precio_mayor_55) {
			showErrorAlert.value = true;
		}
		else {
			const { data: data, error: error } = await supabase
				.from('planes')
				.update({
					nombre: selectedPlan.value.nombre,
					descripcion: selectedPlan.value.descripcion,
					precio_menor_21: selectedPlan.value.precio_menor_21,
					precio_21_35: selectedPlan.value.precio_21_35,
					precio_35_55: selectedPlan.value.precio_35_55,
					precio_mayor_55: selectedPlan.value.precio_mayor_55
				})
				.eq('id', selectedPlan.value.id)
			if (error) {
				errorMessage.value = 'Error al editar el plan';
				console.log(error);
			} else {
				fetchPlans();
				showSuccessAlert.value = true;
				showErrorAlert.value = false;
			}
		}
	}
};

const closeModal = function (id) {
	const modal = document.getElementById(id)
	if (modal.classList.contains('flex')) {
		modal.classList.add('hidden')
		modal.classList.remove('flex')
	}
	showSuccessAlert.value = false;
};

const closeAllModals = function () {
	const modals = document.getElementsByClassName('modal')
	for (let i = 0; i < modals.length; i++) {
		let modal = modals.item(i)
		modal.classList.add('hidden')
		modal.classList.remove('flex')
	}
};

onMounted(() => {
	fetchPlans();
	fetchPrestaciones();
});

</script>