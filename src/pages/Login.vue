<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import auth from '../api/auth';
import { useAuthStore } from '../stores/store_auth';
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';

const store = useAuthStore()

const router = useRouter()


onMounted(() => {
  if (store.isAuthenticated) {
    router.push('finance-chart')
  }
})

const $q = useQuasar()

const name = ref(null)
const accept = ref(false)
const password = ref('')
const isPwd = ref(true)

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    auth.login(name.value, password.value)

  }
}

const onReset = () => {
  name.value = null
  password.value = null
  accept.value = false
}



</script>


<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input dense filled v-model="name" label="Your name *"
        hint="Name and surname" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']" />

      <q-input dense v-model="password" filled label="Your password *"
        :type="isPwd ? 'password' : 'text'" hint="Password with toggle"
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:append>
          <q-icon :name=" isPwd ? 'visibility_off' : 'visibility'"
            class=" cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat
          class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>