package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import cn.mooyyu.backstage.pojo.addBulletin;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BulletinDao {
    @Select("select title,type,level,depname,deadline\n" +
            "from tb_bulletin join tb_bulletinType on tb_bulletin.typeId = tb_bulletinType.typeId\n" +
            "    join tb_bulletinLevel tbL on tb_bulletin.levelId = tbL.levelId\n" +
            "    join tb_dept td on tb_bulletin.publishDeptId = td.depid;")
    List<Bulletin> getBulletinList();

    @Select("select title,[index],depname,type,isLimit,limitNumber,expertAudit,level,deadline,content,link\n" +
            "from tb_bulletin join tb_bulletinType on tb_bulletin.typeId = tb_bulletinType.typeId\n" +
            "    join tb_bulletinLevel tbL on tb_bulletin.levelId = tbL.levelId\n" +
            "    join tb_dept td on tb_bulletin.publishDeptId = td.depid where bulletinId=#{bulletinId};")
    DetailedBulletin findDetailedBybulletinId(@Param("bulletinId") int bulletinId);



    @Insert(value = "insert into tb_bulletin(title, [index], publishDeptId, typeId, isLimit, limitNumber, expertAudit, levelId, deadline, content) " +
            "values (#{addBulletin.title},#{addBulletin.index},#{addBulletin.publishDeptId},#{addBulletin.typeId},#{addBulletin.isLimit},#{addBulletin.limitNumber}," +
            "#{addBulletin.expertAudit},#{addBulletin.levelId},#{addBulletin.deadline}," +
            "#{addBulletin.content})")
    void addforBullentin(@Param("addBulletin") addBulletin addbulletin);

    /* @Update("update tb_bulletin set title=#{title},[index]=#{[index]},isLimit=#{isLimit}, limitNumber=#{limitNumber},deadline=#{deadline}" +
            "where bulletinId=#{bulletinId};")
    void updateDetailedBulletin(@Param("bulletinId") int bulletinId,@Param("title") String title,@Param("index") int index,@Param(""))
    */
}
