package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.Chunk;
import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.service.DeclareService;
import cn.mooyyu.backstage.service.FileManagerService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "declare",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class DeclareController {
    final private DeclareService declareService;
    final private FileManagerService fileManagerService;

    @Autowired
    public DeclareController(DeclareService declareService, FileManagerService fileManagerService) {
        this.declareService = declareService;
        this.fileManagerService = fileManagerService;
    }

    @GetMapping("getDeclareList")
    @ResponseBody
    public List<SimpleDeclare> getDeclareList(HttpServletRequest request) {
        return this.declareService.getDeclareList(request);
    }

    @GetMapping("getDeclare")
    @ResponseBody
    public FullDeclare getDeclare(@RequestParam int declareId) {
        return this.declareService.getDeclare(declareId);
    }

    @PostMapping("createDeclare")
    @ResponseBody
    public int createDeclare(HttpServletRequest request, @RequestBody FullDeclare declare) {
        return this.declareService.createDeclare(request, declare);
    }

    @PostMapping("modifyDeclare")
    @ResponseBody
    public int modifyDeclare(@RequestBody FullDeclare declare, HttpServletRequest request) {
        return this.declareService.modifyDeclare(declare, request);
    }

    @PostMapping("uploadFiles")
    @ResponseBody
    public boolean uploadFiles(Chunk chunk, HttpServletRequest request) {
        return fileManagerService.uploadFiles(chunk, request, "declare");
    }

    @GetMapping("getAddition/{file}")
    public void getAddition(HttpServletResponse response, @PathVariable("file") String file) {
        this.fileManagerService.getAddition(response, "declare/" + file);
    }

    @Data
    private static class Body {
        int declareId;
        List<String> filenames;
    }
    @PostMapping("commit")
    @ResponseBody
    public boolean commit(HttpServletRequest request, @RequestBody Body body) {
        return this.fileManagerService.moveFiles(request, body.declareId, body.filenames, "declare");
    }
}




