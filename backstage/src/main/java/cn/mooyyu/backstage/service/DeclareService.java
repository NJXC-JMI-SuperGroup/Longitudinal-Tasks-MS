package cn.mooyyu.backstage.service;
import cn.mooyyu.backstage.dao.DeclareDao;
import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import cn.mooyyu.backstage.pojo.ProcessDeclare;
import org.apache.ibatis.annotations.Param;
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
    public List<Bulletin> getBulletinList(){
        return this.declareDao.getBulletinList();

    }
    public DetailedBulletin getBulletin(int bulletinId){
        return this.declareDao.getBulletin(bulletinId);

    }

    public List<ProcessDeclare> getProcessList(){
        return this.declareDao.getProcessList();
    }
}
