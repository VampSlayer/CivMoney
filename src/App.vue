<script setup>
import { RouterView } from "vue-router";
import { Suspense } from "vue";
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
