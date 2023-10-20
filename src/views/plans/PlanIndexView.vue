<template>
	<EditPlanModal :selectedPlan="selectedPlan" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert" :prestacionesDisponibles="prestacionesDisponibles" :selectedPrestaciones="selectedPrestaciones" :prestacionesSeleccionadasNuevas="prestacionesSeleccionadasNuevas"
		@close="closeModal" @save="editPlan"/>
	<AddPlanModal :selectedPlan="selectedPlan" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert" :prestacionesDisponibles="prestacionesDisponibles" :selectedPrestaciones="selectedPrestaciones"
		@close="closeModal" @save="addPlan" />
	<DeletePlanModal :selectedPlan="selectedPlan" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert"
		@close="closeModal" @delete="deletePlan" />

	<div class="container mx-auto flex gap-10">
		<div class="flex-grow flex flex-col gap-3">
			<div class="flex justify-between items-center gap-3 px-3">
				<p class="text-blue-800 text-3xl">Planes</p>
				<button type="button" class="btn border-green-700 text-green-700"
					@click="showModal('add-plan-modal')">Agregar</button>
			</div>
			<div class="flex flex-col divide-y">
				<div v-for="plan in plans" class="flex items-center gap-3 px-3 py-2">
					<div class="flex-grow flex flex-col">
						<p class="font-semibold text-lg">{{ plan.nombre }}</p>
						<p class="text-gray-400 italic text-sm">{{ plan.client_count }} clientes</p>
					</div>
					<button type="button" class="btn border-blue-700 text-blue-700"
						@click="showModal('edit-plan-modal', plan)">Editar</button>
					<button type="button" class="btn border-red-700 text-red-700"
						@click="showModal('delete-plan-modal', plan)">Eliminar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { supabase } from '../../supabase.js';
import EditPlanModal from './EditPlanModal.vue';
import AddPlanModal from './AddPlanModal.vue';
import DeletePlanModal from './DeletePlanModal.vue';

const plans = ref([]);
const selectedPlan = ref([]);

const prestaciones = ref([]);
const selectedPrestaciones = ref([]);

const prestacionesSeleccionadasNuevas = ref([]);

const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

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
		await fetchClientCounts();
	}
};


const prestacionesDisponibles = computed(() => {
	if (!selectedPlan) {
		return prestaciones.value;
	} else {
		return prestaciones.value.filter((prestacion) => {
		return !selectedPrestaciones.value.some((selected) => selected.nombre === prestacion.nombre);
		});
	}
	});

/*
const computePrestacionesDisponibles = () => {
	console.log(selectedPlan.value);
	console.log(prestaciones.value);
	console.log(selectedPrestaciones.value);
    if (!selectedPlan.value || !prestaciones.value || !selectedPrestaciones.value) {
        return prestaciones.value;
    } else {
        return prestaciones.value.filter((prestacion) => {
            return !selectedPrestaciones.value.some((selected) => selected.nombre === prestacion.nombre);
        });
    }
};
*/
const fetchClientCounts = async () => {
	try {
		await Promise.all(
			plans.value.map(async (plan) => {
				const { data, error } = await supabase
					.from('clientes')
					.select('nombre_plan')
					.eq('nombre_plan', plan.nombre);
				if (error) {
					console.error(error);
				} else {
					// Contar la cantidad de resultados para obtener el recuento de clientes
					plan.client_count = data.length;
				}
			})
		);
	} catch (error) {
		console.error(error);
	}
};

const fetchSelectedPrestaciones = async (plan) => {
	const { data: data, error: error } = await supabase
		.from('ofrece')
		.select('nombre')
		.eq('id_plan', plan.id)
	if (error) {
		console.log(error);
	} else if (data.length > 0) {
		selectedPrestaciones.value = data;
	} else{
		selectedPrestaciones.value = [];
	}
};

const showModal = function (id, plan = null) {
	showSuccessAlert.value = false;
	showErrorAlert.value = false;
	if (plan) {
		selectedPlan.value = JSON.parse(JSON.stringify(plan));
    	fetchSelectedPrestaciones(plan);
	} else {
		selectedPlan.value = [];
		selectedPrestaciones.value = [];
	}
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
			showErrorAlert.value = false;
		}
	} catch (e) {
		console.error(e);
	}
};

const deletePlan = async () => {
	if (selectedPlan.value && selectedPlan.value.client_count == 0) {
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
	else {
		showErrorAlert.value = true;
	}
};

const editPlan = async () => {
	if (selectedPlan.value) {
		if (!selectedPlan.value.nombre || !selectedPlan.value.precio_menor_21 
		|| !selectedPlan.value.precio_21_35 || !selectedPlan.value.precio_35_55 || !selectedPlan.value.precio_mayor_55) {
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
	showErrorAlert.value = false;
};

const closeAllModals = function () {
	const modals = document.getElementsByClassName('modal')
	for (let i = 0; i < modals.length; i++) {
		let modal = modals.item(i)
		modal.classList.add('hidden')
		modal.classList.remove('flex')
	}
	showErrorAlert.value = false;
};

onBeforeMount(() => {
	fetchPlans();
	fetchPrestaciones();
});

</script>