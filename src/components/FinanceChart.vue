<script setup lang="ts">
import { computed, ref } from 'vue'
import DayCard from './DayCard.vue';
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


</script>

<template>
  <div class="flex justify-between q-mt-md items-center">
    <div class="text-subtitle1">
      Week: {{ MomentHelper.getFormatDate(weekStart) }} - {{ MomentHelper.getFormatDate(weekEnd) }}
    </div>
    <div class="flex justify-end">
      <q-input v-model="limit" label="Mouthy income" />
    </div>
  </div>

  <div class="container" style="">


    <div class="row q-mt-md">
      <div class="col q-pa-xs" style="width: 16%;" v-for="col in cardPerDay">
        <day-card :limit="evaluatedMoney"
          :date="MomentHelper.getDateUntil(weekStart, col, 'days')" />
      </div>
    </div>
  </div>

</template>
  