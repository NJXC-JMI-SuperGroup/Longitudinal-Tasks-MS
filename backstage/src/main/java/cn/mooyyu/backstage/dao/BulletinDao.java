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

    @Select("select title,\n" +
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


    @Insert("insert into tb_bulletin(title, [index], publishDeptId, typeId, isLimit, limitNumber, expertAudit, levelId, deadline, content) " +
            "values (#{addBulletin.title},#{addBulletin.index},#{addBulletin.publishDeptId},#{addBulletin.typeId},#{addBulletin.isLimit},#{addBulletin.limitNumber}," +
            "#{addBulletin.expertAudit},#{addBulletin.levelId},#{addBulletin.deadline}," +
            "#{addBulletin.content})")
    void addBulletin(@Param("addBulletin") FullBulletin addBulletin);

    /* @Update("update tb_bulletin set title=#{title},[index]=#{[index]},isLimit=#{isLimit}, limitNumber=#{limitNumber},deadline=#{deadline}" +
            "where bulletinId=#{bulletinId};")
    void updateDetailedBulletin(@Param("bulletinId") int bulletinId,@Param("title") String title,@Param("index") int index,@Param(""))
    */
}
