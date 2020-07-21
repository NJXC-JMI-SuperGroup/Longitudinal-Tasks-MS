package cn.mooyyu.backstage.dao;
import cn.mooyyu.backstage.pojo.*;
import org.apache.ibatis.annotations.*;
import org.eclipse.sisu.Parameters;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
@Repository
public interface DeclareDao {
    @Select("select b.title,tdS.state,b.content,u.username\n" +
            "from tb_declare d\n" +
            "        join tb_bulletin b on d.bulletinId=b.bulletinId\n" +
            "        join tb_user u on d.leaderId = u.userid\n" +
            "        join tb_declareState tdS on d.stateId = tdS.stateId")
    List<ProcessDeclare> getProcessList();


    @Select("select b.title,\n" +
            "       b.[index],\n" +
            "       u.username,\n" +
            "       d.leaderJobTitle,\n" +
            "       b.content,\n" +
            "--        de.depname,\n" +
            "       b.deadline,\n" +
            "       d.expectAchievement,\n" +
            "       b.link\n" +
            "from tb_declare d\n" +
            "         join tb_bulletin b on d.bulletinId = b.bulletinId\n" +
            "         join tb_user u on d.leaderId = u.userid\n" +
            "         join tb_declareState tdS on d.stateId = tdS.stateId\n" +
            "         join tb_dept de on d.declareId = de.depid\n" +
            "where d.declareId = #{declareId};\n")
    DetailedProcessDeclare getDetailedProcessDeclare(@Param("declareId") int declareId);


    @Select("select rejectionReason\n" +
            "from tb_declare\n" +
            "where declareId = #{declareId};")
    String getRejectReason(@Param("declareId")int declareId);


    @Select("select expertScore, expertSuggestion\n" +
            "from tb_declare\n" +
            "where declareId = #{declareId};\n")
    AuditResult getAuditResult(@Param("declareId") int declareId);



    @Insert("insert into tb_declare (projectName, leaderJobTitle, expectAchievement, [index], bulletinId, declareDeptId,\n" +
                "                        expectDeadline, stateId)\n" +
                "values (#{declare.projectName}, #{declare.leaderJobTitle}, #{declare.expectAchievement}, #{declare.index}, #{declare.bulletinId}, #{declare.declareDeptId}, #{declare.expectDeadline}, 2);\n")

    void  putDeclare(@Param("declare") Declare declare);


    @Select("select projectName, leaderJobTitle, expectAchievement, [index], bulletinId, declareDeptId, expectDeadline\n" +
            "from tb_declare where declareId=#{declareId};\n")
    Declare getModify(@Param("declareId") int declareId);

    @Update("update tb_declare\n" +
            "set projectName=#{declare.projectName}\n" +
            "  , leaderJobTitle=#{declare.leaderJobTitle}\n" +
            "  , expectAchievement=#{declare.expectAchievement}\n" +
            "  , [index]=#{declare.index}\n" +
            "  , bulletinId=#{declare.bulletinId}\n" +
            "  , declareDeptId=#{declare.declareDeptId}\n" +
            "  , expectDeadline=#{declare.expectDeadline}\n" +
            "where declareId = #{declare.declareId};")
    void putModify(@Param("declare") Declare declare);

}
