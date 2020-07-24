package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.AuditResult;
import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DeclareDao {
    @Select("select declareId, projectName, state, title as bulletin\n" +
            "from tb_declare\n" +
            "         inner join tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "where leaderId = #{userid}")
    List<SimpleDeclare> getDeclareList(@Param("userid") int userid);

    @Select("select tb_declare.*, realname as leader, title as bulletin, state, depname as declareDept\n" +
            "from tb_declare\n" +
            "         inner join tb_user on tb_declare.leaderId = tb_user.userid\n" +
            "         inner join tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "         inner join tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join tb_dept on tb_bulletin.publishDeptId = tb_dept.depid\n" +
            "where declareId = #{declareId}")
    FullDeclare getDeclare(@Param("declareId") int declareId);

    @Select("select rejectionReason\n" +
            "from tb_declare\n" +
            "where declareId = #{declareId};")
    String getRejectReason(@Param("declareId") int declareId);

    @Select("select expertScore, expertSuggestion\n" +
            "from tb_declare\n" +
            "where declareId = #{declareId};\n")
    AuditResult getAuditResult(@Param("declareId") int declareId);

    @Insert("insert into tb_declare (projectName, leaderJobTitle, expectAchievement, [index], bulletinId, declareDeptId,\n" +
            "                        expectDeadline, stateId)\n" +
            "values (#{declare.projectName}, #{declare.leaderJobTitle}, #{declare.expectAchievement}, #{declare.index}, #{declare.bulletinId}, #{declare.declareDeptId}, #{declare.expectDeadline}, 2);\n")
    void putDeclare(@Param("declare") FullDeclare declare);

    @Select("select projectName, leaderJobTitle, expectAchievement, [index], bulletinId, declareDeptId, expectDeadline\n" +
            "from tb_declare where declareId=#{declareId};\n")
    FullDeclare getModify(@Param("declareId") int declareId);

    @Update("update tb_declare\n" +
            "set projectName=#{declare.projectName}\n" +
            "  , leaderJobTitle=#{declare.leaderJobTitle}\n" +
            "  , expectAchievement=#{declare.expectAchievement}\n" +
            "  , [index]=#{declare.index}\n" +
            "  , bulletinId=#{declare.bulletinId}\n" +
            "  , declareDeptId=#{declare.declareDeptId}\n" +
            "  , expectDeadline=#{declare.expectDeadline}\n" +
            "where declareId = #{declare.declareId};")
    void putModify(@Param("declare") FullDeclare declare);
}
