package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.BulletinDao;
import cn.mooyyu.backstage.pojo.SimpleBulletin;
import cn.mooyyu.backstage.pojo.FullBulletin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinService {
    private final BulletinDao bulletinDao;

    @Autowired
    public BulletinService(BulletinDao bulletinDao) {
        this.bulletinDao = bulletinDao;
    }

    public List<SimpleBulletin> getBulletinList() {
        return this.bulletinDao.getBulletinList();
    }

    public FullBulletin getDetailedById(int bulletinId) {
        return this.bulletinDao.getDetailById(bulletinId);
    }

    public int addBulletin(FullBulletin bulletin) {
        try {
            this.bulletinDao.addBulletin(bulletin);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        return bulletin.getBulletinId();
    }
}
