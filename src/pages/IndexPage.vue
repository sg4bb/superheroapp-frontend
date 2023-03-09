<template>
  <HomeLogged v-if="userStore.id != null" />

  <HomeUnlogged v-else />
</template>

<script setup>
import { useUserStore } from "src/stores/user-store";
import HomeLogged from "./../components/Logged/HomeLogged.vue"
import HomeUnlogged from "./../components/Home.vue"


const userStore = useUserStore();

</script>
