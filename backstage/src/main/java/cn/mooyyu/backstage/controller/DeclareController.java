package cn.mooyyu.backstage.controller;
import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.service.DeclareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "declare",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class DeclareController {
    final private DeclareService declareService;
    @Autowired
    public DeclareController(DeclareService declareService) {
        this.declareService = declareService;
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
    public int modifyDeclare(@RequestBody FullDeclare declare) {
        return this.declareService.modifyDeclare(declare);
    }
}




