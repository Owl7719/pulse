<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { usePageStore } from '@/stores/page';
import { tasksWithProjectQuery, type TasksWithProjects } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/tasksColumns';
import { useErrorStore } from '@/stores/error';

usePageStore().pageData.title = 'Tasks';

const tasks = ref<TasksWithProjects | null>(null);

const getTasks = async function () {
  const { data, error, status } = await tasksWithProjectQuery;

  if (error) {
    useErrorStore().setError({ error, customCode: status });
  }

  tasks.value = data;
};

await getTasks();
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style lang=""></style>
