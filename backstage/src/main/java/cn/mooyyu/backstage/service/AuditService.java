package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;
import cn.mooyyu.backstage.dao.ExpertAccountDao;
import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.pojo.expert.ExpertAccount;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.pojo.expert.ExpertAudit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@Service
public class AuditService {
    private final AuditDao auditDao;
    private final ExpertAccountDao expertAccountDao;
    @Autowired
    public AuditService(AuditDao auditDao, ExpertAccountDao expertAccountDao) {
        this.auditDao = auditDao;
        this.expertAccountDao = expertAccountDao;
    }

    public List<SimpleDeclare> getDeclareList(){
        return this.auditDao.getDeclareList();
    }

    public List<SimpleDeclare> getDeclareListForExpert(boolean limit, HttpServletRequest request){
        if (limit) {
            AccountState state = (AccountState) request.getSession().getAttribute("accountState");
            return state == null ? null : this.auditDao.getDeclareListForExpertAudit(state.getBulletinId());
        } else {
            return this.auditDao.getDeclareListForExpert();
        }
    }

    public boolean departAudit(int declareId, int stateId, String rejectionReason) {
        try {
            this.auditDao.updateDeclareState(declareId, stateId);
            if (stateId == 1) {
                this.auditDao.setRejectionReason(declareId, rejectionReason);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public List<ExpertAccount> createExpertAccount(int bulletinId, int cnt) {
        try {
            String username;
            String password;
            while (cnt-- > 0) {
                username = UUID.randomUUID().toString();
                password = UUID.randomUUID().toString();
                this.expertAccountDao.addExpertAccount(bulletinId, username, password);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getExpertAccountList(bulletinId);
    }

    public List<ExpertAccount> getExpertAccountList(int bulletinId) {
        return this.expertAccountDao.getExpertAccount(bulletinId);
    }

    public List<ExpertAudit> getExpertAuditList(int declareId) {
        return this.auditDao.getExpertAuditList(declareId);
    }

    public ExpertAudit getExpertAudit(HttpServletRequest request, int declareId) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        if (state == null) {
            return null;
        }
        return this.auditDao.getExpertAudit(state.getUserid(), declareId);
    }

    public boolean setExpertAudit(HttpServletRequest request, ExpertAudit audit) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        if (state == null) {
            return false;
        }
        audit.setExpertId(state.getUserid());
        try {
            this.auditDao.setExpertAudit(audit);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}

