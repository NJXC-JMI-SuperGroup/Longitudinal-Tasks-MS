package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.LinkList;
import cn.mooyyu.backstage.service.LinkListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "linkList",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class LinkListController {
    private final LinkListService linkListService;
    @Autowired
    public LinkListController(LinkListService linkListService) {
        this.linkListService = linkListService;
    }

    @GetMapping("getLinkList")
    @ResponseBody
    public List<LinkList> getLinkList() {
        return this.linkListService.getLinkList();
    }
}
