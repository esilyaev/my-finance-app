<script setup lang="ts">
import { ITransaction } from '../../types/ITransaction';

defineProps<{
  transactions: ITransaction[]
}>()
</script>

<template>
  <ul>
    <li v-for="t in transactions">
      {{ t.title }}
    </li>
  </ul>
</template>