package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AuditDeclare;
import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.Project;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AuditDao {

    @Select("select d.projectName,b.title,s.state,u.username from tb_declare d join tb_user u on d.leaderId = u.userid  join tb_bulletin b on d.bulletinId=b.bulletinId join tb_declareState s on d.stateId = s.stateId")
    List<Project> getProjectList();

    @Select("select b.title,b.[index],td.depname,tbT.type,b.isLimit,b.limitNumber,b.expertAudit,tbL.level,b.deadline,b.content from tb_bulletin b join tb_declare d on d.bulletinId = b.bulletinId join tb_dept td on b.publishDeptId = td.depid join tb_bulletinType tbT on b.typeId = tbT.typeId join tb_bulletinLevel tbL on b.levelId = tbL.levelId where d.declareId = #{bulletinId}")
    AuditDeclare findAuditListBybulletinId(@Param("bulletinId") int bulletinId);

    @Select("select d.projectName,tu.username leader,d.leaderJobTitle,d.[index],b.title,td.depname,d.expectDeadline,d.expectAchievement\n" +
            "from tb_declare d\n" +
            "         join tb_bulletin b on d.bulletinId = b.bulletinId join tb_dept td on d.declareDeptId = td.depid join tb_user tu on td.depid = tu.depid\n" +
            "where d.declareId =#{decalreId}")
    AuditDeclare findAuditListBydecalreId(@Param("decalreId") int decalreId);

    @Select("select expertScore,expertSuggestion from tb_declare where declareId = #{declared}")
    AuditResult getAuditResult(@Param("declareId") int declareId);

    @Insert("insert into tb_declare (expertScore,expertSuggestion) values (?,?) where declareId=#{declareId}")
    AuditResult addAuditResult(@Param("declareId") int declareId);

    @Insert("insert into tb_declare (rejectReason) values (?) where declareId=#{declareId}")
    String addRejectionReason(@Param("declareId") int declareId);

    @Select("select count(expertId) from tb_declare join tb_bulletin t on tb_declare.bulletinId = t.bulletinId join tb_expert te on t.bulletinId = te.bulletinId where declareId = #{declareId}")
    Integer getAccountNumber(@Param("declareId") int declareId);



}
