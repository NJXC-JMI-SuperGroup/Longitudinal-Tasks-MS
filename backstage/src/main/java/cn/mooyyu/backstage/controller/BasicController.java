package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.pojo.SelectionList;
import cn.mooyyu.backstage.service.AccountService;
import cn.mooyyu.backstage.service.SelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "basic",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class BasicController {
    private final AccountService accountService;
    private final SelectionService selectionService;
    @Autowired
    public BasicController(AccountService accountService, SelectionService selectionService) {
        this.accountService = accountService;
        this.selectionService = selectionService;
    }

    @GetMapping("getAccountState")
    public AccountState getState(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null || session.getAttribute("accountState") == null) {
            return new AccountState();
        } else {
            return (AccountState) session.getAttribute("accountState");
        }
    }

    @PostMapping("login")
    public AccountState login(HttpServletRequest request, @RequestBody AccountState loginInfo) {
        return this.accountService.login(request, loginInfo);
    }

    @GetMapping("logout")
    public boolean logout(HttpServletRequest request) {
        return this.accountService.logout(request);
    }

    @GetMapping("getSelectionList")
    public SelectionList getSelectionList() {
        return this.selectionService.getSelectionList();
    }

    @GetMapping("getJobTitle")
    public String getJobTitle(HttpServletRequest request) {
        return this.accountService.getJobTitle(request);
    }
}
