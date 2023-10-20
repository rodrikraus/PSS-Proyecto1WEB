<template>
    <div id="add-service-modal" class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal" @click="closeAllModals">
        <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
            <div class="flex justify-between items-center gap-3">
                <p class="text-xl font-semibold">Agregar una prestación</p>
                <button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full" @click.stop="closeModal('add-service-modal')">
                    <i class="fa-solid fa-times text-lg"></i>
                </button>
            </div>
            <div v-if="showSuccessAlert" class="alert-success flex flex-col gap-3">
                <p>La prestación ha sido añadida con éxito.</p>
            </div>
            <div v-if="showErrorAlert" class="alert-error flex flex-col gap-3">
                <p>Debe rellenar todos los campos.</p>
            </div>
            <div v-if="showFormatErrorAlert" class="alert-error flex flex-col gap-3">
                <p>El nombre debe incluir el porcentaje de cubrimiento.</p>
            </div>
            <div v-if="!showSuccessAlert" class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <label for="name">Nombre con porcentaje</label>
                    <input v-model="selectedPrestacion.nombre" type="text" id="name" class="input-text">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="description">Descripción</label>
                    <textarea v-model="selectedPrestacion.descripcion" type="text" id="description" class="input-text"></textarea>
                </div>
                <button type="button" class="btn border-green-700 text-green-700" @click="addPrestacion">Guardar</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    emits: ['close', 'save'],
    props: {
        selectedPrestacion: Object,
        showSuccessAlert: Boolean,
        showErrorAlert: Boolean,
        showFormatErrorAlert: Boolean,
    },
    methods: {
        closeModal() {
            this.$emit('close', 'add-service-modal');
        },

        addPrestacion() {
            this.$emit('save');
        },
    },
}
</script>