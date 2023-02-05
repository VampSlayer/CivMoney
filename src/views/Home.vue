<script setup>
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  serverTimestamp,
  runTransaction,
  getDoc,
} from "firebase/firestore";
import router from "../router";
import Header from "../components/header.vue";

const me = getAuth();
const db = getFirestore();

let transactionsQuerySnapshot = await getDocs(
  collection(db, me.currentUser.uid)
);

let yearsQuerySnapshot = await getDoc(doc(db, me.currentUser.uid, "years"));

console.log(yearsQuerySnapshot.data());

// refs
const amount = ref(0);
const description = ref("");
const category = ref("");
const date = ref(new Date());

// function
async function signOut() {
  await me.signOut();
  router.push("/login");
}

function getNewAggregates(amount, oldIn, oldOut) {
  oldIn = oldIn ?? 0;
  const newIn = amount > 0 ? oldIn + amount : oldIn;

  oldOut = oldOut ?? 0;
  const newOut = amount < 0 ? oldOut + amount : oldOut;

  const newTotal = newIn + newOut;

  return { in: newIn, out: newOut, total: newTotal };
}

async function addTransaction(amount, description, category, date) {
  const yearsReference = doc(db, me.currentUser.uid, "years");

  await runTransaction(db, async (transaction) => {
    let yearsDoc = await transaction.get(yearsReference);

    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const isoDate = date.toISOString().split("T")[0];
    const years = yearsDoc?.data();

    const oldValues = [
      years?.[year]?.[month]?.[isoDate],
      years?.[year]?.[month],
      years?.[year],
    ];

    const [newDay, newMonth, newYear] = oldValues.map((oldValue) =>
      getNewAggregates(amount, oldValue?.in, oldValue?.out)
    );

    let newYears = Object.assign({}, years);
    newYears = Object.assign(newYears, {
      [year]: Object.assign(newYears[year] ?? {}, {
        updated: serverTimestamp(),
        total: newYear.total,
        in: newYear.in,
        out: newYear.out,
        [month]: Object.assign(
          newYears[year] ? newYears[year][month] ?? {} : {},
          {
            in: newMonth.in,
            out: newMonth.out,
            total: newMonth.total,
            [isoDate]: {
              in: newDay.in,
              out: newDay.out,
              total: newDay.total,
            },
          }
        ),
      }),
    });

    if (!yearsDoc.exists()) {
      transaction.set(yearsReference, newYears);
    } else {
      transaction.update(yearsReference, newYears);
    }

    addDoc(collection(db, me.currentUser.uid), {
      amount,
      description,
      category,
      date,
      updated: serverTimestamp(),
    });
  });
}
</script>

<template>
  <div>
    <Header></Header>
  </div>
</template>
