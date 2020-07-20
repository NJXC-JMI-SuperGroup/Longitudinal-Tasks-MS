package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
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
    public BulletinController(BulletinService bulletinService){
        this.bulletinService=bulletinService;
    }

    @GetMapping("getbulletinlist")
    @ResponseBody
    public List<Bulletin> showBulletinList(){
        return this.bulletinService.getBulletinList();
    }

    @GetMapping("getbulletin")
    @ResponseBody
    public DetailedBulletin showBulletin(@RequestParam int bulletinId){
        return this.bulletinService.findDetailedBybulletinId(bulletinId);
    }

    @PostMapping("addbulletin")
    @ResponseBody
    public DetailedBulletin addDetailedBulletin(@RequestParam String title, String index,boolean isLimit){
        return this.bulletinService.addDetailedBullentin(title,index,isLimit);
    }



}
