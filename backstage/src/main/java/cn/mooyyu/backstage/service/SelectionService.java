package cn.mooyyu.backstage.service;

import cn.mooyyu.backstage.dao.SelectionDao;
import cn.mooyyu.backstage.pojo.SelectionList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SelectionService {
    private final SelectionDao selectionDao;
    @Autowired
    public SelectionService(SelectionDao selectionDao) {
        this.selectionDao = selectionDao;
    }

    public SelectionList getSelectionList() {
        SelectionList result = new SelectionList();
        result.setDeptSelection(this.selectionDao.getDeptList());
        result.setBulletinTypeSelection(this.selectionDao.getBulletinTypeList());
        result.setBulletinLevelSelection(this.selectionDao.getBulletinLevelList());
        return result;
    }
}
