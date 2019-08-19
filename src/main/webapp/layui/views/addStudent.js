layui.config({
    base: $config.resUrl+'layui/assets/lay/modules/'//定义基目录
}).extend({
    ajaxExtention: 'ajaxExtention',//加载自定义扩展，每个业务js都需要加载这个ajax扩展
    $tool: 'tool',
    $api:'api'
}).use(['form', 'layer', 'jquery', 'ajaxExtention', '$tool','$api'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery,
        $tool = layui.$tool,
        $api = layui.$api;

//提交学生信息
    form.on("submit(formDemo)",function (data) {
        //姓名
        var sname=$("input[name='sname']").val();
        //性别
        var sex=$('#radio-sex input[name="sex"]:checked').val();
        //班级
        var clazz=$("input[name='clazz']").val();
        //年龄
        var age=$("input[name='age']").val();
        var req={
            sname:sname,
            sex:sex,
            clazz:clazz,
            age:age
        }
        //alert(JSON.stringify(req))
        $api.addStudent(JSON.stringify(req), {contentType: 'application/json;charset=utf-8'}, function () {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("添加成功！", {time: 1000,icon:6}, function () {
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
        });
        return false;
    });
});
