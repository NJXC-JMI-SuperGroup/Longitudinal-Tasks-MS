package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.SimpleBulletin;
import cn.mooyyu.backstage.pojo.FullBulletin;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BulletinDao {
    @Select("select bulletinId, title,\n" +
            "       tb_bulletinLevel.level as bulletinLevel,\n" +
            "       tb_dept.depname        as publishDept,\n" +
            "       deadline,\n" +
            "       cast(\n" +
            "               case\n" +
            "                   when getdate() < deadline then N'进行中'\n" +
            "                   else N'已结束' end as nvarchar\n" +
            "           )                  as state\n" +
            "from tb_bulletin\n" +
            "         inner join tb_bulletinLevel on tb_bulletin.levelId = tb_bulletinLevel.levelId\n" +
            "         inner join tb_dept on tb_bulletin.publishDeptId = tb_dept.depid\n" +
            "order by deadline desc")
    List<SimpleBulletin> getBulletinList();

    @Select("select bulletinId,\n" +
            "       title,\n" +
            "       [index],\n" +
            "       depname as publishDept, publishDeptId,\n" +
            "       type as bulletinType, tb_bulletin.typeId,\n" +
            "       isLimit as limit,\n" +
            "       limitNumber,\n" +
            "       expertAudit,\n" +
            "       level as bulletinLevel, tb_bulletin.levelId,\n" +
            "       deadline,\n" +
            "       content,\n" +
            "       link\n" +
            "from tb_bulletin\n" +
            "         inner join tb_bulletinType on tb_bulletin.typeId = tb_bulletinType.typeId\n" +
            "         inner join tb_bulletinLevel tbL on tb_bulletin.levelId = tbL.levelId\n" +
            "         inner join tb_dept td on tb_bulletin.publishDeptId = td.depid\n" +
            "where bulletinId = #{bulletinId}")
    FullBulletin getDetailById(@Param("bulletinId") int bulletinId);


    @Insert("insert into tb_bulletin(title, [index], publishDeptId, typeId, isLimit, limitNumber,\n" +
            "                        expertAudit, levelId, deadline, content, link)\n" +
            "values (#{bulletin.title},#{bulletin.index},#{bulletin.publishDeptId},\n" +
            "        #{bulletin.typeId},#{bulletin.limit},#{bulletin.limitNumber},\n" +
            "        #{bulletin.expertAudit},#{bulletin.levelId},#{bulletin.deadline},\n" +
            "        #{bulletin.content},#{bulletin.link})")
    @Options(useGeneratedKeys = true, keyProperty = "bulletin.bulletinId", keyColumn = "bulletinId")
    void addBulletin(@Param("bulletin") FullBulletin bulletin);
}
