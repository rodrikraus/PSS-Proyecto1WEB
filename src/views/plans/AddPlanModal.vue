<template>
    <div id="add-plan-modal"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal"
        @click="closeAllModals">
        <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
            <div class="flex justify-between items-center gap-3">
                <p class="text-xl font-semibold">Agregar un plan</p>
                <button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full"
                    @click.stop="closeModal('add-plan-modal')">
                    <i class="fa-solid fa-times text-lg"></i>
                </button>
            </div>
            <div v-if="showSuccessAlert" class="alert-success flex flex-col gap-3">
                <p>El plan ha sido añadido con éxito.</p>
            </div>
            <div v-if="showErrorAlert" class="alert-error flex flex-col gap-3">
                <p>Debe rellenar todos los campos.</p>
            </div>
            <div v-if="!showSuccessAlert" class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <label for="name">Nombre</label>
                    <input v-model="selectedPlan.nombre" type="text" id="name" class="input-text">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="description">Descripción</label>
                    <textarea v-model="selectedPlan.descripcion" id="description"></textarea>
                </div>
                <div class="flex flex-col gap-1">
                    <label>Elegir prestaciones</label>
                    <div class="flex items-center gap-3">
                        <div class="flex-grow">
                            <p class="font-bold">Prestaciones seleccionadas</p>
                            <select multiple>
                                <option>{{}}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-3">
                            <button type="button" class="btn border-green-700 text-green-700" @click="moveToSelected">
                                <i class="fa-solid fa-angles-left"></i>
                            </button>
                            <button type="button" class="btn border-red-700 text-red-700" @click="moveToAvailable">
                                <i class="fa-solid fa-angles-right"></i>
                            </button>
                        </div>
                        <div class="flex-grow">
                            <p class="font-bold">Prestaciones disponibles</p>
                            <select multiple>
                                <option>{{}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <label>Elegir precios por edad</label>
                    <div class="flex flex-col divide-y">
                        <div class="flex items-center gap-3 px-3 py-2">
                            <label for="menores-21" class="flex-grow">Menores de 21 años</label>
                            <i class="fa-solid fa-dollar-sign"></i>
                            <input v-model="selectedPlan.precio_menor_21" type="number" min="0" step="1" id="menores-21"
                                class="input-text">
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2">
                            <label for="21-35" class="flex-grow">De 21 años a 35 años</label>
                            <i class="fa-solid fa-dollar-sign"></i>
                            <input v-model="selectedPlan.precio_21_35" type="number" min="0" step="1" id="21-35"
                                class="input-text">
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2">
                            <label for="36-55" class="flex-grow">De 36 años a 55 años</label>
                            <i class="fa-solid fa-dollar-sign"></i>
                            <input v-model="selectedPlan.precio_35_55" type="number" min="0" step="1" id="36-55"
                                class="input-text">
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2">
                            <label for="55-mas" class="flex-grow">De 56 años en adelante</label>
                            <i class="fa-solid fa-dollar-sign"></i>
                            <input v-model="selectedPlan.precio_mayor_55" type="number" min="0" step="1" id="55-mas"
                                class="input-text">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn border-green-700 text-green-700" @click="addPlan">Guardar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close', 'save'],
    props: {
        selectedPlan: Object,
        showSuccessAlert: Boolean,
        showErrorAlert: Boolean,
    },
    methods: {
        closeModal() {
            this.$emit('close', 'add-plan-modal');
        },

        addPlan() {
            this.$emit('save');
        },
    },
}
</script>