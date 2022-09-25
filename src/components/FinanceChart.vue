<script setup lang="ts">
import { computed, ref } from 'vue'
import DayCard from './DayCard.vue';

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
const numOfRows = 1
const cardPerDay = 7



</script>

<template>
  <h3>My finance app</h3>
  <div class="container" style="">
    <div class="flex justify-end">
      <q-input v-model="limit" label="Mouthy income" />
    </div>
    <div class="row q-tp-md" v-for="row in numOfRows">
      <div class="col q-pa-xs" style="width: 16%;" v-for="col in cardPerDay">
        <day-card :limit="evaluatedMoney"
          :name="dayOfMountByName[(row-1)*6 + (col-1)] || 'empty'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-card {
  color: black
}
</style>
