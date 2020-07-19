package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.AuditDeclare;
import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.Project;
import cn.mooyyu.backstage.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "audit",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class AuditController {
    private final AuditService auditService;
    @Autowired
    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }

    //获取项目列表
    @GetMapping("getProjectList")
    @ResponseBody
    public List<Project> showProjectList() {
        return this.auditService.getProjectList();
    }

    //添加评审结果
    @PostMapping("addAuditResult")
    @ResponseBody
    public AuditResult addAuditResult(@RequestParam int declareId) {
        return this.auditService.addAuditResult(declareId);
    }

    //获取评审结果
    @PostMapping("getAuditResult")
    @ResponseBody
    public AuditResult showAuditResult(@RequestParam int declareId) {
        return this.auditService.getAuditResult(declareId);
    }

    //添加驳回理由
    @PostMapping("addRejectionReason")
    @ResponseBody
    public String addRejectionReason(@RequestParam int declareId){
        return this.auditService.addRejectionReason(declareId);
    }

    //获取已有外审账号数目
    @PostMapping("getAccountNumber")
    @ResponseBody
    public Integer showAccountNumber(@RequestParam int declareId){
        return this.auditService.getAccountNumber(declareId);
    }

    //生成外审账号
    @PostMapping("productAccount")
    @ResponseBody
    public String showAccount(@RequestParam int declareId){
        return null;
    }

  

}
