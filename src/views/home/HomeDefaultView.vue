<template>
	<div class="container">
		Y este random quien es???
		<img src="https://i.redd.it/iyfb41n8hv171.jpg" alt="">
	</div>
</template>

<script setup>
	import { ref } from 'vue';
  	import { useRouter } from 'vue-router';
	import { credenciales } from '@/router/index.js';

	const router = useRouter()
	if(credenciales.value.rol==="cliente")
		router.push('/client');
	else if(credenciales.value.rol==="empleado")
		router.push('/employee');
	else if(credenciales.value.rol==="admin")
		router.push('/plans');
</script>

