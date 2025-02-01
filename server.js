const puppeteer = require('puppeteer');

const runAutomation = async () => {
    const browser = await puppeteer.launch({ headless: false }); // Запускаем браузер
    const page = await browser.newPage(); // Открываем новую вкладку

    // Переходим на сайт
    await page.goto('https://junon.io', { waitUntil: 'networkidle2' });

    // Выполняем код на странице
    await page.evaluate(() => {
        const requestNewColonyFromMatchmaker = async (isTutorial = false) => {
            let data = {
                env: 'development',
                region: this.main.region,
                sessionId: this.main.sessionId,
                rowCount: 1024, // Указываем количество строк
                colCount: 128  // Указываем количество столбцов
            };

            if (this.main.isLoggedIn()) {
                let idToken = await this.main.getFirebaseIdToken();
                data["idToken"] = idToken;
                data["username"] = this.main.username;
                data["uid"] = this.main.uid;
            }

            if (isTutorial) {
                data["isTutorial"] = true;
            }

            let colonyName = 'TestTest1234';
            if (colonyName.length > 0) {
                data["name"] = colonyName;
            }

            // Логирование данных перед отправкой
            console.log("Отправляемые данные:", data);

            this.main.sendToMatchmaker({ event: "NewColony", data: data });
        }

        // Присваиваем функцию в объект
        main.requestNewColonyFromMatchmaker = requestNewColonyFromMatchmaker;
        main.requestNewColonyFromMatchmaker();
    });

    // Закрываем браузер (по желанию)
    // await browser.close();
};

// Запускаем автоматизацию
runAutomation().catch(console.error);
