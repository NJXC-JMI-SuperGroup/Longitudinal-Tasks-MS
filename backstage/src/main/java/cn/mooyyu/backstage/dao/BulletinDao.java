package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
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



    @Insert("insert into tb_bulletin(title, [index],isLimit)\n" +
            "values (#{title},#{index},#{isLimit});")
    DetailedBulletin addDetailedBullentin(@Param("title") String title, @Param("index") String index,@Param("isLimit") boolean isLimit);

    /* @Update("update tb_bulletin set title=#{title},[index]=#{[index]},isLimit=#{isLimit}, limitNumber=#{limitNumber},deadline=#{deadline}" +
            "where bulletinId=#{bulletinId};")
    void updateDetailedBulletin(@Param("bulletinId") int bulletinId,@Param("title") String title,@Param("index") int index,@Param(""))
    */
}
