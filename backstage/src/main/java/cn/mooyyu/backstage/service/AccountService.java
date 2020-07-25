package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.AccountDao;
import cn.mooyyu.backstage.pojo.AccountState;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class AccountService {
    private final AccountDao accountDao;
    @Autowired
    public AccountService(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public AccountState login(HttpServletRequest request, AccountState loginInfo) {
        AccountState result = null;
        try {
            result = this.accountDao.login(loginInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (result == null) {
            try {
                result = this.accountDao.expertLogin(loginInfo);
            } catch (Exception e) {
                e.printStackTrace();
            }
            if (result == null) {
                request.getSession().setAttribute("accountState", new AccountState());
                return new AccountState();
            }
        }
        request.getSession().setAttribute("accountState", result);
        return result;
    }

    public boolean logout(HttpServletRequest request) {
        request.getSession().setAttribute("accountState", new AccountState());
        return true;
    }
}
