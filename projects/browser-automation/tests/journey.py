"""Optional Playwright test of the local fictional storefront.
Install Playwright and a supported browser in your own test environment first.
Run: python3 tests/journey.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
url=(Path(__file__).resolve().parents[1]/'demo.html').as_uri()
with sync_playwright() as p:
    browser=p.chromium.launch()
    page=browser.new_page()
    page.goto(url)
    page.get_by_role('button',name='Add notebook').click()
    assert page.locator('#total').inner_text()=='$12.00'
    page.get_by_label('Field notebook quantity').fill('2')
    page.get_by_label('Field notebook quantity').press('Tab')
    assert page.locator('#total').inner_text()=='$24.00'
    assert page.locator('#checkout').is_disabled()
    page.locator('#agreement').check()
    page.locator('#checkout').click()
    assert 'DEMO-001' in page.locator('#confirmation').inner_text()
    assert page.locator('#cart-empty').is_visible()
    browser.close()
print('PASS: fictional cart journey')
