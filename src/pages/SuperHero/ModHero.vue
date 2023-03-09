<script setup>
import { ref } from "@vue/reactivity";
import { useQuasar } from "quasar";
import axios from "axios";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore;

const columns = [
  {
    name: "IdHero",
    required: true,
    label: "IdHero",
    align: "left",
    field: "id",
    // format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "NombreHero",
    align: "left",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "DescHero",
    align: "center",
    label: "Descripción",
    field: "descripcion",
    sortable: false,
  },
];

const rows = ref([]);
const loading = ref(true);

const $q = useQuasar();

const idHero = ref("");
const nombreHero = ref("");
const descHero = ref("");

const confirm = ref(false);
const toolbar = ref(false);
const edit = ref(false);

const visible = ref(false);
const showInput = ref(false);

function LoadingData() {
  visible.value = true;
  showInput.value = false;

  setTimeout(() => {
    visible.value = false;
    showInput.value = true;
  }, 1500);
}

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

const activateToolbar = () => {
  nombreHero.value = "";
  descHero.value = "";
  toolbar.value = true;
};

const agregarHero = async () => {
  if (nombreHero.value.trim() !== "") {
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/api/superheros/create",
        {
          nombre: nombreHero.value,
          descripcion: descHero.value,
        }
      );

      if (res.status === 200) {
        nombreHero.value = "";
        descHero.value = "";
        toolbar.value = false;

        $q.notify({
          message: "Superheroe agregado",
          icon: "cloud_done",
          color: "positive",
        });

        rows.value = [];

        getHero();
      }

    } catch (error) {
      $q.notify({
        message: error.response.data.message,
        icon: "error",
        color: "primary",
      });
    }


  } else {
    $q.notify({
      message: "Ingresa un nombre valido",
      icon: "error",
      color: "primary",
    });

    nombreHero.value = "";
  }
};

const editHero = async (IdHero) => {
  edit.value = true;
  LoadingData();
  idHero.value = "";
  nombreHero.value = "";
  descHero.value = "";

  try {
    let res = await axios.get("http://127.0.0.1:8000/api/superheros/" + IdHero);

    idHero.value = res.data.data.id;
    nombreHero.value = res.data.data.nombre;
    descHero.value = res.data.data.descripcion;
  } catch (error) {
    $q.notify({
      message: error.response.data.message,
      color: "primary",
      icon: "error",
    });
  }
};

const modHero = async () => {
  if (nombreHero.value.trim() !== "") {
    try {
      let res = await axios.put(
        "http://127.0.0.1:8000/api/superheros/update/" + idHero.value,
        {
          nombre: nombreHero.value,
          descripcion: descHero.value,
        }
      );

      console.log(res);

      if (res.status == 200) {
        nombreHero.value = "";
        descHero.value = "";
        idHero.value = "";
        edit.value = false;

        $q.notify({
          message: "Superheroe modificado",
          icon: "cloud_done",
          color: "positive",
        });

        rows.value = [];

        getHero();
      }
    } catch (error) {
      $q.notify({
        message: error.response.data.message,
        color: "primary",
        icon: "error",
      });
    }
  } else {
    $q.notify({
      message: "Ingresa un nombre valido",
      icon: "error",
      color: "primary",
    });

    nombreHero.value = "";
  }
};

const activeDelete = (IdHero) => {
  confirm.value = true;
  idHero.value = IdHero;
};

const BorrarHero = async () => {
  try {
    let res = await axios.delete(
      "http://127.0.0.1:8000/api/superheros/delete/" + idHero.value
    );

    if (res.status === 200) {
      idHero.value = "";
      confirm.value = false;

      $q.notify({
        message: "Superheroe eliminado",
        icon: "cloud_done",
        color: "positive",
      });

      rows.value = [];
      getHero();
    }
  } catch (error) {
    console.log(error);
  }
};

getHero();
</script>

<template>
  <h3 class="text-weight-bolder text-center text-primary">
    Modificar
    <q-img
      src="https://i.ibb.co/QKkXNDn/pngegg.png"
      width="210px"
      height="105px"
    ></q-img>

    <h3 class="text-subtitle2 text-overline">
      Aquí puedes actualizar, crear y borrar superheroes
    </h3>
  </h3>

  <div class="q-pa-md">
    <q-table
      title="Superhéroes"
      :rows="rows"
      :columns="columns"
      :row-key="rows.id"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          :disable="loading"
          label="Agregar heroe"
          @click="activateToolbar"
        />
        <q-space />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width class="q-gutter-sm">
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click="editHero(props.row.id)"
              icon="edit"
            />
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click="activeDelete(props.row.id)"
              icon="delete"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="confirm">
    <q-card class="my-card-confirm">
      <q-toolbar>
        <q-toolbar-title class="text-overline">
          <span class="text-weight-bold text-primary">Borrar </span>
          <span class="text-weight-bold">Super-Hero</span>
        </q-toolbar-title>
        <q-icon name="delete" color="primary" size="sm"></q-icon>

        <!-- <q-btn flat round dense icon="close" v-close-popup /> -->
      </q-toolbar>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Borrar" @click="BorrarHero()" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="toolbar">
    <q-card class="my-card">
      <q-toolbar>
        <q-toolbar-title class="text-overline">
          <span class="text-weight-bold text-primary">Agregar </span>
          <span class="text-weight-bold">Super-Hero</span>
        </q-toolbar-title>
        <q-icon name="add_circle" color="primary" size="sm"></q-icon>

        <!-- <q-btn flat round dense icon="close" v-close-popup /> -->
      </q-toolbar>

      <q-form @submit.prevent="agregarHero">
        <q-card-section>
          <q-input
            filled
            v-model="nombreHero"
            type="text"
            label="Nombre"
            :rules="[(val) => !!val || 'Ingresa un nombre']"
          />
          <q-input
            filled
            v-model="descHero"
            class="q-mt-md"
            type="textarea"
            label="Descripción"
          />

          <q-btn
            dense
            label="Ingresar"
            no-caps
            color="primary"
            type="submit"
            class="full-width q-mt-md"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>

  <q-dialog v-model="edit">
    <q-card class="my-card">
      <q-toolbar>
        <q-toolbar-title class="text-overline">
          <span class="text-weight-bold text-primary">Editar </span>
          <span class="text-weight-bold">Super-Hero</span>
        </q-toolbar-title>
        <q-icon name="edit" color="primary" size="sm"></q-icon>

        <!-- <q-btn flat round dense icon="close" v-close-popup /> -->
      </q-toolbar>

      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-form @submit.prevent="modHero" v-show="showInput">
            <q-input
              filled
              v-model="nombreHero"
              type="text"
              label="Nombre"
              :rules="[(val) => !!val || 'Ingresa un nombre']"
            />
            <q-input
              filled
              v-model="descHero"
              class="q-mt-md"
              type="textarea"
              label="Descripción"
            />

            <q-btn
              dense
              label="Editar"
              color="primary"
              type="submit"
              class="full-width q-mt-md"
              no-caps
            />
          </q-form>
        </transition>
      </q-card-section>

      <q-inner-loading
        :showing="visible"
        color="primary"
        transition-show="scale"
      />
    </q-card>
  </q-dialog>
</template>

<style scoped>
.my-card {
  width: 400px;
  height: 370px;
}

.my-card-confirm {
  width: 400px;
  max-height: 120px;
}
</style>
