package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.bulletin.SimpleBulletin;
import cn.mooyyu.backstage.pojo.bulletin.FullBulletin;
import cn.mooyyu.backstage.service.BulletinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "bulletin",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class BulletinController {
    private final BulletinService bulletinService;

    @Autowired
    public BulletinController(BulletinService bulletinService) {
        this.bulletinService = bulletinService;
    }

    @GetMapping("getBulletinList")
    @ResponseBody
    public List<SimpleBulletin> getBulletinList() {
        return this.bulletinService.getBulletinList();
    }

    @GetMapping("getBulletin")
    @ResponseBody
    public FullBulletin getBulletin(@RequestParam int bulletinId) {
        return this.bulletinService.getDetailedById(bulletinId);
    }

    @PostMapping("addBulletin")
    @ResponseBody
    public int addBulletin(@RequestBody FullBulletin bulletin) {
        return this.bulletinService.addBulletin(bulletin);
    }

    @PostMapping("modifyBulletin")
    @ResponseBody
    public int modifyBulletin(@RequestBody FullBulletin bulletin) {
        return this.bulletinService.modifyBulletin(bulletin);
    }
}
