
const puppeteer = require('puppeteer');

class Test {

  // 6|3|2020-10-11|5000
  // 1-4 안양시청
  //
    async index(id){
            const courtNumber = id;
            let data = {};
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            const _id = config('ID') || '';
            const _pw = config('PASSWORD') || '';
            const inputData = {
                "com_nm": "평정",
                "use_event_name": "동호회",
                "inwon": 4
            }
            const com_nm = "평정";
            const use_event_name = "동호회";
            const inwon = 4;
            const rule_chk = "";
            const duple_chk = "";
            const apply_chk = "";
            const checktIt = '"';

            await page.goto('http://www.gunpocs.or.kr/07_member/member02.php?url=%2F01_guide%2Fguide02_4.php');
            await page.evaluate((id, pw) => {
                document.querySelector('#login_id').value = id;
                document.querySelector('#login_pass').value = pw;
            }, _id, _pw);
            await page.click('.btn1');
            await page.goto('http://www.gunpocs.or.kr/01_guide/guide02_4.php');
            await page.click('#part05');
            await console.log("Cliked 테니스")
            await page.waitFor(1000);
            await page.click(`input[title="${courtNumber}코트"]`);
            await page.waitFor(1000);
            data.data = [];
            data.month = await page.$eval('fieldset > .title', e => {
                return e.innerText;
            });

            let temData = [];
            temData = await page.$$(".calendar tbody td");
            let mkCompleteDataSet = [];
            for(var i in temData) {
                let mkSchedule = {};
                try{
                    let mkDataSet = await temData[i].$eval('font', el => el.innerText);
                    let mkDataObj = await temData[i].$$eval('li img', el => {
                        let berforeList = [];
                        let j = 5;
                        el.map((value,index) => {
                            let beforeObj ={};
                            j++;
                            beforeObj.time = `${j}:00-${j+1}:00`;
                            beforeObj.src = value.getAttribute('src')
                            berforeList.push(beforeObj);
                        })
                        return JSON.stringify(berforeList);
                    });
                    if(mkDataSet !== undefined) {
                        mkSchedule.day = await mkDataSet;
                        mkSchedule.data = await mkDataObj
                        await mkCompleteDataSet.push(mkSchedule);
                    }
                    data.data = await mkCompleteDataSet;
                }catch(e) {}

            };
            await browser.close();
            return data;


            // await page.waitFor(1000);
            // await console.log("Run Go Rent Function");
            // await page.evaluate(async() => {
            //     frm = document.EventFrm;
            //     frm.nday.value = 11;
            //     frm.action = "guide02_4_step2.php";
            //     frm.submit();
            // });
            // await console.log("Run Go Rent Function2");
            // await console.log("Done Go Rent Function");
            // await page.waitFor(1000);
            // var text = await page.$$(".rent1 #checkbox");
            // await console.log(text.length);


            // await clickTimeTable(page, number);

            // await page.waitFor(1000);
            // await console.log("Clicked CheckBox")
            // await page.waitFor(1000);
            // const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
            // await page.evaluate(() => Commit())
            // const popup = await newPagePromise;
            // await console.log(popup.url());
            // await popup.evaluate(({ com_nm, use_event_name, inwon }) => {

            //     setTimeout(function() {
            //         document.querySelector('#com_nm').value = "평정";
            //         document.querySelector('#use_event_name').value = "동호회";
            //         document.querySelector('#inwon').value = "4";
            //         document.querySelector('[name="rule_chk"]').checked = true;
            //         document.querySelector('[name="duple_chk"]').checked = true;
            //         document.querySelector('[name="apply_chk"]').checked = true;
            //         fieldlist = [
            //             ["com_nm", "단체명"],
            //             ["use_event_name", "행사명"],
            //             ["inwon", "참가인원"]
            //         ];
            //         frm = document.useForm;

            //         if (!checkItems('document.useForm', fieldlist)) return;

            //         if (!frm.rule_chk.checked) {
            //             alert("준수사항에 동의하여 주시기 바랍니다.");
            //             return;
            //         }
            //         if (!frm.duple_chk.checked) {
            //             alert("이중예약 여부 확인해주시기 바랍니다.");
            //             return;
            //         }

            //         if (!frm.apply_chk.checked) {
            //             alert("신청서를 확인해주시기 바랍니다.");
            //             return;
            //         }

            //         if (confirm("대관신청 하시겠습니까?")) {

            //             frm.action = "fmcRentProc.php";
            //             frm.submit();
            //         }
            //     }, 1000)

            // }, inputData);




            // await page.goto('https://naver.com');
            // await page.screenshot({ path: 'naver.png', fullPage: true });
            // await browser.close();
    }

    clickTimeTable(page, number) {
    number = 2;
        if (number < 10) {
            number++
            page.click(`.rent1 .bbs_list5 tbody tr:nth-child(${number}) #checkbox`).catch((e) => {
                clickTimeTable(page, number);
            });
        }
    }
};

module.exports = new Test();
