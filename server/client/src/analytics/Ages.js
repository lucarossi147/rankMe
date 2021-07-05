import { Chart, Ticks, Layer, Bars } from 'rumble-charts';

const Ages = (props) => {
    const series = [
        {
            name: '0-18',
            data: [0]
        }, {
            name: '19-30',
            data: [0]
        }, {
            name: '31-50',
            data: [0]
        }, {
            name: '50+',
            data: [0]
        }]

    for(const age in props.ages){
        switch (true){
            case (age < 19):
                series[0].data[0] += props.ages[age]
                break;
            case (age < 31):
                series[1].data[0] += props.ages[age]
                break;
            case (age <51):
                series[2].data[0] += props.ages[age]
                break;
            default:
                series[3].data[0] += props.ages[age]
                break;
        }
    }

    return (
        <div className="ageChart">
            <h2>Number of votes for age range</h2>
            <Chart width={600} height={300} series={series} minY={0}>
                <Layer width='30%' height='100%' position='center'>
                    <Ticks
                        axis='y'
                        lineLength='100%'
                        lineVisible={true}
                        lineStyle={{stroke:'lightgray'}}
                        labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray'}}
                        labelAttributes={{x: -5}}
                        labelFormat={label => label + ' votes'}
                    />
                    <Bars/>
                </Layer>
            </Chart>
        </div>
    )
}

export default Ages
