package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.pojo.expert.ExpertAudit;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import java.util.List;

@Mapper
@Repository
public interface AuditDao {
    @Select("select declareId, tb_declare.bulletinId, realname as leader, projectName, tb_declare.stateId,\n" +
            "       state, title as bulletin, expertAudit\n" +
            "from tb_declare\n" +
            "         inner join dbo.tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join dbo.tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "         inner join dbo.tb_user on tb_declare.leaderId = tb_user.userid\n" +
            "order by tb_declare.stateId")
    List<SimpleDeclare> getDeclareList();

    @Select("select declareId, tb_declare.bulletinId, realname as leader, projectName, tb_declare.stateId,\n" +
            "       state, title as bulletin\n" +
            "from tb_declare\n" +
            "         inner join dbo.tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join dbo.tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "         inner join dbo.tb_user on tb_declare.leaderId = tb_user.userid\n" +
            "where expertAudit=1 and\n" +
            "      tb_declare.stateId =3\n" +
            "order by tb_declare.stateId")
    List<SimpleDeclare> getDeclareListForExpert();

    @Select("select declareId, tb_declare.bulletinId, realname as leader, projectName, tb_declare.stateId,\n" +
            "       state, title as bulletin\n" +
            "from tb_declare\n" +
            "         inner join dbo.tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join dbo.tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "         inner join dbo.tb_user on tb_declare.leaderId = tb_user.userid\n" +
            "where expertAudit=1 and\n" +
            "      tb_declare.stateId =3 and\n" +
            "      tb_declare.bulletinId=#{bulletinId}" +
            "order by tb_declare.stateId")
    List<SimpleDeclare> getDeclareListForExpertAudit(@Param("bulletinId") int bulletinId);

    @Update("update tb_declare\n" +
            "set stateId = #{stateId}\n" +
            "where declareId = #{declareId}")
    void updateDeclareState(@Param("declareId") int declareId, @Param("stateId") int stateId);

    @Update("update tb_declare\n" +
            "set rejectionReason = #{rejectionReason}\n" +
            "where declareId = #{declareId}")
    void setRejectionReason(@Param("declareId") int declareId, @Param("rejectionReason") String rejectionReason);

    @Select("select score, suggestion from tb_expertAudit\n" +
            "where expertId=#{expertId} and declareId=#{declareId}")
    ExpertAudit getExpertAudit(@Param("expertId") int expertId, @Param("declareId") int declareId);

    @Insert("insert into tb_expertAudit (score, suggestion, expertId, declareId)\n" +
            "values (#{audit.score}, #{audit.suggestion}, #{audit.expertId}, #{audit.declareId})")
    void setExpertAudit(@Param("audit") ExpertAudit expertAudit);

    @Select("select score, suggestion from tb_expertAudit\n" +
            "where declareId=#{declareId}")
    List<ExpertAudit> getExpertAuditList(@Param("declareId") int declareId);
}
