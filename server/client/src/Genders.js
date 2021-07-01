import {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "./notifyAlerts";
import {Chart, Pies, Transform} from "rumble-charts";

const Genders = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [gender, setGenders] = useState({})

    useEffect(() => {
        getGenders()
    }, [isLoaded])

    const getGenders = () => {
        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.get(CONFIG.SERVER_URL + "/gender", config)
            .then((res) => {
                if(res.status === 200){
                    setLoaded(true)
                    setGenders(res.data)
                } else {
                    setLoaded(false)
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });
    }

    if(isLoaded){
        /*
        TODO read content of gender.male and gender.female
         */
        const series = [{
            data: [1, 1]
        }];

        return (
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
        )
    }
    return (
        <h1>
            Pie chart not loaded
        </h1>
    )
}

export default Genders

