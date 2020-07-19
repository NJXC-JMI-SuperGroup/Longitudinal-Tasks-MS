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

    @Select("select expertScore,expertSuggestion from tb_declare where declareId = #{declareId}")
    AuditResult getAuditResult(@Param("declareId") int declareId);

    @Insert("insert into tb_declare (expertScore,expertSuggestion) values (?,?) where declareId=#{declareId}")
    AuditResult addAuditResult(@Param("declareId") int declareId);

    @Insert("insert into tb_declare (rejectReason) values (?) where declareId=#{declareId}")
    String addRejectionReason(@Param("declareId") int declareId);

    @Select("select count(expertId) from tb_declare join tb_bulletin t on tb_declare.bulletinId = t.bulletinId join tb_expert te on t.bulletinId = te.bulletinId where declareId = #{declareId}")
    Integer getAccountNumber(@Param("declareId") int declareId);



}
