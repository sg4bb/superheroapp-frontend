<script setup>
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();
</script>



<template>
  <q-page padding>
    <div class="flex flex-center q-mt-xl">
      <div class="row justify-center q-gutter-sm">
        <div class="col-12 col-md-5">
          <q-card
            class="text-white no-shadow"
            style="background-color: #bc4749"
          >
            <q-card-section>
              <div class="text-h6 text-center">Consultar</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-h3 text-weight-bolder text-center">
                <q-icon name="search"></q-icon>
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-h6 text-weight-bolder text-center">
                Consulta los superheroes añadidos en la base de datos.
              </div>
            </q-card-section>
            <q-card-actions vertical align="center">
              <q-btn
                class="text-capitalize bg-indigo-8"
                color=""
                to="/hero/consult"
                >Ir</q-btn
              >
            </q-card-actions>
            <q-separator />
            <q-card-section class="text-center">‎</q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-5">
          <q-card
            class="text-white no-shadow"
            style="background-color: #bc4749"
          >
            <q-card-section>
              <div class="text-h6 text-center">Modificar</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="text-h3 text-weight-bolder text-center">
                <q-icon name="edit"></q-icon>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-h6 text-weight-bolder text-center">
                Agrega, edita y elimina superheroes de la base de datos.
              </div>
            </q-card-section>
            <q-card-actions vertical align="center">
              <q-btn class="text-capitalize bg-indigo-8" color="" to="/hero/mod"
                >Ir</q-btn
              >
            </q-card-actions>
            <q-separator />
            <q-card-section class="text-center">‎</q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <h3 class="text-weight-bolder text-center text-primary">
      ¡Hola {{ userStore.name }}!
      <q-img
        src="https://i.ibb.co/QKkXNDn/pngegg.png"
        width="210px"
        height="105px"
      ></q-img>

      <h3 class="text-subtitle2 text-overline">
        En esta app puedes actualizar, crear, consultar y borrar superheroes
      </h3>
    </h3>
  </q-page>
</template>
