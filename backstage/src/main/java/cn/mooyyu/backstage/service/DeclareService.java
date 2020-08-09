package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AuditDao;
import cn.mooyyu.backstage.dao.DeclareDao;
import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@Service
public class DeclareService {
    private static final File StaticDeclareDir = new File("StaticFile", "declare");

    private final DeclareDao declareDao;
    private final AuditDao auditDao;
    @Autowired
    public DeclareService(DeclareDao declareDao, AuditDao auditDao) {
        this.declareDao = declareDao;
        this.auditDao = auditDao;
    }

    public List<SimpleDeclare> getDeclareList(HttpServletRequest request) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        return state == null ? null : this.declareDao.getDeclareList(state.getUserid());
    }

    public FullDeclare getDeclare(int declareId) {
        FullDeclare declare = this.declareDao.getDeclare(declareId);
        if (new File(StaticDeclareDir, declareId + ".zip").exists()) {
            declare.setAddition(true);
            declare.setAdditionUrl("declare/getAddition/" + declareId + ".zip");
        }
        return declare;
    }

    @Transactional
    public int createDeclare(HttpServletRequest request, FullDeclare declare) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        try {
            declare.setLeaderId(state.getUserid());
            declare.setStateId(3);
            this.declareDao.createDeclare(declare);
            this.auditDao.setProcess(declare.getDeclareId(), 3, state.getUserid(), null);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        request.getSession().setAttribute("declareId", declare.getBulletinId());
        return declare.getDeclareId();
    }

    @Transactional
    public int modifyDeclare(FullDeclare declare, HttpServletRequest request) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        try {
            int rawStateId = this.declareDao.getDeclare(declare.getDeclareId()).getStateId();
            int stateId = rawStateId <= 2 ? rawStateId + 2 : rawStateId;
            declare.setStateId(stateId);
            this.declareDao.modifyDeclare(declare);
            this.auditDao.setProcess(declare.getDeclareId(), stateId, state.getUserid(), null);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        request.getSession().setAttribute("declareId", declare.getBulletinId());
        return declare.getDeclareId();
    }
}
