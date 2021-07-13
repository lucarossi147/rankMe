import {BarChart, Bar, CartesianGrid, Legend, XAxis, YAxis, Tooltip} from "recharts";
import {Container} from "react-bootstrap";
const Ages = (props) => {

    let age0to18 = 0
    let age19to30 = 0
    let age31to50 = 0
    let age51plus = 0
    for(const age in props.ages){
        switch (true){
            case (age < 19):
                age0to18 += props.ages[age]
                break;
            case (age < 31):
                age19to30 += props.ages[age]
                break;
            case (age <51):
                age31to50 += props.ages[age]
                break;
            default:
                age51plus += props.ages[age]
                break;
        }
    }

    const data = [
        {name: '0 to 18', votes: age0to18},
        {name: '19 to 30', votes: age19to30},
        {name: '31 to 50', votes: age31to50},
        {name: '50+', votes: age51plus}
    ]

    return (

        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" fill="#26547C" />
        </BarChart>

    )
}

export default Ages
