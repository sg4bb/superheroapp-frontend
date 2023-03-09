<script setup>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore;

const loading = ref(true);

const columns = [
  {
    name: "IdHero",
    required: true,
    label: "IdHero",
    align: "left",
    field: "id",
    sortable: false,
  },
  {
    name: "Nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "Descripcion",
    align: "center",
    label: "Descripción",
    field: "descripcion",
    sortable: false,
  },
];

const rows = ref([]);


async function getHero() {

  try {
    let res = await axios.get("http://127.0.0.1:8000/api/superheros");

    for (var i = 0; i < res.data.data.length; i++) {

      rows.value.push(res.data.data[i]);
    }

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }

}

getHero();
</script>

<template>
  <h3 class="text-weight-bolder text-center text-primary">
    Consultar
    <q-img
      src="https://i.ibb.co/QKkXNDn/pngegg.png"
      width="210px"
      height="105px"
    ></q-img>
  </h3>

  <div class="q-pa-md">
    <q-table
      title="Superhéroes"
      :loading="loading"
      :rows="rows"
      :columns="columns"
      :row-key="rows.id"
      no-data-label="Sin datos"
    />
  </div>
</template>
