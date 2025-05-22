import{test, expect} from '@playwright/test';

test('Automation Test Task', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    // console.log(await page.title());
    await expect(page).toHaveTitle("Automation Testing Practice");

    await page.locator('#txtDate').click();

    

    // await page.locator('select.ui-datepicker-month').click();
    
    await page.locator('select.ui-datepicker-month').selectOption("Feb");
    await page.locator('select.ui-datepicker-year').selectOption({value:"2024"});
    await page.locator('[data-date = "7"]').click()


    await page.waitForTimeout(3000)





})