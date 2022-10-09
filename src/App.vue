<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { ref } from 'vue';
import FinanceChart from './components/FinanceChart.vue';

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>


<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar align="left">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          My Finance App
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <finance-chart />
    </q-page-container>

  </q-layout>
</template>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
