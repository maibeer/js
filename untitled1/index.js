const TelegramApi = require('node-telegram-bot-api')
const {countryOptions} = require('./options')
const token = "6235637046:AAE-x9spHPNakUl0BxPnVGsHS4jjZwMftpw"

const bot = new TelegramApi(token, {polling:true})

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать разгавор'},
        {command: '/info', description: 'Вещи'},
        {command: '/country', description: 'Страна'}
    ])
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        if (text === '/start') {
            return await bot.sendMessage(chatId, `Привествую в нашем магазине ${msg.from.first_name}, мы бы хотели извини́ться за такого не работоспособного бота, но это только начало дальше лучше!`)
        }
        if (text === '/info') {
            return await bot.sendMessage(chatId, `Магазин вещей, на данный момент работаем только по ПМР и Молдове!`)
        }
        if (text === '/country') {
            return await bot.sendMessage(chatId, `Ваше местоположение`, countryOptions)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз');
    });
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        let photoUrls = [];
        let captions = [];
        bot.sendMessage(chatId, `Хорошо вот товар который доступен для ${data}`)
        switch (data) {
            case 'ПМР':
                photoUrls = ['https://instagram.fkiv6-1.fna.fbcdn.net/v/t51.2885-15/340313519_229728639605662_6456471082992000305_n.jpg?stp=dst-jpg_e35_p720x720&_nc_ht=instagram.fkiv6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=soiDZP_vt5kAX9dcAyi&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzA3NzU0NjE2ODk1ODM4NDA1OQ%3D%3D.2-ccb7-5&oh=00_AfAtNzgUx5PV-SElPoMYfd8z4LGSjJpr35H0jkocacFi7w&oe=643FA935&_nc_sid=1527a3',
                    'https://instagram.fkiv6-1.fna.fbcdn.net/v/t51.2885-15/340520797_1258400511728799_7054763821112864356_n.jpg?stp=dst-jpg_e35_p720x720&_nc_ht=instagram.fkiv6-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=p-Cuo28bGEYAX_NOfVD&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzA3NzU0NzIzMzQzOTE2NDc5NA%3D%3D.2-ccb7-5&oh=00_AfAiQYs7AOnItDuKDvfo0SODt6r7usJVimCskxkp90r2sg&oe=643F2AC9&_nc_sid=1527a3','https://instagram.fkiv6-1.fna.fbcdn.net/v/t51.2885-15/340165956_6515081161836631_5347304952252308976_n.jpg?stp=dst-jpg_e35_p720x720&_nc_ht=instagram.fkiv6-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=EIoUXAvV53MAX_5L91R&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzA3NzU0MzMzODM1Njc3NjI2OQ%3D%3D.2-ccb7-5&oh=00_AfCIH1g7ej_xHzH333tA1riXoB1JeOPV8GrKRSlCmSN4ZA&oe=64417FF8&_nc_sid=1527a3'];
                captions = ['Штаны Nike Big Swoosh \n Размер L \n Price 23$',
                    'Штаны Nike Tech Fleece\n Размер L \n Price 12$',
                    'Штаны Kappa \n Размер L \n Price 33$']
                break;
            case 'Молдовы':
                photoUrls = ['https://instagram.fkiv6-1.fna.fbcdn.net/v/t51.2885-15/339673828_2656608744480291_5092484860971291015_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.fkiv6-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=XYe1q-9BeNMAX95_Wfk&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzA3NTY5NDg3MDE2NDIzOTc3OA%3D%3D.2-ccb7-5&oh=00_AfBO6xJBzDeB464Y7MHLnXHloGe_GXF8Ds_WGZlI7XKqpA&oe=643F279C&_nc_sid=1527a3'];
                captions = ['Мессенджер Carhartt \n Размер регулируется \n Price 17$']
                break;
            default:
                bot.sendMessage(chatId, `Неправильное значение: ${data}`);
                return;
        }
        for (let i = 0; i < photoUrls.length; i++) {
            bot.sendPhoto(chatId, photoUrls[i], {caption: captions[i]});
            if (i !== photoUrls.length - 1) {
                bot.sendMessage(chatId, '\n');
            }
        }
        console.log(msg);
        setTimeout(() => {
            bot.sendMessage(chatId, 'Приметили что-то для вас? Обращайтесь по контакту нашего менеджера @FULLFOCuuS');
        }, 4000);
  });
}

start()