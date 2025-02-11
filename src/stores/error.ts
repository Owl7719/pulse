import type { CustomError, ExtendedPostgrestError } from '@/types/Error';
import type { PostgrestError } from '@supabase/supabase-js';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null);

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error;
    customCode?: number;
  }) => {
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error;
      activeError.value.customCode = customCode || 500;
      return;
    }

    activeError.value = error;
    activeError.value.statusCode = customCode || 500;
  };

  return {
    activeError,
    setError,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
