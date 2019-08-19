package com.jc.service.api;

import com.jc.entity.Student;

import java.util.List;

public interface StudentService {
    //分页查询全部学生
    List<Student> findAll(String page,String limit,String sname,String sex,String clazz);
    int GetCountAll();
    //删除学生信息
    boolean deleteStudent(Integer sid);
    //添加学生信息
    boolean addStudent(Student student);
    //根据id查询学生信息
    Student findByIdStudent(Integer sid);
    //修改学生信息
    boolean updateStudent(Student student);
}
