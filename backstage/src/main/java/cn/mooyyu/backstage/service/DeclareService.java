package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.DeclareDao;
import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@Service
public class DeclareService {
    private static final File StaticDeclareDir = new File("StaticFile", "declare");

    private final DeclareDao declareDao;
    @Autowired
    public DeclareService(DeclareDao declareDao) {
        this.declareDao = declareDao;
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

    public int createDeclare(HttpServletRequest request, FullDeclare declare) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        if (state == null) {
            return -1;
        }
        try {
            declare.setLeaderId(state.getUserid());
            declare.setStateId(2);
            this.declareDao.createDeclare(declare);
            this.declareDao.updateIndex(declare.getDeclareId());
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        request.getSession().setAttribute("declareId", declare.getBulletinId());
        return declare.getDeclareId();
    }

    public int modifyDeclare(FullDeclare declare, HttpServletRequest request) {
        declare.setStateId(2);
        try {
            this.declareDao.modifyDeclare(declare);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        request.getSession().setAttribute("declareId", declare.getBulletinId());
        return declare.getDeclareId();
    }
}
