import {Chart, Pies, Transform} from "rumble-charts";

const Genders = (props) => {
    /*
    TODO mettere qualcosa come un tooltip sulla pie
     */
    console.log(props)
    let series
    if(props.genders && (props.genders.males !== 0 || props.genders.females !== 0 || props.genders.others !== 0) ){
        series = [{
            data: [props.genders.males, props.genders.females, props.genders.others]
        }]
    } else {
        series = [{
            data: [1,1]
        }];
    }

    return (
        <div>
            <h2>Your voters are</h2>
            <Chart width={600} height={250} series={series}>
                <Transform method={['transpose', 'stack']}>
                    <Pies innerRadius='66%'
                          colors='category10'
                          combined={true}
                          pieAttributes={{
                              onMouseMove: (e) => e.target.style.opacity = 1,
                              onMouseLeave: (e) => e.target.style.opacity = 0.5
                          }}
                          pieStyle={{opacity: 0.5}}
                    />
                </Transform>
            </Chart>
        </div>
    )
}

export default Genders

