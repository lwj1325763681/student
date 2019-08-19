package com.jc.controller;

import com.jc.entity.Student;
import com.jc.service.api.StudentService;
import com.jc.utils.IResult;
import com.jc.utils.PageResultBean;
import com.jc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;

/**
 * @author 李文教
 * @date 2019/8/16 11:02
 */
@Controller
@RequestMapping("/student")
public class StudentController {
    @Resource
    StudentService studentService;

    //查询全部学生
    @RequestMapping(value = "/findAll",method = RequestMethod.POST)
    @ResponseBody
    public IResult findAll(String page, String limit, String sname, String sex, String clazz){
        List<Student> list=studentService.findAll(page,limit,sname,sex,clazz);
        return new PageResultBean<Collection<Student>>(list,studentService.GetCountAll());
    }
    //删除学生
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    @ResponseBody
    public IResult delete(Integer sid){
        return new ResultBean<Boolean>(studentService.deleteStudent(sid));
    }
    //添加学生
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ResponseBody
    public IResult add(@RequestBody Student student){
        return new ResultBean<Boolean>(studentService.addStudent(student));
    }

    //根据id查询学生
    @RequestMapping(value = "/findById",method = RequestMethod.POST)
    @ResponseBody
    public IResult findById(Integer sid){
        return new ResultBean<Student>(studentService.findByIdStudent(sid));
    }

    //修改学生信息
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    @ResponseBody
    public IResult update(@RequestBody Student student){
        return new ResultBean<Boolean>(studentService.updateStudent(student));
    }
}
