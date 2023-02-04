<template>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(getAuth());
    }
    var uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>
