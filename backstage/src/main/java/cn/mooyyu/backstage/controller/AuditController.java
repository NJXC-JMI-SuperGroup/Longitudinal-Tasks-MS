package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.Message;
import cn.mooyyu.backstage.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
