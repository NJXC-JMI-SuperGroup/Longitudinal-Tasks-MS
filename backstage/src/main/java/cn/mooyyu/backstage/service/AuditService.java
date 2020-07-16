package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditService {
    private final AuditDao auditDao;
    @Autowired
    public AuditService(AuditDao auditDao) {
        this.auditDao = auditDao;
    }


}
