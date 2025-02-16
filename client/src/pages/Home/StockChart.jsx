import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Button } from '@/components/ui/button';

const timeSeries=[
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Daily)",
        label:"1 Day",
        value:1
    },
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Daily)",
        label:"1 Week",
        value:7
    },
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Daily)",
        label:"1 Month",
        value:30
    }
]
const StockChart=()=>{

    const [activeLabel, setActiveLabel]=useState("1 Day");

    const series=[
        {
            data:[
            [
                1737014623013,
                99739.74868905671
                ],
                [
                1737018218351,
                98969.27851480305
                ],
                [
                1737021744345,
                99119.30544691836
                ],
                [
                1737025358884,
                99175.81276396391
                ],
                [
                1737029016027,
                99136.88555434979
                ],
                [
                1737032636181,
                99365.30032161868
                ],
                [
                1737036228635,
                99020.76827900368
                ],
                [
                1737039785125,
                97532.25346033007
                ],
                [
                1737043418453,
                99184.80509513128
                ],
                [
                1737047194563,
                99454.01193663836
                ],
                [
                1737050487857,
                99946.48723935365
                ],
                [
                1737054221908,
                99556.10838859396
                ],
                [
                1737057689439,
                100377.75137459932
                ]
            ]
        }
    ];

    const options={
        chart:{
            id:"area-determine",
            type:"area",
            height:350,
            zoom:{
                autoScaleYaxis:true
            }
        },
        dataLabels:{
            enabled:false
        },
        xaxis:{
            type:"datetime",
            tickAmount:6
        },
        colors:["#758AA2"],

        markers:{
            colors:["#fff"],
            strokeColor:"#fff",
            size:0,
            strokeWidth:1,
            style:"hollow"
        },
        tooltip:{
            theme:"dark"
        },
        fill:{
            type:"gradient",
            gradient:{
                shadeIntesity:1,
                opacityFrom:0.7,
                opacityTo:0.9,
                stops:[0,100]
            }
        },
        grid:{
            borderColor:"#47535E",
            strokeDashArray:4,
            show:true
        }
    }

    const handleActiveLabel=(value)=>{
        setActiveLabel(value);
    }

    return(
        <div>
            <div className='space-x-3'>
                {timeSeries.map((item) => <Button 
                variant={activeLabel==item.label?"":"outline"}
                onClick={()=> handleActiveLabel(item.label)}
                key={item.label}>
                    {item.label}
                </Button>)}
            </div>
            <div id="chart-timelines">
                <ReactApexChart
                options={options}
                series={series}
                type='area'
                height={450}
                />
            </div>
        </div>
    )
}

export default StockChart