package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.SelectionList;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SelectionDao {
    @Select("select depid, depname from tb_dept")
    List<SelectionList.dept> getDeptList();

    @Select("select * from tb_bulletinType")
    List<SelectionList.bulletinType> getBulletinTypeList();

    @Select("select * from tb_bulletinLevel")
    List<SelectionList.bulletinLevel> getBulletinLevelList();

    @Select("select bulletinId, title as bulletin\n" +
            "from tb_bulletin\n" +
            "where deadline > getdate()")
    List<SelectionList.validBulletin> getValidBulletinList();
}
