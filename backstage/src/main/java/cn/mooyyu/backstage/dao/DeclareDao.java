package cn.mooyyu.backstage.dao;
import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import cn.mooyyu.backstage.pojo.ProcessDeclare;
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

    @Select("select bulletinId,title,[index],publishDeptId,typeId,isLimit,limitNumber,expertAudit,levelId,deadline,content,link\n" +
            "from tb_bulletin\n" +
            "where bulletinId = #{bulletinId}")
    DetailedBulletin getBulletin(@Param("bulletinId") int bulletinId);

    @Select("select b.title,tdS.state,b.content,u.username\n" +
            "from tb_declare d\n" +
            "        join tb_bulletin b on d.bulletinId=b.bulletinId\n" +
            "        join tb_user u on d.leaderId = u.userid\n" +
            "        join tb_declareState tdS on d.stateId = tdS.stateId")
    List<ProcessDeclare> getProcessList();

}
