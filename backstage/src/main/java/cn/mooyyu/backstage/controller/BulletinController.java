package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.Chunk;
import cn.mooyyu.backstage.pojo.bulletin.SimpleBulletin;
import cn.mooyyu.backstage.pojo.bulletin.FullBulletin;
import cn.mooyyu.backstage.service.BulletinService;
import cn.mooyyu.backstage.service.FileManagerService;
import com.sun.deploy.net.HttpResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.List;

@RestController
@RequestMapping(value = "bulletin",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class BulletinController {
    private final BulletinService bulletinService;
    private final FileManagerService fileManagerService;

    @Autowired
    public BulletinController(BulletinService bulletinService, FileManagerService fileManagerService) {
        this.bulletinService = bulletinService;
        this.fileManagerService = fileManagerService;
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
    public int addBulletin(@RequestBody FullBulletin bulletin, HttpServletRequest request) {
        return this.bulletinService.addBulletin(bulletin, request);
    }

    @PostMapping("modifyBulletin")
    @ResponseBody
    public int modifyBulletin(@RequestBody FullBulletin bulletin, HttpServletRequest request) {
        return this.bulletinService.modifyBulletin(bulletin, request);
    }

    @PostMapping("uploadFiles")
    @ResponseBody
    public boolean uploadFiles(Chunk chunk, HttpServletRequest request) {
        return fileManagerService.uploadFiles(chunk, request);
    }

    @GetMapping("getAddition/{file}")
    public void getAddition(HttpServletResponse response, @PathVariable("file") String file) {
        this.fileManagerService.getAddition(response, "bulletin/" + file);
    }

    @Data
    private static class Body {
        int bulletinId;
        List<String> filenames;
    }
    @PostMapping("commit")
    @ResponseBody
    public boolean commit(HttpServletRequest request, @RequestBody Body body) {
        return this.fileManagerService.moveFiles(request, body.bulletinId, body.filenames);
    }
}
