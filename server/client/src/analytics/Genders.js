import {Container} from "react-bootstrap";
import {PieChart, Pie, Tooltip} from "recharts";

const Genders = (props) => {
    let data
    if(props.genders && (props.genders.males !== 0 || props.genders.females !== 0 || props.genders.others !== 0) ){
        /*
        TODO trovare un rosa adeguato per questo blu
         */
        data = [
            {name:'males', value: props.genders.males, fill: "#26547C"},
            {name:'females', value: props.genders.females, fill: "pink"},
            {name:'others', value: props.genders.others, fill: "grey"}
        ]
    } else {
        data = [
            {name:'males', value: 0},
            {name:'females', value: 0},
            {name:'others', value: 0}
        ];
    }

    return (
        <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} />
            <Tooltip />
        </PieChart>
    )
}

export default Genders

