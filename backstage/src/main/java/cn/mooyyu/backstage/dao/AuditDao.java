package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.StateProcess;
import cn.mooyyu.backstage.pojo.declare.ExpertDeclare;
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
            "where tb_declare.stateId <> 1 and\n" +
            "      tb_declare.stateId <> 3\n" +
            "order by tb_declare.stateId")
    List<SimpleDeclare> getDeclareListForAudit();

    @Select("select s.declareId, projectName,\n" +
            "       cast(\n" +
            "               case\n" +
            "                   when count(score) > 0 then 1\n" +
            "                   else 0 end as bit\n" +
            "           ) as audited\n" +
            "from (select tb_declare.declareId, projectName\n" +
            "      from tb_declare\n" +
            "               inner join tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "      where expertAudit = 1 and\n" +
            "            stateId = 5 and\n" +
            "            tb_declare.bulletinId = #{bulletinId}\n" +
            "    ) s left join tb_expertAudit on s.declareId = tb_expertAudit.declareId and\n" +
            "                                        tb_expertAudit.expertId = #{expertId}\n" +
            "group by s.declareId, projectName\n" +
            "order by audited")
    List<ExpertDeclare> getDeclareListForExpertAudit(@Param("bulletinId") int bulletinId, @Param("expertId") int expertId);

    @Update("update tb_declare\n" +
            "set stateId = #{stateId}\n" +
            "where declareId = #{declareId}")
    void updateDeclareState(@Param("declareId") int declareId, @Param("stateId") int stateId);

    @Insert("insert into tb_process(declareId, stateId, operatorId, time, [desc])\n" +
            "values (#{declareId}, #{stateId}, #{operatorId}, cast(getdate() as smalldatetime), #{desc})")
    void setProcess(@Param("declareId") int declareId, @Param("stateId") int stateId, @Param("operatorId") int operatorId, @Param("desc") String desc);

    @Select("select realname as operator, state, time, tb_process.[desc]\n" +
            "from tb_process\n" +
            "    inner join tb_user on tb_process.operatorId = tb_user.userid\n" +
            "    inner join tb_declareState on tb_process.stateId = tb_declareState.stateId\n" +
            "where declareId = #{declareId} and\n" +
            "      tb_process.stateId = #{stateId}" +
            "order by time desc")
    List<StateProcess> getProcessList(@Param("declareId") int declareId, @Param("stateId") int stateId);

    @Select("select score, suggestion from tb_expertAudit\n" +
            "where expertId=#{expertId} and declareId=#{declareId}")
    ExpertAudit getExpertAudit(@Param("expertId") int expertId, @Param("declareId") int declareId);

    @Insert("insert into tb_expertAudit (score, suggestion, expertId, declareId)\n" +
            "values (#{audit.score}, #{audit.suggestion}, #{audit.expertId}, #{audit.declareId})")
    void setExpertAudit(@Param("audit") ExpertAudit expertAudit);

    @Select("select tb_expert.expertId, score, suggestion\n" +
            "from tb_expert\n" +
            "         left join (\n" +
            "    select score, suggestion, expertId\n" +
            "    from tb_expertAudit\n" +
            "    where declareId = #{declareId}\n" +
            ") s on s.expertId = tb_expert.expertId")
    List<ExpertAudit> getExpertAuditList(@Param("declareId") int declareId);
}
