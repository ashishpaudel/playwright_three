// import{test, expect} from '@playwright/test';


// test('Date range verification test',async({page})=>{
//     const startDateStr = '01/10/2025';
//     const endDateStr = '04/22/2025';
//     const validDateStr ='4/23/2025'
//     const emptyEndDateStr = ''
//     const  invalidDate = '2025/22/10'


    

// // Calculate difference

//     const startDate = new Date(startDateStr);
//     const endDate = new Date(endDateStr);
//     const diffInMs = endDate - startDate;
//     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
 

  
    

//     // //go to the page 
//     await page.goto('https://testautomationpractice.blogspot.com/');
    
//     // fill a start date 
//     await page.locator('#start-date').pressSequentially(startDateStr);

//     //fill the date on end date 
//     await page.locator('#end-date').pressSequentially(endDateStr);

//     //click submit button
//     await page.locator('.submit-btn').click();
//     const resultText = await page.locator('#result').textContent();
//     console.log('Result:', resultText);
//     console.log(diffInDays.toString());
//     expect(resultText).toContain(diffInDays.toString());


//     await page.waitForTimeout(2000);
// })

import { test, expect } from '@playwright/test';
//import fs from 'fs';
// Test data (shared for all tests)
// const validStartDate = '01/10/2025', validEndDate = '04/22/2025';
//const emptyStartDate = '', emptyEndDate = '';
// const emptyStartDate = '', emptyEndDate = '01/10/2025'
const invalidDate = '2025/22/10';




test.beforeEach(async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
});
  
test.afterEach(async({page},testInfo)=> {
    if (testInfo.status === "failed") {
        // Create screenshots directory if it doesn't exist
        
        await page.screenshot({path:'screenshot/'+testInfo.title+'.png'})
      }
      
  })


  // Test 1: Valid dates
test('Valid dates calculate correct difference', async ({ page }) => {
       // Calculate difference
    const validStartDate = '01/10/2025', validEndDate = '04/22/2025';


    const startDate = new Date(validStartDate);
    const endDate = new Date(validEndDate);
    const diffInMs = endDate - startDate;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    await page.locator('#start-date').pressSequentially(validStartDate);

    //fill the date on end date 
    await page.locator('#end-date').pressSequentially(validEndDate);

    //click submit button
    await page.locator('.submit-btn').click();
    const resultText = await page.locator('#result').textContent();
    // console.log('Result:', resultText);
    // console.log(diffInDays.toString());
    expect(resultText).toContain(diffInDays.toString());
    await page.waitForTimeout(2000);
});
  
// Test 2: Empty start and end date
test('Empty date ',async({page})=>{
    // const emptyStartDate = '', emptyEndDate = '';
    // const startDate = new Date(emptyStartDate);
    // const endDate = new Date(emptyEndDate);
    // const diffInMs = endDate - startDate;
    // const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    // await page.locator('#start-date').pressSequentially(emptyStartDate);
    // await page.locator('#start-date').pressSequentially(emptyEndDate);
    await page.locator('.submit-btn').click()
    var text=await page.locator('.result').textContent();
    await expect(text).toEqual('Please select both start and end dates..');
    
})
// test 3: empty start date only 
test('Empty start date only',async({page})=>{
 const emptyEndDate = '01/10/2025'

await page.locator('#end-date').pressSequentially(emptyEndDate);

await page.locator('.submit-btn').click();
var text=await page.locator('.result').textContent();
await expect(text).toEqual('Please select both start and end dates')

})

//empty end date only
test('empty end date only',async({page})=>{
    const emptyStartDate = '01/10/2025'
    await page.locator('#start-date').pressSequentially(emptyStartDate)
    await page.locator('.submit-btn').click();
    var test = await page.locator('#result').textContent();
    // console.log(test)
    await expect(test).toEqual('Please select both start and end dates.')

})

//different date: end date is higher than start date
test('different date start date is higher than end date',async({page})=>{
    const endDate = '01/10/2025',startDate  = '01/10/2026';
    // const firstInput = new Date(startDate), lastInput = new Date(endDate);

    // const diffDate = Math.ceil((firstInput - lastInput)/(100*60*60*24))
    // console.log(diffDate)
    await page.locator('#start-date').pressSequentially(startDate);
    await page.locator('#end-date').pressSequentially(endDate);
    await page.locator('.submit-btn').click();
    var test = await page.locator('#result').textContent()
    // console.log(test)
    await expect(test).toEqual('End date must be after start date')

})




