const axios = require('axios')
const cheerio = require('cheerio')

// "samsung" "oneplus" "vivo" "oppo"

const predecessor = "https://www.91mobiles.com"

const products = []
const imageUrls = []
const titles = []
const prices = []
const newUrls = []
const crawlUrls = []
const finalData =[]
// const brand = "xiaomi"
// const predecessor = "https://www.91mobiles.com"
// const url = predecessor + '/' + brand +"-mobile-price-list-in-india"
// crawlData(url)

// function crawlData(url){
//     axios(url)
//     .then((resp)=>{
//         const html = resp.data
//         const $ = cheerio.load(html)
//         $('.hover_blue_link', html).each(function(){
//             const link = $(this).attr('href')
//             //console.log(link);
//             crawlUrls.push(link)
//         })
//         return(crawlUrls)
//         //console.log(crawlUrls);
//     })   
// }

async function crawlData(url){
    const resp = await axios(url)
    const html = await resp.data
    const $ = cheerio.load(html)
    $('.hover_blue_link', html).each(function(){
        const link = $(this).attr('href')
        //console.log(link);
        crawlUrls.push(link)
    })
    return(crawlUrls)
}

async function scrapeData(url, imageTag, titleTag, priceTag, linkTag){
    const resp = await axios(url)
    const html = await resp.data
    const $ = cheerio.load(html)
    let data ={}
    $(imageTag, html).each(function (){
        //console.log($(this));
        const link = $(this).attr('src')
        console.log(link);
        data.imageUrl = link
        //const title = $(this).text()
        //imageUrls.push(link)
    })
    $(titleTag, html).each(function(){
        const title = $(this).text()
        data.title = title
        //const newUrl = predecessor + $(this).attr('href')
        //newUrls.push(newUrl)
        //titles.push(title)
        //console.log(title);
    })
    $(priceTag, html).each(function(){
        const price = $(this).text().replace('                                                                                    ','').replace('\n','')
        data.price = price
        //prices.push(price)
    })
    $(linkTag, html).each(function (){
        //console.log($(this));
        const productLink = $(this).attr('data-href-url')
        
        data.productLink = predecessor+productLink
        //const title = $(this).text()
       //products.push(link)
    })
    //data = {imageUrl:link,} 
    if(data.productLink === undefined){
        data.productLink = 'This product is not yet launched'
    }
    if(data.price === undefined){
        data.price = 'This product is not yet launched'
    }    
    finalData.push(data) 
    return finalData
    // console.log(products);
    // console.log(titles);
    // console.log(imageUrls);
    // console.log(prices);
    //res.json({products:products, titles:titles, prices:prices, newUrls:newUrls})
    
}

module.exports.crawlData = crawlData
module.exports.scrapeData = scrapeData