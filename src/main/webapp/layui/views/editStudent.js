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

    /*
        * 初始化菜单信息
        * */
    function init() {
        var queryArgs = $tool.getQueryParam();//获取查询参数
        var sid = queryArgs['sid'];
        //alert(JSON.stringify(admId));

        var req = {
            sid: sid
        };
        //findById
        $api.findByIdStudent(req, function (res) {
            var data=res.data;
            console.log(data);
            //alert(JSON.stringify(data));
            $("input[name='sid']").val(data.sid);
            $("input[name='sname']").val(data.sname);
            $("input[name='sex'][value='男']").attr("checked",data.sex=='男' ? true:false);
            $("input[name='sex'][value='女']").attr("checked",data.sex=='女' ? true:false);
            $("input[name='clazz']").val(data.clazz);
            $("input[name='age']").val(data.age);
            form.render();
        });
    }
    init();
    form.on("submit(updateDemo)",function (data) {
        //学号
        var sid=$("input[name='sid']").val();
        //姓名
        var sname=$("input[name='sname']").val();
        //性别
        var sex=$('#radio-sex input[name="sex"]:checked').val();
        //班级
        var clazz=$("input[name='clazz']").val();
        //年龄
        var age=$("input[name='age']").val();
        var req={
            sid:sid,
            sname:sname,
            sex:sex,
            clazz:clazz,
            age:age
        }
        //alert(JSON.stringify(req))
        $api.editStudent(JSON.stringify(req), {contentType: 'application/json;charset=utf-8'}, function () {
            //top.layer.close(index);(关闭遮罩已经放在了ajaxExtention里面了)
            layer.msg("修改成功！", {time: 1000,icon:6}, function () {
                layer.closeAll("iframe");
                //刷新父页面
                parent.location.reload();
            });
        });
        return false;
    });

});
