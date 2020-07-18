package cn.mooyyu.backstage.controller;
import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.Declare;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import cn.mooyyu.backstage.pojo.ProcessDeclare;
import cn.mooyyu.backstage.service.DeclareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "declare",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class DeclareController {
    final private DeclareService declareService;
    @Autowired
    public DeclareController(DeclareService declareService){
        this.declareService = declareService;
    }
    //获取课题通知列表
    @GetMapping("getBulletinList")
    @ResponseBody
    public List<Bulletin> showBulletinList() {
        return  this.declareService.getBulletinList();
    }
    //获取课题通知详情
    @GetMapping("getBulletin")
    @ResponseBody
    public DetailedBulletin showBulletin(@RequestParam int bulletinId){
        return this.declareService.getBulletin(bulletinId);
    }

    public void putDeclare(Declare declare){


    }

    //获取项目申报进度
    @GetMapping("getProcessList")
    @ResponseBody
    public List<ProcessDeclare> showProcessList(){
        return this.declareService.getProcessList();
    }



}
