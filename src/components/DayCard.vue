<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { ITransaction, TransactionType } from '../types/ITransaction';
import TransactionList from './transaction/TransactionList.vue';
import CreateTransactionModal from './transaction/CreateTransactionModal.vue';

const props = defineProps({
  limit: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const transactions = ref<ITransaction[]>([
  { title: 'Кофе', amount: 100, date: new Date(), type: TransactionType.DEB },
  { title: 'Сигареты', amount: 200, date: new Date(), type: TransactionType.DEB },
  { title: 'Обед в столовой', amount: 350, date: new Date(), type: TransactionType.DEB }
])



const dayLimit = computed(() => {
  const transactionsSum = transactions.value.reduce((accumulator, transaction) => {
    switch (transaction.type) {
      case TransactionType.CRE:
        return accumulator - transaction.amount

      case TransactionType.DEB:
        return accumulator + transaction.amount

    }
  }, 0)
  return props.limit - transactionsSum
})

const modal = ref(false)

const addCredit = () => {
  modal.value = true
}
const addDebit = () => {
  transactions.value.push({ title: 'Кофе', amount: 100, date: new Date(), type: TransactionType.DEB })
}

</script>

<template>
  <q-card class="my-card">
    <transaction-list :transactions="transactions" />

    <q-card-section>
      {{ name }}
    </q-card-section>



    <q-separator />
    <q-card-actions class="justify-end">
      <div class="q-pa-md">{{ parseFloat(dayLimit.toString()).toFixed(2) }}
      </div>
      <q-btn flat round color="green" icon="add" @click="addCredit" />
      <q-btn flat round color="red" icon="remove" @click="addDebit" />
    </q-card-actions>
  </q-card>

  <create-transaction-modal :isActive="modal" @hide="modal=false" @ok="modal=false" />
</template>


<style scoped>

</style>