const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const webCrawler = require('./utils')

const products = []
const imageUrls = []
const titles = []
const prices = []
const newUrls = []

urlTag ='.btn_prcList_sn flt-rt target_link_external impressions_gts'
app.get('/', async (req,res)=>{
    //res.send("hello")
    // 
    const brands = ["xiaomi", "samsung", "oneplus", "vivo", "oppo"]
    const predecessor = "https://www.91mobiles.com"
    const url2 = 'https://www.91mobiles.com/top-10-mobiles-in-india'
    ans = await webCrawler.crawlData(url2)
    console.log(ans);
    // for(let i=0;i<brands.length; i++){
    //     const url = predecessor + '/' + brands[i] +"-mobile-price-list-in-india"
        
    // }
    
    for(let j=0;j<12;j++){
        ans2 = await webCrawler.scrapeData(predecessor+ans[j],'.overview_lrg_pic_img','.h1_pro_head','.store_prc','.btn_prcList_sn.flt-rt.target_link_external.impressions_gts')
        //console.log(ans2);
    }
    res.json(ans2)
})

app.listen(3001, ()=>{
    console.log("Server started");
})

