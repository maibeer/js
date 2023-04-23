module.exports = {
    countryOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'ПМР', callback_data: 'ПМР'},
                    {text: 'Молдавия', callback_data: 'Молдовы'}]
            ]
        })
    },
}
