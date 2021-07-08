import {Container} from "react-bootstrap";
import {PieChart, Pie, Tooltip} from "recharts";

const Genders = (props) => {
    let data
    if(props.genders && (props.genders.males !== 0 || props.genders.females !== 0 || props.genders.others !== 0) ){
        data = [
            {name:'males', value: props.genders.males},
            {name:'females', value: props.genders.females},
            {name:'others', value: props.genders.others}
        ]
        console.log('hey')
        console.log(data)
    } else {
        data = [
            {name:'males', value: 0},
            {name:'females', value: 0},
            {name:'others', value: 0}
        ];
    }

    return (
        <Container>
            <h2>Your voters are</h2>
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#26547C" />
                <Tooltip />
            </PieChart>
        </Container>
    )
}

export default Genders

