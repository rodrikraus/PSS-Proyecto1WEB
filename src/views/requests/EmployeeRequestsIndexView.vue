<template>
    <div id="show-service-modal"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal"
        @click="closeAllModals">
        <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
            <div class="flex justify-between items-center gap-3">
                <p class="text-xl font-semibold">Solicitud de aprobación de «{{ selectedPrestacion.nombre_prestacion }}»</p>
                <button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full"
                    @click.stop="closeModal('show-service-modal')">
                    <i class="fa-solid fa-times text-lg"></i>
                </button>
            </div>
            <div v-if="showSuccessAlert" class="alert-success flex flex-col gap-3">
                <p>{{ successMessage.value ? successMessage.value : '' }}</p>
            </div>
            <div v-if="showErrorAlert" class="alert-error flex flex-col gap-3">
                <p>La solicitud no pudo ser aprobada/rechazada.</p>
            </div>
            <div v-if="!showSuccessAlert" class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <label for="affiliate">Afiliado solicitante</label>
                    <p>{{ selectedPrestacion.client_data ? selectedPrestacion.client_data.nombres : '' }} {{
                        selectedPrestacion.client_data ? selectedPrestacion.client_data.apellidos : '' }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="physician">Médico</label>
                    <p>{{ selectedPrestacion.medico }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="license_id">Matrícula</label>
                    <p>{{ selectedPrestacion.tipo_matricula }} {{ selectedPrestacion.matricula }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="order_date">Fecha de la orden</label>
                    <p>{{ selectedPrestacion.fecha_orden }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="service_id">Prestación</label>
                    <p>{{ selectedPrestacion.nombre_prestacion }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="order">Orden</label>
                    <a href="#" class="text-purple-700 flex items-center gap-3">
                        Descargar
                        <i class="fa-solid fa-cloud-download"></i>
                    </a>
                </div>
                <div class="flex justify-center items-center gap-4">
                    <button type="button" class="btn border-green-700 text-green-700"
                        @click="aprobarORechazarPrestacion('aprobada')">Aprobar</button>
                    <button type="button" class="btn border-red-700 text-red-700"
                        @click="aprobarORechazarPrestacion('rechazada')">Rechazar</button>
                </div>
            </div>
        </div>
    </div>
    <div id="show-reimbursement-modal"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal"
        @click="closeAllModals">
        <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
            <div class="flex justify-between items-center gap-3">
                <p class="text-xl font-semibold">Solicitud de aprobación de « {{ selectedReintegro.lugar }} »</p>
                <button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full"
                    @click.stop="closeModal('show-reimbursement-modal')">
                    <i class="fa-solid fa-times text-lg"></i>
                </button>
            </div>
            <div v-if="showSuccessAlert" class="alert-success flex flex-col gap-3">
                <p>{{ successMessage.value ? successMessage.value : '' }}</p>
            </div>
            <div v-if="showErrorAlert" class="alert-error flex flex-col gap-3">
                <p>La solicitud no pudo ser aprobada/rechazada.</p>
            </div>
            <div v-if="!showSuccessAlert" class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <label for="affiliate">Afiliado solicitante</label>
                    <p>{{ selectedReintegro.client_data ? selectedReintegro.client_data.nombres : '' }} {{
                        selectedReintegro.client_data ? selectedReintegro.client_data.apellidos : '' }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="venue">Lugar de compra</label>
                    <p>{{ selectedReintegro.lugar }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="amount">Monto a reintegrar</label>
                    <p>$ {{ selectedReintegro.monto }}</p>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="invoice">Factura de la compra</label>
                    <a href="#" class="text-purple-700 flex items-center gap-3">
                        Descargar
                        <i class="fa-solid fa-cloud-download"></i>
                    </a>
                </div>
                <div class="flex justify-center items-center gap-4">
                    <button type="button" class="btn border-green-700 text-green-700"
                        @click="aprobarORechazarReintegro('aprobada')">Aprobar</button>
                    <button type="button" class="btn border-red-700 text-red-700"
                        @click="aprobarORechazarReintegro('rechazada')">Rechazar</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loading" class="skeleton-container">
        <div class="skeleton"></div>
        <div class="skeleton"></div>
        <div class="skeleton"></div>
    </div>
    <div v-else class="container mx-auto flex gap-10">
        <div class="flex-grow flex flex-col gap-3">
            <div class="flex justify-between items-center gap-3 px-3">
                <p class="text-blue-800 text-3xl">Reintegros</p>
            </div>
            <div class="flex flex-col divide-y">
                <div v-for="solicitud in solicitudes_reintegro" class="flex items-center gap-3 px-3 py-2">
                    <div class="flex-grow flex flex-col">
                        <p class="font-semibold text-lg">{{ solicitud.lugar }}</p>
                        <p class="text-gray-400 italic text-sm">$ {{ solicitud.monto }} · {{ solicitud.client_data ?
                            solicitud.client_data.nombres : '' }} {{ solicitud.client_data ? solicitud.client_data.apellidos
        : '' }}</p>
                    </div>
                    <button type="button" class="btn border-blue-700 text-blue-700"
                        @click="showReintegroModal(solicitud)">Ver</button>
                </div>
            </div>
        </div>
        <div class="flex-grow flex flex-col gap-3">
            <div class="flex justify-between items-center gap-3 px-3">
                <p class="text-blue-800 text-3xl">Prestaciones</p>
            </div>
            <div class="flex flex-col divide-y">
                <div v-for="solicitud in solicitudes_prestacion" class="flex items-center gap-3 px-3 py-2">
                    <div class="flex-grow flex flex-col">
                        <p class="font-semibold text-lg">{{ solicitud.nombre_prestacion }}</p>
                        <p class="text-gray-400 italic text-sm">{{ solicitud.medico }} · {{ solicitud.client_data ?
                            solicitud.client_data.nombres : '' }} {{ solicitud.client_data ? solicitud.client_data.apellidos
        : '' }}</p>
                    </div>
                    <button type="button" class="btn border-blue-700 text-blue-700"
                        @click="showPrestacionModal(solicitud)">Ver</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { closeAllModals, closeModal } from '@/helpers'
import { ref, onBeforeMount } from 'vue';
import { supabase } from '../../supabase.js';

const solicitudes_prestacion = ref([]);
const solicitudes_reintegro = ref([]);
const loading = ref(true);

const selectedReintegro = ref([]);
const selectedPrestacion = ref([]);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);

const successMessage = String;

const fetchSolicitudesPendientesPrestacion = async () => {
    const { data: data, error: error } = await supabase
        .from('solicitudes_prestaciones')
        .select('*')
        .eq('estado', "pendiente")
    if (error) {
        console.log(error);
    } else if (data.length > 0) {
        solicitudes_prestacion.value = data;
    }
};

const fetchSolicitudesPendientesReintegro = async () => {
    const { data: data, error: error } = await supabase
        .from('solicitudes_reintegros')
        .select('*')
        .eq('estado', "pendiente")
    if (error) {
        console.log(error);
    } else if (data.length > 0) {
        solicitudes_reintegro.value = data;
    }
};

const fetchAfiliadosSolicitantesPrestacion = async () => {
    for (let i = 0; i < solicitudes_prestacion.value.length; i++) {
        try {
            const { data, error } = await supabase
                .from('clientes')
                .select('nombres, apellidos')
                .eq('nro_afiliado', solicitudes_prestacion.value[i].cliente)
            if (error) {
                showErrorAlert.value = true;
                console.error(error);
            } else {
                solicitudes_prestacion.value[i].client_data = data[0];
            }
        } catch (e) {
            console.error(e);
        }
    }
};

const fetchAfiliadosSolicitantesReintegro = async () => {
    for (let i = 0; i < solicitudes_reintegro.value.length; i++) {
        try {
            const { data, error } = await supabase
                .from('clientes')
                .select('nombres, apellidos')
                .eq('nro_afiliado', solicitudes_reintegro.value[i].cliente)
            if (error) {
                showErrorAlert.value = true;
                console.error(error);
            } else {
                solicitudes_reintegro.value[i].client_data = data[0];
            }
        } catch (e) {
            console.error(e);
        }
    }
};

async function aprobarORechazarPrestacion(action = null) {
    try {
        const { error } = await supabase
            .from('solicitudes_prestaciones')
            .update({
                estado: action
            })
            .eq('id', selectedPrestacion.value.id)
        if (error) {
            showErrorAlert.value = true;
            console.error(error);
        } else {
            await fetchSolicitudesPendientesPrestacion();
            await fetchAfiliadosSolicitantesPrestacion();
            if (action == 'aprobada') {
                successMessage.value = 'La solicitud se aprobó con éxito.'
            } else {
                successMessage.value = 'La solicitud se rechazó con éxito.'
            }
            showSuccessAlert.value = true;
        }
    } catch (e) {
        console.error(e);
    }
};

async function aprobarORechazarReintegro(action = null) {
    try {
        const { error } = await supabase
            .from('solicitudes_reintegros')
            .update({
                estado: action
            })
            .eq('id_reintegro', selectedReintegro.value.id_reintegro)
        if (error) {
            showErrorAlert.value = true;
            console.error(error);
        } else {
            await fetchSolicitudesPendientesReintegro();
            await fetchAfiliadosSolicitantesReintegro();
            if (action == 'aprobada') {
                successMessage.value = "La solicitud se aprobó con éxito."
            } else {
                successMessage.value = "La solicitud se rechazó con éxito."
            }
            showSuccessAlert.value = true;
        }
    } catch (e) {
        console.error(e);
    }
};

const showReintegroModal = function (reintegro = null) {
    showSuccessAlert.value = false;
    showErrorAlert.value = false;
    selectedReintegro.value = JSON.parse(JSON.stringify(reintegro));
    const modal = document.getElementById('show-reimbursement-modal')
    if (modal && modal.classList.contains('hidden')) {
        modal.classList.add('flex')
        modal.classList.remove('hidden')
    }
}

const showPrestacionModal = function (prestacion = null) {
    showSuccessAlert.value = false;
    showErrorAlert.value = false;
    selectedPrestacion.value = JSON.parse(JSON.stringify(prestacion));
    const modal = document.getElementById('show-service-modal')
    if (modal && modal.classList.contains('hidden')) {
        modal.classList.add('flex')
        modal.classList.remove('hidden')
    }
}

onBeforeMount(async () => {
    try {
        await fetchSolicitudesPendientesReintegro();
        await fetchSolicitudesPendientesPrestacion();
        await fetchAfiliadosSolicitantesReintegro();
        await fetchAfiliadosSolicitantesPrestacion();
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
});

</script>