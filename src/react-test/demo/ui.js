const dirExists = require('./dir')
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone6 = devices['iPhone 6']

class UiTest {
	constructor() {
		console.log('what', process.platform)
		this.executablePath
	}

	static executablePath() {
		if (process.platform === 'win32') {
			return './chrome-win/chrome.exe'
		} else if (process.platform === 'linux') {
		} else if (process.platform === 'darwin') {
			return './Chromium.app/Contents/MacOS/Chromium'
		}
	}

	async init() {
		const browser = await puppeteer.launch({
			executablePath: UiTest.executablePath(),
			headless: false,
		})
		const page = await browser.newPage()
		await page.emulate(iPhone6) // 模拟iphone6
		await page.goto('http://localhost:3001/#/login')

		if (page.url().includes('login')) {
			await UiTest.screenImg(page, 'login')
		} else {
			await UiTest.screenImg(page, 'home')
		}
		this.browser = browser
		this.page = page
	}

	/**
	 * 截图
	 *
	 * @static
	 * @param {*} page 页面对象
	 * @param {*} name 图片名字
	 * @memberof UiTest
	 */
	static async screenImg(page, name, path = '') {
		let basePath = `./test-dist/${path ? path + '/' : ''}`
		await dirExists(basePath)
		await page.screenshot({ path: `${basePath}${name}.png` })
	}

	async clickLogin({ className, imgName }) {
		const page = this.page
		await page.reload()
		let classList = ['.user .am-input-control input', '.pwd .am-input-control input']
		for (let cls of classList) {
			if (cls.includes(className) || className == null) {
				await page.focus(cls)
				await page.keyboard.type('yun-xi')
			}
		}
		await page.click('.login-btn')
		await UiTest.screenImg(page, imgName, 'login')
	}

	async describeLogin() {
		let classList = [
			{ className: 'user', imgName: '不输入密码' },
			{ className: 'pwd', imgName: '不输入用户名' },
			{ className: '', imgName: '输入用户名和密码' },
		]
		for (let cls of classList) {
			await this.clickLogin(cls)
		}
	}

	async navList() {
		const page = this.page
		let navList = await page.$$('.nav-item-box')
		let labels = ['点击商品列表', '点击订单列表']
		let items = navList.map((nav, i) => {
			const label = labels[i]
			return {
				nav,
				imgName: label,
			}
		})
		return items
	}

	loads(className) {
		const page = this.page
		return new Promise((resolve, err) => {
			const i = setInterval(async () => {
				let loading = await page.$(className ? className : '.loading-box-1')
				if (loading == null) {
					clearInterval(i)
					resolve()
				}
			}, 100)
		})
	}

	async describeHome() {
		const page = this.page
		await UiTest.screenImg(page, '首页', 'home')
		let items = await this.navList()
		for (let i = 0; i < items.length; i++) {
			items = await this.navList()
			const item = items[i]
			await item.nav.click()
			await this.loads()
			await UiTest.screenImg(page, item.imgName, 'home')
			await page.goto('http://localhost:3001/#/')
		}
	}

	async describeProductList() {
		const page = this.page
		await page.goto('http://localhost:3001/#/product-list')
		await this.loads()
		await UiTest.screenImg(page, '商品列表', 'product')
		let items = await page.$$('.product-box')
		let index = Math.floor(Math.random() * (items.length - 1))
		let item = items[index]
		await item.click()
		await this.loads()
		await UiTest.screenImg(page, '商品详情', 'product')
	}

	async describeConfirmOrder() {
		const page = this.page
		await this.loads()
		let btn = await page.$('.confirmOrder-box .btn')
		await btn.click()
		await UiTest.screenImg(page, '不输入收货人', 'product')

		await this.loads('.am-toast')
		await page.focus('.confirmOrder-box .am-input-control input') // 聚焦输入框
		await page.keyboard.type('我是收货人') // 模拟输入
		await btn.click()
		await this.loads()
		await UiTest.screenImg(page, '输入收货人点击', 'product')
	}

	async describeProductDetail() {
		const page = this.page
		await this.loads()
		let btn = await page.$('.am-button.btn.am-button-primary')
		await btn.click()
		await this.loads()
		await UiTest.screenImg(page, '立即下单', 'product')
	}

	async describeOrderList() {
		const page = this.page
		await this.loads()
		await UiTest.screenImg(page, '订单列表', 'order')
		let items = await this.navList()
		for (let i = 0; i < items.length; i++) {
			items = await this.navList()
			const item = items[i]
			await item.nav.click()
			await this.loads()
			await UiTest.screenImg(page, item.imgName, 'order')
			await page.goto('http://localhost:3001/#/order-list')
		}
	}

	close() {
		this.browser.close()
	}
}

const main = async function() {
	const uiText = new UiTest()
	await uiText.init()
	// await uiText.describeLogin()
	// await uiText.describeHome()
	// await uiText.describeProductList()
	// await uiText.describeProductDetail()
	// await uiText.describeConfirmOrder()
	// await uiText.describeOrderList()
}

main()
