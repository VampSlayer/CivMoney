<style lang="scss" scoped>
.add-text {
    font-size:4.5em
}
</style>

<template>
    <div class="container-fluid mt-2" >
        <div class="row">
                    <div class="col-4 col-md-4 col-lg-4 col-xl-3">
                        <b-card>
                            <b-card-body>
                                <h4>Monthly Income & Expenses</h4> 
                                <p>Here you can add Incomes and Expenses for any month this year.</p>
                                <p>Simply add something like "Wages" as an Income and "Rent" as an Expense.</p>
                                <p>Or if you wish to explore simply add some sample Transactions.</p>
                                <p class="text-center">
                                    <button class="cursor font-weight-bold btn btn-danger btn-delete" :disabled="loading" variant="light" v-on:click="CreateSampleData">Click to add sample Transactions</button>
                                </p>
                                This will then been shown as data visualizations on the dashboard.
                                <div class="text-center mt-2" v-if="loading"><b-spinner label="Spinning"></b-spinner></div>
                            </b-card-body>
                        </b-card>
                        <div class="mt-2" :class="{'btn-shake' : shake === true}">
                         <b-alert variant="danger" v-if="error">{{error}}</b-alert>
                            <b-card title="Add Monthly Income & Expenses" class="text-center add-montly-income-card">
                                <multiselect v-model="month" :options="months" placeholder="Select Month" label="name" track-by="value"></multiselect>
                                <a class="cursor add-text" title="Add Monthly Income & Expenses" v-on:click="addMonthlyTransactions"><i class="mi mi-Add"></i></a>
                        </b-card>
                        </div>
                    </div>
                    <div class="col-8 col-md-8 col-lg-8 col-xl-9">
                        <div class="row">
                            <div v-for="(transaction, index) in transactions" :key="index" class="col-4 col-md-4 col-lg-4 col-xl-2 mt-2">
                                <b-card :class="transaction.income ? 'green-background': 'red-background'">
                                    <b-input placeholder="Amount" min=0 step="0.01" v-model="transaction.amount" type="number" class="mb-1"></b-input>
                                    <b-input v-model="transaction.description" type="text" class="mt-0 mb-1" placeholder="Description"></b-input>
                                    <div class="row">
                                        <div class="col-10">
                                            <toggle onText="Income" offText="Expense" :transaction="transaction"></toggle>
                                        </div>
                                        <div class="col">
                                            <a v-if="transactions.length !== 1" v-on:click="removeTransaction(index)" title="Remove transaction" class="float-right cursor mb-minus-15"><i class="mi mi-CalculatorSubtract"></i></a>
                                        </div>
                                    </div>
                                </b-card>
                            </div>
                            <div>
                                <a v-on:click="addTransactionToView" title="Add another" class="float-right cursor"><i class="mi mi-Add"></i></a>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
</template>

<script>
import transactionsService from "../services/transactions";
import { mapActions } from "vuex";
import Multiselect from "vue-multiselect";
import dateFormatter from '../services/dateFormatter';
import Toggle from './toggle'

export default {
    name: "monthlyTransactions",
    components: { Multiselect, Toggle },
    data() {
        return {
            months: [{name: "January", value: "01"}, {name: "Febuary", value: "02"}, {name: "March", value: "03"}, {name: "April", value: "04"}, {name: "May", value: "05"},
                    {name: "June", value: "06"}, {name: "July", value: "07"}, {name: "August", value: "08"}, {name: "September", value: "09"}, {name: "October", value: "10"},
                    {name: "November", value: "11"}, {name: "December", value: "12"}],
            transactions: [],
            selected: "income",
            error: "",
            shake: false,
            month: "",
            loading: false
        };
    },
    created: function(){
        this.month = this.months.find(month => {
            if (month.name === dateFormatter.today('MMMM')){
                return month;
            }
        }); 
        this.addTransactionToView()
    },
    methods: {
        ...mapActions(["getYears"]),
        removeTransaction(index){
            if(this.transactions.length === 1) return;
            this.transactions.splice(index, 1);
        },
        addTransactionToView(){
            this.transactions.push({
                amount: null,
                description: "",
                income: true
            })
        },
        async addMonthlyTransactions(){
            await this.transactions.forEach(async (transaction) => {
                if(!transaction.amount || transaction.amount <= 0 || !transaction.description){
                    this.shake = true;
                    return;
                }
                try {
                    let amount = transaction.amount;
                    if(transaction.income === false) amount = -amount;
                    await transactionsService.addMonthlyTransaction(amount, transaction.description, new Date().getFullYear(), this.month.value);
                    await this.getYears();
                    this.$emit("closePanel", {});
                } catch (error) {
                    this.error = "Cannot add monthly transactions"
                }
            });
        },
        async CreateSampleData(){
            if(this.loading === true) return;
            this.loading = false;
            try {
                this.loading = true;
                await transactionsService.seedData();
                await this.getYears();
                this.$emit("closePanel", {})
            } catch (error) {
                this.error = "Cannot add sample data"
            } finally{
                this.loading = false
            }
        },
    }
}
</script>
