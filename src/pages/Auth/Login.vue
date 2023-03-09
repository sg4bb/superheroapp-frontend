<script setup>
import axios from "axios";
import { ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const userStore = useUserStore();

const hidePassword = ref(true);
const email = ref("");
const password = ref("");

const $q = useQuasar();

const clearEmail = () => {
  email.value = "";
};

const Login = async () => {
  try {
    let res = await axios.post("http://127.0.0.1:8000/api/login", {
      email: email.value,
      password: password.value,
    });

    if (res.status === 216) {
      $q.notify({
        message: res.data.error,
        color: "primary",
        icon: "error",
      });

      password.value = '';
    }

    if (res.status === 200){
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

      console.log(res);

      userStore.setUserDetails(res);

      $q.notify({
        message: "Inicio de sesión exitoso",
        icon: "cloud_done",
        color: "positive",
      });

      router.push("/");
    }
  } catch (error) {
    $q.notify({
      message: error.response.data.message,
      color: "primary",
      icon: "error",
    });
  }
};
</script>

<template>
  <q-page class="flex bg-image flex-center">
    <q-card class="my-card-login">
      <q-card-section>
        <q-avatar size="103px" class="absolute-center shadow-10">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis"></div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="Login" class="q-gutter-lg">
          <q-input filled type="text" v-model="email" label="Ingresa un correo">
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                name="cancel"
                @click="clearEmail"
              />
            </template>
          </q-input>

          <q-input
            filled
            :type="hidePassword ? 'password' : 'text'"
            v-model="password"
            label="Ingresa una contraseña"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="hidePassword ? 'visibility' : 'visibility_off'"
                @click="hidePassword = !hidePassword"
              />
            </template>
          </q-input>

          <q-btn
            label="Continuar"
            type="submit"
            color="primary"
            style="width: 95%"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
.my-card-login {
  width: 100%;
  height: 100%;
  max-height: 450px;
  max-width: 350px;
}

.bg-image {
  background-image: url("https://wallpaperset.com/w/full/e/9/e/526942.jpg");
}
</style>
