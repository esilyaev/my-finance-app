<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="isShow">
    <q-card class="q-dialog-plugin q-pa-md">
      <q-card-section>
        <q-input v-model="name" label="Name" :rules="[ val => !!val || 'Please input name' ]" />
      </q-card-section>
      <q-card-section>
        <q-input v-model="amount" label="Amount"
          :rules="[ val => !!val || 'Please input amount' ]" />
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { useDialogPluginComponent } from 'quasar'
import { defineComponent, PropType, ref } from 'vue'
import { ITransaction, TransactionType } from '../../types/ITransaction';

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    type: {
      type: String as PropType<TransactionType>,
      default: null
    }
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],



  setup(props, { emit }) {
    const isShow = computed(() => props.isActive)
    const name = ref('');
    const amount = ref('');
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    const createTransaction = (): ITransaction => {
      return {
        title: name.value,
        amount: parseFloat(amount.value),
        type: props.type,
        date: null
      }
    }

    const resetForm = () => {
      name.value = ''
      amount.value = ''
    }

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      isShow,
      dialogRef,
      onDialogHide,
      name,
      amount,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)

        const newTransaction: ITransaction = createTransaction()
        resetForm()
        onDialogOK(newTransaction)
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick() {
        resetForm()
        emit('hide')
      },

    }
  }
})
</script>