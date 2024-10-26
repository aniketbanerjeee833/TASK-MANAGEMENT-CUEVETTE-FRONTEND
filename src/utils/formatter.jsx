
export const formatDueDate=(dueDate)=>
    {
      
        // if (!dueDate || dueDate.trim() === '') {
                
        //     console.log(`Task  has no due date.`);
        //     // thisWeekTasks.push(allTasks[i])
        //     // continue; 
        // }
     
        if(dueDate){ 

       
       const [day, month, year] = dueDate.split('-');

       // Create a new Date object (months are 0-indexed, so subtract 1 from month)
       const date = new Date(year, month - 1, day);
       
       // Create an options object for formatting
       const options = { month: 'short', day: 'numeric', year: 'numeric' };
       
       // Format the date to "October 20, 2024"
       const formattedDate = date.toLocaleDateString('en-US', options);
       const getDayWithSuffix = (day) => {
           if (day > 3 && day < 21) return day + 'th'; // 11th to 13th are all 'th'
           switch (day % 10) {
             case 1: return day + 'st';
             case 2: return day + 'nd';
             case 3: return day + 'rd';
             default: return day + 'th';
           }
         };
         
         // Get the day with suffix
         const dayWithSuffix = getDayWithSuffix(date.getDate());
         
         // Combine to get the final output
         const finalOutput = `${date.toLocaleString('default', { month: 'short' })} ${dayWithSuffix}`;
        //  console.log(finalOutput)
         return finalOutput
        //  setFormattedDueDate(finalOutput)
        }

   }
   export const getOrdinalNum = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  export const shareFormatDueDate=(dueDate)=>
    {
       console.log(dueDate)
       const [day, month, year] = dueDate.split('-');

       // Create a new Date object (months are 0-indexed, so subtract 1 from month)
       const date = new Date(year, month - 1, day);
       
       // Create an options object for formatting
       const options = { month: 'short', day: 'numeric', year: 'numeric' };
       
       // Format the date to "October 20, 2024"
       const formattedDate = date.toLocaleDateString('en-US', options);
       const getDayWithSuffix = (day) => {
           if (day > 3 && day < 21) return day + 'th'; // 11th to 13th are all 'th'
           switch (day % 10) {
             case 1: return day + 'st';
             case 2: return day + 'nd';
             case 3: return day + 'rd';
             default: return day + 'th';
           }
         };
         
         // Get the day with suffix
         const dayWithSuffix = getDayWithSuffix(date.getDate());
         
         // Combine to get the final output
         const finalOutput = `${date.toLocaleString('default', { month: 'short' })} ${dayWithSuffix}`;
         console.log(finalOutput)
         return finalOutput
        // setFormattedDueDate(finalOutput)
       

   }


  // Get today's date
