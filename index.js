const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

// "samsung" "oneplus" "vivo" "oppo"
const brand = "xiaomi"

const url = "https://www.91mobiles.com/"+ brand +"-mobile-price-list-in-india"

const products = []
const titles = []
const prices = []

app.get('/', async (req,res)=>{
    res.send("hello")
    axios(url)
    .then(resp =>{
        const html = resp.data
        //console.log(html);
        //res.send(html)
        const $ = cheerio.load(html)
        $('.finder_pro_image', html).each(function (){
            //console.log($(this));
            const link = $(this).attr('src')
            //const title = $(this).text()
            products.push(link)
        })
        $('.hover_blue_link', html).each(function(){
            const title = $(this).text().replace('\n', '')
            titles.push(title)
        })
        $('.price', html).each(function(){
            const price = $(this).text()
            prices.push(price)
        })
        console.log(products);
        console.log(titles);
        console.log(prices);
    })
    .catch(err =>{
        console.log(err);
    })
    
})

app.listen(3001, ()=>{
    console.log("Server started");
})