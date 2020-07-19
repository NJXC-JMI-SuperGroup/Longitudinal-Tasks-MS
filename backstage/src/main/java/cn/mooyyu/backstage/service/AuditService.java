package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;

import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.ExpertAccount;
import cn.mooyyu.backstage.pojo.SimpleDeclare;
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

    public List<SimpleDeclare> getProjectList(){
        return this.auditDao.getProjectList();
    }

    public AuditResult getAuditResult(int declareId){
        return this.auditDao.getAuditResult(declareId);
    }

    public void addAuditResult(int declareId,int expertScore,String expertSuggestion){
        this.auditDao.addAuditResult(declareId,expertScore,expertSuggestion);
    }

  public void  addRejectReson(int declareId,String rejectReason){
        this.auditDao.addRejectReson(declareId,rejectReason);
    }
    public Integer getAccountNumber(int declareId){
        return this.auditDao.getAccountNumber(declareId);
    }
<<<<<<< HEAD
    public List<ExpertAccount> getAccountList(int declareId){
        return this.auditDao.getAccountList();
    }
=======



>>>>>>> bad2a69ce61bb2beb8d4157294c9e5c83ba50f96
}

