<template>
  <div>
    <button @click="signOut">Sign Out</button>
    <p>{{ me.currentUser.displayName }}</p>
    <p>{{ me.currentUser.uid }}</p>
    <p>{{ me.currentUser.email }}</p>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
export default {
  computed: {
    me() {
      return getAuth();
    },
  },
  methods: {
    signOut() {
      this.me.signOut().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
