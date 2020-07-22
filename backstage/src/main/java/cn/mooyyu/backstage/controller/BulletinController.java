package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.SimpleBulletin;
import cn.mooyyu.backstage.pojo.FullBulletin;
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

    //获取课题列表
    @GetMapping("getBulletinList")
    @ResponseBody
    public List<SimpleBulletin> getBulletinList() {
        return this.bulletinService.getBulletinList();
    }

    //获取课题详细信息
    @GetMapping("getBulletin")
    @ResponseBody
    public FullBulletin getBulletin(@RequestParam int bulletinId) {
        return this.bulletinService.getDetailedById(bulletinId);
    }

    //发布课题
    @PostMapping("addBulletin")
    @ResponseBody
    public void addBulletin(@RequestBody FullBulletin addBulletin) {
        this.bulletinService.addBulletin(addBulletin);
    }
}
