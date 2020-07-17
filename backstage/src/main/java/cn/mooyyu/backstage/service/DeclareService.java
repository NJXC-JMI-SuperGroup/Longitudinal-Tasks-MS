package cn.mooyyu.backstage.service;
import cn.mooyyu.backstage.dao.DeclareDao;
import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
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
        List<Bulletin> bulletin = this.declareDao.getBulletinList();
        return bulletin;
    }
    public DetailedBulletin getBulletin(int bulletinId){
        DetailedBulletin bulletin =this.declareDao.getBulletin(bulletinId);
        return bulletin;
    }

    public void putDeclare(){

    }
}
