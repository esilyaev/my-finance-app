<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { ITransaction, TransactionType } from '../types/ITransaction';
import TransactionList from './transaction/TransactionList.vue';
import CreateTransactionModal from './transaction/CreateTransactionModal.vue';
import { Moment } from 'moment';
import { PropType } from 'vue';
import MomentHelper from '../service/calendar/MomentHelper';


const props = defineProps<{
  limit: number,
  date: Moment
}>()

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

const transactionTypeForNew = ref<TransactionType>(null)
const modal = ref(false)
const openModal = (type: TransactionType) => {
  transactionTypeForNew.value = type
  modal.value = true
}

const addTransaction = (payload: any) => {
  console.log(payload);
  modal.value = false
  transactions.value.push(payload)
}

const name = computed(() =>
  MomentHelper.getDayOfWeekName(props.date.toDate())
)

</script>

<template>
  <q-card class="my-card">
    <q-card-section class="text-subtitle1">
      {{ name }}
    </q-card-section>

    <transaction-list :transactions="transactions" />

    <q-separator />
    <q-card-actions class="justify-between">
      <div class="q-pa-xs">{{ parseFloat(dayLimit.toString()).toFixed(2) }}
      </div>
      <div class="actions">
        <q-btn flat round color="green" icon="add" @click="openModal(TransactionType.CRE)" />
        <q-btn flat round color="red" icon="remove" @click="openModal(TransactionType.DEB)" />
      </div>
    </q-card-actions>
  </q-card>

  <create-transaction-modal :isActive="modal" @hide="modal=false" @ok="addTransaction"
    :type="transactionTypeForNew" />
</template>


<style scoped>

</style>