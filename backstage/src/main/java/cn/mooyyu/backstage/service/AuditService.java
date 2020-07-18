package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;
import cn.mooyyu.backstage.pojo.AuditDeclare;
import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {
    private final AuditDao auditDao;
    @Autowired
    public AuditService(AuditDao auditDao) {
        this.auditDao = auditDao;
    }

    public List<Project> getProjectList(){
        return this.auditDao.getProjectList();
    }

    public AuditResult getAuditResult(int declareId){
        return this.auditDao.getAuditResult(declareId);
    }

    public AuditResult addAuditResult(int declareId){
        return this.auditDao.addAuditResult(declareId);
    }

    public String addRejectionReason(int declareId){
        return this.auditDao.addRejectionReason(declareId);
    }
    public Integer getAccountNumber(int declareId){
        return this.auditDao.getAccountNumber(declareId);
    }
}

