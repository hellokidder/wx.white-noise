"use strict";

/**
* @1900-2100区间内的公历、农历互转
* @charset UTF-8
* @Author  Jea杨(JJonline@JJonline.Cn) 
* @Time    2014-7-21
* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
* @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
* @Version 1.0.3
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/
var calendar = {

    /**
      * 农历1900-2100的润大小信息表
        * @Array Of Property
        * @return Hex
        */
    lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
    0x0d520], // 2100

    /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    /**
      * 天干地支之天干速查表
      * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
      * @return Cn string 
      */
    Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

    /**
      * 天干地支之地支速查表
      * @Array Of Property
      * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
      * @return Cn string
      */
    Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

    /**
      * 天干地支之地支速查表<=>生肖
      * @Array Of Property
      * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
      * @return Cn string
      */
    Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

    /**
      * 24节气速查表
      * @Array Of Property 
      * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
      * @return Cn string 
      */
    solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

    /**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property 
      * @return 0x string For splice
      */
    sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

    /**
      * 数字转中文速查表
      * @Array Of Property 
      * @trans ['日','一','二','三','四','五','六','七','八','九','十']
      * @return Cn string 
      */
    nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

    /**
      * 日期转农历称呼速查表
      * @Array Of Property 
      * @trans ['初','十','廿','卅']
      * @return Cn string 
      */
    nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

    /**
      * 月份转农历称呼速查表
      * @Array Of Property 
      * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
      * @return Cn string 
      */
    nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

    /**
      * 返回农历y年一整年的总天数
      * @param lunar Year
      * @return Number
      * @eg:var count = calendar.lYearDays(1987) ;//count=387
      */
    lYearDays: function lYearDays(y) {
        var i,
            sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += calendar.lunarInfo[y - 1900] & i ? 1 : 0;
        }
        return sum + calendar.leapDays(y);
    },

    /**
      * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
      * @param lunar Year
      * @return Number (0-12)
      * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
      */
    leapMonth: function leapMonth(y) {
        //闰字编码 \u95f0
        return calendar.lunarInfo[y - 1900] & 0xf;
    },

    /**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      * @param lunar Year
      * @return Number (0、29、30)
      * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
      */
    leapDays: function leapDays(y) {
        if (calendar.leapMonth(y)) {
            return calendar.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        }
        return 0;
    },

    /**
      * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
      * @param lunar Year
      * @return Number (-1、29、30)
      * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
      */
    monthDays: function monthDays(y, m) {
        if (m > 12 || m < 1) {
            return -1;
        } //月份参数从1至12，参数错误返回-1
        return calendar.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
    },

    /**
      * 返回公历(!)y年m月的天数
      * @param solar Year
      * @return Number (-1、28、29、30、31)
      * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
      */
    solarDays: function solarDays(y, m) {
        if (m > 12 || m < 1) {
            return -1;
        } //若参数错误 返回-1
        var ms = m - 1;
        if (ms == 1) {
            //2月份的闰平规律测算后确认返回28或29
            return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
        } else {
            return calendar.solarMonth[ms];
        }
    },

    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    toGanZhiYear: function toGanZhiYear(lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
        if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
        return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];
    },

    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    toAstro: function toAstro(cMonth, cDay) {
        var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; //座
    },

    /**
      * 传入offset偏移量返回干支
      * @param offset 相对甲子的偏移量
      * @return Cn string
      */
    toGanZhi: function toGanZhi(offset) {
        return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
    },

    /**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
    getTerm: function getTerm(y, n) {
        if (y < 1900 || y > 2100) {
            return -1;
        }
        if (n < 1 || n > 24) {
            return -1;
        }
        var _table = calendar.sTermInfo[y - 1900];
        var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
        var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
        return parseInt(_calday[n - 1]);
    },

    /**
      * 传入农历数字月份返回汉语通俗表示法
      * @param lunar month
      * @return Cn string
      * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
      */
    toChinaMonth: function toChinaMonth(m) {
        // 月 => \u6708
        if (m > 12 || m < 1) {
            return -1;
        } //若参数错误 返回-1
        var s = calendar.nStr3[m - 1];
        s += "\u6708"; //加上月字
        return s;
    },

    /**
      * 传入农历日期数字返回汉字表示法
      * @param lunar day
      * @return Cn string
      * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
      */
    toChinaDay: function toChinaDay(d) {
        //日 => \u65e5
        var s;
        switch (d) {
            case 10:
                s = "\u521D\u5341";break;
            case 20:
                s = "\u4E8C\u5341";break;
                break;
            case 30:
                s = "\u4E09\u5341";break;
                break;
            default:
                s = calendar.nStr2[Math.floor(d / 10)];
                s += calendar.nStr1[d % 10];
        }
        return s;
    },

    /**
      * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
      * @param y year
      * @return Cn string
      * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
      */
    getAnimal: function getAnimal(y) {
        return calendar.Animals[(y - 4) % 12];
    },

    /**
      * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
      * @param y  solar year
      * @param m  solar month
      * @param d  solar day
      * @return JSON object
      * @eg:console.log(calendar.solar2lunar(1987,11,01));
      */
    solar2lunar: function solar2lunar(y, m, d) {
        //参数区间1900.1.31~2100.12.31
        //年份限定、上限
        if (y < 1900 || y > 2100) {
            return -1; // undefined转换为数字变为NaN
        }
        //公历传参最下限
        if (y == 1900 && m == 1 && d < 31) {
            return -1;
        }
        //未传参  获得当天
        if (!y) {
            var objDate = new Date();
        } else {
            var objDate = new Date(y, parseInt(m) - 1, d);
        }
        var i,
            leap = 0,
            temp = 0;
        //修正ymd参数
        var y = objDate.getFullYear(),
            m = objDate.getMonth() + 1,
            d = objDate.getDate();
        var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = calendar.lYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;i--;
        }

        //是否今天
        var isTodayObj = new Date(),
            isToday = false;
        if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
            isToday = true;
        }
        //星期几
        var nWeek = objDate.getDay(),
            cWeek = calendar.nStr1[nWeek];
        //数字表示周几顺应天朝周一开始的惯例
        if (nWeek == 0) {
            nWeek = 7;
        }
        //农历年
        var year = i;
        var leap = calendar.leapMonth(i); //闰哪个月
        var isLeap = false;

        //效验闰月
        for (i = 1; i < 13 && offset > 0; i++) {
            //闰月
            if (leap > 0 && i == leap + 1 && isLeap == false) {
                --i;
                isLeap = true;temp = calendar.leapDays(year); //计算农历闰月天数
            } else {
                temp = calendar.monthDays(year, i); //计算农历普通月天数
            }
            //解除闰月
            if (isLeap == true && i == leap + 1) {
                isLeap = false;
            }
            offset -= temp;
        }
        // 闰月导致数组下标重叠取反
        if (offset == 0 && leap > 0 && i == leap + 1) {
            if (isLeap) {
                isLeap = false;
            } else {
                isLeap = true;--i;
            }
        }
        if (offset < 0) {
            offset += temp;--i;
        }
        //农历月
        var month = i;
        //农历日
        var day = offset + 1;
        //天干地支处理
        var sm = m - 1;
        var gzY = calendar.toGanZhiYear(year);

        // 当月的两个节气
        // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
        var firstNode = calendar.getTerm(y, m * 2 - 1); //返回当月「节」为几日开始
        var secondNode = calendar.getTerm(y, m * 2); //返回当月「节」为几日开始

        // 依据12节气修正干支月
        var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
        if (d >= firstNode) {
            gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
        }

        //传入的日期的节气与否
        var isTerm = false;
        var Term = null;
        if (firstNode == d) {
            isTerm = true;
            Term = calendar.solarTerm[m * 2 - 2];
        }
        if (secondNode == d) {
            isTerm = true;
            Term = calendar.solarTerm[m * 2 - 1];
        }
        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        var gzD = calendar.toGanZhi(dayCyclical + d - 1);
        //该日期所属的星座
        var astro = calendar.toAstro(m, d);

        return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': calendar.getAnimal(year), 'IMonthCn': (isLeap ? "\u95F0" : '') + calendar.toChinaMonth(month), 'IDayCn': calendar.toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661F\u671F" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
    },

    /**
      * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
      * @param y  lunar year
      * @param m  lunar month
      * @param d  lunar day
      * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
      * @return JSON object
      * @eg:console.log(calendar.lunar2solar(1987,9,10));
      */
    lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {
        //参数区间1900.1.31~2100.12.1
        var isLeapMonth = !!isLeapMonth;
        var leapOffset = 0;
        var leapMonth = calendar.leapMonth(y);
        var leapDay = calendar.leapDays(y);
        if (isLeapMonth && leapMonth != m) {
            return -1;
        } //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
        if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
            return -1;
        } //超出了最大极限值 
        var day = calendar.monthDays(y, m);
        var _day = day;
        //bugFix 2016-9-25 
        //if month is leap, _day use leapDays method 
        if (isLeapMonth) {
            _day = calendar.leapDays(y, m);
        }
        if (y < 1900 || y > 2100 || d > _day) {
            return -1;
        } //参数合法性效验

        //计算农历的时间差
        var offset = 0;
        for (var i = 1900; i < y; i++) {
            offset += calendar.lYearDays(i);
        }
        var leap = 0,
            isAdd = false;
        for (var i = 1; i < m; i++) {
            leap = calendar.leapMonth(y);
            if (!isAdd) {
                //处理闰月
                if (leap <= i && leap > 0) {
                    offset += calendar.leapDays(y);isAdd = true;
                }
            }
            offset += calendar.monthDays(y, i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if (isLeapMonth) {
            offset += day;
        }
        //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
        var calObj = new Date((offset + d - 31) * 86400000 + stmap);
        var cY = calObj.getUTCFullYear();
        var cM = calObj.getUTCMonth() + 1;
        var cD = calObj.getUTCDate();

        return calendar.solar2lunar(cY, cM, cD);
    }
};
module.exports = calendar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImNhbGVuZGFyIiwibHVuYXJJbmZvIiwic29sYXJNb250aCIsIkdhbiIsIlpoaSIsIkFuaW1hbHMiLCJzb2xhclRlcm0iLCJzVGVybUluZm8iLCJuU3RyMSIsIm5TdHIyIiwiblN0cjMiLCJsWWVhckRheXMiLCJ5IiwiaSIsInN1bSIsImxlYXBEYXlzIiwibGVhcE1vbnRoIiwibW9udGhEYXlzIiwibSIsInNvbGFyRGF5cyIsIm1zIiwidG9HYW5aaGlZZWFyIiwibFllYXIiLCJnYW5LZXkiLCJ6aGlLZXkiLCJ0b0FzdHJvIiwiY01vbnRoIiwiY0RheSIsInMiLCJhcnIiLCJzdWJzdHIiLCJ0b0dhblpoaSIsIm9mZnNldCIsImdldFRlcm0iLCJuIiwiX3RhYmxlIiwiX2luZm8iLCJwYXJzZUludCIsInRvU3RyaW5nIiwiX2NhbGRheSIsInRvQ2hpbmFNb250aCIsInRvQ2hpbmFEYXkiLCJkIiwiTWF0aCIsImZsb29yIiwiZ2V0QW5pbWFsIiwic29sYXIybHVuYXIiLCJvYmpEYXRlIiwiRGF0ZSIsImxlYXAiLCJ0ZW1wIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJVVEMiLCJpc1RvZGF5T2JqIiwiaXNUb2RheSIsIm5XZWVrIiwiZ2V0RGF5IiwiY1dlZWsiLCJ5ZWFyIiwiaXNMZWFwIiwibW9udGgiLCJkYXkiLCJzbSIsImd6WSIsImZpcnN0Tm9kZSIsInNlY29uZE5vZGUiLCJnek0iLCJpc1Rlcm0iLCJUZXJtIiwiZGF5Q3ljbGljYWwiLCJnekQiLCJhc3RybyIsImx1bmFyMnNvbGFyIiwiaXNMZWFwTW9udGgiLCJsZWFwT2Zmc2V0IiwibGVhcERheSIsIl9kYXkiLCJpc0FkZCIsInN0bWFwIiwiY2FsT2JqIiwiY1kiLCJnZXRVVENGdWxsWWVhciIsImNNIiwiZ2V0VVRDTW9udGgiLCJjRCIsImdldFVUQ0RhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7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QTZCRSxFQUE3QixDQUFQO0FBQ0g7QUFqaEJVLENBQWY7QUFtaEJJRSxPQUFPQyxPQUFQLEdBQWlCekYsUUFBakIiLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQDE5MDAtMjEwMOWMuumXtOWGheeahOWFrOWOhuOAgeWGnOWOhuS6kui9rFxuKiBAY2hhcnNldCBVVEYtOFxuKiBAQXV0aG9yICBKZWHmnagoSkpvbmxpbmVASkpvbmxpbmUuQ24pIFxuKiBAVGltZSAgICAyMDE0LTctMjFcbiogQFRpbWUgICAgMjAxNi04LTEzIEZpeGVkIDIwMzNoZXjjgIFBdHRyaWJ1dGlvbiBBbm5hbHNcbiogQFRpbWUgICAgMjAxNi05LTI1IEZpeGVkIGx1bmFyIExlYXBNb250aCBQYXJhbSBCdWdcbiogQFRpbWUgICAgMjAxNy03LTI0IEZpeGVkIHVzZSBnZXRUZXJtIEZ1bmMgUGFyYW0gRXJyb3IudXNlIHNvbGFyIHllYXIsTk9UIGx1bmFyIHllYXJcbiogQFZlcnNpb24gMS4wLjNcbiogQOWFrOWOhui9rOWGnOWOhu+8mmNhbGVuZGFyLnNvbGFyMmx1bmFyKDE5ODcsMTEsMDEpOyAvL1t5b3UgY2FuIGlnbm9yZSBwYXJhbXMgb2YgcHJlZml4IDBdXG4qIEDlhpzljobovazlhazljobvvJpjYWxlbmRhci5sdW5hcjJzb2xhcigxOTg3LDA5LDEwKTsgLy9beW91IGNhbiBpZ25vcmUgcGFyYW1zIG9mIHByZWZpeCAwXVxuKi9cbnZhciBjYWxlbmRhciA9IHtcblxuICAgIC8qKlxuICAgICAgKiDlhpzljoYxOTAwLTIxMDDnmoTmtqblpKflsI/kv6Hmga/ooahcbiAgICAgICAgKiBAQXJyYXkgT2YgUHJvcGVydHlcbiAgICAgICAgKiBAcmV0dXJuIEhleFxuICAgICAgICAqL1xuICBsdW5hckluZm86IFsweDA0YmQ4LCAweDA0YWUwLCAweDBhNTcwLCAweDA1NGQ1LCAweDBkMjYwLCAweDBkOTUwLCAweDE2NTU0LCAweDA1NmEwLCAweDA5YWQwLCAweDA1NWQyLCAvLyAxOTAwLTE5MDlcbiAgICAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAweDA5NWIwLCAweDE0OTc3LCAvLyAxOTEwLTE5MTlcbiAgICAweDA0OTcwLCAweDBhNGIwLCAweDBiNGI1LCAweDA2YTUwLCAweDA2ZDQwLCAweDFhYjU0LCAweDAyYjYwLCAweDA5NTcwLCAweDA1MmYyLCAweDA0OTcwLCAvLyAxOTIwLTE5MjlcbiAgICAweDA2NTY2LCAweDBkNGEwLCAweDBlYTUwLCAweDA2ZTk1LCAweDA1YWQwLCAweDAyYjYwLCAweDE4NmUzLCAweDA5MmUwLCAweDFjOGQ3LCAweDBjOTUwLCAvLyAxOTMwLTE5MzlcbiAgICAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LCAvLyAxOTQwLTE5NDlcbiAgICAweDA2Y2EwLCAweDBiNTUwLCAweDE1MzU1LCAweDA0ZGEwLCAweDBhNWIwLCAweDE0NTczLCAweDA1MmIwLCAweDBhOWE4LCAweDBlOTUwLCAweDA2YWEwLCAvLyAxOTUwLTE5NTlcbiAgICAweDBhZWE2LCAweDBhYjUwLCAweDA0YjYwLCAweDBhYWU0LCAweDBhNTcwLCAweDA1MjYwLCAweDBmMjYzLCAweDBkOTUwLCAweDA1YjU3LCAweDA1NmEwLCAvLyAxOTYwLTE5NjlcbiAgICAweDA5NmQwLCAweDA0ZGQ1LCAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNmEwLCAweDE5NWE2LCAvLyAxOTcwLTE5NzlcbiAgICAweDA5NWIwLCAweDA0OWIwLCAweDBhOTc0LCAweDBhNGIwLCAweDBiMjdhLCAweDA2YTUwLCAweDA2ZDQwLCAweDBhZjQ2LCAweDBhYjYwLCAweDA5NTcwLCAvLyAxOTgwLTE5ODlcbiAgICAweDA0YWY1LCAweDA0OTcwLCAweDA2NGIwLCAweDA3NGEzLCAweDBlYTUwLCAweDA2YjU4LCAweDA1NWMwLCAweDBhYjYwLCAweDA5NmQ1LCAweDA5MmUwLCAvLyAxOTkwLTE5OTlcbiAgICAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAweDA5MmQwLCAweDBjYWI1LCAvLyAyMDAwLTIwMDlcbiAgICAweDBhOTUwLCAweDBiNGEwLCAweDBiYWE0LCAweDBhZDUwLCAweDA1NWQ5LCAweDA0YmEwLCAweDBhNWIwLCAweDE1MTc2LCAweDA1MmIwLCAweDBhOTMwLCAvLyAyMDEwLTIwMTlcbiAgICAweDA3OTU0LCAweDA2YWEwLCAweDBhZDUwLCAweDA1YjUyLCAweDA0YjYwLCAweDBhNmU2LCAweDBhNGUwLCAweDBkMjYwLCAweDBlYTY1LCAweDBkNTMwLCAvLyAyMDIwLTIwMjlcbiAgICAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YWZiLCAweDA0YWQwLCAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LCAvLyAyMDMwLTIwMzlcbiAgICAweDBiNWEwLCAweDA1NmQwLCAweDA1NWIyLCAweDA0OWIwLCAweDBhNTc3LCAweDBhNGIwLCAweDBhYTUwLCAweDFiMjU1LCAweDA2ZDIwLCAweDBhZGEwLCAvLyAyMDQwLTIwNDlcbiAgICAweDE0YjYzLCAweDA5MzcwLCAweDA0OWY4LCAweDA0OTcwLCAweDA2NGIwLCAweDE2OGE2LCAweDBlYTUwLCAweDA2YjIwLCAweDFhNmM0LCAweDBhYWUwLCAvLyAyMDUwLTIwNTlcbiAgICAweDBhMmUwLCAweDBkMmUzLCAweDBjOTYwLCAweDBkNTU3LCAweDBkNGEwLCAweDBkYTUwLCAweDA1ZDU1LCAweDA1NmEwLCAweDBhNmQwLCAweDA1NWQ0LCAvLyAyMDYwLTIwNjlcbiAgICAweDA1MmQwLCAweDBhOWI4LCAweDBhOTUwLCAweDBiNGEwLCAweDBiNmE2LCAweDBhZDUwLCAweDA1NWEwLCAweDBhYmE0LCAweDBhNWIwLCAweDA1MmIwLCAvLyAyMDcwLTIwNzlcbiAgICAweDBiMjczLCAweDA2OTMwLCAweDA3MzM3LCAweDA2YWEwLCAweDBhZDUwLCAweDE0YjU1LCAweDA0YjYwLCAweDBhNTcwLCAweDA1NGU0LCAweDBkMTYwLCAvLyAyMDgwLTIwODlcbiAgICAweDBlOTY4LCAweDBkNTIwLCAweDBkYWEwLCAweDE2YWE2LCAweDA1NmQwLCAweDA0YWUwLCAweDBhOWQ0LCAweDBhMmQwLCAweDBkMTUwLCAweDBmMjUyLCAvLyAyMDkwLTIwOTlcbiAgICAweDBkNTIwXSwgLy8gMjEwMFxuXG4gICAgLyoqXG4gICAgICAqIOWFrOWOhuavj+S4quaciOS7veeahOWkqeaVsOaZrumAmuihqFxuICAgICAgKiBAQXJyYXkgT2YgUHJvcGVydHlcbiAgICAgICogQHJldHVybiBOdW1iZXJcbiAgICAgICovXG4gIHNvbGFyTW9udGg6IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcblxuICAgIC8qKlxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlpKnlubLpgJ/mn6XooahcbiAgICAgICogQEFycmF5IE9mIFByb3BlcnR5IHRyYW5zW1wi55SyXCIsXCLkuZlcIixcIuS4mVwiLFwi5LiBXCIsXCLmiIpcIixcIuW3sVwiLFwi5bqaXCIsXCLovptcIixcIuWjrFwiLFwi55m4XCJdXG4gICAgICAqIEByZXR1cm4gQ24gc3RyaW5nIFxuICAgICAgKi9cbiAgR2FuOiBbXCJcXHU3NTMyXCIsIFwiXFx1NGU1OVwiLCBcIlxcdTRlMTlcIiwgXCJcXHU0ZTAxXCIsIFwiXFx1NjIwYVwiLCBcIlxcdTVkZjFcIiwgXCJcXHU1ZTlhXCIsIFwiXFx1OGY5YlwiLCBcIlxcdTU4ZWNcIiwgXCJcXHU3Njc4XCJdLFxuXG4gICAgLyoqXG4gICAgICAqIOWkqeW5suWcsOaUr+S5i+WcsOaUr+mAn+afpeihqFxuICAgICAgKiBAQXJyYXkgT2YgUHJvcGVydHlcbiAgICAgICogQHRyYW5zW1wi5a2QXCIsXCLkuJFcIixcIuWvhVwiLFwi5Y2vXCIsXCLovrBcIixcIuW3s1wiLFwi5Y2IXCIsXCLmnKpcIixcIueUs1wiLFwi6YWJXCIsXCLmiIxcIixcIuS6pVwiXVxuICAgICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgICAgKi9cbiAgWmhpOiBbXCJcXHU1YjUwXCIsIFwiXFx1NGUxMVwiLCBcIlxcdTViYzVcIiwgXCJcXHU1MzZmXCIsIFwiXFx1OGZiMFwiLCBcIlxcdTVkZjNcIiwgXCJcXHU1MzQ4XCIsIFwiXFx1NjcyYVwiLCBcIlxcdTc1MzNcIiwgXCJcXHU5MTQ5XCIsIFwiXFx1NjIwY1wiLCBcIlxcdTRlYTVcIl0sXG5cbiAgICAvKipcbiAgICAgICog5aSp5bmy5Zyw5pSv5LmL5Zyw5pSv6YCf5p+l6KGoPD0+55Sf6IKWXG4gICAgICAqIEBBcnJheSBPZiBQcm9wZXJ0eVxuICAgICAgKiBAdHJhbnNbXCLpvKBcIixcIueJm1wiLFwi6JmOXCIsXCLlhZRcIixcIum+mVwiLFwi6JuHXCIsXCLpqaxcIixcIue+ilwiLFwi54y0XCIsXCLpuKFcIixcIueLl1wiLFwi54yqXCJdXG4gICAgICAqIEByZXR1cm4gQ24gc3RyaW5nXG4gICAgICAqL1xuICBBbmltYWxzOiBbXCJcXHU5ZjIwXCIsIFwiXFx1NzI1YlwiLCBcIlxcdTg2NGVcIiwgXCJcXHU1MTU0XCIsIFwiXFx1OWY5OVwiLCBcIlxcdTg2YzdcIiwgXCJcXHU5YTZjXCIsIFwiXFx1N2Y4YVwiLCBcIlxcdTczMzRcIiwgXCJcXHU5ZTIxXCIsIFwiXFx1NzJkN1wiLCBcIlxcdTczMmFcIl0sXG5cbiAgICAvKipcbiAgICAgICogMjToioLmsJTpgJ/mn6XooahcbiAgICAgICogQEFycmF5IE9mIFByb3BlcnR5IFxuICAgICAgKiBAdHJhbnNbXCLlsI/lr5JcIixcIuWkp+WvklwiLFwi56uL5pilXCIsXCLpm6jmsLRcIixcIuaDiuibsFwiLFwi5pil5YiGXCIsXCLmuIXmmI5cIixcIuiwt+mbqFwiLFwi56uL5aSPXCIsXCLlsI/mu6FcIixcIuiKkuenjVwiLFwi5aSP6IezXCIsXCLlsI/mmpFcIixcIuWkp+aakVwiLFwi56uL56eLXCIsXCLlpITmmpFcIixcIueZvemcslwiLFwi56eL5YiGXCIsXCLlr5LpnLJcIixcIumcnOmZjVwiLFwi56uL5YasXCIsXCLlsI/pm6pcIixcIuWkp+mbqlwiLFwi5Yas6IezXCJdXG4gICAgICAqIEByZXR1cm4gQ24gc3RyaW5nIFxuICAgICAgKi9cbiAgICBzb2xhclRlcm06IFtcIlxcdTVjMGZcXHU1YmQyXCIsIFwiXFx1NTkyN1xcdTViZDJcIiwgXCJcXHU3YWNiXFx1NjYyNVwiLCBcIlxcdTk2ZThcXHU2YzM0XCIsIFwiXFx1NjBjYVxcdTg2ZjBcIiwgXCJcXHU2NjI1XFx1NTIwNlwiLCBcIlxcdTZlMDVcXHU2NjBlXCIsIFwiXFx1OGMzN1xcdTk2ZThcIiwgXCJcXHU3YWNiXFx1NTkwZlwiLCBcIlxcdTVjMGZcXHU2ZWUxXCIsIFwiXFx1ODI5MlxcdTc5Y2RcIiwgXCJcXHU1OTBmXFx1ODFmM1wiLCBcIlxcdTVjMGZcXHU2NjkxXCIsIFwiXFx1NTkyN1xcdTY2OTFcIiwgXCJcXHU3YWNiXFx1NzljYlwiLCBcIlxcdTU5MDRcXHU2NjkxXCIsIFwiXFx1NzY3ZFxcdTk3MzJcIiwgXCJcXHU3OWNiXFx1NTIwNlwiLCBcIlxcdTViZDJcXHU5NzMyXCIsIFwiXFx1OTcxY1xcdTk2NGRcIiwgXCJcXHU3YWNiXFx1NTFhY1wiLCBcIlxcdTVjMGZcXHU5NmVhXCIsIFwiXFx1NTkyN1xcdTk2ZWFcIiwgXCJcXHU1MWFjXFx1ODFmM1wiXSxcblxuICAgIC8qKlxuICAgICAgKiAxOTAwLTIxMDDlkITlubTnmoQyNOiKguawlOaXpeacn+mAn+afpeihqFxuICAgICAgKiBAQXJyYXkgT2YgUHJvcGVydHkgXG4gICAgICAqIEByZXR1cm4gMHggc3RyaW5nIEZvciBzcGxpY2VcbiAgICAgICovXG4gICAgc1Rlcm1JbmZvOiBbJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAgICAgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAgICAgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLCAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJyxcbiAgICAgICAgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5Nzc4Mzk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAgICAgJzk3YmQwOTgwMWQ5ODA4MmM5NWY4ZTFjZmNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMTk3YzM2YzkyMTBjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZScsICc5N2JkMDk4MDFkOTgwODJjOTVmOGUxY2ZjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhlMWNmY2M5MjBmJyxcbiAgICAgICAgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAgICAgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAgICAgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAgICAgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA5N2JkMDdmNTk1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQxOTgwMWVjOTIxMGM5Mjc0YzkyMGUnLCAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcbiAgICAgICAgJzk3YmQwN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiZDA3ZjE0ODdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAgICAgJzk3YmNmN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcbiAgICAgICAgJzk3YmNmN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzkyNzRjOTIwZScsICc5N2JjZjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOTFhYScsICc5N2I2Yjk3YmQxOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLCAnOTdiY2Y3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcbiAgICAgICAgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjcwYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAgICAgJzdmMGUyN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcbiAgICAgICAgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOTFhYScsICc5N2I2YjdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM3ZjBlMzdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJyxcbiAgICAgICAgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMTBjOGRjMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcbiAgICAgICAgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3MjNiMDZiZCcsICc3ZjA3ZTdmMGUzN2YxNDliMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAgICAgJzdmMGUzN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JyxcbiAgICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcbiAgICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3MjNiMDZiZCcsICc3ZjA3ZTdmMGUzN2YxNDk5ODA4M2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcbiAgICAgICAgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLCAnN2YwN2U3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzY2NjViNjZhYTg5ODAxZTk4MDgyOTdjMzUnLCAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcbiAgICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JyxcbiAgICAgICAgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcbiAgICAgICAgJzdmMGUzNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcbiAgICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLCAnNjY1ZjY3ZjBlMzdmMTQ4OTgwMWViMDcyMjk3YzM1JyxcbiAgICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJ10sXG5cbiAgICAvKipcbiAgICAgICog5pWw5a2X6L2s5Lit5paH6YCf5p+l6KGoXG4gICAgICAqIEBBcnJheSBPZiBQcm9wZXJ0eSBcbiAgICAgICogQHRyYW5zIFsn5pelJywn5LiAJywn5LqMJywn5LiJJywn5ZubJywn5LqUJywn5YWtJywn5LiDJywn5YWrJywn5LmdJywn5Y2BJ11cbiAgICAgICogQHJldHVybiBDbiBzdHJpbmcgXG4gICAgICAqL1xuICAgIG5TdHIxOiBbXCJcXHU2NWU1XCIsIFwiXFx1NGUwMFwiLCBcIlxcdTRlOGNcIiwgXCJcXHU0ZTA5XCIsIFwiXFx1NTZkYlwiLCBcIlxcdTRlOTRcIiwgXCJcXHU1MTZkXCIsIFwiXFx1NGUwM1wiLCBcIlxcdTUxNmJcIiwgXCJcXHU0ZTVkXCIsIFwiXFx1NTM0MVwiXSxcblxuICAgIC8qKlxuICAgICAgKiDml6XmnJ/ovazlhpzljobnp7DlkbzpgJ/mn6XooahcbiAgICAgICogQEFycmF5IE9mIFByb3BlcnR5IFxuICAgICAgKiBAdHJhbnMgWyfliJ0nLCfljYEnLCflu78nLCfljYUnXVxuICAgICAgKiBAcmV0dXJuIENuIHN0cmluZyBcbiAgICAgICovXG4gICAgblN0cjI6IFtcIlxcdTUyMWRcIiwgXCJcXHU1MzQxXCIsIFwiXFx1NWVmZlwiLCBcIlxcdTUzNDVcIl0sXG5cbiAgICAvKipcbiAgICAgICog5pyI5Lu96L2s5Yac5Y6G56ew5ZG86YCf5p+l6KGoXG4gICAgICAqIEBBcnJheSBPZiBQcm9wZXJ0eSBcbiAgICAgICogQHRyYW5zIFsn5q2jJywn5LiAJywn5LqMJywn5LiJJywn5ZubJywn5LqUJywn5YWtJywn5LiDJywn5YWrJywn5LmdJywn5Y2BJywn5YasJywn6IWKJ11cbiAgICAgICogQHJldHVybiBDbiBzdHJpbmcgXG4gICAgICAqL1xuICAgIG5TdHIzOiBbXCJcXHU2YjYzXCIsIFwiXFx1NGU4Y1wiLCBcIlxcdTRlMDlcIiwgXCJcXHU1NmRiXCIsIFwiXFx1NGU5NFwiLCBcIlxcdTUxNmRcIiwgXCJcXHU0ZTAzXCIsIFwiXFx1NTE2YlwiLCBcIlxcdTRlNWRcIiwgXCJcXHU1MzQxXCIsIFwiXFx1NTFhY1wiLCBcIlxcdTgxNGFcIl0sXG5cbiAgICAvKipcbiAgICAgICog6L+U5Zue5Yac5Y6GeeW5tOS4gOaVtOW5tOeahOaAu+WkqeaVsFxuICAgICAgKiBAcGFyYW0gbHVuYXIgWWVhclxuICAgICAgKiBAcmV0dXJuIE51bWJlclxuICAgICAgKiBAZWc6dmFyIGNvdW50ID0gY2FsZW5kYXIubFllYXJEYXlzKDE5ODcpIDsvL2NvdW50PTM4N1xuICAgICAgKi9cbiAgICBsWWVhckRheXM6IGZ1bmN0aW9uICh5KSB7XG4gICAgICAgIHZhciBpLCBzdW0gPSAzNDg7XG4gICAgICAgIGZvciAoaSA9IDB4ODAwMDsgaSA+IDB4ODsgaSA+Pj0gMSkgeyBzdW0gKz0gKGNhbGVuZGFyLmx1bmFySW5mb1t5IC0gMTkwMF0gJiBpKSA/IDEgOiAwOyB9XG4gICAgICAgIHJldHVybiAoc3VtICsgY2FsZW5kYXIubGVhcERheXMoeSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgICog6L+U5Zue5Yac5Y6GeeW5tOmXsOaciOaYr+WTquS4quaciO+8m+iLpXnlubTmsqHmnInpl7DmnIgg5YiZ6L+U5ZueMFxuICAgICAgKiBAcGFyYW0gbHVuYXIgWWVhclxuICAgICAgKiBAcmV0dXJuIE51bWJlciAoMC0xMilcbiAgICAgICogQGVnOnZhciBsZWFwTW9udGggPSBjYWxlbmRhci5sZWFwTW9udGgoMTk4NykgOy8vbGVhcE1vbnRoPTZcbiAgICAgICovXG4gICAgbGVhcE1vbnRoOiBmdW5jdGlvbiAoeSkgeyAvL+mXsOWtl+e8lueggSBcXHU5NWYwXG4gICAgICAgIHJldHVybiAoY2FsZW5kYXIubHVuYXJJbmZvW3kgLSAxOTAwXSAmIDB4Zik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAgKiDov5Tlm57lhpzljoZ55bm06Zew5pyI55qE5aSp5pWwIOiLpeivpeW5tOayoeaciemXsOaciOWImei/lOWbnjBcbiAgICAgICogQHBhcmFtIGx1bmFyIFllYXJcbiAgICAgICogQHJldHVybiBOdW1iZXIgKDDjgIEyOeOAgTMwKVxuICAgICAgKiBAZWc6dmFyIGxlYXBNb250aERheSA9IGNhbGVuZGFyLmxlYXBEYXlzKDE5ODcpIDsvL2xlYXBNb250aERheT0yOVxuICAgICAgKi9cbiAgICBsZWFwRGF5czogZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgaWYgKGNhbGVuZGFyLmxlYXBNb250aCh5KSkge1xuICAgICAgICAgICAgcmV0dXJuICgoY2FsZW5kYXIubHVuYXJJbmZvW3kgLSAxOTAwXSAmIDB4MTAwMDApID8gMzAgOiAyOSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgwKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAqIOi/lOWbnuWGnOWOhnnlubRt5pyI77yI6Z2e6Zew5pyI77yJ55qE5oC75aSp5pWw77yM6K6h566XbeS4uumXsOaciOaXtueahOWkqeaVsOivt+S9v+eUqGxlYXBEYXlz5pa55rOVXG4gICAgICAqIEBwYXJhbSBsdW5hciBZZWFyXG4gICAgICAqIEByZXR1cm4gTnVtYmVyICgtMeOAgTI544CBMzApXG4gICAgICAqIEBlZzp2YXIgTW9udGhEYXkgPSBjYWxlbmRhci5tb250aERheXMoMTk4Nyw5KSA7Ly9Nb250aERheT0yOVxuICAgICAgKi9cbiAgICBtb250aERheXM6IGZ1bmN0aW9uICh5LCBtKSB7XG4gICAgICAgIGlmIChtID4gMTIgfHwgbSA8IDEpIHsgcmV0dXJuIC0xIH0vL+aciOS7veWPguaVsOS7jjHoh7MxMu+8jOWPguaVsOmUmeivr+i/lOWbni0xXG4gICAgICAgIHJldHVybiAoKGNhbGVuZGFyLmx1bmFySW5mb1t5IC0gMTkwMF0gJiAoMHgxMDAwMCA+PiBtKSkgPyAzMCA6IDI5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAqIOi/lOWbnuWFrOWOhighKXnlubRt5pyI55qE5aSp5pWwXG4gICAgICAqIEBwYXJhbSBzb2xhciBZZWFyXG4gICAgICAqIEByZXR1cm4gTnVtYmVyICgtMeOAgTI444CBMjnjgIEzMOOAgTMxKVxuICAgICAgKiBAZWc6dmFyIHNvbGFyTW9udGhEYXkgPSBjYWxlbmRhci5sZWFwRGF5cygxOTg3KSA7Ly9zb2xhck1vbnRoRGF5PTMwXG4gICAgICAqL1xuICAgIHNvbGFyRGF5czogZnVuY3Rpb24gKHksIG0pIHtcbiAgICAgICAgaWYgKG0gPiAxMiB8fCBtIDwgMSkgeyByZXR1cm4gLTEgfSAvL+iLpeWPguaVsOmUmeivryDov5Tlm54tMVxuICAgICAgICB2YXIgbXMgPSBtIC0gMTtcbiAgICAgICAgaWYgKG1zID09IDEpIHsgLy8y5pyI5Lu955qE6Zew5bmz6KeE5b6L5rWL566X5ZCO56Gu6K6k6L+U5ZueMjjmiJYyOVxuICAgICAgICAgICAgcmV0dXJuICgoKHkgJSA0ID09IDApICYmICh5ICUgMTAwICE9IDApIHx8ICh5ICUgNDAwID09IDApKSA/IDI5IDogMjgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChjYWxlbmRhci5zb2xhck1vbnRoW21zXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5Yac5Y6G5bm05Lu96L2s5o2i5Li65bmy5pSv57qq5bm0XG4gICAgICogQHBhcmFtICBsWWVhciDlhpzljoblubTnmoTlubTku73mlbBcbiAgICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgICAqL1xuICAgIHRvR2FuWmhpWWVhcjogZnVuY3Rpb24gKGxZZWFyKSB7XG4gICAgICAgIHZhciBnYW5LZXkgPSAobFllYXIgLSAzKSAlIDEwO1xuICAgICAgICB2YXIgemhpS2V5ID0gKGxZZWFyIC0gMykgJSAxMjtcbiAgICAgICAgaWYgKGdhbktleSA9PSAwKSBnYW5LZXkgPSAxMDsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlpKnlubJcbiAgICAgICAgaWYgKHpoaUtleSA9PSAwKSB6aGlLZXkgPSAxMjsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlnLDmlK9cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyLkdhbltnYW5LZXkgLSAxXSArIGNhbGVuZGFyLlpoaVt6aGlLZXkgLSAxXTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlhazljobmnIjjgIHml6XliKTmlq3miYDlsZ7mmJ/luqdcbiAgICAgKiBAcGFyYW0gIGNNb250aCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBjRGF5IFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgICAqL1xuICAgIHRvQXN0cm86IGZ1bmN0aW9uIChjTW9udGgsIGNEYXkpIHtcbiAgICAgICAgdmFyIHMgPSBcIlxcdTliNTRcXHU3ZmFmXFx1NmMzNFxcdTc0ZjZcXHU1M2NjXFx1OWM3Y1xcdTc2N2RcXHU3ZjhhXFx1OTFkMVxcdTcyNWJcXHU1M2NjXFx1NWI1MFxcdTVkZThcXHU4N2Y5XFx1NzJlZVxcdTViNTBcXHU1OTA0XFx1NTk3M1xcdTU5MjlcXHU3OWU0XFx1NTkyOVxcdTg3NGVcXHU1YzA0XFx1NjI0YlxcdTliNTRcXHU3ZmFmXCI7XG4gICAgICAgIHZhciBhcnIgPSBbMjAsIDE5LCAyMSwgMjEsIDIxLCAyMiwgMjMsIDIzLCAyMywgMjMsIDIyLCAyMl07XG4gICAgICAgIHJldHVybiBzLnN1YnN0cihjTW9udGggKiAyIC0gKGNEYXkgPCBhcnJbY01vbnRoIC0gMV0gPyAyIDogMCksIDIpICsgXCJcXHU1ZWE3XCI7Ly/luqdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAqIOS8oOWFpW9mZnNldOWBj+enu+mHj+i/lOWbnuW5suaUr1xuICAgICAgKiBAcGFyYW0gb2Zmc2V0IOebuOWvueeUsuWtkOeahOWBj+enu+mHj1xuICAgICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgICAgKi9cbiAgICB0b0dhblpoaTogZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gY2FsZW5kYXIuR2FuW29mZnNldCAlIDEwXSArIGNhbGVuZGFyLlpoaVtvZmZzZXQgJSAxMl07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAgKiDkvKDlhaXlhazljoYoISl55bm06I635b6X6K+l5bm056ysbuS4quiKguawlOeahOWFrOWOhuaXpeacn1xuICAgICAgKiBAcGFyYW0geeWFrOWOhuW5tCgxOTAwLTIxMDAp77ybbuS6jOWNgeWbm+iKguawlOS4reeahOesrOWHoOS4quiKguawlCgxfjI0Ke+8m+S7jm49MSjlsI/lr5Ip566X6LW3IFxuICAgICAgKiBAcmV0dXJuIGRheSBOdW1iZXJcbiAgICAgICogQGVnOnZhciBfMjQgPSBjYWxlbmRhci5nZXRUZXJtKDE5ODcsMykgOy8vXzI0PTQ75oSP5Y2zMTk4N+W5tDLmnIg05pel56uL5pilXG4gICAgICAqL1xuICAgIGdldFRlcm06IGZ1bmN0aW9uICh5LCBuKSB7XG4gICAgICAgIGlmICh5IDwgMTkwMCB8fCB5ID4gMjEwMCkgeyByZXR1cm4gLTE7IH1cbiAgICAgICAgaWYgKG4gPCAxIHx8IG4gPiAyNCkgeyByZXR1cm4gLTE7IH1cbiAgICAgICAgdmFyIF90YWJsZSA9IGNhbGVuZGFyLnNUZXJtSW5mb1t5IC0gMTkwMF07XG4gICAgICAgIHZhciBfaW5mbyA9IFtcbiAgICAgICAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDAsIDUpKS50b1N0cmluZygpLFxuICAgICAgICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoNSwgNSkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxMCwgNSkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxNSwgNSkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyMCwgNSkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyNSwgNSkpLnRvU3RyaW5nKClcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIF9jYWxkYXkgPSBbXG4gICAgICAgICAgICBfaW5mb1swXS5zdWJzdHIoMCwgMSksXG4gICAgICAgICAgICBfaW5mb1swXS5zdWJzdHIoMSwgMiksXG4gICAgICAgICAgICBfaW5mb1swXS5zdWJzdHIoMywgMSksXG4gICAgICAgICAgICBfaW5mb1swXS5zdWJzdHIoNCwgMiksXG5cbiAgICAgICAgICAgIF9pbmZvWzFdLnN1YnN0cigwLCAxKSxcbiAgICAgICAgICAgIF9pbmZvWzFdLnN1YnN0cigxLCAyKSxcbiAgICAgICAgICAgIF9pbmZvWzFdLnN1YnN0cigzLCAxKSxcbiAgICAgICAgICAgIF9pbmZvWzFdLnN1YnN0cig0LCAyKSxcblxuICAgICAgICAgICAgX2luZm9bMl0uc3Vic3RyKDAsIDEpLFxuICAgICAgICAgICAgX2luZm9bMl0uc3Vic3RyKDEsIDIpLFxuICAgICAgICAgICAgX2luZm9bMl0uc3Vic3RyKDMsIDEpLFxuICAgICAgICAgICAgX2luZm9bMl0uc3Vic3RyKDQsIDIpLFxuXG4gICAgICAgICAgICBfaW5mb1szXS5zdWJzdHIoMCwgMSksXG4gICAgICAgICAgICBfaW5mb1szXS5zdWJzdHIoMSwgMiksXG4gICAgICAgICAgICBfaW5mb1szXS5zdWJzdHIoMywgMSksXG4gICAgICAgICAgICBfaW5mb1szXS5zdWJzdHIoNCwgMiksXG5cbiAgICAgICAgICAgIF9pbmZvWzRdLnN1YnN0cigwLCAxKSxcbiAgICAgICAgICAgIF9pbmZvWzRdLnN1YnN0cigxLCAyKSxcbiAgICAgICAgICAgIF9pbmZvWzRdLnN1YnN0cigzLCAxKSxcbiAgICAgICAgICAgIF9pbmZvWzRdLnN1YnN0cig0LCAyKSxcblxuICAgICAgICAgICAgX2luZm9bNV0uc3Vic3RyKDAsIDEpLFxuICAgICAgICAgICAgX2luZm9bNV0uc3Vic3RyKDEsIDIpLFxuICAgICAgICAgICAgX2luZm9bNV0uc3Vic3RyKDMsIDEpLFxuICAgICAgICAgICAgX2luZm9bNV0uc3Vic3RyKDQsIDIpLFxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoX2NhbGRheVtuIC0gMV0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgICog5Lyg5YWl5Yac5Y6G5pWw5a2X5pyI5Lu96L+U5Zue5rGJ6K+t6YCa5L+X6KGo56S65rOVXG4gICAgICAqIEBwYXJhbSBsdW5hciBtb250aFxuICAgICAgKiBAcmV0dXJuIENuIHN0cmluZ1xuICAgICAgKiBAZWc6dmFyIGNuTW9udGggPSBjYWxlbmRhci50b0NoaW5hTW9udGgoMTIpIDsvL2NuTW9udGg9J+iFiuaciCdcbiAgICAgICovXG4gICAgdG9DaGluYU1vbnRoOiBmdW5jdGlvbiAobSkgeyAvLyDmnIggPT4gXFx1NjcwOFxuICAgICAgICBpZiAobSA+IDEyIHx8IG0gPCAxKSB7IHJldHVybiAtMSB9IC8v6Iul5Y+C5pWw6ZSZ6K+vIOi/lOWbni0xXG4gICAgICAgIHZhciBzID0gY2FsZW5kYXIublN0cjNbbSAtIDFdO1xuICAgICAgICBzICs9IFwiXFx1NjcwOFwiOy8v5Yqg5LiK5pyI5a2XXG4gICAgICAgIHJldHVybiBzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgICog5Lyg5YWl5Yac5Y6G5pel5pyf5pWw5a2X6L+U5Zue5rGJ5a2X6KGo56S65rOVXG4gICAgICAqIEBwYXJhbSBsdW5hciBkYXlcbiAgICAgICogQHJldHVybiBDbiBzdHJpbmdcbiAgICAgICogQGVnOnZhciBjbkRheSA9IGNhbGVuZGFyLnRvQ2hpbmFEYXkoMjEpIDsvL2NuTW9udGg9J+W7v+S4gCdcbiAgICAgICovXG4gICAgdG9DaGluYURheTogZnVuY3Rpb24gKGQpIHsgLy/ml6UgPT4gXFx1NjVlNVxuICAgICAgICB2YXIgcztcbiAgICAgICAgc3dpdGNoIChkKSB7XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgIHMgPSAnXFx1NTIxZFxcdTUzNDEnOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjA6XG4gICAgICAgICAgICAgICAgcyA9ICdcXHU0ZThjXFx1NTM0MSc7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzMDpcbiAgICAgICAgICAgICAgICBzID0gJ1xcdTRlMDlcXHU1MzQxJzsgYnJlYWs7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHMgPSBjYWxlbmRhci5uU3RyMltNYXRoLmZsb29yKGQgLyAxMCldO1xuICAgICAgICAgICAgICAgIHMgKz0gY2FsZW5kYXIublN0cjFbZCAlIDEwXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgICog5bm05Lu96L2s55Sf6IKWWyHku4Xog73lpKfoh7TovazmjaJdID0+IOeyvuehruWIkuWIhueUn+iCluWIhueVjOe6v+aYr+KAnOeri+aYpeKAnVxuICAgICAgKiBAcGFyYW0geSB5ZWFyXG4gICAgICAqIEByZXR1cm4gQ24gc3RyaW5nXG4gICAgICAqIEBlZzp2YXIgYW5pbWFsID0gY2FsZW5kYXIuZ2V0QW5pbWFsKDE5ODcpIDsvL2FuaW1hbD0n5YWUJ1xuICAgICAgKi9cbiAgICBnZXRBbmltYWw6IGZ1bmN0aW9uICh5KSB7XG4gICAgICAgIHJldHVybiBjYWxlbmRhci5BbmltYWxzWyh5IC0gNCkgJSAxMl1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICAqIOS8oOWFpemYs+WOhuW5tOaciOaXpeiOt+W+l+ivpue7hueahOWFrOWOhuOAgeWGnOWOhm9iamVjdOS/oeaBryA8PT5KU09OXG4gICAgICAqIEBwYXJhbSB5ICBzb2xhciB5ZWFyXG4gICAgICAqIEBwYXJhbSBtICBzb2xhciBtb250aFxuICAgICAgKiBAcGFyYW0gZCAgc29sYXIgZGF5XG4gICAgICAqIEByZXR1cm4gSlNPTiBvYmplY3RcbiAgICAgICogQGVnOmNvbnNvbGUubG9nKGNhbGVuZGFyLnNvbGFyMmx1bmFyKDE5ODcsMTEsMDEpKTtcbiAgICAgICovXG4gICAgc29sYXIybHVuYXI6IGZ1bmN0aW9uICh5LCBtLCBkKSB7IC8v5Y+C5pWw5Yy66Ze0MTkwMC4xLjMxfjIxMDAuMTIuMzFcbiAgICAgICAgLy/lubTku73pmZDlrprjgIHkuIrpmZBcbiAgICAgICAgaWYgKHkgPCAxOTAwIHx8IHkgPiAyMTAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7Ly8gdW5kZWZpbmVk6L2s5o2i5Li65pWw5a2X5Y+Y5Li6TmFOXG4gICAgICAgIH1cbiAgICAgICAgLy/lhazljobkvKDlj4LmnIDkuIvpmZBcbiAgICAgICAgaWYgKHkgPT0gMTkwMCAmJiBtID09IDEgJiYgZCA8IDMxKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgLy/mnKrkvKDlj4IgIOiOt+W+l+W9k+WkqVxuICAgICAgICBpZiAoIXkpIHtcbiAgICAgICAgICAgIHZhciBvYmpEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvYmpEYXRlID0gbmV3IERhdGUoeSwgcGFyc2VJbnQobSkgLSAxLCBkKVxuICAgICAgICB9XG4gICAgICAgIHZhciBpLCBsZWFwID0gMCwgdGVtcCA9IDA7XG4gICAgICAgIC8v5L+u5q2jeW1k5Y+C5pWwXG4gICAgICAgIHZhciB5ID0gb2JqRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgbSA9IG9iakRhdGUuZ2V0TW9udGgoKSArIDEsXG4gICAgICAgICAgICBkID0gb2JqRGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIHZhciBvZmZzZXQgPSAoRGF0ZS5VVEMob2JqRGF0ZS5nZXRGdWxsWWVhcigpLCBvYmpEYXRlLmdldE1vbnRoKCksIG9iakRhdGUuZ2V0RGF0ZSgpKSAtIERhdGUuVVRDKDE5MDAsIDAsIDMxKSkgLyA4NjQwMDAwMDtcbiAgICAgICAgZm9yIChpID0gMTkwMDsgaSA8IDIxMDEgJiYgb2Zmc2V0ID4gMDsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wID0gY2FsZW5kYXIubFllYXJEYXlzKGkpO1xuICAgICAgICAgICAgb2Zmc2V0IC09IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCArPSB0ZW1wOyBpLS07XG4gICAgICAgIH1cblxuICAgICAgICAvL+aYr+WQpuS7iuWkqVxuICAgICAgICB2YXIgaXNUb2RheU9iaiA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBpc1RvZGF5ID0gZmFsc2U7XG4gICAgICAgIGlmIChpc1RvZGF5T2JqLmdldEZ1bGxZZWFyKCkgPT0geSAmJiBpc1RvZGF5T2JqLmdldE1vbnRoKCkgKyAxID09IG0gJiYgaXNUb2RheU9iai5nZXREYXRlKCkgPT0gZCkge1xuICAgICAgICAgICAgaXNUb2RheSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy/mmJ/mnJ/lh6BcbiAgICAgICAgdmFyIG5XZWVrID0gb2JqRGF0ZS5nZXREYXkoKSxcbiAgICAgICAgICAgIGNXZWVrID0gY2FsZW5kYXIublN0cjFbbldlZWtdO1xuICAgICAgICAvL+aVsOWtl+ihqOekuuWRqOWHoOmhuuW6lOWkqeacneWRqOS4gOW8gOWni+eahOaDr+S+i1xuICAgICAgICBpZiAobldlZWsgPT0gMCkge1xuICAgICAgICAgICAgbldlZWsgPSA3O1xuICAgICAgICB9XG4gICAgICAgIC8v5Yac5Y6G5bm0XG4gICAgICAgIHZhciB5ZWFyID0gaTtcbiAgICAgICAgdmFyIGxlYXAgPSBjYWxlbmRhci5sZWFwTW9udGgoaSk7IC8v6Zew5ZOq5Liq5pyIXG4gICAgICAgIHZhciBpc0xlYXAgPSBmYWxzZTtcblxuICAgICAgICAvL+aViOmqjOmXsOaciFxuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgMTMgJiYgb2Zmc2V0ID4gMDsgaSsrKSB7XG4gICAgICAgICAgICAvL+mXsOaciFxuICAgICAgICAgICAgaWYgKGxlYXAgPiAwICYmIGkgPT0gKGxlYXAgKyAxKSAmJiBpc0xlYXAgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgaXNMZWFwID0gdHJ1ZTsgdGVtcCA9IGNhbGVuZGFyLmxlYXBEYXlzKHllYXIpOyAvL+iuoeeul+WGnOWOhumXsOaciOWkqeaVsFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IGNhbGVuZGFyLm1vbnRoRGF5cyh5ZWFyLCBpKTsvL+iuoeeul+WGnOWOhuaZrumAmuaciOWkqeaVsFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/op6PpmaTpl7DmnIhcbiAgICAgICAgICAgIGlmIChpc0xlYXAgPT0gdHJ1ZSAmJiBpID09IChsZWFwICsgMSkpIHsgaXNMZWFwID0gZmFsc2U7IH1cbiAgICAgICAgICAgIG9mZnNldCAtPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICAgIC8vIOmXsOaciOWvvOiHtOaVsOe7hOS4i+agh+mHjeWPoOWPluWPjVxuICAgICAgICBpZiAob2Zmc2V0ID09IDAgJiYgbGVhcCA+IDAgJiYgaSA9PSBsZWFwICsgMSkge1xuICAgICAgICAgICAgaWYgKGlzTGVhcCkge1xuICAgICAgICAgICAgICAgIGlzTGVhcCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc0xlYXAgPSB0cnVlOyAtLWk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgIG9mZnNldCArPSB0ZW1wOyAtLWk7XG4gICAgICAgIH1cbiAgICAgICAgLy/lhpzljobmnIhcbiAgICAgICAgdmFyIG1vbnRoID0gaTtcbiAgICAgICAgLy/lhpzljobml6VcbiAgICAgICAgdmFyIGRheSA9IG9mZnNldCArIDE7XG4gICAgICAgIC8v5aSp5bmy5Zyw5pSv5aSE55CGXG4gICAgICAgIHZhciBzbSA9IG0gLSAxO1xuICAgICAgICB2YXIgZ3pZID0gY2FsZW5kYXIudG9HYW5aaGlZZWFyKHllYXIpO1xuXG4gICAgICAgIC8vIOW9k+aciOeahOS4pOS4quiKguawlFxuICAgICAgICAvLyBidWdmaXgtMjAxNy03LTI0IDExOjAzOjM4IHVzZSBsdW5hciBZZWFyIFBhcmFtIGB5YCBOb3QgYHllYXJgXG4gICAgICAgIHZhciBmaXJzdE5vZGUgPSBjYWxlbmRhci5nZXRUZXJtKHksIChtICogMiAtIDEpKTsvL+i/lOWbnuW9k+aciOOAjOiKguOAjeS4uuWHoOaXpeW8gOWni1xuICAgICAgICB2YXIgc2Vjb25kTm9kZSA9IGNhbGVuZGFyLmdldFRlcm0oeSwgKG0gKiAyKSk7Ly/ov5Tlm57lvZPmnIjjgIzoioLjgI3kuLrlh6Dml6XlvIDlp4tcblxuICAgICAgICAvLyDkvp3mja4xMuiKguawlOS/ruato+W5suaUr+aciFxuICAgICAgICB2YXIgZ3pNID0gY2FsZW5kYXIudG9HYW5aaGkoKHkgLSAxOTAwKSAqIDEyICsgbSArIDExKTtcbiAgICAgICAgaWYgKGQgPj0gZmlyc3ROb2RlKSB7XG4gICAgICAgICAgICBnek0gPSBjYWxlbmRhci50b0dhblpoaSgoeSAtIDE5MDApICogMTIgKyBtICsgMTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/kvKDlhaXnmoTml6XmnJ/nmoToioLmsJTkuI7lkKZcbiAgICAgICAgdmFyIGlzVGVybSA9IGZhbHNlO1xuICAgICAgICB2YXIgVGVybSA9IG51bGw7XG4gICAgICAgIGlmIChmaXJzdE5vZGUgPT0gZCkge1xuICAgICAgICAgICAgaXNUZXJtID0gdHJ1ZTtcbiAgICAgICAgICAgIFRlcm0gPSBjYWxlbmRhci5zb2xhclRlcm1bbSAqIDIgLSAyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Vjb25kTm9kZSA9PSBkKSB7XG4gICAgICAgICAgICBpc1Rlcm0gPSB0cnVlO1xuICAgICAgICAgICAgVGVybSA9IGNhbGVuZGFyLnNvbGFyVGVybVttICogMiAtIDFdO1xuICAgICAgICB9XG4gICAgICAgIC8v5pel5p+xIOW9k+aciOS4gOaXpeS4jiAxOTAwLzEvMSDnm7jlt67lpKnmlbBcbiAgICAgICAgdmFyIGRheUN5Y2xpY2FsID0gRGF0ZS5VVEMoeSwgc20sIDEsIDAsIDAsIDAsIDApIC8gODY0MDAwMDAgKyAyNTU2NyArIDEwO1xuICAgICAgICB2YXIgZ3pEID0gY2FsZW5kYXIudG9HYW5aaGkoZGF5Q3ljbGljYWwgKyBkIC0gMSk7XG4gICAgICAgIC8v6K+l5pel5pyf5omA5bGe55qE5pif5bqnXG4gICAgICAgIHZhciBhc3RybyA9IGNhbGVuZGFyLnRvQXN0cm8obSwgZCk7XG5cbiAgICAgICAgcmV0dXJuIHsgJ2xZZWFyJzogeWVhciwgJ2xNb250aCc6IG1vbnRoLCAnbERheSc6IGRheSwgJ0FuaW1hbCc6IGNhbGVuZGFyLmdldEFuaW1hbCh5ZWFyKSwgJ0lNb250aENuJzogKGlzTGVhcCA/IFwiXFx1OTVmMFwiIDogJycpICsgY2FsZW5kYXIudG9DaGluYU1vbnRoKG1vbnRoKSwgJ0lEYXlDbic6IGNhbGVuZGFyLnRvQ2hpbmFEYXkoZGF5KSwgJ2NZZWFyJzogeSwgJ2NNb250aCc6IG0sICdjRGF5JzogZCwgJ2d6WWVhcic6IGd6WSwgJ2d6TW9udGgnOiBnek0sICdnekRheSc6IGd6RCwgJ2lzVG9kYXknOiBpc1RvZGF5LCAnaXNMZWFwJzogaXNMZWFwLCAnbldlZWsnOiBuV2VlaywgJ25jV2Vlayc6IFwiXFx1NjYxZlxcdTY3MWZcIiArIGNXZWVrLCAnaXNUZXJtJzogaXNUZXJtLCAnVGVybSc6IFRlcm0sICdhc3Rybyc6IGFzdHJvIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAgKiDkvKDlhaXlhpzljoblubTmnIjml6Xku6Xlj4rkvKDlhaXnmoTmnIjku73mmK/lkKbpl7DmnIjojrflvpfor6bnu4bnmoTlhazljobjgIHlhpzljoZvYmplY3Tkv6Hmga8gPD0+SlNPTlxuICAgICAgKiBAcGFyYW0geSAgbHVuYXIgeWVhclxuICAgICAgKiBAcGFyYW0gbSAgbHVuYXIgbW9udGhcbiAgICAgICogQHBhcmFtIGQgIGx1bmFyIGRheVxuICAgICAgKiBAcGFyYW0gaXNMZWFwTW9udGggIGx1bmFyIG1vbnRoIGlzIGxlYXAgb3Igbm90LlvlpoLmnpzmmK/lhpzljobpl7DmnIjnrKzlm5vkuKrlj4LmlbDotYvlgLx0cnVl5Y2z5Y+vXVxuICAgICAgKiBAcmV0dXJuIEpTT04gb2JqZWN0XG4gICAgICAqIEBlZzpjb25zb2xlLmxvZyhjYWxlbmRhci5sdW5hcjJzb2xhcigxOTg3LDksMTApKTtcbiAgICAgICovXG4gICAgbHVuYXIyc29sYXI6IGZ1bmN0aW9uICh5LCBtLCBkLCBpc0xlYXBNb250aCkgeyAgIC8v5Y+C5pWw5Yy66Ze0MTkwMC4xLjMxfjIxMDAuMTIuMVxuICAgICAgICB2YXIgaXNMZWFwTW9udGggPSAhIWlzTGVhcE1vbnRoO1xuICAgICAgICB2YXIgbGVhcE9mZnNldCA9IDA7XG4gICAgICAgIHZhciBsZWFwTW9udGggPSBjYWxlbmRhci5sZWFwTW9udGgoeSk7XG4gICAgICAgIHZhciBsZWFwRGF5ID0gY2FsZW5kYXIubGVhcERheXMoeSk7XG4gICAgICAgIGlmIChpc0xlYXBNb250aCAmJiAobGVhcE1vbnRoICE9IG0pKSB7IHJldHVybiAtMTsgfS8v5Lyg5Y+C6KaB5rGC6K6h566X6K+l6Zew5pyI5YWs5Y6GIOS9huivpeW5tOW+l+WHuueahOmXsOaciOS4juS8oOWPgueahOaciOS7veW5tuS4jeWQjFxuICAgICAgICBpZiAoeSA9PSAyMTAwICYmIG0gPT0gMTIgJiYgZCA+IDEgfHwgeSA9PSAxOTAwICYmIG0gPT0gMSAmJiBkIDwgMzEpIHsgcmV0dXJuIC0xOyB9Ly/otoXlh7rkuobmnIDlpKfmnoHpmZDlgLwgXG4gICAgICAgIHZhciBkYXkgPSBjYWxlbmRhci5tb250aERheXMoeSwgbSk7XG4gICAgICAgIHZhciBfZGF5ID0gZGF5O1xuICAgICAgICAvL2J1Z0ZpeCAyMDE2LTktMjUgXG4gICAgICAgIC8vaWYgbW9udGggaXMgbGVhcCwgX2RheSB1c2UgbGVhcERheXMgbWV0aG9kIFxuICAgICAgICBpZiAoaXNMZWFwTW9udGgpIHtcbiAgICAgICAgICAgIF9kYXkgPSBjYWxlbmRhci5sZWFwRGF5cyh5LCBtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSA8IDE5MDAgfHwgeSA+IDIxMDAgfHwgZCA+IF9kYXkpIHsgcmV0dXJuIC0xOyB9Ly/lj4LmlbDlkIjms5XmgKfmlYjpqoxcblxuICAgICAgICAvL+iuoeeul+WGnOWOhueahOaXtumXtOW3rlxuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE5MDA7IGkgPCB5OyBpKyspIHtcbiAgICAgICAgICAgIG9mZnNldCArPSBjYWxlbmRhci5sWWVhckRheXMoaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlYXAgPSAwLCBpc0FkZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgbGVhcCA9IGNhbGVuZGFyLmxlYXBNb250aCh5KTtcbiAgICAgICAgICAgIGlmICghaXNBZGQpIHsvL+WkhOeQhumXsOaciFxuICAgICAgICAgICAgICAgIGlmIChsZWFwIDw9IGkgJiYgbGVhcCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGNhbGVuZGFyLmxlYXBEYXlzKHkpOyBpc0FkZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2Zmc2V0ICs9IGNhbGVuZGFyLm1vbnRoRGF5cyh5LCBpKTtcbiAgICAgICAgfVxuICAgICAgICAvL+i9rOaNoumXsOaciOWGnOWOhiDpnIDooaXlhYXor6XlubTpl7DmnIjnmoTliY3kuIDkuKrmnIjnmoTml7blt65cbiAgICAgICAgaWYgKGlzTGVhcE1vbnRoKSB7IG9mZnNldCArPSBkYXk7IH1cbiAgICAgICAgLy8xOTAw5bm05Yac5Y6G5q2j5pyI5LiA5pel55qE5YWs5Y6G5pe26Ze05Li6MTkwMOW5tDHmnIgzMOaXpTDml7Yw5YiGMOenkijor6Xml7bpl7TkuZ/mmK/mnKzlhpzljobnmoTmnIDlvIDlp4votbflp4vngrkpXG4gICAgICAgIHZhciBzdG1hcCA9IERhdGUuVVRDKDE5MDAsIDEsIDMwLCAwLCAwLCAwKTtcbiAgICAgICAgdmFyIGNhbE9iaiA9IG5ldyBEYXRlKChvZmZzZXQgKyBkIC0gMzEpICogODY0MDAwMDAgKyBzdG1hcCk7XG4gICAgICAgIHZhciBjWSA9IGNhbE9iai5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICB2YXIgY00gPSBjYWxPYmouZ2V0VVRDTW9udGgoKSArIDE7XG4gICAgICAgIHZhciBjRCA9IGNhbE9iai5nZXRVVENEYXRlKCk7XG5cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyLnNvbGFyMmx1bmFyKGNZLCBjTSwgY0QpO1xuICAgIH1cbn07XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjYWxlbmRhcjtcbiJdfQ==