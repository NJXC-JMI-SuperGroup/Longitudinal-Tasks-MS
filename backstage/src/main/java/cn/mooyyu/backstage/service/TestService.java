package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.TestDao;
import cn.mooyyu.backstage.pojo.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestService {
    private final TestDao testDao;
    @Autowired
    public TestService(TestDao testDao) {
        this.testDao = testDao;
    }

    public String SayHello(int card) {
        Message msg = this.testDao.findMessageByCard(card);
        return msg == null ? "Sorry, found nothing." : String.valueOf(msg.getNick());
    }
}
