package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.DeclareDao;
import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class DeclareService {
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
        return this.declareDao.getDeclare(declareId);
    }

    public int createDeclare(HttpServletRequest request, FullDeclare declare) {
        AccountState state = (AccountState) request.getSession().getAttribute("accountState");
        if (state == null) {
            return -1;
        }
        try {
            declare.setLeaderId(state.getUserid());
            declare.setStateId(2);
            // todo: how to generate index ?
            declare.setIndex("HJDLKJD2012084");
            this.declareDao.createDeclare(declare);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return declare.getDeclareId();
    }

    public int modifyDeclare(FullDeclare declare) {
        declare.setStateId(2);
        try {
            this.declareDao.modifyDeclare(declare);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return declare.getDeclareId();
    }
}
