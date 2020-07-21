package cn.mooyyu.backstage.controller;
import cn.mooyyu.backstage.pojo.*;
import cn.mooyyu.backstage.service.DeclareService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping(value = "declare",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class DeclareController {
    final private DeclareService declareService;
    private Declare declare;

    @Autowired
    public DeclareController(DeclareService declareService) {
        this.declareService = declareService;
    }


    //获取项目申报进度
    @GetMapping("getProcessList")
    @ResponseBody
    public List<ProcessDeclare> showProcessList() {
        return this.declareService.getProcessList();
    }

    //获取项目申报详情
    @GetMapping("getDetailedProcessDeclare")
    @ResponseBody
    public DetailedProcessDeclare showDatailedProcessDeclare(@RequestParam int declareId) {
        return this.declareService.getDetailedProcessDeclare(declareId);
    }

    //获取驳回理由
    @GetMapping("getRejectReason")
    @ResponseBody
    public String showRejectReason(@RequestParam int declareId) {
        return this.declareService.getRejectReason(declareId);
    }

    //获取专审结果
    @GetMapping("getAuditResult")
    @ResponseBody
    public AuditResult showAuditResult(@RequestParam int declareId) {
        return this.declareService.getAuditResult(declareId);

    }

    //提交项目申报
    @PostMapping("putDeclare")
    @ResponseBody
    public void putDeclare(@RequestBody Declare declare) {
        this.declareService.putDeclare(declare);
    }

    //获取提交申报修改页面
    @GetMapping("getModify")
    @ResponseBody
    public Declare getModify(@RequestParam int declareId) {
        return this.declareService.getModify(declareId);
    }


    //修改提交项目申报
    @PostMapping("putModify")
    @ResponseBody
    public void putModify(@RequestBody Declare declare) {
        this.declareService.putModify(declare);


    }
}




