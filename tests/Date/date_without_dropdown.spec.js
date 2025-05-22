import{test,expect} from '@playwright/test';

test('Automation Testing Practice', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')


    // const title = await page.title() //create a constant title  
    //console.log(title); // to check the title of the page 

    expect(page).toHaveTitle('Automation Testing Practice');
    await page.locator('#datepicker').click();

    const reqMonth = "December";
    const reqYear = "2023";
  

    
    
    do{
        await page.locator('span.ui-icon-circle-triangle-w').click();
        const month =  await page.locator('.ui-datepicker-month').textContent();
        const year =  await page.locator('.ui-datepicker-year').textContent();

    if (reqMonth===month && reqYear===year) {
        
        break;
     }

    } while(true);

     
    await page.locator('[data-date = "7"]').click();
    await page.waitForTimeout(3000)


})