package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "test",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class HelloworldController {
    final private TestService testService;
    @Autowired
    public HelloworldController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("is_ok")
    @ResponseBody
    public String hello(@RequestParam int card) {
        return "for test: " + this.testService.SayHello(card);
    }

    // test for soda
}
