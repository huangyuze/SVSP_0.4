package com.jdlink.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * Created by matt on 2018/4/24.
 */
public class RandomUtil {

    /**
     * 生成随机文件名：当前年月日时分秒+五位随机数
     *
     * @return
     */
    public static String getRandomFileName() {

        SimpleDateFormat simpleDateFormat;

        simpleDateFormat = new SimpleDateFormat("yyyyMMdd");

        Date date = new Date();

        String str = simpleDateFormat.format(date);

        Random random = new Random();

        int rannum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数

        return rannum + str;// 当前时间
    }

    /**
     * 获取八位随机数
     * @return 八位随机数
     */
    public static String getRandomEightNumber() {
        StringBuilder str=new StringBuilder();//定义变长字符串
        Random random=new Random();
        //随机生成数字，并添加到字符串
        for(int i=0;i<8;i++){
            str.append(random.nextInt(10));
        }
        return str.toString();
    }

    /**
     * 根据当前时间及数据库数据数量计算编号
     * @return
     */
    public static String getAppointId(String prefix, String suffix) {
        return prefix + suffix;
    }

    /**
     * 根据预约号获得登记号
     * @param appointId
     * @return
     */
    public static String getCheckId(String appointId) {
        return appointId+"R";
    }

    /**
     * 获取百分比
     * @param num1
     * @param num2
     * @return
     */
    public static String getPercentage(float num1, float num2) {
        NumberFormat numberFormat = NumberFormat.getInstance();
        numberFormat.setMaximumFractionDigits(2);
        return numberFormat.format(num1 / num2 * 100);
    }

    /**
     * 除法获取结果
     * @param a 被除数
     * @param b 除数
     * @return 除得结果
     */
    public static float divideTwoNumber(float a, float b) {
        if (b == 0) return 0;
        DecimalFormat df=new DecimalFormat("0.00");
        String res =  df.format(a / b);
        return Float.parseFloat(res);
    }
}
