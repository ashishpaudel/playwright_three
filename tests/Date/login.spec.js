import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx'; 

 

test('Login', async ({ page }) => {

    // Read Excel file
    const workbook = XLSX.readFile('D:/playwright_automation_assignment/tests/excel/demo_app.xlsx');
    
    // Get first sheet 
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const formDataArray = XLSX.utils.sheet_to_json(worksheet);
    
    
    // Get first row of data (assuming single row in Excel)
    const formData = formDataArray[0]; 
    //screen shots
    await page.goto('https://testautomationpractice.blogspot.com/');
    // await page.screenshot({path:'tests/screenshots/'+Date.now()+'homepage.png',fullPage:true})
    



    for (const formData of formDataArray) {
    

    // Use the data
   
    
    await page.locator('#name').fill(formData.Name);
    await page.locator('#email').fill(formData.Email);
    await page.locator('#phone').fill(String(formData.Phone));

    await page.locator('#textarea').fill(formData.Address);


    if (formData.Gender=== 'male') {
        await page.locator('#male').click();
    }else {
        await page.locator('#female').click()
    }
    let weekday= formData.Days;
    await page.locator(`#${weekday}`).click();
    console.log(`#${weekday}`); 
    await page.locator('#country').selectOption(formData.Country);
    await page.locator('#colors').selectOption(formData.Colour); 
    await page.locator('#animals').selectOption(formData.Animal);




 

    
    // await page.locator('#name').fill('ashish');
    // await page.locator('#email').fill('ashish@gmail.com');
    // await page.locator('#phone').fill('981111111111');
    // await page.locator('#textarea').fill('Amalachaur, Bagliung');
    // await page.locator('#male').click();
    // await page.locator('input[value = "sunday"]').click();
    // await page.locator('#country').selectOption('Canada');
    // await page.locator('select[name = "Green"]').click(); 
    await page.reload();
    

}
page.close()
})