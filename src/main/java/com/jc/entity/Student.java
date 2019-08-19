package com.jc.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * @author 李文教
 * @date 2019/8/16 10:41
 */
@Data
public class Student implements Serializable {
    private int sid;
    private String sname;
    private String sex;
    private String clazz;
    private int age;
}
