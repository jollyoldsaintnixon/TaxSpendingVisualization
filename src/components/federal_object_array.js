import { fedFy2018 } from '../assets/data/tsv2018'

let total = 0
let bf_array = []
fedFy2018["results"].forEach(budget_function => {
    total += budget_function["amount"];
    bf_array.push({
        name: budget_function["name"],
        amount: budget_function["amount"],
        degrees: 0,
        percent: null
    });
});

for (let i = 0; i < bf_array.length; i++) {

    bf_array[i]["percent"] = (bf_array[i]["amount"] / total) * 100
    bf_array[i]["degrees"] = Math.PI * 2 * (bf_array[i]["amount"] / total)

}

export default bf_array