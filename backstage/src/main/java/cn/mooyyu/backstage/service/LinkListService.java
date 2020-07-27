package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.LinkListDao;
import cn.mooyyu.backstage.pojo.LinkList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinkListService {
    private final LinkListDao linkListDao;
    @Autowired
    public LinkListService(LinkListDao linkListDao) {
        this.linkListDao = linkListDao;
    }

    public List<LinkList> getLinkList() {
        return this.linkListDao.getLinkList();
    }
}
