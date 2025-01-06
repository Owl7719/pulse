<script setup lang="ts">
import { ref } from 'vue';
import type { Tables } from '../../../database/types';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { usePageStore } from '@/stores/page';
import { projectsQuery, type Projects } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/projectsColumns';
import { useErrorStore } from '@/stores/error';

usePageStore().pageData.title = 'Projects';

const projects = ref<Tables<'projects'>[] | null>(null);

const getProjects = async function () {
  const { data, error, status } = await projectsQuery;

  if (error) useErrorStore().setError({ error, customCode: status });

  projects.value = data;
};

await getProjects();
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects"></DataTable>
</template>

<style lang=""></style>
