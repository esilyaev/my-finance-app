<script setup lang="ts">
import { ITransaction, TransactionType } from '../../types/ITransaction';

defineProps<{
  transactions: ITransaction[]
}>()

const bgByType = (type: string) => {
  switch (type) {
    case TransactionType.CRE:
      return 'bg-green-3'
    case TransactionType.DEB:
      return 'bg-red-3'
  }
}
</script>

<template>

  <q-card-section v-for="t in transactions" class="flex justify-between" :class="bgByType(t.type)">
    <div class=" text-subtitle2">{{ t.title }}</div>
    <div class="text-white">{{ t.amount }}</div>
  </q-card-section>

</template>