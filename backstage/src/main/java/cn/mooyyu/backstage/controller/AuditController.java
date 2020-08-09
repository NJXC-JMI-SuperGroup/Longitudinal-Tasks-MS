package cn.mooyyu.backstage.controller;


import cn.mooyyu.backstage.pojo.StateProcess;
import cn.mooyyu.backstage.pojo.declare.ExpertDeclare;
import cn.mooyyu.backstage.pojo.expert.ExpertAccount;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.pojo.expert.ExpertAudit;
import cn.mooyyu.backstage.service.AuditService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @GetMapping("getDeclareList")
    @ResponseBody
    public List<SimpleDeclare> getDeclareList() {
        return this.auditService.getDeclareList();
    }

    @GetMapping("getDeclareListForAudit")
    @ResponseBody
    public List<SimpleDeclare> getDeclareListForAudit() {
        return this.auditService.getDeclareListForAudit();
    }

    @GetMapping("getDeclareListForExpertAudit")
    @ResponseBody
    public List<ExpertDeclare> getDeclareListForExpertAudit(HttpServletRequest request) {
        return this.auditService.getDeclareListForExpertAudit(request);
    }

    @Data
    private static class Body {
        int declareId;
        int stateId;
        String desc;
    }
    @PostMapping("projectAudit")
    @ResponseBody
    public boolean projectAudit(@RequestBody Body body, HttpServletRequest request) {
        return this.auditService.projectAudit(body.getDeclareId(), body.getStateId(), body.getDesc(), request);
    }

    @GetMapping("createExpertAccount")
    @ResponseBody
    public List<ExpertAccount> createExpertAccount(@RequestParam int bulletinId, @RequestParam int cnt) {
        return this.auditService.createExpertAccount(bulletinId, cnt);
    }

    @GetMapping("getExpertAccount")
    @ResponseBody
    public List<ExpertAccount> getExpertAccount(@RequestParam int bulletinId) {
        return this.auditService.getExpertAccountList(bulletinId);
    }

    @GetMapping("getExpertAuditList")
    @ResponseBody
    public List<ExpertAudit> getExpertAuditList(@RequestParam int declareId) {
        return this.auditService.getExpertAuditList(declareId);
    }

    @GetMapping("getExpertAudit")
    @ResponseBody
    public ExpertAudit getExpertAudit(HttpServletRequest request, @RequestParam int declareId) {
        return this.auditService.getExpertAudit(request, declareId);
    }

    @PostMapping("setExpertAudit")
    @ResponseBody
    public boolean setExpertAccount(HttpServletRequest request, @RequestBody ExpertAudit audit) {
        return this.auditService.setExpertAudit(request, audit);
    }

    @GetMapping("getProcessList")
    @ResponseBody
    public List<StateProcess> getProcessList(@RequestParam int declareId, @RequestParam int stateId) {
        return this.auditService.getProcessList(declareId, stateId);
    }

    @GetMapping("getFullProcess")
    @ResponseBody
    public List<StateProcess> getFullProcess(@RequestParam int declareId) {
        return this.auditService.getFullProcess(declareId);
    }
}
