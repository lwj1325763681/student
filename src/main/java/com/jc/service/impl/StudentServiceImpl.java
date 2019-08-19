package com.jc.service.impl;

import com.jc.dao.StudentMapper;
import com.jc.entity.Student;
import com.jc.service.api.StudentService;
import com.jc.utils.PageRange;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 李文教
 * @date 2019/8/16 10:47
 */
@Transactional
@Service
public class StudentServiceImpl implements StudentService {
    @Resource
    StudentMapper studentMapper;

    //查询全部学生信息
    @Override
    public List<Student> findAll(String page, String limit, String sname, String sex, String clazz) {
        PageRange pageRange=new PageRange(page,limit);
        return studentMapper.findAll(pageRange.getStart(),pageRange.getEnd(),sname,sex,clazz);
    }

    @Override
    public int GetCountAll() {
        return studentMapper.GetCountAll();
    }


    //删除学生信息
    @Override
    public boolean deleteStudent(Integer sid) {
        studentMapper.deleteStudent(sid);
        return true;
    }


    //添加学生信息
    @Override
    public boolean addStudent(Student student) {
        studentMapper.addStudent(student);
        return true;
    }

    //根据id查询学生信息
    @Override
    public Student findByIdStudent(Integer sid) {
        return studentMapper.findByIdStudent(sid);
    }


    //修改学生信息
    @Override
    public boolean updateStudent(Student student) {
        studentMapper.updateStudent(student);
        return true;
    }
}
