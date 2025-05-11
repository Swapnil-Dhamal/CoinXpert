import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketChart } from '@/State/Coin/Action';

const timeSeries=[
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Daily)",
        label:"1 Day",
        value:1
    },
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Weekly)",
        label:"1 Week",
        value:7
    },
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Monthly)",
        label:"1 Month",
        value:30
    },
    {
        keyword:"DIGITAL_CURRENCY_DAILY",
        key:"Time Series(Yearly)",
        label:"1 Year",
        value:365
    }
]
const StockChart=({coinId})=>{

    const dispatch=useDispatch();
    const {coin}=useSelector(store=>store)

    const [activeLabel, setActiveLabel]=useState(timeSeries[0]);

    const series=[
        {
            data:coin.marketChart.data,
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

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt"); 
        if (!coinId || !jwtToken) return; // Prevent API call if values are missing
        
        dispatch(getMarketChart(coinId, activeLabel.value, jwtToken));
    }, [dispatch, coinId, activeLabel]);
    

    return(
        <div>
            <div className='space-x-3'>
                {timeSeries.map((item) => <Button 
                variant={activeLabel.label==item.label?"":"outline"}
                onClick={()=> handleActiveLabel(item)}
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