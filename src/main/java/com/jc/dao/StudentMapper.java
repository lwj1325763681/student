package com.jc.dao;

import com.jc.entity.Student;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentMapper {
    //查询全部学生+模糊搜索
    List<Student> findAll(@Param("start")int start,@Param("end")int end,
                          @Param("sname") String sname,
                          @Param("sex") String sex,
                          @Param("clazz") String clazz);
    int GetCountAll();
    //删除学生
    int deleteStudent(@Param("sid")int sid);
    //添加学生
    int addStudent(Student student);
    //根据id查询学生信息
    Student findByIdStudent(@Param("sid")int sid);
    //修改学生信息
    int updateStudent(Student student);
}
