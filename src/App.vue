<script setup lang="ts">
import TopNavbar from '@/layouts/TopNavbar.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import AuthLayout from '@/layouts/main/AuthLayout.vue';
import AppErrorPage from '@/components/appError/AppErrorPage.vue';
import { useErrorStore } from './stores/error';
import { storeToRefs } from 'pinia';
import { onErrorCaptured, onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { supabase } from './lib/supabaseClient';

const { activeError } = storeToRefs(useErrorStore());
const errorStore = useErrorStore();
const authStore = useAuthStore();

onErrorCaptured((error) => {
  errorStore.setError({ error });
});

onMounted(async () => {
  useAuthStore().trackAuthChanges();
});
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>

        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
