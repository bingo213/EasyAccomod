export default function caculatePrice({typeOfTime, time}) {
   const priceWeek = 100000;
   const priceMonth = 350000;
   const priceQuarter = 1000000;
   const priceYear = 3000000;
    if(time < 0)
        return 0
   if(typeOfTime === 'week'){
       return time * priceWeek;
   }
   else if(typeOfTime === 'month'){
       return time * priceMonth;
   }
   else if(typeOfTime === 'quarter'){
       return time * priceQuarter;
   }
   else if(typeOfTime === 'year'){
       return time * priceYear;
   }
}