package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

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

    @Update("update tb_declare set expertScore = #{expertScore},expertSuggestion = #{expertSuggestion} where declareId = #{declareId}")
    void addAuditResult( @Param("declareId") int declareId,@Param("expertScore") int expertScore,@Param("expertSuggestion") String expertSuggestion);

    @Select("select expertScore,expertSuggestion from tb_declare where declareId = #{declareId}")
    AuditResult getAuditResult(@Param("declareId") int declareId);

    @Update("update tb_declare\n" +
            "set rejectionReason = #{rejectReason}\n" +
            "where declareId = #{declareId};")
    void addRejectReson( @Param("declareId") int declareId,@Param("rejectReason")String rejectReason);

    @Select("select count(expertId) from tb_declare join tb_bulletin t on tb_declare.bulletinId = t.bulletinId join tb_expert te on t.bulletinId = te.bulletinId where declareId = #{declareId}")
    Integer getAccountNumber(@Param("declareId") int declareId);

    @Select("select username,password from tb_declare join tb_bulletin t on tb_declare.bulletinId = t.bulletinId join tb_expert te on t.bulletinId = te.bulletinId")
    List<Map<String, Object>> getAccountList(@Param("declareId") int declareId);



}
