package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.TestDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestService {
    private final TestDao testDao;
    @Autowired
    public TestService(TestDao testDao) {
        this.testDao = testDao;
    }

    public String SayHello(int userid) {
        String msg = this.testDao.findMessageByCard(userid);
        return msg == null ? "Sorry, found nothing." : msg;
    }
}
