layui.config({
    base: $config.resUrl+'layui/assets/lay/modules/'//定义基目录
}).extend({
    ajaxExtention: 'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool: 'tool',
    $api:'api'
}).use(['form', 'layer', 'jquery', 'table', 'laypage', 'ajaxExtention', '$tool','$api'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery,
        laypage = layui.laypage,
        $tool = layui.$tool,
        table = layui.table,
        $api = layui.$api;

    var tableIns;//表格实例

    //第一个实例
    tableIns=table.render({
        elem: '#demo'
        ,method:'post'
        ,height: 312
        ,url: $tool.getContext()+'student/findAll.do' //数据接口
        ,page: true //开启分页
        , limit: 5
        , limits: [5, 10, 15, 20]
        ,cols: [[ //表头
            {type: 'numbers', title: '序号', fixed: 'left'}
            ,{field: 'sname', title: '姓名', width:80}
            ,{field: 'sex', title: '性别', width:80, sort: true}
            ,{field: 'clazz', title: '班级', width:80}
            ,{field: 'age', title: '年龄', width: 177}
            , {fixed: 'right', title: '操作', width: 250, align: 'left', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
        ]]
    });
    table.on('tool(test)',function (obj) {//注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var row = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        //区分事件
        if (layEvent === 'del') { //删除
            del(row.sid);
            //alert(JSON.stringify(row.recordId));
        } else if (layEvent === 'edit') { //编辑
            editStudent(row.sid);
        }
    });
    //删除
    function del(sid){
        layer.confirm('确认删除吗？', function (confirmIndex) {
            layer.close(confirmIndex);//关闭confirm
            //向服务端发送删除指令
            var req = {
                sid: sid
            };
            //alert(JSON.stringify(recordId));
            $api.DeleteStudent(req,function (data) {
                layer.msg("删除成功",{time:1000,icon:6},function(){
                    //obj.del(); //删除对应行（tr）的DOM结构
                    //重新加载表格
                    tableIns.reload();
                });
            });
        });
    }
    //添加
    $('#add').click(function () {
        var index=layui.layer.open({
            title:'添加学生',
            type:2,
            content:"addStudent.html",
            success:function (layero,index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回学生列表','.layui-layer-setwin .layui-layer-close',{tips:3});
                },500);
            }
        });
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        });
        layui.layer.full(index);
    });
    //模糊搜索
    form.on("submit(Like)",function (data) {
        var sname=data.field.sname;
        var sex=data.field.sex;
        var clazz=data.field.clazz;
        tableIns.reload({
            where:{
                sname:sname,
                sex:sex,
                clazz:clazz
            }
        })
    });
    //根据id查询学生信息
    function editStudent(sid) {
        var index=layui.layer.open({
            title:"修改学生信息",
            type:2,
            content:"editStudent.html?sid="+sid,
            success:function (layero,index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回学生列表','.layui-layer-setwin .layui-layer-close',{
                        tips:3
                    });
                },500);
            }
        });
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        });
        layui.layer.full(index);
    }
});
