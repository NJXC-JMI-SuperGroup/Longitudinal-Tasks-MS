package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.LinkList;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LinkListDao {
    @Select("select * from linkList order by idx")
    List<LinkList> getLinkList();
}
