<script setup lang="ts">
import { computed, ref } from 'vue'
import DayCard from '../components/DayCard.vue';
import CalendarHelper from '../service/calendar/CalendarHelper';
import MomentHelper from '../service/calendar/MomentHelper';


const getAllDaysInMonth = (month: number, year: number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() }, // get next month, zeroth's (previous) day
    (_, i) => new Date(year, month - 1, i + 1)    // get current month (0 based index)
  );
const dayOfMount = getAllDaysInMonth(9, 2022)
const dayOfMountByName = ref<string[]>([]);
dayOfMountByName.value = dayOfMount.map(x =>
  x.toLocaleDateString([], { month: "short", day: "numeric" })
)
const limit = ref('')
const evaluatedMoney = computed(() => parseFloat(limit.value) / dayOfMountByName.value.length)
const cardPerDay = 7

const { weekStart, weekEnd } = CalendarHelper.GetCurrentWeekStartEnd()

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
        <q-tabs align="left">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs>
      </q-toolbar>


    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <div class="flex justify-between q-mt-md items-center">
        <div class="text-h5">
          Week: {{ MomentHelper.getFormatDate(weekStart) }} -
          {{ MomentHelper.getFormatDate(weekEnd) }}
        </div>
        <div class="flex justify-end">
          <q-input v-model="limit" label="Mouthy income" />
        </div>
      </div>

      <div class="container" style="">


        <div class="row q-mt-md">
          <div class="col q-pa-xs" style="width: 16%;"
            v-for="col in cardPerDay">
            <day-card :limit="evaluatedMoney"
              :date="MomentHelper.getDateUntil(weekStart, col, 'days')" />
          </div>
        </div>
      </div>
    </q-page-container>

  </q-layout>


</template>
  