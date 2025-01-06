<script setup lang="ts">
import { usePageStore } from '@/stores/page';

usePageStore().pageData.title = 'Home page';
</script>

<template>
  <h1>Home view</h1>
</template>

<style lang=""></style>
