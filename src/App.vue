<script setup>
import { RouterView } from "vue-router";
import { Suspense } from "vue";
</script>

<template>
  <Suspense>
    <div class="container-fluid h-container px-0">
      <RouterView />
    </div>
  </Suspense>
</template>
