<script setup lang="ts">
import { ITransaction, TransactionType } from '../../types/ITransaction';

defineProps<{
  transactions: ITransaction[]
}>()

const bgByType = (type: string) => {
  switch (type) {
    case TransactionType.CRE:
      return 'bg-positive'
    case TransactionType.DEB:
      return 'bg-negative'
  }
}
</script>

<template>

  <q-card-section v-for="t in transactions" class="text-white" :class="bgByType(t.type)">
    <div class="text-subtitle2">{{ t.title }} {{ t.amount }}</div>
  </q-card-section>

</template>