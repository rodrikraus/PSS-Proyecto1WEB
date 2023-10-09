<template>
    <div id="delete-plan-modal"
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 hidden justify-center items-center z-20 modal"
        @click="closeAllModals">
        <div class="max-w-7xl rounded-lg bg-gray-100 p-10 flex flex-col gap-6" @click.stop="">
            <div class="flex justify-between items-center gap-3">
                <p class="text-xl font-semibold">Eliminar plan </p>
                <button type="button" class="w-8 h-8 hover:bg-gray-200 rounded-full modal"
                    @click.stop="closeModal('delete-plan-modal')">
                    <i class="fa-solid fa-times text-lg"></i>
                </button>
            </div>
            <div v-if="!showSuccessAlert" class="flex flex-col gap-3">
                <p>¿Está seguro que desea eliminar el plan «{{ selectedPlan.nombre }}»? Esta acción no se puede deshacer.
                </p>
                <div class="flex justify-end">
                    <button type="button" class="btn border-red-700 text-red-700" @click="deletePlan()">Eliminar</button>
                </div>
            </div>
            <div v-if="showSuccessAlert" class="alert-success flex flex-col gap-3">
                <p>El plan ha sido eliminado con éxito.</p>
            </div>
            <div v-if="showErrorAlert" class="alert-error flex flex-col gap-3">
                <p>El plan no puede ser eliminado porque hay clientes asociados al mismo.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close', 'delete'],
    props: {
        selectedPlan: Object,
        showSuccessAlert: Boolean,
        showErrorAlert: Boolean,
    },

    methods: {
        closeModal() {
            this.$emit('close', 'delete-plan-modal');
        },

        deletePlan() {
            this.$emit('delete');
        },
    },
}
</script>