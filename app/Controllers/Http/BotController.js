'use strict'

const crawling = require('../../../libraries/crawling/index.js');

class BotController {
    constructor() {
        this.number = 1;
        this.data = {
            "month":""
        };
    }

    async index({params}){
        const {id} = params;
        var test = await crawling.index(id).then(val => {
            return val;
        });

        return test;
    }
}

module.exports = BotController
