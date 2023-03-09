<template>
  <q-scroll-area
    style="
      height: calc(100% - 150px);
      margin-top: 150px;
      border-right: 1px solid #ddd;
    "
  >
    <q-list padding>
      <q-item clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section> Home </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/hero/consult">
        <q-item-section avatar>
          <q-icon name="search" />
        </q-item-section>

        <q-item-section> Consultar </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/hero/mod">
        <q-item-section avatar>
          <q-icon name="edit" />
        </q-item-section>

        <q-item-section> Modificar </q-item-section>
      </q-item>

    </q-list>
  </q-scroll-area>

  <q-img
    class="absolute-top"
    src="https://cdn.quasar.dev/img/parallax2.jpg"
    style="height: 150px"
  >
    <div class="absolute-full text-subtitle2 flex flex-center"></div>
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <div class="text-weight-bold">{{ userStore.name }}</div>
      <div>{{ userStore.email }}</div>
    </div>
  </q-img>

  <div class="absolute-bottom bg-transparent q-pb-md">
    <div class="row justify-center">
      <q-btn color="primary" @click="logout">Cerrar sesion</q-btn>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  try {
    let res = await axios.post("http://127.0.0.1:8000/api/logout", {
      user_id: userStore.id,
    });

    axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

    console.log(res);

    userStore.clearUser();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
