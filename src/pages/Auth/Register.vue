<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();

const $q = useQuasar();


const hidePassword = ref(true);
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");


const Register = async () => {
  if (
    email.value.trim() !== ""                 &&
    name.value.trim() !== ""                  &&
    password.value.trim() !== ""              &&
    password_confirmation.value.trim() !== ""
  ) {
    if (password.value === password_confirmation.value) {
      try {
        let res = await axios.post("http://127.0.0.1:8000/api/register", {
          name: name.value,
          email: email.value,
          password: password.value,
          rol: '1',
          password_confirmation: password_confirmation.value,
        });

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

        console.log(res);

        $q.notify({
          message: "Registrado correctamente",
          icon: "cloud_done",
          color: "positive",
        });

        router.push('/login');
      } catch (error) {
        $q.notify({
          message: error.response.data.message,
          color: "primary",
          icon: "error",
        });
      }
    } else {
      $q.notify({
        message: "El password y password confirmation deben coincidir",
        color: "negative",
        icon: "error",
      });
    }
  } else {
    $q.notify({
      message: "Ingresa algo valido en todos los campos",
      color: "negative",
      icon: "error",
    });
  }
}
</script>



<template>
  <q-page class="q-pa-sm bg-image">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white no-shadow" bordered>
          <q-card-section class="text-h6">
            <div class="text-h6">Register</div>
            <div class="text-subtitle2">
              Completa tu perfil con tu información.
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-form @submit.prevent="Register">
              <q-list class="row">

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      type="text"
                      v-model="email"
                      label="Correo"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      type="text"
                      v-model="name"
                      label="Nombre"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      :type="hidePassword ? 'password' : 'text'"
                      v-model="password"
                      label="Contraseña"
                    >
                    </q-input>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      :type="hidePassword ? 'password' : 'text'"
                      v-model="password_confirmation"
                      label="Confirmar contraseña"
                    >
                    </q-input>
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                  <q-btn
                    :icon="hidePassword ? 'visibility' : 'visibility_off'"
                    @click="hidePassword = !hidePassword"
                  ></q-btn>
                </q-item>

              </q-list>
              <div class="q-mt-sm" align="right">
                <q-btn
                  class="text-capitalize bg-info text-white q-mr-md"
                  type="submit"
                  >Ingresar</q-btn
                >
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card class="card-bg text-white no-shadow" bordered>
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img
                src="https://www.redwolf.in/image/catalog/coasters/marvel-comic-logo-coaster.jpg"
              />
            </q-avatar>
            <div class="text-subtitle2 q-mt-lg">by Gabriel @sg4bb</div>
            <div class="text-h6 q-mt-md">Marvel Comics</div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2 text-justify">
              Marvel Worldwide, Inc., conocida como Marvel Comics,
              es una editorial de historietas estadounidense creada en 1939,
              inicialmente con el nombre de Timely Publications. Este proyecto
              es una practica con Quasar y Laravel.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>

  .bg-image {
    background-image: url("https://wallpaperset.com/w/full/e/9/e/526942.jpg");
  }

  .card-bg {
  background-color: #162b4d;
  }
</style>
