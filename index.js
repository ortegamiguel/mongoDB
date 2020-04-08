const mongoose = require('mongoose');
// const connectionString = 'mongodb+srv://mortegau:mortega@cluster0-ldhzj.azure.mongodb.net/db_test?retryWrites=true&w=majority';
const {MONGO_URI} = require('./config');
const axios = require('axios').default;
const cheerio = require('cheerio');
const cron = require('node-cron');

//hacer conneccion
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const {BreakingNew} = require('./models')

//crear cron 
//0 */4 * * *
cron.schedule('* * * * * *', async () => {
    console.log('cron job Executed!')
    const html = await axios.get('https://cnnespanol.cnn.com/');
    const $ = cheerio.load(html.data);
    const titles = $('.news__title');
    titles.each((index, element) => {
        const breakingNew = {
            title: $(element)
                .text()
                .trim(),
            link: $(element)
                .children()
                .attr('href')
        };

        BreakingNew.create([breakingNew]);

    })
});

/* (async () => {
    const html = await axios.get('https://cnnespanol.cnn.com/');
    const $ = cheerio.load(html.data);
    const titles = $('.news__title');
    titles.each((index, element) => {
        const breakingNew = {
            title: $(element)
                .text()
                .trim(),
            link: $(element)
                .children()
                .attr('href')
        }

    })
}); */

/**
 * const Cat = mongoose.model('Cat', {name: String});

//guardar nuevo registro.
const kitty = new Cat({name: 'Michi'});
kitty.save().then(() => console.log('Cat has been save!'));

Cat.find().then(console.log)
 */
//crear modelo




