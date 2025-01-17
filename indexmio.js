const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const app = express();

const url = 'https://alexpra2.github.io/dashboard/' 

app.get ('/', (req,res) => {
    //Axios funciona como un fetch
    axios.get(url).then((response) => {
        if(response.status === 200){
            
            //traigo todos los datos de la url
            const html = response.data;
            //console.log(html);
           
            //Traigo a la variable $ la informacion de la pagina con cheerio caregando la informacion de html
            const $ = cheerio.load(html);
            
            //Accedo al titulo.
            const pageTitle = $('title').text()
            //console.log(pageTitle);
            
            const links =[];
            const imgs = [];

            //Traigo link mediante each (como foreach)
            $('a').each((index, element) => {
                const link = $(element).attr(`href`);

                links.push(link)
            });

            console.log(links);

            //Traigo las imagenes mediante each (como foreach)
            $('img').each((index, element) => {
                const img = $(element).attr(`src`);

                imgs.push(img)
            });

            console.log(imgs);
            
            //pinto todo en html en /
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                <h2>Imagenes</h2>
                <ul>
                    ${imgs.map(img =>  `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                </ul>
            `);             
        }
    })
});

app.listen(4000, () => {
    console.log('Express esta escuchando en el puerto http://localhost:4000');
  });