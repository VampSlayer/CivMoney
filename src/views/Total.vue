<template>
  <div>
    <div class="mt-2 h-100">
      <view-nav :showYearSelect="false">
        <b-nav-item to="/">
          <i title="Dashboard" class="mi mi-AreaChart"></i>
        </b-nav-item>
      </view-nav>
      <div class="h-100">
        <div class="row text-center">
          <transition name="fade" mode="out-in" appear>
            <div v-show="total" class="col">
              <h6 class="total"><u>Total {{ selectableYears[0] }}-{{ selectableYears[selectableYears.length - 1] }}</u></h6>
              <h4 :class="totalClass">{{ me.currency }}{{ total }}</h4>
            </div>
          </transition>
        </div>
        <div class="row h-95">
           <vodal
            :show="show"
            animation="slideUp"
            v-on:hide="hideModal"
            :width="modalWidth"
            :height="modalHeight"
            :duration="500"
            :closeButton="false"
            :closeOnEsc="true">
            <modal-graph :year="Number(year)" :showing="show"></modal-graph>
          </vodal>
          <total-bar :data="allYearsTotals" v-on:draw-year-modal="showModal"></total-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ViewNav from "../components/viewnav";
import TotalBar from "../components/totalbar"
import ModalGraph from "../components/modalgraph";
import utils from '../services/utils';

export default {
  name: "Total",
  components: { ViewNav, TotalBar, ModalGraph },
  data() {
    return {
      modalHeight: 0,
      modalWidth: 0,
      show: false,
      year: null
    }
  },
  created: function() {
    this.getYears();
  },
  mounted() {
    this.setModalSize()
    window.onresize = () => { this.setModalSize() };
  },
  computed: {
    ...mapState(["years", "selectableYears", "me"]),
    allYearsTotals() {
      let allYearsTotals = []
      this.selectableYears.forEach(year => {
        if (this.years[year]) {
          allYearsTotals.push(
            {
              amount: this.years[year].amount,
              date: `${year}-01-01`,
              id: year
            })
        }
      });
      return allYearsTotals
    },
    total() {
      return this.allYearsTotals.map(x => {return x.amount}).reduce((a, b) => a + b, 0).toFixed(2)
    },
    totalClass() {
      return utils.getAmountClass(this.total)
    }
  },
  methods: {
    ...mapActions(["getYears"]),
    hideModal(){
      this.year = null;
      this.show = false;
    },
    showModal(year) {
      this.year = year;
      this.show = true;
    },
    setModalSize() {
      const modalSize = utils.calculateModalSize()
      this.modalHeight = modalSize.height
      this.modalWidth = modalSize.width
    }
  },
};
</script>

<style scoped>
  .total { color: var(--cm-input-text-color); }
</style>