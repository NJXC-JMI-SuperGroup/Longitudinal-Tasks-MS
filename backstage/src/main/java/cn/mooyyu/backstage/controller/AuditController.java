package cn.mooyyu.backstage.controller;


import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @GetMapping("getDeclareList")
    @ResponseBody
    public List<SimpleDeclare> getDeclareList() {
        return this.auditService.getDeclareList();
    }

    //添加评审结果
    @PostMapping("addAuditResult")
    @ResponseBody
    public void addAuditResult(@RequestParam int declareId,int expertScore,String expertSuggestion) {
        this.auditService.addAuditResult(declareId,expertScore,expertSuggestion);
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
    public void addRejectReson(@RequestParam int declareId, String rejectReason){
        this.auditService.addRejectReson(declareId,rejectReason);
    }


    //生成外审账号
    @PostMapping("productAccount")
    @ResponseBody
    public String showAccount(@RequestParam int declareId){
        return null;
    }
    

    //外审账号
    @PostMapping("expertAccount")
    @ResponseBody
//    public Integer showAccountNumber(@RequestParam int declareId){
//        return this.auditService.getAccountNumber(declareId);
//    }
    public  List<Map<String, Object>> showAccountList(@RequestParam int declareId) {
        return this.auditService.getAccountList(declareId);
    }

}