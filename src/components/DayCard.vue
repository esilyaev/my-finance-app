<script setup lang="ts">
import { ITransaction, TransactionType } from '../types/ITransaction';
import TransactionList from './transaction/TransactionList.vue';

defineProps({
  limit: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const transactions: ITransaction[] = [
  { title: 'Кофе', amount: 100, date: new Date(), type: TransactionType.DEB },
  { title: 'Сигареты', amount: 200, date: new Date(), type: TransactionType.DEB },
  { title: 'Обед в столовой', amount: 350, date: new Date(), type: TransactionType.DEB }
]
</script>

<template>
  <q-card class="my-card">
    <q-card-section>
      {{ name }}
    </q-card-section>
    <q-card-section>
      <transaction-list :transactions="transactions" />
    </q-card-section>
    <q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-actions class="justify-end">
      <div class="q-pa-md">{{ parseFloat(limit.toString()).toFixed(2) }}
      </div>
      <q-btn flat round color="green" icon="add" />
      <q-btn flat round color="red" icon="remove" />
    </q-card-actions>
  </q-card>
</template>