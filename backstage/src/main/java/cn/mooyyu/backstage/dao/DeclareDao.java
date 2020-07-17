package cn.mooyyu.backstage.dao;
import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DeclareDao {
    @Select("select title,typeId,levelId,publishDeptId,deadline from tb_bulletin")
    List<Bulletin> getBulletinList();

    @Select("select bulletinId,title,index,publishDeptId,typeId,isLimit,limitNumber,expertAudit," +
            "levelId,deadlin,context,link from tb_bulletin where bulletinId = #{bulletinId}")
    DetailedBulletin getBulletin(@Param("bulletinId") int bulletinId);

    /*@Insert("insert into tb_declare (declareId,projectName,leaderId,leaderJobTitle,expectAchievement,index," +
            "BulletinID,declareDeptId,deadline) value #{}")*/


}
