package cn.mooyyu.backstage.controller;

import cn.mooyyu.backstage.pojo.AccountState;
import cn.mooyyu.backstage.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "account",
        method = {RequestMethod.GET, RequestMethod.POST},
        produces = "application/json;charset=utf-8")
public class AccountController {
    private final AccountService accountService;
    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("getState")
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
}
