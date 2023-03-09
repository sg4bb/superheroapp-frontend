<script setup>
import { ref } from "@vue/reactivity";
import NavbarDrawer from "./NavbarDrawer.vue";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();

const rightDrawerOpen = ref(false);

const userLogged = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn flat no-caps no-wrap class="q-ml-none" to="/">
        <img
          src="https://www.bigstwincities.org/wp-content/uploads/2017/01/superhero-comic-book-pow.png"
          style="height: 37px; width: 50px"
        />
        <q-toolbar-title class="text-weight-bold">
          Quasar Super-Hero
        </q-toolbar-title>
      </q-btn>

      <q-space />

      <q-btn
        v-if="userStore.id != null"
        dense
        flat
        round
        icon="menu"
        @click="toggleRightDrawer"
      />

      <div class="q-gutter-md" v-else>
        <q-btn label="Login" size="md" to="/login" flat dense />
        <q-btn label="Register" size="md" to="register" flat dense />
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-if="userStore.id != null"
    show-if-above
    v-model="rightDrawerOpen"
    side="right"
  >
    <NavbarDrawer />
  </q-drawer>
</template>
