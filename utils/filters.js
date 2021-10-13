/*
  全局使用定义好的过滤器==》
  import filters from "./tool/filters";
  Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]); });
*/


//时间戳转换为指定格式时间   例===》将时间戳转化为2019-10-15==》  {{new Date()|timeFormat("dateYMD")}} 
export const timeFormat = (value, format) => {
    if (!value) {
        return "";
    }

    let date = new Date(value);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    let result = "";

    //2019-09-15 22:07:01
    if (format == "YMDHMS") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    if (format === 'timeFormatYMD') {
        result = `${y}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}`;
    }
    //2019-09-15
    if (format == "YMD") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }
    //2019-09-15
    if (format == "Y/M/D") {
        result = `${y}/${m < 10 ? "0" + m : m}/${d < 10 ? "0" + d : d}`;
    }
    //2019-09-15 22:07
    if (format == "YMDHM") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
    }
    //2019-09-15 22:07:00
    if (format == "YMDHMS") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    if (format == "YMDH") {
        result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${h < 10 ? "0" + h : h}`;
    }
    //2019-09
    if (format == "YM") {
        result = `${y}-${m < 10 ? "0" + m : m}`;
    }
    //09-15
    if (format == "MD") {
        result = ` ${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }
    //22:07
    if (format == "HM") {
        result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
    }
    //2019年09月15日08时10分
    if (format == "dateYMDHM") {
        result = `${y}年${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日${h < 10 ? "0" + h : h}时${min < 10 ? "0" + min : min}分`;
    }
    //2019年09月15日08时
    if (format == "dateYMDH") {
        result = `${y}年${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日${h < 10 ? "0" + h : h}时`;
    }
    //2019年09月15日
    if (format == "dateYMD") {
        result = `${y}年${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日`;
    }
    //2019年09月
    if (format == "dateYM") {
        result = `${y}年${m < 10 ? "0" + m : m}月`;
    }
    //09月10日
    if (format == "dateMD") {
        result = `${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日`;
    }
    //时分秒
    if (format == "HMS") {
        result = `${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
    }
    return result;
};

export default {
    timeFormat
};