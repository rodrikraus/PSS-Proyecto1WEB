<template>
	<EditServiceModal :selectedPrestacion="selectedPrestacion" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert" :showFormatErrorAlert="showFormatErrorAlert"
		@close="closeModal" @save="editPrestacion"/>
	<AddServiceModal :selectedPrestacion="selectedPrestacion" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert" :showFormatErrorAlert="showFormatErrorAlert"
		@close="closeModal" @save="addPrestacion" />
	<DeleteServiceModal :selectedPrestacion="selectedPrestacion" :showSuccessAlert="showSuccessAlert" :showErrorAlert="showErrorAlert"
		@close="closeModal" @delete="deletePrestacion" />

		<div class="container mx-auto flex gap-10">
		<div class="flex-grow flex flex-col gap-3">
			<div class="flex justify-between items-center gap-3 px-3">
				<p class="text-blue-800 text-3xl">Prestaciones</p>
				<button type="button" class="btn border-green-700 text-green-700" @click="showModal('add-service-modal')">Agregar</button>
			</div>
			<div class="flex flex-col divide-y">
				<div v-for="prestacion in prestaciones" class="flex items-center gap-3 px-3 py-2">
					<div class="flex-grow flex flex-col">
						<p class="font-semibold text-lg">{{ prestacion.nombre }}</p>
						<p class="text-gray-400 italic text-sm">{{ prestacion.plan_count }} planes</p>
					</div>
					<button type="button" class="btn border-blue-700 text-blue-700" @click="showModal('edit-service-modal', prestacion)">Editar</button>
					<button type="button" class="btn border-red-700 text-red-700" @click="showModal('delete-service-modal', prestacion)">Eliminar</button>
				</div>
			</div>
		</div>
	</div>

</template>

<script setup>
import { ref, onBeforeMount} from 'vue';
import { supabase } from '../../supabase.js';
import EditServiceModal from './EditServiceModal.vue';
import AddServiceModal from './AddServiceModal.vue';
import DeleteServiceModal from './DeleteServiceModal.vue';

const prestaciones= ref([]);
const selectedPrestacion = ref([]);

const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const showFormatErrorAlert = ref(false);

const formatoValido = /^.+ \(\d+%\)$/;

function validarNombrePrestacion(nombre) {
  // Utiliza la expresión regular para verificar si el nombre cumple con el formato
  return formatoValido.test(nombre);
}

const fetchPrestaciones = async () => {
	const { data: data, error: error } = await supabase
		.from('prestaciones')
		.select('*')
	if (error) {
		errorMessage.value = 'Error al cargar las prestaciones';
	} else if (data.length > 0) {
		prestaciones.value = data;
		await fetchPlanCounts();
	}
};

const fetchPlanCounts = async () => {
	try {
		await Promise.all(
			prestaciones.value.map(async (prestacion) => {
				const { data, error } = await supabase
					.from('ofrece')
					.select('id_plan')
					.eq('id_prestacion', prestacion.id);
				if (error) {
					console.error(error);
				} else {
					// Contar la cantidad de resultados para obtener el recuento de planes
					prestacion.plan_count = data.length;
					prestacion.planes = data;
				}
			})
		);
	} catch (error) {
		console.error(error);
	}
};

const fetchPlanClientCount= async () => {
	selectedPrestacion.value.client_count = 0;
	for(let i = 0; i < selectedPrestacion.value.planes.length; i++){
		try {
		const { data, error } = await supabase
			.from('clientes')
			.select('id_plan')
			.eq('id_plan', selectedPrestacion.value.planes[i].id_plan)
		if (error) {
			showErrorAlert.value = true;
			console.error(error);
		} else {
			selectedPrestacion.value.client_count += data.length;
		}
		} catch (e) {
			console.error(e);
		}
	}
};

const addPrestacion = async () => {
  if (validarNombrePrestacion(selectedPrestacion.value.nombre)) {
    try {
      const { data, error } = await supabase
        .from('prestaciones')
        .insert([
          {
            nombre: selectedPrestacion.value.nombre,
            descripcion: selectedPrestacion.value.descripcion,
          },
        ]);

      if (error) {
        showErrorAlert.value = true;
        console.error(error);
      } else {
        fetchPrestaciones();
		showFormatErrorAlert.value = false;
        showSuccessAlert.value = true;
        showErrorAlert.value = false;
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    showFormatErrorAlert.value = true;
  }
};

const deletePrestacion = async () => {
	if (selectedPrestacion.value) {
		if(selectedPrestacion.value.plan_count != 0){
			await fetchPlanClientCount();
			if(selectedPrestacion.value.client_count == 0){
				deletePres();
			}
			else{
				showErrorAlert.value = true;
			}
		}
		else{
			deletePres();
		}
	}
};

const deletePres = async() => {
	const { data: data, error: error } = await supabase
			.from('prestaciones')
			.delete()
			.eq('nombre', selectedPrestacion.value.nombre)
		if (error) {
			
		} else {
			fetchPrestaciones();
			showSuccessAlert.value = true;
		}
};

const editPrestacion = async () => {
  if (selectedPrestacion.value) {
    if (!selectedPrestacion.value.nombre || !selectedPrestacion.value.descripcion) {
      showErrorAlert.value = true;
    } else if (validarNombrePrestacion(selectedPrestacion.value.nombre)) {
      const { data, error } = await supabase
        .from('prestaciones')
        .update({
          nombre: selectedPrestacion.value.nombre,
          descripcion: selectedPrestacion.value.descripcion,
        })
        .eq('id', selectedPrestacion.value.id);

      if (error) {
        console.log(error);
      } else {
        fetchPrestaciones();
		showFormatErrorAlert.value = false;
        showSuccessAlert.value = true;
        showErrorAlert.value = false;
      }
    } else {
      showFormatErrorAlert.value = true;
    }
  }
};

const showModal = function (id, prestacion = null) {
	showFormatErrorAlert.value = false;
	showSuccessAlert.value = false;
	showErrorAlert.value = false;
	if (prestacion) {
		selectedPrestacion.value = JSON.parse(JSON.stringify(prestacion));
	} else {
		selectedPrestacion.value = [];
	}
	const modal = document.getElementById(id)
	if (modal.classList.contains('hidden')) {
		modal.classList.add('flex')
		modal.classList.remove('hidden')
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
	showFormatErrorAlert.value = false;
};

onBeforeMount(() => {
	fetchPrestaciones();
});

</script>