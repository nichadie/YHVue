<!-- 获取当地天气 -->
<template>
     <div class="flex-center">
       <div >{{city}}</div>
       <skycon v-if="iconCondition" :condition="iconCondition" color="blue" size="40" />
       <div v-if="iconCondition" class="flex-center font-22">
         <span>{{ weather.temperature }}℃ </span>
         <span>{{ weather.weather }}</span>
        
       </div>

     </div>
</template>
   <script>
   import axios from 'axios';
   import Skycon from 'vue-skycons';
   export default {
     components: { Skycon },
     data() {
       return {
         key: '614feb44ac659c2ba3e1035645b6cc60', //
         weather: {}, //用于存放天气相关的数据
         iconCondition: null, //icon值
         city:'',
         img:[
            {id:0,src:''},
            {id:1,src:''},
            {id:2,src:''},
            {id:3,src:''},
            {id:4,src:''},
            {id:5,src:''},
            {id:6,src:``},
        ],
        src:"http://192.168.50.30:5005/clound.gif",
       };
     },
     created() {
       this.getLocationInfo();
     },
     methods: {
       // 获取用户位置信息
       async getLocationInfo() {
         const params = {
           key: this.key,
         };
         const { data } = await axios.get('https://restapi.amap.com/v3/ip', { params });
         // data.adcode值为获取天气需要的city值
         this.city = data.province+data.city
         this.getWeather(data.adcode);
       },
       // 获取天气详情
       async getWeather(adcode) {
         const params = {
           key: this.key,
           city: adcode,
         };
         const { data } = await axios.get(`https://restapi.amap.com/v3/weather/weatherInfo`, { params });
         this.weather = data.lives[0];
         this.iconCondition = this.setWeatherIcon(data.lives[0]?.weather);
       },
       // 设置icon
       setWeatherIcon(weather) {
         // 只处理了基础的天气，可以继续精细化处理
         if (weather === '晴') {
           return 'clear-day';
         } else if (weather.includes('云')) {
           return 'partly-cloudy-day';
         } else if (weather.includes('风')) {
           return 'wind';
         } else if (weather.includes('雨')) {
           return 'rain';
         } else if (weather.includes('雪')) {
           return 'snow';
         } else if (weather.includes('雾')) {
           return 'fog';
         }
         return 'cloudy';
       },
     },
   };
   </script>
   <style  scoped>
   .flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   .font-22 {
     font-size: 22px;
   }
   </style>
   