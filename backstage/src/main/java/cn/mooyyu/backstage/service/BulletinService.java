package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.BulletinDao;
import cn.mooyyu.backstage.pojo.bulletin.SimpleBulletin;
import cn.mooyyu.backstage.pojo.bulletin.FullBulletin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@Service
public class BulletinService {
    private static final File StaticBulletinDir = new File("StaticFile","bulletin");

    private final BulletinDao bulletinDao;

    @Autowired
    public BulletinService(BulletinDao bulletinDao) {
        this.bulletinDao = bulletinDao;
    }

    public List<SimpleBulletin> getBulletinList() {
        return this.bulletinDao.getBulletinList();
    }

    public FullBulletin getDetailedById(int bulletinId) {
        FullBulletin bulletin = this.bulletinDao.getDetailById(bulletinId);
        if (new File(StaticBulletinDir, bulletinId + ".zip").exists()) {
            bulletin.setAddition(true);
            bulletin.setAdditionUrl("bulletin/getAddition/" + bulletinId + ".zip");
        }
        return bulletin;
    }

    public int addBulletin(FullBulletin bulletin, HttpServletRequest request) {
        try {
            this.bulletinDao.addBulletin(bulletin);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        request.getSession().setAttribute("bulletinId", bulletin.getBulletinId());
        return bulletin.getBulletinId();
    }

    public int modifyBulletin(FullBulletin bulletin, HttpServletRequest request) {
        try {
            this.bulletinDao.modifyBulletin(bulletin);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        request.getSession().setAttribute("bulletinId", bulletin.getBulletinId());
        return bulletin.getBulletinId();
    }
}
