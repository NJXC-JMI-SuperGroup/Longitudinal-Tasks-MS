package cn.mooyyu.backstage.dao;

import cn.mooyyu.backstage.pojo.Bulletin;
import cn.mooyyu.backstage.pojo.DetailedBulletin;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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

    @Select("select title,[index],depname,type,isLimit,limitNumber,expertAudit,level,deadline,content\n" +
            "from tb_bulletin join tb_bulletinType on tb_bulletin.typeId = tb_bulletinType.typeId\n" +
            "    join tb_bulletinLevel tbL on tb_bulletin.levelId = tbL.levelId\n" +
            "    join tb_dept td on tb_bulletin.publishDeptId = td.depid where bulletinId=#{bulletinId};")
    DetailedBulletin findDetailedBybulletinId(@Param("bulletinId") int bulletinId);

    @Insert("insert into tb_bulletin(bulletinId,title, [index], publishDeptId, typeId, isLimit, limitNumber, expertAudit, levelId, deadline, content)\n" +
            "values (#{bullen},?,?,?,?,?,?,?,?,?,?);")
    DetailedBulletin addDetailedBullentin();


}
