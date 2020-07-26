package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.declare.FullDeclare;
import cn.mooyyu.backstage.pojo.declare.SimpleDeclare;
import cn.mooyyu.backstage.pojo.expert.ExpertAudit;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DeclareDao {
    @Select("select declareId, projectName, tb_declare.stateId, state, title as bulletin, expertAudit\n" +
            "from tb_declare\n" +
            "         inner join tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "where leaderId = #{userid}\n" +
            "order by tb_declare.stateId")
    List<SimpleDeclare> getDeclareList(@Param("userid") int userid);

    @Select("select tb_declare.*, realname as leader, title as bulletin, state, depname as declareDept\n" +
            "from tb_declare\n" +
            "         inner join tb_user on tb_declare.leaderId = tb_user.userid\n" +
            "         inner join tb_bulletin on tb_declare.bulletinId = tb_bulletin.bulletinId\n" +
            "         inner join tb_declareState on tb_declare.stateId = tb_declareState.stateId\n" +
            "         inner join tb_dept on tb_bulletin.publishDeptId = tb_dept.depid\n" +
            "where declareId = #{declareId}")
    FullDeclare getDeclare(@Param("declareId") int declareId);

    @Insert("insert into tb_declare(projectName, leaderId, leaderJobTitle, expectDeadline,\n" +
            "                       [index], expectAchievement, bulletinId, declareDeptId, stateId)\n" +
            "values (#{declare.projectName}, #{declare.leaderId}, #{declare.leaderJobTitle},\n" +
            "        #{declare.expectDeadline}, #{declare.index}, #{declare.expectAchievement},\n" +
            "        #{declare.bulletinId}, #{declare.declareDeptId}, #{declare.stateId})")
    @Options(useGeneratedKeys = true, keyProperty = "declare.declareId", keyColumn = "declareId")
    void createDeclare(@Param("declare") FullDeclare declare);

    @Update("update tb_declare\n" +
            "set projectName = #{declare.projectName},\n" +
            "    leaderJobTitle = #{declare.leaderJobTitle},\n" +
            "    expectDeadline = #{declare.expectDeadline},\n" +
            "    [index] = #{declare.index},\n" +
            "    expectAchievement = #{declare.expectAchievement},\n" +
            "    bulletinId = #{declare.declareDeptId},\n" +
            "    stateId = #{declare.stateId}\n" +
            "where declareId = #{declare.declareId}")
    void modifyDeclare(@Param("declare") FullDeclare declare);

    @Update("update tb_declare\n" +
            "set [index] = N'JSHY' + cast(year(getdate()) as varchar) + \n" +
            "              N'KTSB' + right('0000' + cast(declareId as varchar), 4)\n" +
            "where declareId = #{declareId}")
    void updateIndex(@Param("declareId") int declareId);
}
