<script setup>
import { getAuth } from "firebase/auth";
import router from "../router";

// non-reactive
const me = getAuth().currentUser;

// functions
async function signOut() {
  await me.signOut();
  router.push("/login");
}
</script>

<template>
  <header>
    <nav
      class="civ-nav-bg navbar navbar-expand-lg navbar-dark justify-content-between"
    >
      <a class="navbar-brand">
        <img
          class="logo d-inline-block align-top"
          loading="lazy"
          src="https://i.imgur.com/xIzOjYI.png"
        />
        <!-- <img class="logo d-inline-block align-top" src="https://i.imgur.com/JlQV6Co.png"/> -->
      </a>
      <div class="px-2">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <span class="nav-item nav-link navbar-text">{{
              me.displayName
            }}</span>
            <a class="nav-item nav-link cursor"
              ><i title="Profile" class="mi mi-Contact"></i
            ></a>
            <a class="nav-item nav-link cursor" @click="signOut"
              ><i title="Sign Out" class="mi mi-PowerButton"></i
            ></a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.logo {
  height: 42px;
  padding-left: 8px;
}
</style>
