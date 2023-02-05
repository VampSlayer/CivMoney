<template>
  <div class="row h-100 mx-0 px-0">
    <div class="col-md-6 col-lg-6 p-0 d-flex">
      <div class="row d-flex align-items-center mx-auto">
        <div class="col d-flex">
          <img class="img" src="https://i.imgur.com/pTFJ7Rg.png" />
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 p-0 login-right">
      <div class="row mx-0 p-civ">
        <div class="col p-0">
          <h1>Welcome to CivMoney</h1>
        </div>
      </div>
      <div class="row mx-0 p-text">
        <div class="col p-0">
          <p>
            CivMoney was born out of the game
            <a
              class="cursor civ-link"
              href="https://civilization.com/"
              target="_blank"
              rel="noopener noreferrer"
              >Civilization</a
            >. In Civilization you must be careful that your expenses for your
            empire are lower than your income. If you spend more than you earn
            you go into the <span class="red">red</span>.
          </p>
        </div>
      </div>
      <div class="row mx-0 p-text">
        <div class="col p-0">
          <p>
            With CivMoney you can manage your income and expenses with rich
            visualizations showing whether you saved, lost or broke even for
            that day, month and year. Try to save more than you spend to stay in
            the
            <span class="green">green</span>
            or you will end up in the
            <span class="red">red</span>.
          </p>
        </div>
      </div>
      <div class="row mx-0 p-button">
        <div class="col d-flex justify-content-center">
          <section id="firebaseui-auth-container"></section>
        </div>
      </div>
      <div class="d-none d-xl-block">
        <div class="p-link-group">
          <a
            class="cursor"
            href="https://github.com/VampSlayer/CivMoney"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="img-link" src="https://i.imgur.com/MV1bJll.png" />
          </a>
          <a
            class="pl-3 cursor"
            href="https://www.linkedin.com/in/sayam-hussain-52475210b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="img-link" src="https://i.imgur.com/V3CSeYq.png" />
          </a>
        </div>
        <div class="row mx-0 p-copyright">
          <div class="col d-flex">
            <p class="text-size-year">
              © {{ new Date().getFullYear() }}
              <strong>Sayam Hussain</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
.login-right {
  background: var(--cm-nav-color);
  height: 100vh;
}

.img {
  width: 800px;
}
.p-civ {
  padding-top: 6em;
  padding-left: 6em;
}
.p-text {
  padding-left: 6em;
  padding-right: 4em;
  font-family: "Raleway" !important;
}
p {
  font-size: 1.1em;
}
.p-button {
  padding-top: 2em;
}
.p-link-group {
  padding-left: 6em;
  position: absolute;
  top: 90%;
}
.img-link {
  height: 40px;
  width: auto;
  filter: invert(0.8);
}
.p-copyright {
  padding-left: 5em;
  position: absolute;
  top: 96%;
}
h1 {
  font-weight: bolder;
}
.text-size-year {
  font-size: 0.6em;
}
.civ-link {
  font-weight: bolder;
  color: var(--cm-nav-text-color);
}

.green {
  color: #26bf82;
}

.red {
  color: #ff5433;
}
</style>
