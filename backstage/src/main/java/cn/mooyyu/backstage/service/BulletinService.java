package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.BulletinDao;
import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import cn.mooyyu.backstage.pojo.addBulletin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinService {
    private final BulletinDao bulletinDao;
    @Autowired
    public BulletinService(BulletinDao bulletinDao){
        this.bulletinDao=bulletinDao;
    }

   public List<Bulletin> getBulletinList(){
        return this.bulletinDao.getBulletinList();
   }

   public DetailedBulletin findDetailedBybulletinId(int bulletinId){
        return this.bulletinDao.findDetailedBybulletinId(bulletinId);
   }

   public void addforBulletin(addBulletin addbulletin){
        this.bulletinDao.addforBullentin(addbulletin);
   }
}
