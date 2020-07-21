package cn.mooyyu.backstage.service;
import cn.mooyyu.backstage.dao.DeclareDao;
import cn.mooyyu.backstage.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeclareService {
    private final DeclareDao declareDao;
    @Autowired
    public DeclareService(DeclareDao declareDao) {
        this.declareDao = declareDao;
    }

    public List<ProcessDeclare> getProcessList(){
        return this.declareDao.getProcessList();
    }

    public DetailedProcessDeclare getDetailedProcessDeclare(int declareId){
        return   this.declareDao.getDetailedProcessDeclare(declareId);
    }

    public String getRejectReason(int declareId){
        return this.declareDao.getRejectReason(declareId);
    }

    public AuditResult getAuditResult(int declareId){
        return this.declareDao.getAuditResult(declareId);
    }

    public void putDeclare(Declare declare){
        this.declareDao.putDeclare(declare);
    }

    public Declare getModify(int declareId){
       return this.declareDao.getModify(declareId);
    }


    public void putModify(Declare declare){
        this.declareDao.putModify(declare);
    }
}
